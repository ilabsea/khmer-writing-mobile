angular.module('app')

.controller('UsersCtrl', function($scope, $ionicPopup) {
  var vm = $scope;

  showUsers();

  function showUsers() {

    var myPopup = $ionicPopup.show({
      templateUrl: 'templates/users.html',
      scope: vm
    });
  }
})
