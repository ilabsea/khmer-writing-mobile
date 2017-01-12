angular.module('app')

.controller("AccountsCtrl", function ($scope, AccountsServices) {
  var vm = $scope;
  var selectedAvatar;

  vm.avatars = AccountsServices.getAvatars();

  vm.select = function (avatar) {
    if(selectedAvatar && avatar.id != selectedAvatar.id){
      selectedAvatar.selected = false ;
    }
    selectedAvatar = avatar;
    selectedAvatar.selected = true;
  }

  vm.save = function(userParams) {
    AccountsServices.addUser(userParams, selectedAvatar);
  }


})
