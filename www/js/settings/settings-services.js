angular.module('app')
.factory("SettingsServices", SettingsServices)

SettingsServices.$inject = ['$SettingsServices', '$q']

function SettingsServices($cordovaSQLite, $q) {

  function download() {
    // return $q(function(resolve, reject) {
    //   $http.get("http://localhost")
    //     .success(function(site) {
    //       setSelectedSite(site);
    //       resolve(site);
    //     })
    //     .error(function(error){
    //       reject(error);
    //     });
    // });
  }

  return {
    download: download
  }
}
