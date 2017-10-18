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

    SoundServices.preloadSimple('intro', 'audio/intro.mp3');
    SoundServices.preloadSimple('grade', 'audio/grade.wav');
    SoundServices.preloadSimple('lesson', 'audio/lesson.wav');
    SoundServices.preloadSimple('content', 'audio/content.wav');
    SoundServices.preloadSimple('aboutus', 'audio/aboutus.wav');
    SoundServices.preloadSimple('method', 'audio/method.wav');
    SoundServices.preloadSimple('setting', 'audio/setting.wav');
    SoundServices.preloadSimple('brush', 'audio/brush.wav');
    SoundServices.preloadSimple('create-account', 'audio/create-account.wav');

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
