angular.module('app')
.factory("SoundServices", SoundServices)

SoundServices.$inject = ['$cordovaNativeAudio']

function SoundServices($cordovaNativeAudio) {

  var isActive = false;

  function setIsActive(active) {
    this.isActive = active;
  }

  function getIsActive() {
    return this.isActive;
  }

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

  function unload(id) {
    $cordovaNativeAudio.unload(id);
  }

  return {
    preloadSimple: preloadSimple,
    play: play,
    stop: stop,
    unload: unload,
    setIsActive: setIsActive,
    getIsActive: getIsActive
  }

}
