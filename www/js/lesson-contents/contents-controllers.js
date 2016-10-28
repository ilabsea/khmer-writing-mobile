angular.module('app')

.controller("ContentsCtrl", function($scope, GradesServices, LessonsServices, ContentsServices, MethodsServices, $ionicHistory){
  var vm = $scope;
  var currentGrade = GradesServices.getGrade();
  var currentLesson = LessonsServices.getLesson();
  var currentMethod = MethodsServices.getMethod();

  vm.gradeCode = currentGrade.code;
  vm.lessonCode = currentLesson.code;
  vm.methodCode = currentMethod.code;

  var canvas = document.getElementById('drawingCanvas');
  var signaturePad = new SignaturePad(canvas, {
                        minWidth: 2,
                        maxWidth: 5,
                        penColor: "rgb(66, 133, 244)"
                    });
  var index = 0;

  vm.contents = [];
  vm.goBack = goBack;

  setContents();

  function setContents() {
    ContentsServices.getByLessonIdMethodId(currentLesson.id, currentMethod.id).then(function (contents) {
      vm.contents = contents;
      console.log('vm.contents : ', vm.contents);

      vm.content = vm.contents[index].content;
      console.log('vm.content : ', vm.content);
    });
  }

  function goBack() {
    $ionicHistory.goBack();
  }

  vm.isDisabledPrevious= function() {
    if(index == 0)
      return true;
  }

  vm.isDisabledNext = function() {
    if(index == vm.contents.length - 1)
      return true;
  }

  vm.next = function() {
    index++;
    vm.content = vm.contents[index].content;
    signaturePad.clear();
  }

  vm.previous = function() {
    index--;
    vm.content = vm.contents[index].content;
    signaturePad.clear();
  }

  vm.redraw = function () {
    signaturePad.clear();
  }

})
