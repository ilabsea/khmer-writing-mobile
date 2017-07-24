angular.module('app')

.controller('BrushesCtrl', function($scope, BrushesServices) {
  var vm = $scope;
  var colors = ["#919191", "#8F00FF", "#00CFFF", "#F900F3", "#FC0000" , "#FFA300", "#0600FF", "#00C10E" , "#FFF203", "#000000"];

  vm.sizeLevel = BrushesServices.getBrushSize()/6 - 1;
  vm.colorIndex;

  setColorIndex();

  function setColorIndex(){
    var color = BrushesServices.getBrushColor();
    var i = 0,
        l = colors.length;
    for(; i < l ; i++){
      if(color == colors[i]){
        vm.colorIndex = i;
        break;
      }
    }
  }

  vm.setSizeLevel = function(level){
    vm.sizeLevel = level;
    if(level == 0){
      BrushesServices.setBrushSize(6);
    } else if (level == 1) {
      BrushesServices.setBrushSize(12);
    } else{
      BrushesServices.setBrushSize(18);
    }
  }

  vm.setColorIndex = function(index){
    vm.colorIndex = index;
    BrushesServices.setBrushColor(colors[index]);
  }

})
