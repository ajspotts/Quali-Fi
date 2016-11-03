angular
  .module("qualifiApp", ["ui.router", "ngResource"])
  .config(["$stateProvider", RouterFunction])
  .controller("OpeningIndexController", ["OpeningFactory", OpeningIndexControllerFunction])
  .controller("OpeningShowController", ["OpeningFactory", "$stateParams", OpeningShowControllerFunction])
  .controller("OpeningNewController", ["OpeningFactory", "$state", OpeningNewControllerFunction])
  .controller("OpeningEditController", ["OpeningFactory", "$state", "$stateParams", OpeningEditControllerFunction])
  .factory( "OpeningFactory", ["$resource", OpeningFactoryFunction])
  .controller("ApplicantIndexController", ["ApplicantFactory", ApplicantIndexControllerFunction])
  .controller("ApplicantShowController", ["ApplicantFactory", "$stateParams", ApplicantShowControllerFunction])
  .controller("ApplicantNewController", ["ApplicantFactory", "$state", ApplicantNewControllerFunction])
  .controller("ApplicantEditController", ["ApplicantFactory", "$state", "$stateParams", ApplicantEditControllerFunction])
  .factory( "ApplicantFactory", ["$resource", ApplicantFactoryFunction])

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
  .state("openingShow", {
    url: "/openings/:id",
    controller: "OpeningShowController",
    controllerAs: "vm",
    templateUrl: "js/ng-views/openings/show.html"
  })
  .state("openingEdit", {
    url: "/openings/:id/edit",
    controller: "OpeningEditController",
    controllerAs: "vm",
    templateUrl: "js/ng-views/openings/edit.html"
  })
  .state("applicantIndex", {
    url: "/applicants",
    controller: "ApplicantIndexController",
    controllerAs: "vm",
    templateUrl: "js/ng-views/applicants/index.html"
  })
  .state("applicantNew", {
    url: "/applicants/new",
    templateUrl: "js/ng-views/applicants/new.html",
    controller: "ApplicantNewController",
    controllerAs: "vm"
  })
  .state("applicantShow", {
    url: "/applicants/:id",
    controller: "ApplicantShowController",
    controllerAs: "vm",
    templateUrl: "js/ng-views/applicants/show.html"
  })
  .state("applicantEdit", {
    url: "/applicants/:id/edit",
    controller: "ApplicantEditController",
    controllerAs: "vm",
    templateUrl: "js/ng-views/applicants/edit.html"
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
       this.opening.$save().then(response => $state.go("openingIndex"))
         // this is where the redirect should happen
       }
     }


function OpeningEditControllerFunction(OpeningFactory, $state, $stateParams){
  this.opening = OpeningFactory.get({id: $stateParams.id})
  this.update = function(){
    this.opening.$update({id: $stateParams.id}).then(response => $state.go('openingIndex'))

  }
  this.destroy = function(){
      this.opening.$delete({id: $stateParams.id}).then(response => $state.go('openingIndex'))
    }
}

function OpeningShowControllerFunction(OpeningFactory, $stateParams){
  // To access the full opening object
  // this.opening = OpeningFactory.get({id: $stateParams.id})
  // console.log(this.opening)

  OpeningFactory.get({id: $stateParams.id}).$promise.then(response => this.openingName = this.opening = response.opening_name)



 }

 function ApplicantFactoryFunction($resource){
   return $resource( "https://quali-fi.herokuapp.com/applicants/:id", {}, {
     update: {method: "PUT"}
   })
 }

 function ApplicantIndexControllerFunction(ApplicantFactory) {
   this.applicants = ApplicantFactory.query()
 }

 function ApplicantNewControllerFunction(ApplicantFactory, $state){
      this.applicant = new ApplicantFactory()
      this.create = function(){
        this.applicant.$save().then(response => $state.go("applicantIndex"))
          // this is where the redirect should happen
        }
      }


 function ApplicantEditControllerFunction(ApplicantFactory, $state, $stateParams){
   this.applicant = ApplicantFactory.get({id: $stateParams.id})
   this.update = function(){
     this.applicant.$update({id: $stateParams.id}).then(response => $state.go('applicantIndex'))

   }
   this.destroy = function(){
       this.applicant.$delete({id: $stateParams.id}).then(response => $state.go('applicantIndex'))
     }
 }

 function ApplicantShowControllerFunction(ApplicantFactory, $stateParams){
   // To access the full applicant object
   // this.applicant = ApplicantFactory.get({id: $stateParams.id})
   // console.log(this.applicant)

   ApplicantFactory.get({id: $stateParams.id}).$promise.then(response => this.applicantName = this.applicant = response.name)



  }
