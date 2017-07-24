angular.module('app')

.controller("ContentsCtrl", function($scope, GradesServices, LessonsServices,
            ContentsServices, MethodsServices, $state, $cordovaMedia,
            BrushesServices, $ionicPlatform, $ionicPopup, TracksServices){
  var vm = $scope, canvas, signaturePad, brushSize, brushColor;
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

  var path = "img/ilabsea.instedd.khmerwriting/lesson" + vm.lessonId + "/method" + vm.writingMethodId + "/";

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
    if(media)
      media.stop();
    var src = "/android_asset/www/" + path + vm.contents[index]["audio"];
    media = $cordovaMedia.newMedia(src);
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
