angular.module('app')
.factory("LessonsServices", LessonsServices)

LessonsServices.$inject = ['$cordovaSQLite', 'SettingsServices', 'ContentsServices']

function LessonsServices($cordovaSQLite, SettingsServices, ContentsServices) {
  var lesson;

  function setLesson(lessonParam) {
    lesson = lessonParam;
  }

  function getLesson() {
    return lesson;
  }

  function insert(lessons){
    var i = 0,
        l = lessons.length;
    for(; i < l ; i++){
      var lesson = lessons[i];
      var query = "INSERT INTO lessons (name, grade_id_api, lesson_id_api, " +
                  " created_at, updated_at, khmer_numeric, background, star, tracks) " +
                  " VALUES (? , ? , ?, ?, ?, ?, ?, ?, ?) ";
      var lessonData = [lesson.name, lesson.grade_id,lesson.id, lesson.created_at,
                        lesson.updated_at, lesson.khmer_numeric, lesson.background,
                        0, ""];
      $cordovaSQLite.execute(db, query, lessonData);
      SettingsServices.downloadContents(lesson.id).then(function(contents){
        ContentsServices.insert(contents);
      });
    }
  }

  function getByGradeIdApi(gradeIdApi) {
    var query = "SELECT * FROM lessons WHERE grade_id_api = ?";
    var lessons = $cordovaSQLite.execute(db, query, [gradeIdApi]).then(function(res) {
      var result = [];
      if(res.rows.length > 0){
        var i = 0,
            l = res.rows.length
        for(;i<l;i++){
          result.push(res.rows.item(i));
        }
      }
      return result;
    }, function(e){
      console.log('e : ', e);
    });

    return lessons;
  }

  function updateStarTracks(star, tracks){
    updateCurrentLesson(star, tracks);

    var query = "UPDATE lessons SET star=?, tracks=? WHERE id=?" ;
    var lessonUpdate = [star, tracks, lesson.id];
    $cordovaSQLite.execute(db, query, lessonUpdate);
  }

  function updateCurrentLesson(star, tracks) {
    lesson.star = star;
    lesson.tracks = tracks;
  }

  return{
    getByGradeIdApi : getByGradeIdApi,
    setLesson: setLesson,
    getLesson: getLesson,
    insert: insert,
    updateStarTracks: updateStarTracks
  }

}
