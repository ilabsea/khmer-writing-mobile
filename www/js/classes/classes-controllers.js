angular.module('app')

.controller('ClassesCtrl', function(ClassesServices, $scope) {
  var vm = $scope;

  vm.classes = ClassesServices.all();
})
