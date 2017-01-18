angular.module('app')

.controller("AccountsCtrl", function ($scope, AccountsServices, $state, UsersServices, $ionicHistory, $ionicPopup) {
  var vm = $scope;
  var selectedAvatar;

  vm.avatars = AccountsServices.getAvatars();
  vm.user = {"grade" : "១", "type" : "ក"}

  vm.select = function (avatar) {
    if(selectedAvatar && avatar.id != selectedAvatar.id){
      selectedAvatar.selected = false ;
    }
    selectedAvatar = avatar;
    selectedAvatar.selected = true;
  }

  vm.save = function(userParams) {
    AccountsServices.addUser(userParams, selectedAvatar).then(function (user) {
      $state.go('grades');
      UsersServices.setCurrentUser(user);
    });
  }

  vm.goBack = function() {
    $ionicHistory.goBack();
  }

  vm.checkValidation = function(form) {
    if(form.$invalid){
      var template = "";
      if(form.username.$error.required){
        template = template +  "<p style='color: red'> សូមបំពេញឈ្មោះរបស់អ្នក </p>"
      }
      if(form.grade.$error.required){
        template += "<p style='color: red'>សូមបំពេញឈ្មោះថ្នាក់</p>"
      }
      if(form.type.$error.required){
        template += "<p style='color: red'>សូមបំពេញកម្រិតថ្នាក់"
      }
      var myPopup = $ionicPopup.show({
        template: template,
        title: 'គណនីបង្កេីតមិនត្រឹមត្រូវ',
        buttons: [
          { text: 'យល់ព្រម',
            type: 'button-balanced'
          }
        ]
      });
    }
  }


})
