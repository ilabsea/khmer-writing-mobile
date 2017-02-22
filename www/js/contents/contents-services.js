angular.module('app')

.factory("ContentsServices", ContentsServices)

ContentsServices.$inject = ['$cordovaSQLite', '$rootScope', '$cordovaFileTransfer', 'ENDPOINT'];

function ContentsServices($cordovaSQLite, $rootScope, $cordovaFileTransfer, ENDPOINT) {

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

      if(content["image_clue"]["url"])
        imageClueName = content["image_clue"]["url"].split("/").pop();
      if(content["audio"]["url"])
        audioName = content["audio"]["url"].split("/").pop();
      if(content["image"]["url"])
        imageName = content["image"]["url"].split("/").pop();
      if(content["image_answer"]["url"])
        imageAnswerName = content["image_answer"]["url"].split("/").pop();

      var contentData = [content.content, content.id, content.writing_method_id, content.lesson_id, content.created_at,
                        content.updated_at, content.content_in_khmer, imageClueName, audioName, imageName, imageAnswerName];

      if(imageClueName){
        var targetImageClue = cordova.file.applicationStorageDirectory +  "lesson" + content.lesson_id + "/method" + content.writing_method_id + "/" + imageClueName;
        $cordovaFileTransfer.download(ENDPOINT.url + content["image_clue"]["url"], targetImageClue, {}, true).then(function (result) {
          console.log('success targetImageClue : ', targetImageClue);
        }, function (error) {
          console.log('error targetImageClue: ', error);;
        }, function (progress) {
          a = (progress.loaded / progress.total) * 100;
          console.log('a : ', a);
        });
      }
      if(audioName){
        var targetAudio = cordova.file.applicationStorageDirectory +  "lesson" + content.lesson_id + "/method" + content.writing_method_id + "/" + audioName;
        $cordovaFileTransfer.download(ENDPOINT.url + content["audio"]["url"], targetAudio, {}, true).then(function (result) {
          console.log('success audio : ', targetAudio);
        }, function (error) {
          console.log('error audio: ', error);;
        }, function (progress) {
          b = (progress.loaded / progress.total) * 100;
          console.log('b : ', b);
        });
      }

      if(imageName){
        var targetImage = cordova.file.applicationStorageDirectory +  "lesson" + content.lesson_id + "/method" + content.writing_method_id + "/" + imageName;
        $cordovaFileTransfer.download(ENDPOINT.url + content["image"]["url"], targetImage, {}, true).then(function (result) {
          console.log('success targetImage : ', targetImage);
        }, function (error) {
              console.log('error targetImageClue: ', error);;
        }, function (progress) {
          c = (progress.loaded / progress.total) * 100;
          console.log('c : ', c);
        });
      }
      if(imageAnswerName){
        var targetImageAnswer = cordova.file.applicationStorageDirectory +  "lesson" + content.lesson_id + "/method" + content.writing_method_id + "/" + imageAnswerName;
        $cordovaFileTransfer.download(ENDPOINT.url + content["image_answer"]["url"], targetImageAnswer, {}, true).then(function (result) {
          console.log('success targetImageAnswer  : ', targetImageAnswer);
        }, function (error) {
              console.log('error targetImageAnswer: ', error);;
        }, function (progress) {
          d = (progress.loaded / progress.total) * 100;
          console.log('d : ', d);
        });
      }

      $cordovaSQLite.execute(db, query, contentData).then(function(res) {
        $rootScope.hideSpinner();
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
