angular.module('app')

.factory("ContentsServices", ContentsServices)

ContentsServices.$inject = ['$cordovaSQLite' , 'ENDPOINT', '$http'];

function ContentsServices($cordovaSQLite, ENDPOINT, $http) {

  function getByLessonIdMethodId(lessonId, methodId) {
    var query = "SELECT * FROM contents WHERE lesson_id = ? AND writing_method_id = ?";
    var contents = $cordovaSQLite.execute(db, query, [lessonId, methodId]).then(function(res) {
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

    return contents;
  }

  function insert(contents) {
    var contentSQL = "INSERT INTO contents (content, content_in_khmer, clue, audio, image, writing_method_id, lesson_id) VALUES (?, ?, ?, ?, ? , ? , ?)";
    var i = 0,
        l = contents.length;
    for( ; i < l ; i++ ){
      var content = contents[i];
      var contentData = [content.content, content.content_in_khmer, content.clue, content.audio, content.image, content.writing_method_id, content.lesson_id];
      $cordovaSQLite.execute(db, contentSQL, contentData);
    }

  }

  function fetchByLessonIdMethodId(lessonId, methodId) {
    $http.get(ENDPOINT.url + "/lessons/" + lessonId + "/writing_methods/" + methodId + "/contents.json")
      .success(function(contents) {
        insert(contents);
      })
      .error(function(error){
      });
  }

  return {
    getByLessonIdMethodId: getByLessonIdMethodId,
    fetchByLessonIdMethodId: fetchByLessonIdMethodId
  }
}
