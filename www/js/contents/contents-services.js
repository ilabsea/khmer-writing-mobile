angular.module('app')

.factory("ContentsServices", ContentsServices)

ContentsServices.$inject = ['$cordovaSQLite', '$rootScope', '$cordovaFileTransfer', 'ENDPOINT', '$state', 'SettingsServices'];

function ContentsServices($cordovaSQLite, $rootScope, $cordovaFileTransfer, ENDPOINT, $state, SettingsServices) {

  function getByLessonIdMethodId(lessonIdApi, methodIdApi) {
    var query = "SELECT * FROM contents WHERE lesson_id_api = ? AND writing_method_id_api = ?";
    var contents = $cordovaSQLite.execute(db, query, [lessonIdApi, methodIdApi]).then(function(res) {
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

      var imageClueName = "", audioName = "" , imageName  = "", imageAnswerName= "";
      if(content["image_clue"]["url"]){
        imageClueName = content["image_clue"]["url"].split("/").pop();
        mediaTransfer(content, content["image_clue"]["url"]);
      }
      if(content["audio"]["url"]){
        audioName = content["audio"]["url"].split("/").pop();
        mediaTransfer(content, content["audio"]["url"]);
      }
      if(content["image"]["url"]){
        imageName = content["image"]["url"].split("/").pop();
        mediaTransfer(content, content["image"]["url"]);
      }
      if(content["image_answer"]["url"]){
        imageAnswerName = content["image_answer"]["url"].split("/").pop();
        mediaTransfer(content, content["image_answer"]["url"]);
      }
      var contentData = [content.content, content.id, content.writing_method_id, content.lesson_id, content.created_at,
                        content.updated_at, content.content_in_khmer, imageClueName, audioName, imageName, imageAnswerName];
      $cordovaSQLite.execute(db, query, contentData).then(function(res) {
        $state.go('grades');
      }, function(err){
        console.log('err in inserting contents : ', err);
      });
    }
  }

  function mediaTransfer(content, mediaUrl){
    var path = cordova.file.applicationStorageDirectory +  "lesson" + content.lesson_id + "/method" + content.writing_method_id + "/";
    var target = path + mediaUrl.split("/").pop();
    $cordovaFileTransfer.download(ENDPOINT.url + mediaUrl, target, {}, true).then(function (result) {
      console.log('success targetImage : ', target);
    }, function (error) {
          console.log('error targetImageClue: ', error);;
    }, function (progress) {
      c = (progress.loaded / progress.total) * 100;
      console.log('c : ', c);
    });
  }

  return {
    getByLessonIdMethodId: getByLessonIdMethodId,
    insert: insert
  }
}
