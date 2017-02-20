angular.module('app')
.factory("SettingsServices", SettingsServices)

SettingsServices.$inject = ['$cordovaSQLite', '$q', 'ENDPOINT', '$http']

function SettingsServices($cordovaSQLite, $q, ENDPOINT, $http) {

  function downloadGrades() {
    return $q(function(resolve, reject) {
      $http.get(ENDPOINT.api + "grades.json")
        .success(function(grades) {
          console.log('grades : ', grades);
          resolve(grades)
        })
        .error(function(error){
          reject(error);
        });
    });
  }

  function downloadWritingMethods() {
    return $q(function(resolve, reject) {
      $http.get(ENDPOINT.api + "writing_methods.json")
        .success(function(methods) {
          resolve(methods);
        })
        .error(function(error){
          reject(error);
        });
    });
  }


  function downloadLessons(gradeId) {
    return $q(function(resolve, reject) {
      $http.get(ENDPOINT.api + "grades/" + gradeId + "/lessons.json")
        .success(function(lessons) {
          resolve(lessons);
        })
        .error(function(error){
          reject(error);
        });
    });
  }

  function downloadContents(lessonId) {
    return $q(function(resolve, reject) {
      $http.get(ENDPOINT.api + "lessons/" + lessonId + "/contents.json")
        .success(function(contents) {
          resolve(contents);
        })
        .error(function(error){
          reject(error);
        });
    });
  }

  return {
    downloadGrades: downloadGrades,
    downloadWritingMethods: downloadWritingMethods,
    downloadLessons: downloadLessons,
    downloadContents: downloadContents
  }
}
