angular.module('app')

.controller("AboutusCtrl", function($scope, $cordovaAppVersion, $ionicPlatform){
  var vm = $scope;
  vm.appVersion = '១.០';

  $ionicPlatform.ready(function () {
    $cordovaAppVersion.getVersionNumber().then(function (version) {
      console.log('version : ', version);
      vm.appVersion = version;
    });
  });
})
