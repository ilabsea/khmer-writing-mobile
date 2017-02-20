angular.module('app')

.controller("ContentsCtrl", function($scope, GradesServices, LessonsServices, ContentsServices, MethodsServices, $state, $cordovaMedia, BrushesServices, $ionicPlatform, $ionicPopup){
  var vm = $scope, canvas, signaturePad, brushSize, brushColor;
  var currentGrade = GradesServices.getGrade();
  var currentLesson = LessonsServices.getLesson();
  var currentMethod = MethodsServices.getMethod();

  vm.currentLesson = currentLesson;

  vm.gradeCode = currentGrade.code;
  vm.lessonCode = currentLesson.code;
  vm.methodCode = currentMethod.code;

  var index = 0;

  vm.contents = [];
  vm.goBack = goBack;
  vm.playSound = playSound;
  vm.playing = false;

  setContents();


  function setContents() {
    ContentsServices.getByLessonIdMethodId(currentLesson.lesson_id_api, currentMethod.writing_method_id_api).then(function (contents) {
      vm.contents = contents;
      vm.content = vm.contents[index].content;
      canvas = document.getElementById('drawingCanvas');
      setBrushSizeAndColor();

      if(canvas){
        signaturePad = new SignaturePad(canvas, {
          maxWidth: brushSize,
          penColor: brushColor
        });
      }
    });
  }

  function playSound() {
    var src = '/android_asset/www/audio/grade' + vm.gradeCode + '/lesson' + vm.lessonCode + '/' + vm.content + '.wav';
    var media = $cordovaMedia.newMedia(src);
    vm.playing = true;
    media.play();
  }

  function goBack() {
    $state.go('methods');
    signaturePad.off();
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

  var popupAnswer;

  vm.popupAnswer = function () {
    popupAnswer = $ionicPopup.show({
      templateUrl: 'templates/popup-answer.html',
      scope: $scope,
      cssClass: 'answer-popup'
    });
  }

  vm.closeAnswerPopup = function(){
    popupAnswer.close();
  }

  function setBrushSizeAndColor() {
    brushSize = BrushesServices.getBrushSize();
    brushColor = BrushesServices.getBrushColor();

    if(!brushSize){
      BrushSize = 6;
      BrushesServices.setBrushSize(BrushSize);
    }

    if(!brushColor){
      brushColor = "#FC0000";
      BrushesServices.setBrushColor(brushColor)
    }
  }

  vm.$on('$stateChangeSuccess', function(event, toState) {
    if (toState.url== "/contents") {
      $ionicPlatform.ready(function () {
        setBrushSizeAndColor();
        if(signaturePad){
          signaturePad.maxWidth = brushSize;
          signaturePad.penColor = brushColor;
        }
      });
    }
  });


})
