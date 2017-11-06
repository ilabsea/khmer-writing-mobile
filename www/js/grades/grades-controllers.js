angular.module('app')

.controller('GradesCtrl', function(GradesServices, $scope, $ionicPlatform,
            $ionicLoading, SoundServices, $timeout, $cordovaFile) {
  var vm = $scope;

  vm.grades = [];

  vm.setGrade = setGrade;

  function setGrade(grade) {
    GradesServices.setGrade(grade);
  }

  function getGrades() {
    GradesServices.all().then(function(grades){
      vm.grades = grades;
    })
  }

  function unzipExpansionFile() {
    var path  = "file:///storage/emulated/0/Android/obb/ilabsea.instedd.khmerwriting1/";
    var filename = "main.100.ilabsea.instedd.khmerwriting1.obb";
    var destination = cordova.file.externalApplicationStorageDirectory;
    $cordovaFile.checkFile(path, filename).then(function(){
      JJzip.unzip(path + filename, {target:destination},function(data){
          window.resolveLocalFileSystemURL(path, function(dir) {
            dir.getFile(filename, {create:false}, function(fileEntry) {
              fileEntry.remove(function(){
                console.log('the file has been removed');
              },function(error){
                console.log('the file has been errored : ', error);
              },function(){
                 console.log('file not exist');
              });
            });
          });
      },function(error){
          console.log('cannot unzip : ', error);
      })
    });
  }

  $ionicPlatform.ready(function(){
    unzipExpansionFile();
  })

  vm.$on('$stateChangeSuccess', function(event, toState) {
    if (toState.url== "/grades") {
      $ionicPlatform.ready(function () {
        getGrades();
        if(SoundServices.getIsActive()){
          SoundServices.stop('intro');
          SoundServices.stop('setting');
          SoundServices.stop('lesson');
          $timeout(function () {
            SoundServices.play('grade');
          }, 1000)
        }
      });
    }
  });

})
