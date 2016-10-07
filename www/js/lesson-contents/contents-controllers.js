angular.module('app')

.controller("ContentsCtrl", function($scope, ClassesServices, LessonsServices, ContentsServices){
  vm = $scope;

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
    console.log('ClassesServices.getClassId() : ', ClassesServices.getClass());
    console.log('LessonsServices.getClassId() : ', LessonsServices.getLesson());
    ContentsServices.getByClassIdLessonId(ClassesServices.getClass().id, LessonsServices.getLesson().id).then(function (content) {
      console.log('content : ', content.contents);
      console.log('type of content : ', typeof content.contents);
      // vm.content = content.contents;
    });
  }

  // vm.isDisabledBack= function() {
  //   if(index == 0)
  //     return true;
  // }
  //
  // vm.isDisabledNext = function() {
  //   if(index == LessonServices.all().length - 1)
  //     return true;
  // }
  //
  // vm.goNext = function() {
  //   index++;
  //   vm.imageName = LessonServices.getContent(1, 1, index);
  //   signaturePad.clear();
  // }
  //
  // vm.goBack = function() {
  //   index--;
  //   vm.imageName = LessonServices.getContent(1, 1, index);
  //   signaturePad.clear();
  // }

  vm.redraw = function () {
    signaturePad.clear();
  }

})
