angular.module('app')
.factory("TracksServices", TracksServices)

TracksServices.$inject = ['$cordovaSQLite', 'LessonsServices', 'UsersServices', 'Helper']

function TracksServices($cordovaSQLite, LessonsServices, UsersServices, Helper) {
  // userTracks = {'methodCode' : {"index": "", "number_contents": "", "content_id": ""} , 'methodCode' : {}};
  var userTracks;

  function insert(lessonId, userId, tracks, star){
    var query = "INSERT INTO tracks (lesson_id , user_id, tracks, star) VALUES (? , ? , ? , ?)" ;
    var data = [lessonId, userId, tracks, star];
    $cordovaSQLite.execute(db, query, data);
  }

  function update(tracks, star) {
    var query = "UPDATE tracks SET star=?, tracks=? WHERE lesson_id=? AND user_id=?" ;
    var tracksData = [star, tracks, LessonsServices.getLesson().id, UsersServices.getCurrentUser().id];
    $cordovaSQLite.execute(db, query, tracksData);
  }

  function get(lessonId, userId) {
    var query = "SELECT * FROM tracks WHERE lesson_id=? AND user_id=?";
    return $cordovaSQLite.execute(db, query, [lessonId, userId]).then(function(res){
      return res.rows.item(0);
    });
  }

  function setCurrentTracks(tracksParams) {
    userTracks = tracksParams;
  }

  function getCurrentTrack() {
    return userTracks;
  }

  function storeTrack(track) {
    if(userTracks["id"]){
      tracks = userTracks["tracks"] ? angular.fromJson(userTracks["tracks"]) : {};
      for(var key in track){
        tracks[key] = track[key];
      }
      var star = getStar(tracks);
      update(tracks, star);
    }else{
      var star = getStar(track);
      insert(LessonsServices.getLesson().id, UsersServices.getCurrentUser().id, track, star);
    }
  }

  function getStar(tracks) {
    var star = 0;
    if(tracks["2"]){
      var percentageUserPlay = Math.round(tracks[2]["index"]/tracks[2]["number_contents"] *100);
      if( percentageUserPlay == 100){
        star = 3;
      }else if(percentageUserPlay >= 60){
        star = 2;
      }else if(percentageUserPlay >= 30){
        star = 1;
      }
    }
    return star;
  }

  function getByUserId(userId) {
    var query = "SELECT * FROM tracks WHERE user_id=?";
    tracksRes = $cordovaSQLite.execute(db, query, [userId]).then(function(res){
      return Helper.generateResult(res);
    }, function(e){
      console.log('e : ', e);
    });

    return tracksRes;
  }

  return {
    insert: insert,
    update: update,
    get: get,
    getCurrentTrack: getCurrentTrack,
    setCurrentTracks: setCurrentTracks,
    storeTrack: storeTrack,
    getByUserId: getByUserId
  }
}
