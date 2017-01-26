angular.module('app')

.controller("MethodsCtrl", function($stateParams, $scope, MethodsServices, LessonsServices, ContentsServices, $state){
  vm = $scope;
  var currentLesson = LessonsServices.getLesson();

  vm.methods = [];
  vm.setMethod = setMethod;
  vm.lessonTitle = currentLesson.name;
  vm.lessonKhmerNumeric = currentLesson.khmer_numeric;
  vm.goBack = goBack;

  setMethods();

  function setMethods() {
    MethodsServices.getAllMethods().then(function(methods) {
      vm.methods = methods;
      console.log('methods : ', methods);
      var i = 0,
          l = methods.length;
      for ( ; i < l ; i++){
        ContentsServices.fetchByLessonIdMethodId(currentLesson.id, methods[i].id);
      }

    });

    // MethodsServices.getMethodsByLessonId(currentLesson.id).then(function(methods) {
    //   vm.methods = methods;
    // });
  }

  function setMethod(methodParam) {
    MethodsServices.setMethod(methodParam);
  }

  function goBack() {
    $state.go('lessons');
  }

})
