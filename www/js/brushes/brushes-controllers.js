angular.module('app')

.controller('BrushesCtrl', function($scope) {
  var vm = $scope;
  vm.sizeLevel = 0;
  vm.colorIndex = 9;

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

  vm.setColorIndex = function(index){
    vm.colorIndex = index;
  }

})
