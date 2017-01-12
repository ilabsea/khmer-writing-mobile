angular.module('app')

.controller('UsersCtrl', function($scope, isHome, UsersServices) {
  var vm = $scope;
  vm.isHome = isHome;
  vm.offset = 0;

  vm.users = [];
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

  getUsers();

  function getUsers() {
    UsersServices.getUsers(vm.offset).then(function(users){
      vm.users = users;
    });
  }




})
