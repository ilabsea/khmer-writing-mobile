angular.module('app')

.factory('GradesServices', GradesServices)

GradesServices.$inject = ['$cordovaSQLite', 'LessonsServices', '$q' , 'Helper']

function GradesServices($cordovaSQLite, $q, Helper) {

  var grade;

  function setGrade(gradeParam){
    grade = gradeParam;
  }

  function getGrade() {
    return grade;
  }

  function all() {
    var query = "SELECT * FROM grades";
    var grades = $cordovaSQLite.execute(db, query).then(function(res) {
      return Helper.generateResult(res) ;
    });

    return grades;
  }

  return {
    all: all,
    setGrade: setGrade,
    getGrade: getGrade
  }

}
