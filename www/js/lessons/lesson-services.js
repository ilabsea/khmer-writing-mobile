angular.module('app')

.factory("LessonServices", LessonServices)

LessonServices.$inject = [];

function LessonServices() {
  var lesson = {
    class_id: 1,
    lesson_id: 1,
    content: ["horizontal-line", "vertical-up-line", "vertical-down-line", "one-mountain", "two-mountains",
              "w-shape-disconnect", "w-shape-connect" , "m-shape-disconnect", "m-shape-connect", "three-corners-up",
              "three-corners-down", "half-circle-down", "half-circle-up", "two-half-circle"]
  }

  return {
    getContent: function(class_id, lesson_id, contentIndex) {
      return lesson.content[contentIndex];
    },
    all: function(){
      return lesson.content;
    }
  }
}
