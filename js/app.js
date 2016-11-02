angular
  .module("qualifiApp", ["ui.router", "ngResource"])
  .config(["$stateProvider", RouterFunction])
  .controller("OpeningIndexController", ["OpeningFactory", OpeningIndexControllerFunction])
  .controller("OpeningShowController", ["OpeningFactory", "$stateParams", OpeningShowControllerFunction])
  .controller("OpeningNewController", ["OpeningFactory","$state", "$stateParams", OpeningNewControllerFunction])
  .controller("OpeningEditController", ["OpeningFactory", "$stateParams", OpeningEditControllerFunction])
  .factory( "OpeningFactory", ["$resource", OpeningFactoryFunction])

function RouterFunction($stateProvider){
  $stateProvider
  .state("Index", {
    url: "/",
    templateUrl: "js/ng-views/index.html"
  })
  .state("openingIndex", {
    url: "/openings",
    controller: "OpeningIndexController",
    controllerAs: "vm",
    templateUrl: "js/ng-views/openings/index.html"
  })
  .state("openingNew", {
    url: "/openings/new",
    templateUrl: "js/ng-views/openings/new.html",
    controller: "OpeningNewController",
    controllerAs: "vm"
  })
  .state("openingEdit", {
    url: "/openings/:id/edit",
    templateUrl: "js/ng-views/openings/edit.html",
    controller: "OpeningEditController",
    controllerAs: "vm"
  })
  .state("openingShow", {
    url: "/openings/:id",
    controller: "OpeningShowController",
    controllerAs: "vm",
    templateUrl: "js/ng-views/openings/show.html"
  })
}

function OpeningFactoryFunction($resource){
  return $resource( "https://quali-fi.herokuapp.com/openings/:id", {}, {
    update: {method: "PUT"}
  })
}

function OpeningIndexControllerFunction(OpeningFactory) {
  this.openings = OpeningFactory.query()
}

function OpeningNewControllerFunction(OpeningFactory, $state){
     this.opening = new OpeningFactory()
     this.create = function(){
       this.opening.$save().then(opening => $state.go("openingIndex"))
         // this is where the redirect should happen
       }
     }


function OpeningEditControllerFunction(OpeningFactory, $stateParams){
  this.opening = OpeningFactory.get({id: $stateParams.id})
  this.update = function(){
    this.opening.$update({id: $stateParams.id})
  }
  this.destroy = function(){
      this.grumble.$delete({id: $stateParams.id});
    }
}

function OpeningShowControllerFunction(OpeningFactory, $stateParams){
  // To access the full opening object
  // this.opening = OpeningFactory.get({id: $stateParams.id})
  // console.log(this.opening)

  OpeningFactory.get({id: $stateParams.id}).$promise.then(response => this.openingName = response.opening_name)
  OpeningFactory.get({id: $stateParams.id}).$promise.then(response => this.opening = response.opening_name)



 }
