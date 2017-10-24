angular.module('app')

.controller("AboutusCtrl", function($scope, $cordovaAppVersion, $ionicPlatform){
  var vm = $scope;
  vm.appVersion = '១.១';

  // $ionicPlatform.ready(function () {
  //   vm.$on('$stateChangeSuccess', function(event, toState) {
  //     $cordovaAppVersion.getVersionNumber().then(function (version) {
  //       vm.appVersion = version;
  //     });
  //   });
  // });
})
