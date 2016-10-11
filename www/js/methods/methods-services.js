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

  function all() {
    var query = "SELECT * FROM writing_methods";
    console.log('query : ', query);
    var methods = $cordovaSQLite.execute(db, query).then(function(res) {
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

    return methods;
  }

  return{
    all: all,
    setMethod: setMethod,
    getMethod: getMethod
  }

}
