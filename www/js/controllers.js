angular.module('app.controllers', [])
  
.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

    $scope.ola ='sjsjs'

}])
   
.controller('capitalCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('slarelevantesCtrl', ['$scope', '$stateParams','$http','$timeout',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$timeout ) {


	   Highcharts.chart('containerx', {
      title: {
        text: 'Temperature Data'
      },

      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]
      },

      series: [{
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      }]
    });
    
$scope.data = 99999

    $scope.frameName = 'foo';
    $scope.frameUrl = 'http://xiencias.com';
    
    // The timeout is here to be sure that the DOM is fully loaded.
    // This is a dirty-as-hell example, please use a directive in a real application.
    $timeout(function () { console.log(window.frames.foo); }, 1000);


$http.get("http://192.241.240.186:1000/reporte1/").success(function(response) {



	console.log('response',response)

	$scope.reporte1 = response

});


}])


.controller('marcadorpredictivoCtrl', ['$scope', '$stateParams','$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http) {

	

	//https://www.ccf.com.pe/webresources/reporte3/2/2

$http.get("http://192.241.240.186:1000/reporte2/").success(function(response) {



	console.log('response',response)

	$scope.reporte2 = response

});
	
}])


   
.controller('puestosyagentesCtrl', ['$scope', '$stateParams','$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http) {

	

	//https://www.ccf.com.pe/webresources/reporte3/2/2

$http.get("http://192.241.240.186:1000/reporte2/").success(function(response) {



	console.log('response',response)

	$scope.reporte2 = response

});
	
}])
   
.controller('puestosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('informacionCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('inicioCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 