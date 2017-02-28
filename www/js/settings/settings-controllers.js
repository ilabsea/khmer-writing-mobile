angular.module('app')

.controller("SettingsCtrl", function($scope, UsersServices, AccountsServices, $ionicPopup, $state, SettingsServices, GradesServices, MethodsServices, $ionicLoading){
  var vm = $scope;

  vm.currentUser = UsersServices.getCurrentUser();
  vm.randomNumber = '';
  vm.valid = true;
  vm.formDelete = {};

  vm.isOpen = false;
  vm.toggleSound = function() {
    vm.isOpen = !vm.isOpen;
  };
  vm.download = download;
  vm.isDatabaseDownloaded = SettingsServices.getDatabaseDownloaded();

  vm.deleteUserStyle = { "width": vm.isDatabaseDownloaded ? "28%":"25%"};
  vm.soundStyle = {"width": vm.isDatabaseDownloaded ? "35%":"25%", "margin-left": "0%"};

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

  function download() {
    $ionicLoading.show('templates/loading.html');
    SettingsServices.downloadGrades().then(function(grades){
      GradesServices.insert(grades);
    });
    SettingsServices.downloadWritingMethods().then(function(methods){
      MethodsServices.insert(methods);
    });
  }

})
