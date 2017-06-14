angular.module('app')
.factory("SettingsServices", SettingsServices)

SettingsServices.$inject = ['$cordovaSQLite', '$q', 'ENDPOINT', '$http']

function SettingsServices($cordovaSQLite, $q, ENDPOINT, $http) {

  function fetch(apiUrl) {
    return $q(function(resolve, reject) {
      $http.get(apiUrl)
        .success(function(result) {
          resolve(result)
        })
        .error(function(error){
          reject(error);
        });
    });
  }

  function downloadGrades() {
    var apiUrl = ENDPOINT.api + "grades.json";
    return fetch(apiUrl);
  }

  function downloadWritingMethods() {
    var apiUrl = ENDPOINT.api + "writing_methods.json";
    return fetch(apiUrl);
  }

  function downloadLessons(gradeId) {
    var apiUrl = ENDPOINT.api + "grades/" + gradeId + "/lessons.json";
    return fetch(apiUrl);
  }

  function downloadContents(lessonId) {
    var apiUrl = ENDPOINT.api + "lessons/" + lessonId + "/contents.json";
    return fetch(apiUrl);
  }

  function setDatabaseDownloaded(state) {
    localStorage.setItem('databaseDownloaded', state)
  }

  function getDatabaseDownloaded() {
    return localStorage.getItem('databaseDownloaded')
  }

  return {
    downloadGrades: downloadGrades,
    downloadWritingMethods: downloadWritingMethods,
    downloadLessons: downloadLessons,
    downloadContents: downloadContents,
    setDatabaseDownloaded: setDatabaseDownloaded,
    getDatabaseDownloaded: getDatabaseDownloaded
  }
}
