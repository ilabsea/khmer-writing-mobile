angular.module('app')

.controller('GradesCtrl', function(GradesServices, $scope, $ionicPlatform,
            $ionicLoading, SoundServices, $timeout) {
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
        console.log('SoundServices.getIsActive() : ', SoundServices.getIsActive());
        if(SoundServices.getIsActive()){
          SoundServices.stop('intro');
          SoundServices.stop('setting');
          SoundServices.stop('lesson');
          $timeout(function () {
            SoundServices.play('grade');
          }, 1000)
        }
      });
    }
  });

})
