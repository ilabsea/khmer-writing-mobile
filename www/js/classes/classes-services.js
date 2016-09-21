angular.module('app')

.factory('ClassesServices', ClassesServices)

ClassesServices.$inject = []

function ClassesServices() {

  var classes = [{ id: 1, name: "ថា្នក់ទ​ី ១"}, { id: 2, name: "ថា្នក់ទ​ី ២"},{ id: 3, name: "ថា្នក់ទ​ី ៣"}];
  var classId;

  function setClassId(id){
    classId = id;
  }

  function getClassId() {
    return classId;
  }

  return {
    all: function () {
      return classes;
    },
    setClassId: setClassId,
    getClassId: getClassId
  }

}
