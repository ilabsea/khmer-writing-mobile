angular.module('app')

.controller("SettingsCtrl", function($scope, UsersServices, AccountsServices, $ionicPopup, $state){
  var vm = $scope;

  vm.currentUser = UsersServices.getCurrentUser();
  vm.randomNumber = '';
  vm.valid = true;
  vm.formDelete = {};

  var popup;

  vm.deleteUser = function(){
    vm.valid = true;
    vm.randomNumber = Math.floor((Math.random() * 1000));
    popup = $ionicPopup.show({
      templateUrl: 'templates/delete.html',
      cssClass: 'custom-popup',
      scope: $scope
    });
  }

  vm.reset = function () {
    vm.formDelete = {};
    popup.close();
  }

  vm.removeUser = function(randomInput){
    if(randomInput == vm.randomNumber){
      UsersServices.deleteUser().then(function(res){
        popup.close();
        $state.go('home', {}, { reload: true });
      });

    }else{
      vm.valid = false;
    }
  }
})
