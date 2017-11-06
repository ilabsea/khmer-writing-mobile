angular.module('app')

.factory('BrushesServices', BrushesServices)

BrushesServices.$inject = []

function BrushesServices() {

  var colors = ["#919191", "#8F00FF", "#00CFFF", "#F900F3", "#FC0000" , "#FFA300", "#0600FF", "#00C10E" , "#FFF203", "#000000"];

  function getColors() {
    return colors;
  }

  function setBrushColor(color){
    localStorage.setItem('brushColor', color);
  }

  function getBrushColor() {
    return localStorage.getItem('brushColor');
  }

  function setBrushSize(size){
    localStorage.setItem('brushSize', size);
  }

  function getBrushSize() {
    return localStorage.getItem('brushSize');
  }


  return {
    setBrushColor: setBrushColor,
    getBrushColor: getBrushColor,
    setBrushSize: setBrushSize,
    getBrushSize: getBrushSize,
    getColors: getColors
  }
}
