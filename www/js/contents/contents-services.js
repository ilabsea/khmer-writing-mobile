angular.module('app')

.factory("ContentsServices", ContentsServices)

ContentsServices.$inject = ['$cordovaSQLite', '$rootScope', '$cordovaFileTransfer', '$state', '$timeout'];

function ContentsServices($cordovaSQLite, $rootScope, $cordovaFileTransfer, $state, $timeout) {

  function getByLessonIdMethodId(lessonId, methodId) {
    var query = "SELECT * FROM contents WHERE lesson_id = ? AND writing_method_id = ?";
    var contents = $cordovaSQLite.execute(db, query, [lessonId, methodId]).then(function(res) {
      var result = [];
      if(res.rows.length > 0){
        var i = 0,
            l = res.rows.length
        for(;i<l;i++){
          result.push(res.rows.item(i));
        }
      }
      return result;
    });

    return contents;
  }

  return {
    getByLessonIdMethodId: getByLessonIdMethodId
  }
}
