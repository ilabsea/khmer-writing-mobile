angular.module('app')

.factory("ContentsServices", ContentsServices)

ContentsServices.$inject = ['$cordovaSQLite'];

function ContentsServices($cordovaSQLite) {

  function getByClassIdLessonIdMethodId(classId, lessonId, methodId) {
    var query = "SELECT * FROM lessons WHERE class_id = ? AND lesson_id = ? AND method_id = ?";
    console.log('classId ; ' , classId);
    console.log('lessonId ; ' , lessonId);
    console.log('methodId ; ' , methodId);
    var content = $cordovaSQLite.execute(db, query, [classId, lessonId, methodId]).then(function(res) {
      return res.rows;
    });

    return content;
  }

  return {
    getByClassIdLessonId: getByClassIdLessonId
  }
}
