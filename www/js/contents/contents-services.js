angular.module('app')

.factory("ContentsServices", ContentsServices)

ContentsServices.$inject = ['$cordovaSQLite'];

function ContentsServices($cordovaSQLite) {

  function getByLessonIdMethodId(lessonId, methodId) {
    var query = "SELECT * FROM contents WHERE lesson_id = ? AND writing_method_id = ?";
    var contents = $cordovaSQLite.execute(db, query, lessonId, methodId).then(function(res) {
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
    var i = 0,
        l = contents.length;
    for(; i < l ; i++){
      var content = contents[i];
      var query = "INSERT INTO contents (content, content_id_api, writing_method_id_api, " +
                  "lesson_id_api, created_at, updated_at, content_in_khmer," +
                  " image_clue, audio, image, image_answer) VALUES (? , ? , ? , ?, ?, ?, ? , ? , ?, ? , ?) ";
      var contentData = [content.content, content.id, content.writing_method_id, content.lesson_id, content.created_at,
                        content.updated_at, content.content_in_khmer, content.image_clue, content.audio, content.image, content.image_answer];
      $cordovaSQLite.execute(db, query, contentData).then(function(res) {
        console.log('res : ', res);

      }, function(err){
        console.log('err in inserting contents : ', err);
      });
    }
  }

  return {
    getByLessonIdMethodId: getByLessonIdMethodId,
    insert: insert
  }
}
