angular
.module('app')
.config(routes);

routes.$inject = ['$stateProvider', '$urlRouterProvider', '$compileProvider'];

function routes($stateProvider, $urlRouterProvider, $compileProvider) {
  $stateProvider
  .state('classes', {
    url: '/classes',
    templateUrl: 'js/classes/classes-list.html',
    controller: 'ClassesCtrl'
  })

  .state('lessons-in-class', {
    url: '/classes/:classId',
    templateUrl: 'js/lessons/lessons-list.html',
    controller: 'LessonsCtrl'
  })

  .state('lesson', {
    url: '/lessons/:lessonId',
    templateUrl: 'js/lessons/lesson.html',
    controller: 'LessonCtrl'
  })

  .state('how-to-write', {
    url: '/lesson/how-to-write',
    templateUrl: 'js/practice-categories/how-to-write.html',
    controller: 'HowToWriteCtrl'
  })


  $urlRouterProvider.otherwise('/classes')
}
