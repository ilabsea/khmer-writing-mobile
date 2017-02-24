angular.module('app')

.controller('LessonsCtrl', function ($scope, GradesServices, LessonsServices, $ionicHistory, $state, MethodsServices) {
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
  vm.range = range;

  setLessons();

  function setLessonsBuilt() {
    vm.lessonsBuilt = [];
    for(var i = 0; i<lessons.length; i++){
      var lesson = lessons[i];
      if(Math.floor(i / 6) == index ){
        vm.lessonsBuilt.push(lesson);
      }
    }
  }

  function range(min, max, step) {
    step = step || 1;
    var input = [];
    for (var i = min; i <= max; i += step) {
      input.push(i);
    }
    return input;
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
    LessonsServices.getByGradeIdApi(currentGrade.grade_id_api).then(function (result) {
      lessons = result;
      vm.totalLessons = lessons.length;
      setLessonsBuilt();
    });
  }

  function setLesson(lessonParam) {
    console.log('lessonParam : ', lessonParam);
    LessonsServices.setLesson(lessonParam);
    MethodsServices.resetTracks({});
    $state.go('methods');
  }
})
