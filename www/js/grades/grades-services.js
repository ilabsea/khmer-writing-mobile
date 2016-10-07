angular.module('app')

.factory('GradesServices', GradesServices)

GradesServices.$inject = ['$cordovaSQLite']

function GradesServices($cordovaSQLite) {

  var grade;

  function setGrade(gradeParam){
    grade = gradeParam;
  }

  function getGrade() {
    return grade;
  }

  function all() {
    var query = "SELECT * FROM grades";
    console.log('query : ', query);
    var grades = $cordovaSQLite.execute(db, query).then(function(res) {
      console.log("res all : ", res)
      var result = [];
      if(res.rows.length > 0){
        var i = 0,
            l = res.rows.length
        for(;i<l;i++){
          result.push(res.rows.item(i));
        }
      }
      console.log('result db all ClassesServices: ', result);
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
