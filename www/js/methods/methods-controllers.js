angular.module('app')

.controller("MethodsCtrl", function($stateParams, $scope, MethodsServices, LessonsServices, $state){
  vm = $scope;
  var currentLesson = LessonsServices.getLesson();

  vm.methods = [];
  vm.setMethod = setMethod;
  vm.lessonTitle = currentLesson.name;
  vm.lessonKhmerNumeric = currentLesson.khmer_numeric;
  vm.goBack = goBack;

  setMethods();

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

})
