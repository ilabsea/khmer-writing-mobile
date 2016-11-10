angular.module('app')

.controller("ContentsCtrl", function($scope, $ionicPlatform, GradesServices, LessonsServices, ContentsServices, MethodsServices, $ionicHistory, $cordovaMedia){
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
  vm.playSound = playSound;
  vm.playing = false;

  setContents();

  function setContents() {
    ContentsServices.getByLessonIdMethodId(currentLesson.id, currentMethod.id).then(function (contents) {
      vm.contents = contents;
      vm.content = vm.contents[index].content;
    });
  }

  function playSound() {
    var src = '/android_asset/www/audio/grade' + vm.gradeCode + '/lesson' + vm.lessonCode + '/' + vm.content + '.wav';
    var media = $cordovaMedia.newMedia(src);
    vm.playing = true;
    media.play();
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
