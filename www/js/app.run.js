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

    $cordovaFile.copyFile(cordova.file.applicationDirectory + 'www/', "khmer-writing.db", cordova.file.dataDirectory, "khmer-writing.db")
      .then(function (success) {
        console.log('success');
        db = $cordovaSQLite.openDB({ name: "khmer-writing.db"});
        $location.path('/grades');
      }, function (error) {
        console.log('error file transfer : ', error);
      });

  });
}
