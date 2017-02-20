angular
.module('app')
.run(runBlock);

runBlock.$inject = ['$ionicPlatform', '$cordovaSQLite', '$cordovaFile', "$rootScope", "$location", "$ionicHistory", "$ionicLoading"];

var db = null;

function runBlock ($ionicPlatform, $cordovaSQLite, $cordovaFile, $rootScope, $location, $ionicHistory, $ionicLoading) {


  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    if (window.cordova) {
      db = $cordovaSQLite.openDB({ name: "khmer-writing.db" }); //device
    }else{
      db = window.openDatabase("khmer-writing.db", '1.0', 'larvae report system database', 1024 * 1024 * 100); // browser
    }

    $rootScope.showSpinner = function(templateUrl) {
      $ionicLoading.show({
        templateUrl: templateUrl
      });
    }

    $rootScope.hideSpinner = function() {
      $ionicLoading.hide();
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
    console.log('window.StatusBar');
    StatusBar.hide();
    $ionicPlatform.fullScreen();
  }

}
