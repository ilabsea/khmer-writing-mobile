angular.module('app')

.controller('LessonsCtrl', function ($scope, GradesServices, LessonsServices, $ionicHistory, $state) {
  var vm = $scope, currentGrade = GradesServices.getGrade();

  var lesson = [];
  var index = 0;

  vm.lessonsBuilt = [];
  vm.next = next;
  vm.previous = previous;
  vm.setLesson = setLesson;
  vm.gradeName = currentGrade.name;
  vm.goBack = goBack;
  vm.totalLessons;

  setLessons();

  function setLessonsBuilt() {
    vm.lessonsBuilt = [];
    for(var i = 0; i<lessons.length; i++){
      var lesson = lessons[i];
      if(Math.floor((lesson.code - 1) / 6) == index ){
        vm.lessonsBuilt.push(lesson);
      }
    }
  }

  function next() {
    if( Math.floor(lessons.length / 6) > index ){
      index++;
    } else {
      index = 0;
    }
    setLessonsBuilt();
  }

  function previous() {
    if( index <= Math.floor(lessons.length / 6) && index > 0){
      index--;
    } else if(index == 0) {
      index = Math.floor(lessons.length / 6);
    }
    setLessonsBuilt();
  }

  function goBack() {
    $state.go('grades')
  }

  function setLessons() {
    LessonsServices.getByClassId(currentGrade.id).then(function (result) {
      lessons = result;
      vm.totalLessons = lessons.length;
      setLessonsBuilt();
    });
  }

  function setLesson(lessonParam) {
    LessonsServices.setLesson(lessonParam);
    $state.go('methods');
  }
})
