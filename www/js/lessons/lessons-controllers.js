angular.module('app')

.controller('LessonsCtrl', function ($scope, ClassesServices, LessonsServices) {
  vm = $scope, currentClass = ClassesServices.getClass();

  vm.lessons = [];
  vm.setLesson = setLesson;

  setLessons();

  function setLessons() {
    LessonsServices.getByClassId(currentClass.id).then(function (lessons) {
      console.log('lessons : ', lessons);
      vm.lessons = lessons;
    });
  }

  function setLesson(lessonParam) {
    LessonsServices.setLesson(lessonParam);
  }
})
