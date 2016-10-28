angular.module('app')

.controller('LessonsCtrl', function ($scope, GradesServices, LessonsServices, $ionicHistory, $state) {
  var vm = $scope, currentGrade = GradesServices.getGrade();

  var lesson = [];
  var index = 0;

  vm.lessonsBuilt = [];
  vm.next = next;
  vm.setLesson = setLesson;
  vm.gradeName = currentGrade.name;
  vm.goBack = goBack;

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
    if(Math.floor(lessons.length / 6) > index){
      index++;
    }else{
      index = 0;
    }
    setLessonsBuilt();
  }

  function goBack() {
    console.log('goBack');
    $ionicHistory.goBack();
  }

  function setLessons() {
    LessonsServices.getByClassId(currentGrade.id).then(function (result) {
      lessons = result;

      setLessonsBuilt();
    });
  }

  function setLesson(lessonParam) {
    LessonsServices.setLesson(lessonParam);
    $state.go('methods');
  }
})
