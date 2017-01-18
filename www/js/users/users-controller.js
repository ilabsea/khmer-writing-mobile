angular.module('app')

.controller('UsersCtrl', function($scope, isHome, UsersServices, $ionicPlatform, $cordovaFile, $cordovaSQLite) {
  var vm = $scope;
  vm.isHome = isHome;
  vm.offset = 0;

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
    if(vm.offset != 0)
      vm.offset += 2;
    else
      vm.offset += 1;
    getUsers();
  }

  vm.previous = function(){
    if(vm.offset != 1) vm.offset -= 2;
    else vm.offset = 0;
    if(vm.offset == 0)
      vm.offset = 0;
    getUsers();
  }

  function getUsers() {
    UsersServices.getUsers(vm.offset).then(function(users){
      vm.users = users;
    });
  }

  numberOfUsers();
  getUsers();

  // $ionicPlatform.ready(function() {
  //   var isDatabaseCopied = getDatabaseCopied();
  //   if(!isDatabaseCopied){
  //     $cordovaFile.copyFile(cordova.file.applicationDirectory + 'www/', "khmer-writing.db", cordova.file.dataDirectory, "khmer-writing.db")
  //       .then(function () {
  //         db = $cordovaSQLite.openDB({ name: "khmer-writing.db"});
  //         setDatabaseCopied(true);
  //         createTables($cordovaSQLite);
  //         numberOfUsers();
  //         getUsers();
  //     }, function (error) {
  //       console.log('error file transfer : ', error);
  //     });
  //   }
  //   else{
  //     db = $cordovaSQLite.openDB({ name: "khmer-writing.db"});
  //     createTables($cordovaSQLite);
  //     numberOfUsers();
  //     getUsers();
  //   }

  // })


})
