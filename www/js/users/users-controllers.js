angular.module('app')

.controller('UsersCtrl', function($scope, isHome, UsersServices, $ionicPlatform,
            $cordovaFile, $cordovaSQLite, SoundServices) {
  var vm = $scope;
  vm.isHome = isHome;
  vm.offset = 0;
  vm.limit = vm.offset == 0 && vm.isHome ? 1 : 2;

  vm.users = [];

  vm.nbUsers = 0;

  function numberOfUsers(){
    UsersServices.numberOfUsers().then(function(count){
      vm.nbUsers = count;
    });
  }

  vm.setCurrentUser = function(user){
    UsersServices.setCurrentUser(user);
  }

  vm.next = function(){
    vm.offset += vm.limit;
    vm.limit = 2;
    getUsers();
  }

  vm.previous = function(){
    vm.limit = vm.offset == 1 ? 1 : 2;
    vm.offset -= vm.limit;
    getUsers();
  }

  function getUsers() {
    UsersServices.getUsers(vm.offset , vm.limit).then(function(users){
      vm.users = users;
    });
  }

  function setDatabaseCopied(state) {
    localStorage.setItem("databaseCopied", state);
  }

  function getDatabaseCopied() {
    return localStorage.getItem("databaseCopied");
  }

  function copyFile(fileName){
    $cordovaFile.copyFile(cordova.file.applicationDirectory + 'www/', fileName, cordova.file.dataDirectory, fileName)
      .then(function (success) {
        db = $cordovaSQLite.openDB(fileName);
        setDatabaseCopied(true);
        numberOfUsers();
        getUsers();
      }, function (error) {
        console.log('error file transfer : ', error);
      });
  }


  $ionicPlatform.ready(function() {
    var isDatabaseCopied = getDatabaseCopied();
    if(!isDatabaseCopied){
      copyFile("khmer_writing.db");
    }else{
      db = $cordovaSQLite.openDB("khmer_writing.db");
      numberOfUsers();
      getUsers();
    }

    SoundServices.play('intro');
  })

})
