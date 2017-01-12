angular
.module('app')
.run(runBlock);

runBlock.$inject = ['$ionicPlatform', '$cordovaSQLite', '$cordovaFile', "$rootScope", "$location"];

var db = null;

function runBlock ($ionicPlatform, $cordovaSQLite, $cordovaFile, $rootScope, $location) {

  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    db = window.openDatabase("khmer-writing.db", '1.0', 'larvae report system database', 1024 * 1024 * 100); // browser
    createTables($cordovaSQLite);

    // $cordovaFile.copyFile(cordova.file.applicationDirectory + 'www/', "khmer-writing.db", cordova.file.dataDirectory, "khmer-writing.db")
    //   .then(function (success) {
    //     db = $cordovaSQLite.openDB({ name: "khmer-writing.db"});
    //     createTables($cordovaSQLite);
    // }, function (error) {
    //   console.log('error file transfer : ', error);
    // });
  });



}
