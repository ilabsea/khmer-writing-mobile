angular
.module('app')
.config(routes);

routes.$inject = ['$stateProvider', '$urlRouterProvider'];

function routes($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtl'
  })

  .state('grades', {
    url: '/grades',
    templateUrl: 'templates/grades-list.html',
    controller: 'GradesCtrl'
  })

  .state('lessons', {
    url: '/lessons',
    templateUrl: 'templates/lessons-list.html',
    controller: 'LessonsCtrl'
  })

  .state('methods', {
    url: '/methods',
    templateUrl: 'templates/methods-list.html',
    controller: 'MethodsCtrl'
  })

  .state('contents', {
    url: '/contents',
    templateUrl: 'templates/contents.html',
    controller: 'ContentsCtrl'
  })

  $urlRouterProvider.otherwise('/grades')
}
