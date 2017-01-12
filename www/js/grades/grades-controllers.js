angular.module('app')

.controller('GradesCtrl', function(GradesServices, $scope, $cordovaFile, $ionicPlatform, $cordovaSQLite, $state) {
  var vm = $scope;

  vm.grades = [];
  
  vm.setGrade = setGrade;

  function setGrade(grade) {
    GradesServices.setGrade(grade);
  }

  getGrades();

  function getGrades() {
    GradesServices.all().then(function(grades){
      vm.grades = grades;
    })
  }
})
