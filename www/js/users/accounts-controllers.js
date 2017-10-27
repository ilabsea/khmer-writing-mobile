angular.module('app')

.controller("AccountsCtrl", function ($scope, AccountsServices, $state,
          UsersServices, $ionicHistory, $ionicPopup, $ionicPlatform, $timeout,
          SoundServices) {
  var vm = $scope;
  var currentUser = UsersServices.getCurrentUser();

  vm.avatars = AccountsServices.getAvatars();
  vm.user = {};
  vm.selectedAvatar = {};

  vm.initUser = function(){
    vm.user = $state.params.state === "edit" ? currentUser : {"grade" : "១", "type" : "ក", "avatar_id" : 1, "avatar_name": "boy.png"};
    var i = 0,
        length = vm.avatars.length;
    for (; i < length ; i++) {
      var avatar = vm.avatars[i];
      if(avatar.id === vm.user.avatar_id){
        vm.selectedAvatar = avatar;
        vm.selectedAvatar.selected = true;
      }else{
        avatar.selected = false;
      }
    }
  }

  vm.select = function (avatar) {
    if(vm.selectedAvatar && avatar.id !== vm.selectedAvatar.id){
      vm.selectedAvatar.selected = false ;
    }
    vm.selectedAvatar = avatar;
    vm.selectedAvatar.selected = true;
  }

  vm.save = function(userParams) {
    if(userParams.id)
      AccountsServices.editUser(userParams, vm.selectedAvatar).then(function (user) {
        $state.go('grades');
        UsersServices.setCurrentUser(user);
      });
    else
      AccountsServices.addUser(userParams, vm.selectedAvatar).then(function (user) {
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

  function resetForm() {
    vm.user = {"grade" : "១", "type" : "ក"};
  }

  if (ionic.Platform.isAndroid()) {
    window.addEventListener('native.keyboardshow', function(){
      document.body.classList.add('keyboard-open');
    });
  }

  $ionicPlatform.ready(function() {
    if(SoundServices.getIsActive()){
      SoundServices.stop('setting');
      SoundServices.stop('intro');
      $timeout(function(){
        SoundServices.play('create-account');
      }, 1000)
    }
  })

})
