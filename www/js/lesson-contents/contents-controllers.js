angular.module('app')

.controller("ContentsCtrl", function($scope, GradesServices, LessonsServices, ContentsServices, MethodsServices, $state, $cordovaMedia, $ionicPopup){
  var vm = $scope, canvas, signaturePad;
  // var currentGrade = GradesServices.getGrade();
  // var currentLesson = LessonsServices.getLesson();
  // var currentMethod = MethodsServices.getMethod();
  //
  // vm.currentLesson = currentLesson;
  //
  // vm.gradeCode = currentGrade.code;
  // vm.lessonCode = currentLesson.code;
  // vm.methodCode = currentMethod.code;
  //
  // var index = 0;
  //
  // vm.contents = [];
  // vm.goBack = goBack;
  // vm.playSound = playSound;
  // vm.playing = false;
  //
  // setContents();
  //
  // function setContents() {
  //   ContentsServices.getByLessonIdMethodId(currentLesson.id, currentMethod.id).then(function (contents) {
  //     vm.contents = contents;
  //     vm.content = vm.contents[index].content;
  //     canvas = document.getElementById('drawingCanvas');
  //     if(canvas){
  //       signaturePad = new SignaturePad(canvas, {
  //                               minWidth: 2,
  //                               maxWidth: 5,
  //                               penColor: "rgb(66, 133, 244)"
  //                           });
  //     }
  //
  //   });
  // }

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

  vm.brushSetting = function(){
    console.log('here');
    var brushPopup = $ionicPopup.show({
      templateUrl: 'templates/brush.html',
      scope: $scope,
      cssClass: 'brush-popup'
    });
  }

  vm.sizeLevel = 0;

  var colors = ["#919191", "#8F00FF", "#00CFFF", "#F900F3", "#FC0000" , "#FFA300", "#0600FF", "#00C10E" , "#FFF203", "#000000"];
  var size = [3,  6, 9];

  vm.setSizeLevel = function(level){
    vm.sizeLevel = level;
    if(level == 0){
      size = 3;
    } else if (level == 1) {
      size = 6;
    } else{
      size = 9;
    }
  }

})
