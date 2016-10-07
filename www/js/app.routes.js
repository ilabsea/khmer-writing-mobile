angular
.module('app')
.config(routes);

routes.$inject = ['$stateProvider', '$urlRouterProvider'];

function routes($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('home', {
    url: '/home',
    templateUrl: 'js/home/home.html',
    controller: 'HomeCtl'
  })

  .state('grades', {
    url: '/grades',
    templateUrl: 'js/grades/grades-list.html',
    controller: 'GradesCtrl',
    resolve: {
      gradesLists: function(GradesServices){
        return GradesServices.all();
      }
    }
  })

  .state('lessons', {
    url: '/lessons',
    templateUrl: 'js/lessons/lessons-list.html',
    controller: 'LessonsCtrl'
  })

  .state('methods', {
    url: '/methods',
    templateUrl: 'js/methods/methods-list.html',
    controller: 'MethodsCtrl'
  })

  .state('contents', {
    url: '/contents',
    templateUrl: 'js/lesson-contents/contents.html',
    controller: 'ContentsCtrl'
  })

  $urlRouterProvider.otherwise('/home')
}
