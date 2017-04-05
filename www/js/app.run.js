angular
.module('app')
.run(runBlock);

runBlock.$inject = ['$ionicPlatform', '$cordovaSQLite', '$cordovaFile', "$rootScope", "$location", "$ionicHistory", "$ionicLoading"];

var db = null;

function runBlock ($ionicPlatform, $cordovaSQLite, $cordovaFile, $rootScope, $location, $ionicHistory) {

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $ionicPlatform.registerBackButtonAction(function() {
    if ($location.path() === "/home" || $location.path() === "/grades") {
      navigator.app.exitApp();
    }
    else {
      $ionicHistory.goBack();
    }
  }, 100);

  if (window.StatusBar) {
    StatusBar.hide();
    $ionicPlatform.fullScreen();
  }

}
