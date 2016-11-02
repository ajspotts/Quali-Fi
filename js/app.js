

angular
  .module("qualifiApp", ["ui.router", "ngResource"])
  .config(["$stateProvider", RouterFunction])
  .controller("OpeningIndexController", ["OpeningFactory", OpeningIndexControllerFunction])
  .controller("OpeningShowController", ["OpeningFactory", "$stateParams", OpeningShowControllerFunction])
  .factory( "OpeningFactory", ["$resource", OpeningFactoryFunction])

function RouterFunction($stateProvider){
  $stateProvider
  .state("landing", {
    url: "/",
    templateUrl: "js/ng-views/landing.html"
  })
  .state("openingIndex", {
    url: "/openings",
    controller: "OpeningIndexController",
    controllerAs: "vm",
    templateUrl: "js/ng-views/index.html"
  })
  .state("openingShow", {
    url: "/openings/:id",
    controller: "OpeningShowController",
    controllerAs: "vm",
    templateUrl: "js/ng-views/show.html"
  })
}

function OpeningFactoryFunction($resource){
  return $resource( "http://localhost:3000/grumbles/:id" )
}

function OpeningIndexControllerFunction(OpeningFactory) {
  this.openings = OpeningFactory.query()
}

function OpeningShowControllerFunction(OpeningFactory, $stateParams){
  // this.opening = OpeningFactory.get({id: $stateParams.id})
  // console.log(this.opening)

  OpeningFactory.get({id: $stateParams.id}).$promise.then(response => this.openingTitleLength = response.content.length)
 }
