angular.module('app')

.controller("ContentsCtrl", function($scope, GradesServices, LessonsServices,
            ContentsServices, MethodsServices, $state, $cordovaMedia,
            BrushesServices, $ionicPlatform, $ionicPopup, TracksServices){
  var vm = $scope, canvas, signaturePad, brushSize, brushColor;

  var currentGrade = GradesServices.getGrade();
  var currentLesson = LessonsServices.getLesson();
  var currentMethod = MethodsServices.getMethod();
  var currentTracks = TracksServices.getCurrentTrack();

  vm.currentLesson = currentLesson;

  vm.gradeIdApi = currentGrade.grade_id_api;
  vm.lessonIdApi = currentLesson.lesson_id_api;
  vm.writingMethodIdApi = currentMethod.writing_method_id_api;

  vm.image = "";
  vm.imageClue = "";
  vm.imageAnswer = "";
  vm.methodCode = currentMethod.code;

  vm.imageBackground = currentLesson.background == 1 ? "img/grid.png" : "img/table.png";
  vm.resetCurrentTrack = resetCurrentTrack;

  var path = cordova.file.applicationStorageDirectory + "lesson" + vm.lessonIdApi + "/method" + vm.writingMethodIdApi + "/";

  var index = 0;

  vm.contents = [];
  vm.goBack = goBack;
  vm.playSound = playSound;
  vm.playing = false;

  setContents();

  function setContents() {
    ContentsServices.getByLessonIdMethodId(vm.lessonIdApi, vm.writingMethodIdApi).then(function (contents) {
      var tracksJson = currentTracks["tracks"] ? angular.fromJson(currentTracks["tracks"]) : "";
      index = tracksJson && tracksJson[vm.methodCode]? tracksJson[vm.methodCode]["index"] : 0;
      vm.contents = contents;
      setContentDataChange(contents);
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
    var track = getTrackPerMethod();
    TracksServices.storeTrack(track);
    signaturePad.off();
  }

  function getTrackPerMethod(){
    var track = {};
    track[vm.methodCode] = {"index": index, "number_contents": vm.contents.length - 1 , "content_id_api": vm.contents[index]["content_id_api"]};
    return track;
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
    setContentDataChange(vm.contents);
    signaturePad.clear();
  }

  vm.previous = function() {
    index--;
    setContentDataChange(vm.contents);
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

  function setContentDataChange(contents) {
    vm.content = contents[index].content;
    vm.image =  path + contents[index]["image"];
    vm.imageClue = path + contents[index]["image_clue"];
    vm.imageAnswer = path + contents[index]["image_answer"];
  }

  function resetCurrentTrack(){
    index = 0 ;
    setContentDataChange(vm.contents);
    signaturePad.clear();
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
