angular.module('app')

.controller('LessonsCtrl', function ($scope, GradesServices, LessonsServices) {
  vm = $scope, currentClass = {};

  vm.lessons = [];
  vm.setLesson = setLesson;

  setLessons();

  function setLessons() {
    currentClass = GradesServices.getGrade();
    console.log('currentClass : ', currentClass);
    LessonsServices.getByClassId(currentClass.id).then(function (lessons) {
      console.log('lessons : ', lessons);
      vm.lessons = lessons;
    });
  }

  function setLesson(lessonParam) {
    LessonsServices.setLesson(lessonParam);
  }
})
