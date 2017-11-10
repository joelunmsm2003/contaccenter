angular.module('app.controllers', ['angularjs-gauge'])
  
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


.controller('loginCtrl', ['$scope', '$stateParams','$location','$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$location,$state) {


    $scope.ingresar=function(data){

        console.log(data)

        if (data.usuario=='ejara' && data.password=='12345'){

                console.log('jdjdjdjjd')

                $state.go('menu.puestosyagentes')


            }

            else{

                $scope.error='Usuario no valido'


                }



    }


}])
   
.controller('slarelevantesCtrl', ['$scope', '$stateParams','$http','$timeout','$interval',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$timeout,$interval ) {



    ///Grafica



    $('#containerx').highcharts({
        chart: {
            events: {
                addSeries: function () {
                    var label = this.renderer.label('A series was added, about to redraw chart', 100, 120)
                        .attr({
                            fill: Highcharts.getOptions().colors[0],
                            padding: 10,
                            r: 5,
                            zIndex: 8
                        })
                        .css({
                            color: '#FFFFFF'
                        })
                        .add();

                    setTimeout(function () {
                        label.fadeOut();
                    }, 1000);
                }
            },
            type:'bar'
        },

	      title: {
	        text: 'Llamadas'
	      },


	    yAxis: {
	        title: {
	            text: 'Valores expresados en porcentaje'
	        }
	    },

        xAxis: {
            title: {
	            text: null
	        }
        },

        series: [{
        name: 'Abandono',
	        data: [2]
	    }, {
	        name: 'Ocupacion',
	        data: [6]
	    }, {
	        name: 'Nivel de Servicio',
	        data: [6]
	    }]
    });


    
$scope.data = 99999

    $scope.frameName = 'foo';
    $scope.frameUrl = 'http://xiencias.com';
    
    // The timeout is here to be sure that the DOM is fully loaded.
    // This is a dirty-as-hell example, please use a directive in a real application.
    $interval(function () { $scope.reload(); }, 5000);






$scope.reload=function(){

    $http.get("http://192.241.240.186:1000/reporte1/").success(function(response) {

     
    $scope.reporte1 = response

    var chart = $('#containerx').highcharts();

    chart.series[0].data[0].update(parseInt($scope.reporte1.a))
    chart.series[1].data[0].update(parseInt($scope.reporte1.r))
    chart.series[2].data[0].update(parseInt($scope.reporte1.sla))
        

});

}






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


   
.controller('puestosyagentesCtrl', ['$scope', '$stateParams','$http','$interval', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$interval) {

	

$interval(function () { $scope.reload2(); }, 5000);

$scope.reload2=function(){


$http.get("http://192.241.240.186:1000/reporte2/").success(function(response) {

$scope.reporte2 = response

})


}
	
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
 