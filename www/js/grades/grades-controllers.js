angular.module('app')

.controller('GradesCtrl', function(GradesServices, $scope, $cordovaFile, $ionicPlatform, $cordovaSQLite, $state) {
  var vm = $scope;

  vm.grades = [];

  vm.setGrade = setGrade;

  function setGrade(grade) {
    GradesServices.setGrade(grade);
  }

  function getGrades() {
    GradesServices.all().then(function(grades){
      vm.grades = grades;
    })
  }

  vm.$on('$stateChangeSuccess', function(event, toState) {
    if (toState.url== "/grades") {
      $ionicPlatform.ready(function () {
        getGrades();
      });
    }
  });
})
