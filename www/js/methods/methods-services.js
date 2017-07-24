angular.module('app')
.factory("MethodsServices", MethodsServices)

MethodsServices.$inject = ['$cordovaSQLite', 'LessonsServices']

function MethodsServices($cordovaSQLite, LessonsServices) {

  var method;

  function setMethod(methodParam) {
    method = methodParam;
  }

  function getMethod() {
    return method;
  }

  function getMethodsByLessonId(lessonId) {
    var query = "SELECT DISTINCT writing_methods.* FROM writing_methods JOIN "
                + "contents WHERE " +
                "writing_methods.id = contents.writing_method_id" +
                " AND contents.lesson_id=?";
    var methods = $cordovaSQLite.execute(db, query, [lessonId]).then(function(res) {
      var result = [];
      if(res.rows.length > 0){
        var i = 0,
            l = res.rows.length
        for(;i<l;i++){
          result.push(res.rows.item(i));
        }
      }
      return result;
    }, function(error){
      console.log('errro : ', error);
    });

    return methods;
  }

  return{
    getMethodsByLessonId: getMethodsByLessonId,
    setMethod: setMethod,
    getMethod: getMethod
  }

}
