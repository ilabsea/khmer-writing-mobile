angular.module('app')

.controller("MethodsCtrl", function($stateParams, $scope, MethodsServices,
            LessonsServices, $state, $ionicPlatform, UsersServices, TracksServices){
  vm = $scope;
  var currentLesson = LessonsServices.getLesson();

  vm.methods = [];
  vm.setMethod = setMethod;
  vm.lessonTitle = currentLesson.name;
  vm.lessonKhmerNumeric = currentLesson.khmer_numeric;
  vm.goBack = goBack;

  function setMethods() {
    MethodsServices.getMethodsByLessonId(currentLesson.lesson_id_api).then(function(methods) {
      vm.methods = methods;
    });
  }

  function setMethod(methodParam) {
    MethodsServices.setMethod(methodParam);
  }

  function goBack() {
    $state.go('lessons');
  }

  function setTracks(){
    console.log('UsersServices.getUsers() : ', UsersServices.getCurrentUser());
    TracksServices.get(currentLesson.id, UsersServices.getCurrentUser().id).then(function(tracks){
      console.log('tracks in method controller : ', tracks);
      tracks = tracks ? tracks : "";
      TracksServices.setCurrentTracks(tracks);
    });
  }

  $ionicPlatform.ready(function() {
    setMethods();
    setTracks();
  });

})
