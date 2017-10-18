angular.module('app')

.controller("AboutusCtrl", function($scope, $cordovaAppVersion, $ionicPlatform,
            SoundServices, $timeout){
  var vm = $scope;
  vm.appVersion = '១.០';

  $ionicPlatform.ready(function () {
    $cordovaAppVersion.getVersionNumber().then(function (version) {
      vm.appVersion = version;
    });
    if(SoundServices.getIsActive()){
      SoundServices.stop('setting');
      $timeout(function(){
        SoundServices.play('aboutus');
      }, 1000)
    }
  });
})
