angular
.module('app')
.config(routes);

routes.$inject = ['$stateProvider', '$urlRouterProvider'];

function routes($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('home', {
    url: '/home',
    cache: false,
    templateUrl: 'templates/users.html',
    controller: "UsersCtrl",
    resolve:{
      "isHome": function(){
        return true;
      }
    }
  })

  .state('users', {
    url: '/users',
    cache: false,
    templateUrl: 'templates/users.html',
    controller: "UsersCtrl",
    resolve:{
      "isHome": function(){
        return false;
      }
    }
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

  .state('settings', {
    url: '/settings',
    cache: false,
    templateUrl: 'templates/settings.html',
    controller: 'SettingsCtrl'
  })

  .state('accounts', {
    url: '/accounts/:state',
    cache: false,
    templateUrl: 'templates/account.html',
    controller: 'AccountsCtrl'
  })

  .state('aboutus', {
    url: '/aboutus',
    templateUrl: 'templates/aboutus.html'
  })

  .state('brush', {
    url: '/brush',
    templateUrl: 'templates/brush.html',
    controller: 'BrushesCtrl'
  })

  $urlRouterProvider.otherwise('/brush')
}
