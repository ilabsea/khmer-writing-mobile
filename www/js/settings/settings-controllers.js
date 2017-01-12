angular.module('app')

.controller("SettingsCtrl", function($scope, UsersServices){
  var vm = $scope;

  vm.currentUser = UsersServices.getCurrentUser();

})
