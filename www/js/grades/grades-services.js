angular.module('app')

.factory('GradesServices', GradesServices)

GradesServices.$inject = ['$cordovaSQLite', 'SettingsServices', 'LessonsServices', '$q']

function GradesServices($cordovaSQLite, SettingsServices, LessonsServices, $q) {

  var grade;

  function setGrade(gradeParam){
    grade = gradeParam;
  }

  function getGrade() {
    return grade;
  }

  function insert(grades) {
    var i = 0,
        l = grades.length;
    for(; i < l ; i++){
      var grade = grades[i];
      var query = "INSERT INTO grades (grade_id_api, name, created_at, updated_at, code) VALUES (? , ? , ?, ?, ?) ";
      var gradeData = [grade.id, grade.name, grade.created_at, grade.updated_at, grade.code];
      $cordovaSQLite.execute(db, query, gradeData);
      SettingsServices.downloadLessons(grade.id).then(function(lessons){
        LessonsServices.insert(lessons);
      });
    }
  }

  function all() {
    var query = "SELECT * FROM grades";
    var grades = $cordovaSQLite.execute(db, query).then(function(res) {
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

    return grades;
  }

  return {
    all: all,
    setGrade: setGrade,
    getGrade: getGrade,
    insert: insert
  }

}
