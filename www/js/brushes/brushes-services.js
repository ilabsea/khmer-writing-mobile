angular.module('app')

.factory('BrushesServices', BrushesServices)

BrushesServices.$inject = []

function BrushesServices() {

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
    getBrushSize: getBrushSize
  }
}
