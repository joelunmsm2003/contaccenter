angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

    .state('login', {
      url: '/page1',
      templateUrl: 'templates/login.html'
    })
        .state('capital', {
      url: '/side-menu21',
      templateUrl: 'templates/capital.html'
    })
              .state('capital.sLARELEVANTES', {
            url: '/page11',
            views: {
              'side-menu21': {
                templateUrl: 'templates/sLARELEVANTES.html',
                controller:'sLARELEVANTESCtrl'
              }
            }
          })

             .state('capital.puestos', {
              url: '/page36',
              views: {
              'side-menu21': {
                templateUrl: 'templates/puestosYAgentes.html',
                controller:'puestosCtrl'
                }
              }
              
            })



        .state('puestosYAgentes', {
      url: '/page35',
      templateUrl: 'templates/puestosYAgentes.html',
      controller:'puestosYAgentesCtrl'
    })
   
        .state('informacion', {
      url: '/page37',
      templateUrl: 'templates/informacion.html'
    })
        .state('inicio', {
      url: '/page30',
      templateUrl: 'templates/inicio.html'
    })
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/page1');


});