angular
.module('app')
.run(runBlock);

runBlock.$inject = ['$ionicPlatform', "$location", "$ionicHistory"];


function runBlock ($ionicPlatform, $location, $ionicHistory) {

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    if (window.XAPKReader) {
      window.XAPKReader.downloadExpansionIfAvailable(function () {
        console.log("Expansion file check/download success.");
      }, function (err) {
        console.log(err);
        throw "Failed to download expansion file.";
      })
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
