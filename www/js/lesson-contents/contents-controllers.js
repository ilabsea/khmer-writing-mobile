angular.module('app')

.controller("ContentsCtrl", function($scope, GradesServices, LessonsServices, ContentsServices, MethodsServices){
  var vm = $scope;
  var currentGrade = GradesServices.getGrade();
  var currentLesson = LessonsServices.getLesson();
  var currentMethod = MethodsServices.getMethod();

  vm.gradeCode = currentGrade.code;
  console.log('currentGrade : ', currentGrade);
  vm.lessonCode = currentLesson.code;

  var canvas = document.getElementById('drawingCanvas');
  var signaturePad = new SignaturePad(canvas, {
                        minWidth: 2,
                        maxWidth: 5,
                        penColor: "rgb(66, 133, 244)"
                    });
  var index = 0;

  vm.contents = [];

  setContents();

  function setContents() {
    ContentsServices.getByLessonIdMethodId(currentLesson.id, currentMethod.id).then(function (contents) {
      vm.contents = contents;
      vm.content = vm.contents[index].content;
    });
  }

  vm.isDisabledBack= function() {
    if(index == 0)
      return true;
  }

  vm.isDisabledNext = function() {
    if(index == vm.contents.length - 1)
      return true;
  }

  vm.goNext = function() {
    index++;
    vm.content = vm.contents[index].content;
    signaturePad.clear();
  }

  vm.goBack = function() {
    index--;
    vm.content = vm.contents[index].content;
    signaturePad.clear();
  }

  vm.redraw = function () {
    signaturePad.clear();
  }

})
