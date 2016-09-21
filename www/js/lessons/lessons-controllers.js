angular.module('app')

.controller('LessonsCtrl', function ($stateParams, $scope, LessonsServices, ClassesServices) {
  vm = $scope;
  vm.classId = $stateParams.classId;

  ClassesServices.setClassId(vm.classId);

  vm.lessons = LessonsServices.getByClassId(vm.classId);
  console.log('vm.lessons : ', vm.lessons);
})
