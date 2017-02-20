angular.module('app')
.factory("MethodsServices", MethodsServices)

MethodsServices.$inject = ['$cordovaSQLite']

function MethodsServices($cordovaSQLite) {
  var method;

  function setMethod(methodParam) {
    method = methodParam;
  }

  function getMethod() {
    return method;
  }

  function insert(methods) {
    var i = 0,
        l = methods.length;
    for(; i < l ; i++){
      var method = methods[i];
      var query = "INSERT INTO writing_methods (writing_method_id_api, name, created_at, updated_at, code, icon) VALUES (?, ? , ?, ? , ? , ?) ";
      var methodData = [method.id, method.name, method.created_at, method.updated_at, method.code, method.icon];
      $cordovaSQLite.execute(db, query, methodData);
    }
  }

  function getMethodsByLessonId(lessonIdApi) {
    var query = "SELECT DISTINCT writing_methods.* FROM writing_methods JOIN contents WHERE writing_methods.writing_method_id_api = contents.writing_method_id_api AND contents.lesson_id_api=?";
    var methods = $cordovaSQLite.execute(db, query, [lessonIdApi]).then(function(res) {
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
    getMethod: getMethod,
    insert: insert
  }

}
