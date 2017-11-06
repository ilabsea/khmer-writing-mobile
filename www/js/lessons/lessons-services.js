angular.module('app')
.factory("LessonsServices", LessonsServices)

LessonsServices.$inject = ['$cordovaSQLite', 'Helper']

function LessonsServices($cordovaSQLite, Helper) {
  var lesson;

  function setLesson(lessonParam) {
    lesson = lessonParam;
  }

  function getLesson() {
    return lesson;
  }

  function getByGradeId(gradeId) {
    var query = "SELECT * FROM lessons WHERE grade_id = ?";
    var lessons = $cordovaSQLite.execute(db, query, [gradeId]).then(function(res) {
      return Helper.generateResult(res);
    }, function(e){
      console.log('e : ', e);
    });

    return lessons;
  }

  return{
    getByGradeId : getByGradeId,
    setLesson: setLesson,
    getLesson: getLesson
  }

}
