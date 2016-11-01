

angular
  .module("qualifiApp", ["ui.router", "ngResource"])
  .config(["$stateProvider", RouterFunction])
  .controller("OpeningIndexController", ["OpeningFactory", OpeningIndexControllerFunction])
  .controller("OpeningShowController", ["OpeningFactory", "$stateParams", OpeningShowControllerFunction])
  .factory( "OpeningFactory", ["$resource", OpeningFactoryFunction])

let openingData = [
 {
   "id": 1,
   "op_name": "Rails Developer",
   "skills": ["Ruby", "Rails", "JavaScript", "CSS"],
   "edu": ["Coding Bootcamp"],
   "years_exp": 3,
   "local": true
 },
 {
   "id": 2,
   "op_name": "Front End Developer",
   "skills": ["HTML", "CSS", "JavaScript", "Angular.js"],
   "edu": ["Bachelors Degree"],
   "years_exp": 5,
   "local": false
 },
 {
   "id": 3,
   "op_name": "Graphic Designer",
   "skills": ["Adobe Photoshop", "Affinty Photo", "Pixelmator", "Adobe Photoshop"],
   "edu": ["High School"],
   "years_exp": 2,
   "local": true
 }
]

let applicantData = [
 {
   "id": 1,
   "name": "Burt Maclin",
   "skills": ["Rails", "Ruby", "CSS", "Angular.js"],
   "edu": ["High School"],
   "years_exp": 4,
   "local": false
 },
 {
   "id": 2,
   "name": "Steve Jones",
   "skills": ["Ruby", "MongoDB", "Express", "Angular.js"],
   "edu": ["Self-Taught"],
   "years_exp": 3,
   "local": true
 },
 {
   "id:": 3,
   "name": "Billy Madison",
   "skills": ["Adobe Photoshop", "Pixelmator", "CSS", "JavaScript"],
   "edu": ["Master's Degree"],
   "years_exp": 7,
   "local": false
 }
]

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
  var applicantScores = []
   this.opening = OpeningFactory.get({id: $stateParams.id}).$promise.then(function(response) {
     this.opening = response
   })
 }
