angular
.module('app')
.run(runBlock);

runBlock.$inject = ['$ionicPlatform', '$cordovaSQLite', '$cordovaFile', "$rootScope", "$location", "$ionicHistory"];

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

    // db = window.openDatabase("khmer-writing.db", '1.0', 'larvae report system database', 1024 * 1024 * 100); // browser
    // createTables($cordovaSQLite);

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
    ionic.Platform.fullScreen();
  }

}
