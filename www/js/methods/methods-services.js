angular.module('app')
.factory("MethodsServices", MethodsServices)

MethodsServices.$inject = ['$cordovaSQLite', 'Helper']

function MethodsServices($cordovaSQLite, Helper) {

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
      return Helper.generateResult(res);
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
