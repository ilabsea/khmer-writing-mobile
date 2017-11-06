angular.module('app')
.factory("SoundServices", SoundServices)

SoundServices.$inject = ['$cordovaNativeAudio']

function SoundServices($cordovaNativeAudio) {

  var isActive = false;
  var audios = [{'intro' : 'audio/intro.wav'},
                {'grade': 'audio/grade.wav'},
                {'lesson': 'audio/lesson.wav'},
                {'content': 'audio/content.wav'},
                {'aboutus': 'audio/aboutus.wav'},
                {'method': 'audio/method.wav'},
                {'setting': 'audio/setting.wav'},
                {'brush': 'audio/brush.wav'},
                {'create-account': 'audio/create-account.wav'}];

  function setIsActive(active) {
    isActive = active;
  }

  function getIsActive() {
    return isActive;
  }

  function getAudios() {
    return audios;
  }

  function preloadSimple(id, path) {
    $cordovaNativeAudio
      .preloadSimple(id, path)
      .then(function (msg) {
        console.log("id : ", id);
      }, function (error) {
        console.log("error  : ", error);
      });
  }

  function play(id) {
    $cordovaNativeAudio.play(id);
  }

  function stop(id) {
    $cordovaNativeAudio.stop(id);
  }

  function unload(id) {
    $cordovaNativeAudio.unload(id);
  }

  return {
    preloadSimple: preloadSimple,
    play: play,
    stop: stop,
    unload: unload,
    setIsActive: setIsActive,
    getIsActive: getIsActive,
    getAudios: getAudios
  }

}
