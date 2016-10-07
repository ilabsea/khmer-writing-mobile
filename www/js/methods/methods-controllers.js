angular.module('app')

.controller("MethodsCtrl", function($stateParams, $scope, MethodsServices){
  vm = $scope;

  vm.methods = [];
  vm.setMethod = setMethod;

  setMethods();

  function setMethods() {
    MethodsServices.all().then(function(methods) {
      vm.methods = methods;
    });
  }

  function setMethod(methodParam) {
    MethodsServices.setMethod(methodParam);
  }




})
