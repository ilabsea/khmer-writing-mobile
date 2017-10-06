angular.module('app')
.factory("SoundServices", SoundServices)

SoundServices.$inject = [$cordovaNativeAudio]

function SoundServices($cordovaNativeAudio) {

  function preloadSimple(id, path) {
    $cordovaNativeAudio
      .preloadSimple(id, path)
      .then(function (msg) {
        console.log("message success : ", msg);
      }, function (error) {
        console.log("error success : ", error);
      });
  }

  function preloadComplex() {
    $cordovaNativeAudio
      .preloadComplex(id, path)
      .then(function (msg) {
        console.log("message2 success : ", msg);
      }, function (error) {
        console.log("error2 success : ", error);
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
    preloadComplex: preloadComplex
  }

}
