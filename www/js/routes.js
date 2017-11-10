angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

    .state('login', {
      url: '/page1',
      templateUrl: 'templates/login.html',
      controller:'loginCtrl'
    })


    .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html'
    })
              .state('menu.slarelevantes', {
            url: '/page11',
            views: {
              'side-menu21': {
                templateUrl: 'templates/slarelevantes.html',
                controller:'slarelevantesCtrl'
              }
            }
          })

             .state('menu.puestosyagentes', {
              url: '/page36',
              views: {
              'side-menu21': {
                templateUrl: 'templates/puestosyagentes.html',
                controller:'puestosyagentesCtrl'
                }
              }
              
            })

              .state('menu.marcadorpredictivo', {
              url: '/page36',
              views: {
              'side-menu21': {
                templateUrl: 'templates/marcadorpredictivo.html',
                controller:'marcadorpredictivoCtrl'
                }
              }
              
            })




    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/page1');


});