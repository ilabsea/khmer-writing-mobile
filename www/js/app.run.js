angular
.module('app')
.run(runBlock);

runBlock.$inject = ['$ionicPlatform', "$location", "$ionicHistory", 'SoundServices'];


function runBlock ($ionicPlatform, $location, $ionicHistory, SoundServices) {

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    SoundServices.setIsActive(false);
    if(SoundServices.getIsActive()){
      var audios = SoundServices.getAudios();
      audios.forEach(function(audio){
        for(var key in audio){
          SoundServices.preloadSimple(key, audio[key]);
        }
      })
    }
  });

  $ionicPlatform.registerBackButtonAction(function() {
    if ($location.path() === "/home" || $location.path() === "/grades") {
      navigator.app.exitApp();
    }
    else {
      $ionicHistory.goBack();
    }
  }, 100);



  if (window.StatusBar) {
    StatusBar.hide();
    $ionicPlatform.fullScreen();
  }

}
