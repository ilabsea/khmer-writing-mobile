angular.module('app')

.controller("ContentsCtrl", function($scope, GradesServices, LessonsServices,
            ContentsServices, MethodsServices, $state, $cordovaMedia,
            BrushesServices, $ionicPlatform, $ionicPopup, TracksServices,
            $window, SoundServices, $timeout){

  var vm = $scope, canvas, signaturePad, signaturePad1, brushSize, brushColor;
  var media;

  var currentGrade = GradesServices.getGrade();
  var currentLesson = LessonsServices.getLesson();
  var currentMethod = MethodsServices.getMethod();
  var currentTracks = TracksServices.getCurrentTrack();

  vm.currentLesson = currentLesson;

  vm.gradeId = currentGrade.id;
  vm.lessonId = currentLesson.id;
  vm.writingMethodId = currentMethod.id;

  vm.image = "";
  vm.imageClue = "";
  vm.imageAnswer = "";
  vm.methodCode = currentMethod.code;

  vm.imageBackground = currentLesson.background == 1 ? "img/grid.png" : "img/table.png";
  vm.resetCurrentTrack = resetCurrentTrack;

  var path = cordova.file.externalApplicationStorageDirectory + "main_expansion/grade"
            + vm.gradeId + "/lesson" + vm.lessonId
            + "/method" + vm.writingMethodId + "/";
  var index = 0;

  vm.contents = [];
  vm.goBack = goBack;
  vm.playSound = playSound;

  setContents();

  function setContents() {
    ContentsServices.getByLessonIdMethodId(vm.lessonId, vm.writingMethodId).then(function (contents) {
      var tracksJson = currentTracks["tracks"] ? angular.fromJson(currentTracks["tracks"]) : "";
      index = tracksJson && tracksJson[vm.methodCode]? tracksJson[vm.methodCode]["index"] : 0;
      vm.contents = contents;
      setContentDataChange(contents);
      canvas = document.getElementById('drawingCanvas');
      paintingCanvas = document.getElementById('paintingCanvas');
      setCanvasSize(canvas);
      setBrushSizeAndColor();

      if(canvas){
        signaturePad = new SignaturePad(canvas, {
          maxWidth: brushSize,
          penColor: brushColor
        });
      }

      if(paintingCanvas){
        setPaintingCanvasSize(paintingCanvas)
        signaturePad1 = new SignaturePad(paintingCanvas, {
          maxWidth: brushSize,
          penColor: brushColor
        });
      }
    });
  }

  function setPaintingCanvasSize(canvas) {
    var deviceWidth = $window.innerWidth;
    var deviceHeight = $window.innerHeight;
    if(deviceWidth >= 1020 && deviceHeight >= 600 ) {
      canvas.width = 340;
      canvas.height = 350;
    } else if (deviceWidth >= 700 && deviceHeight >= 400) {
      canvas.width = 240;
      canvas.height = 230;
    }else if(deviceWidth >= 640 && deviceHeight >= 360 ) {
      canvas.width = 210;
      canvas.height = 200;
    } else if(deviceWidth >= 500  && deviceHeight >= 320 ){
      canvas.width = 170;
      canvas.height = 180
    }
  }

  function setCanvasSize(canvas) {
    var deviceWidth = $window.innerWidth;
    var deviceHeight = $window.innerHeight;
    if(deviceWidth >= 1020 && deviceHeight >= 600 ) {
      canvas.width = 495;
      if(vm.methodCode == 3 || vm.methodCode == 4){
        canvas.height = 370;
      }else{
        canvas.height = 407;
      }
    } else if (deviceWidth >= 700 && deviceHeight >= 400) {
      canvas.width = 350;
      if(vm.methodCode == 3 || vm.methodCode == 4){
        canvas.height = 240;
      }else{
        canvas.height = 280;
      }
    }else if(deviceWidth >= 640 && deviceHeight >= 360 ) {
      canvas.width = 301;
      if(vm.methodCode == 3 || vm.methodCode == 4){
        canvas.height = 212;
      }else{
        canvas.height = 242;
      }
    } else if(deviceWidth >= 500  && deviceHeight >= 320 ){
      canvas.width = 250;
      if(vm.methodCode == 3 || vm.methodCode == 4){
        canvas.height = 190;
      }else{
        canvas.height = 219;
      }
    }
  }

  function playSound() {
    media.play();
  }

  function goBack() {
    $state.go('methods');
    var track = getTrackPerMethod();
    TracksServices.storeTrack(track);
    signaturePad.off();
    if (signaturePad1)
      signaturePad1.off();
  }

  function getTrackPerMethod(){
    var track = {};
    track[vm.methodCode] = {"index": index,
                            "number_contents": vm.contents.length - 1 ,
                            "content_id": vm.contents[index]["id"]};
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
    if(signaturePad1)
      signaturePad1.clear();
  }

  vm.previous = function() {
    index--;
    setContentDataChange(vm.contents);
    signaturePad.clear();
    if(signaturePad1)
      signaturePad1.clear();
  }

  vm.redraw = function () {
    signaturePad.clear();
    if(signaturePad1)
      signaturePad1.clear();
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

  var media;
  function setContentDataChange(contents) {
    vm.content = contents[index].content;
    vm.image =  path + contents[index]["image"];
    vm.imageClue = path + contents[index]["image_clue"];
    vm.imageAnswer = path + contents[index]["image_answer"];
    if (vm.methodCode == 3) {
      if (media) {
        media.stop();
        media.release();
      }
      var src = path + vm.contents[index]["audio"];
      media = $cordovaMedia.newMedia(src);
    }
  }

  function resetCurrentTrack(){
    index = 0 ;
    setContentDataChange(vm.contents);
    signaturePad.clear();
    if(signaturePad1)
      signaturePad1.clear();
  }

  vm.$on('$stateChangeSuccess', function(event, toState) {
    if (toState.url== "/contents") {
      $ionicPlatform.ready(function () {
        setBrushSizeAndColor();
        if(signaturePad){
          signaturePad.maxWidth = brushSize;
          signaturePad.penColor = brushColor;
        }

        if(signaturePad1){
          signaturePad1.maxWidth = brushSize;
          signaturePad1.penColor = brushColor;
        }

        if(SoundServices.getIsActive()){
          SoundServices.stop('brush');
          SoundServices.stop('lesson');

          $timeout(function() {
            SoundServices.play('content');
          }, 1000)
        }
      });
    }
  });

})
