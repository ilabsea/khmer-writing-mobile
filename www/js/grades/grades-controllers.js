angular.module('app')

.controller('GradesCtrl', function(GradesServices, $scope, gradesLists) {
  var vm = $scope;

  vm.grades = gradesLists;

  vm.setGrade = setGrade;

  function setGrade(grade) {
    GradesServices.setGrade(grade);
  }

})
