angular.module('app')
.controller('HowToWriteCtrl', function ($scope, LessonServices) {
  var vm = $scope;
  var canvas = document.getElementById('drawingCanvas');
  var signaturePad = new SignaturePad(canvas, {
                        minWidth: 2,
                        maxWidth: 5,
                        penColor: "rgb(66, 133, 244)"
                    });
  var index = 0;
  vm.imageName = LessonServices.getContent(1, 1, index);

  vm.isDisabledBack= function() {
    if(index == 0)
      return true;
  }

  vm.isDisabledNext = function() {
    if(index == LessonServices.all().length - 1)
      return true;
  }

  vm.goNext = function() {
    index++;
    vm.imageName = LessonServices.getContent(1, 1, index);
    signaturePad.clear();
  }

  vm.goBack = function() {
    index--;
    vm.imageName = LessonServices.getContent(1, 1, index);
    signaturePad.clear();
  }

  vm.redraw = function () {
    signaturePad.clear();
  }
})
