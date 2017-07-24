angular.module('app')

.controller('LessonsCtrl', function ($scope, GradesServices, LessonsServices,
            $ionicHistory, $state, MethodsServices, $ionicPlatform, UsersServices, TracksServices) {
  var vm = $scope, currentGrade = GradesServices.getGrade();

  var lessons = [];
  var tracks = [];
  var index = 0;

  vm.lessonsBuilt = [];
  vm.next = next;
  vm.previous = previous;
  vm.setLesson = setLesson;
  vm.gradeName = currentGrade.name;
  vm.goBack = goBack;
  vm.totalLessons;
  vm.range = range;
  vm.totalStarLessons = 0;

  function setLessonsBuilt() {
    vm.totalStarLessons = 0;
    vm.lessonsBuilt = [];
    for(var i = 0; i < lessons.length; i++){
      var lesson = lessons[i];
      for(var j = 0; j < tracks.length ; j++){
        if(tracks[j]["lesson_id"] == lesson.id){
          lesson.star = tracks[j].star;
        }
      }
      if(lesson.star)
        vm.totalStarLessons = vm.totalStarLessons + lesson.star;
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
    LessonsServices.getByGradeId(currentGrade.id).then(function (result) {
      lessons = result;
      vm.totalLessons = lessons.length * 3;
      TracksServices.getByUserId(UsersServices.getCurrentUser().id).then(function(tracksRes){
        tracks = tracksRes;
        setLessonsBuilt();
      });
    });
  }

  function setLesson(lessonParam) {
    LessonsServices.setLesson(lessonParam);
    $state.go('methods');
  }

  vm.$on('$stateChangeSuccess', function(event, toState) {
    if (toState.url== "/lessons") {
      setLessons();
    }
  });

})
