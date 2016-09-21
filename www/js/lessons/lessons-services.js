angular.module('app')
.factory("LessonsServices", LessonsServices)

LessonsServices.$inject = []

function LessonsServices() {
  var lessonsClass1 = [{id: 1, name: "១"}, {id: 2, name: "២"}, {id: 3, name: "៣"}, {id: 4, name: "៤"},
                       {id: 5, name: "៥"}, {id: 6, name: "៦"}, {id: 7, name: "៧"}, {id: 8, name: "៨"},
                       {id: 9, name: "៩"}, {id: 10, name: "១០"}, {id: 11, name: "១១"}, {id: 12, name: "១២"},
                       {id: 13, name: "១៣"}, {id: 14, name: "១៤"}, {id: 15, name: "១៥"}, {id: 16, name: "១៦"},
                       {id: 17, name: "១៧"}, {id: 18, name: "១៨"}, {id: 19, name: "១៩"}, {id: 20, name: "២០"},
                       {id: 21, name: "២១"}, {id: 22, name: "២២"}, {id: 23, name: "២៣"}, {id: 24, name: "២៤"},
                       {id: 25, name: "២៥"}, {id: 26, name: "២៦"}, {id: 27, name: "២៧"}, {id: 28, name: "២៨"},
                       {id: 29, name: "២៩"}, {id: 30, name: "៣០"}, {id: 31, name: "៣១"}, {id: 32, name: "៣២"},
                       {id: 33, name: "៣៣"}]

  var lessonsClass2 = [{id: 1, name: "១"}, {id: 2, name: "២"}, {id: 3, name: "៣"}, {id: 4, name: "៤"},
                       {id: 5, name: "៥"}, {id: 6, name: "៦"}, {id: 7, name: "៧"}, {id: 8, name: "៨"},
                       {id: 9, name: "៩"}, {id: 10, name: "១០"}, {id: 11, name: "១១"}, {id: 12, name: "១២"},
                       {id: 13, name: "១៣"}, {id: 14, name: "១៤"}, {id: 15, name: "១៥"}, {id: 16, name: "១៦"},
                       {id: 17, name: "១៧"}, {id: 18, name: "១៨"}, {id: 19, name: "១៩"}, {id: 20, name: "២០"},
                       {id: 21, name: "២១"}, {id: 22, name: "២២"}, {id: 23, name: "២៣"}, {id: 24, name: "២៤"},
                       {id: 25, name: "២៥"}, {id: 26, name: "២៦"}, {id: 27, name: "២៧"}, {id: 28, name: "២៨"},
                       {id: 29, name: "២៩"}, {id: 30, name: "៣០"}, {id: 31, name: "៣១"}, {id: 32, name: "៣២"}]

  var lessonsClass3 = [{id: 1, name: "១"}, {id: 2, name: "២"}, {id: 3, name: "៣"}, {id: 4, name: "៤"},
                       {id: 5, name: "៥"}, {id: 6, name: "៦"}, {id: 7, name: "៧"}, {id: 8, name: "៨"},
                       {id: 9, name: "៩"}, {id: 10, name: "១០"}, {id: 11, name: "១១"}, {id: 12, name: "១២"},
                       {id: 13, name: "១៣"}, {id: 14, name: "១៤"}, {id: 15, name: "១៥"}, {id: 16, name: "១៦"},
                       {id: 17, name: "១៧"}, {id: 18, name: "១៨"}, {id: 19, name: "១៩"}, {id: 20, name: "២០"},
                       {id: 21, name: "២១"}, {id: 22, name: "២២"}, {id: 23, name: "២៣"}, {id: 24, name: "២៤"},
                       {id: 25, name: "២៥"}, {id: 26, name: "២៦"}, {id: 27, name: "២៧"}, {id: 28, name: "២៨"},
                       {id: 29, name: "២៩"}, {id: 30, name: "៣០"}, {id: 31, name: "៣១"}, {id: 32, name: "៣២"}]

  var lessons = {1 : lessonsClass1 , 2: lessonsClass2, 3: lessonsClass3};
  var lessonId ;

  function setLessonId(id) {
    lessonId = id;
  }

  function getLessonId(id) {
    return lessonId;
  }

  function getByClassId(classId) {
    return lessons[classId];
  }

  return{
    getByClassId : getByClassId,
    getLessonId: getLessonId,
    setLessonId: setLessonId
  }

}
