angular.module('app')

.controller('UsersCtrl', function($scope, isHome) {
  var vm = $scope;
  vm.isHome = isHome;
})
