angular.module('app')

.controller('UsersCtrl', function($scope, isHome, UsersServices, $ionicPlatform, $cordovaFile, $cordovaSQLite) {
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

  $ionicPlatform.ready(function() {
    var isDatabaseCopied = getDatabaseCopied();
    openDB($cordovaSQLite);
    if(!isDatabaseCopied){
      setDatabaseCopied(true);
      createTables($cordovaSQLite);
    }
    numberOfUsers();
    getUsers();
  })

})
