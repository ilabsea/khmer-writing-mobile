angular.module('app')

.controller("MethodsCtrl", function($stateParams, $scope, MethodsServices, LessonsServices, $ionicHistory){
  vm = $scope;
  var cureentLesson = LessonsServices.getLesson();

  vm.methods = [];
  vm.setMethod = setMethod;
  vm.lessonTitle = cureentLesson.name;
  vm.lessonKhmerNumeric = cureentLesson.khmer_numeric;
  vm.goBack = goBack;

  setMethods();

  function setMethods() {
    MethodsServices.all().then(function(methods) {
      vm.methods = methods;
    });
  }

  function setMethod(methodParam) {
    MethodsServices.setMethod(methodParam);
  }

  function goBack() {
    $ionicHistory.goBack();
  }

})
