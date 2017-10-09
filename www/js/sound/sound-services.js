angular.module('app')
.factory("SoundServices", SoundServices)

SoundServices.$inject = ['$cordovaNativeAudio']

function SoundServices($cordovaNativeAudio) {

  function preloadSimple(id, path) {
    $cordovaNativeAudio
      .preloadSimple(id, path)
      .then(function (msg) {
        console.log("msg : ", msg);
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

  return {
    preloadSimple: preloadSimple,
    play: play,
    stop: stop
  }

}
