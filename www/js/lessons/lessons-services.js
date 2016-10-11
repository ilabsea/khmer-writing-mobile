angular.module('app')
.factory("LessonsServices", LessonsServices)

LessonsServices.$inject = ['$cordovaSQLite']

function LessonsServices($cordovaSQLite) {
  var lesson;

  function setLesson(lessonParam) {
    lesson = lessonParam;
  }

  function getLesson() {
    return lesson;
  }

  function getByClassId(gradeId) {
    var query = "SELECT * FROM lessons WHERE grade_id = ?";
    console.log('gradeId : ', gradeId);
    var lessons = $cordovaSQLite.execute(db, query, [gradeId]).then(function(res) {
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

    return lessons;
  }

  return{
    getByClassId : getByClassId,
    setLesson: setLesson,
    getLesson: getLesson
  }

}
