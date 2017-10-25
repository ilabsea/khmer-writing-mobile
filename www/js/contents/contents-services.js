angular.module('app')

.factory("ContentsServices", ContentsServices)

ContentsServices.$inject = ['$cordovaSQLite', 'Helper'];

function ContentsServices($cordovaSQLite, Helper) {

  function getByLessonIdMethodId(lessonId, methodId) {
    var query = "SELECT * FROM contents WHERE lesson_id = ? AND writing_method_id = ?";
    var contents = $cordovaSQLite.execute(db, query, [lessonId, methodId]).then(function(res) {
      return Helper.generateResult(res);
    });

    return contents;
  }

  return {
    getByLessonIdMethodId: getByLessonIdMethodId
  }
}
