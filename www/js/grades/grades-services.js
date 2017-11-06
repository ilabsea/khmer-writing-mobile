angular.module('app')

.factory('GradesServices', GradesServices)

GradesServices.$inject = ['$cordovaSQLite', 'LessonsServices', 'Helper']

function GradesServices($cordovaSQLite, Helper) {

  var grade;

  function setGrade(gradeParam){
    grade = gradeParam;
  }

  function getGrade() {
    return grade;
  }

  function all() {
    var query = "SELECT * FROM grades";
    var grades = $cordovaSQLite.execute(db, query, []).then(function(res) {
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
    getGrade: getGrade
  }

}
