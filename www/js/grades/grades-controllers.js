angular.module('app')

.controller('GradesCtrl', function(GradesServices, $scope, $cordovaFile, $ionicPlatform, $cordovaSQLite, $state) {
  var vm = $scope;

  vm.grades = [];

  vm.setGrade = setGrade;

  function setGrade(grade) {
    GradesServices.setGrade(grade);
  }

  $ionicPlatform.ready(function() {
    $cordovaFile.copyFile(cordova.file.applicationDirectory + 'www/', "khmer-writing.db", cordova.file.dataDirectory, "khmer-writing.db")
      .then(function (success) {
        db = $cordovaSQLite.openDB({ name: "khmer-writing.db"});
        GradesServices.all().then(function (grades) {
          vm.grades = grades;
          $state.go('grades');
        });
    }, function (error) {
      console.log('error file transfer : ', error);
    });
  })

})
