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
    MethodsServices.getMethodsByLessonId(currentLesson.id).then(function(methods) {
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
    TracksServices.get(currentLesson.id, UsersServices.getCurrentUser().id).then(function(tracks){
      tracks = tracks ? tracks : "";
      TracksServices.setCurrentTracks(tracks);
    });
  }

  $ionicPlatform.ready(function() {
    setMethods();
    setTracks();
  });

})
