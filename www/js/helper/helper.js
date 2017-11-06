angular.module('app')

.factory('Helper', Helper)

Helper.$inject = []

function Helper() {

  function generateResult(res) {
    var result = [];
    if(res.rows.length > 0){
      var i = 0,
          l = res.rows.length
      for(;i<l;i++){
        result.push(res.rows.item(i));
      }
    }
    return result;
  }

  return {
    generateResult: generateResult
  }
}
