angular
.module('app')
.run(runBlock);

runBlock.$inject = ['$ionicPlatform', '$cordovaSQLite', '$cordovaFile', "$rootScope", "$location"];

var db = null;

function runBlock ($ionicPlatform, $cordovaSQLite, $cordovaFile, $rootScope, $location) {
  $ionicPlatform.ready(function() {
    console.log('run');
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}
