angular.module('app')
.factory("LessonsServices", LessonsServices)

LessonsServices.$inject = ['$cordovaSQLite', 'ENDPOINT', '$q', '$http']

function LessonsServices($cordovaSQLite, ENDPOINT, $q, $http) {
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

  function insert(lessons, gradeId) {
    console.log('lessons : ', lessons);
    var lessonsSQL = "INSERT INTO lessons (name, code, khmer_numeric, grade_id) VALUES (?, ?, ?, ?)";
    var i = 0,
        length = lessons.length;
    for (; i < length ; i++) {
      var lesson = lessons[i];
      var lessonData = [lesson.name, lesson.code, lesson.khmer_numeric, gradeId];
      $cordovaSQLite.execute(db, lessonsSQL, lessonData);
    }

  }

  function fetchByGradeId(gradeId) {
    return $q(function(resolve, reject) {
      $http.get(ENDPOINT.url + "grades/" + gradeId + "/lessons.json")
        .success(function(lessons) {
          insert(lessons, gradeId);
          resolve(lessons);
        })
        .error(function(error){
        });
    });
  }

  return{
    getByClassId : getByClassId,
    setLesson: setLesson,
    getLesson: getLesson,
    fetchByGradeId: fetchByGradeId
  }

}
