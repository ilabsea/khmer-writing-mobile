angular.module('app')

.controller('GradesCtrl', function(GradesServices, $scope, $ionicPlatform, $ionicLoading, SettingsServices) {
  var vm = $scope;

  vm.grades = [];

  vm.setGrade = setGrade;

  function setGrade(grade) {
    GradesServices.setGrade(grade);
  }

  function getGrades() {
    GradesServices.all().then(function(grades){
      if(grades.length > 0 && !SettingsServices.getDatabaseDownloaded()){
        console.log('this condition');
        SettingsServices.setDatabaseDownloaded(true);
        $ionicLoading.hide();
      }
      console.log('grades : ', grades);
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
