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


.controller('loginCtrl', ['$scope', '$stateParams','$location','$state','$http',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$location,$state,$http) {


     $scope.logeandose = 0


    $scope.ingresar=function(data){

        console.log(data)

        $scope.logeandose = 1


$http.get("http://192.241.240.186:1000/loginuser/"+data.usuario+'/'+data.password).success(function(response) {

     console.log('ehhhe',response)


     if (response=='nologin'){

        $scope.error='Usuario no valido'
            $scope.logeandose = 0
     }
     else{

        $state.go('menu.slarelevantes')

        location.href = "#/side-menu21/page11";
            $scope.logeandose = 0
     }


});

        // if (data.usuario=='ejara' && data.password=='12345'){

            

        //         $state.go('menu.slarelevantes')


        //     }

        //     else{

        //         $scope.error='Usuario no valido'


        //         }



    }


}])
   
.controller('slarelevantesCtrl', ['$scope', '$stateParams','$http','$timeout','$interval',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$timeout,$interval ) {



    ///Grafica


    $scope.logeandose=1



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
	        data: [0]
	    }, {
	        name: 'Ocupacion',
	        data: [0]
	    }, {
	        name: 'Nivel de Servicio',
	        data: [0]
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

    console.log($scope.reporte1.a+$scope.reporte1.r,$scope.reporte1.a,$scope.reporte1.r)

    x=parseInt($scope.reporte1.a)+parseInt($scope.reporte1.r)

    chart.series[0].data[0].update(parseInt($scope.reporte1.r)*100/x)
    chart.series[1].data[0].update(parseInt($scope.reporte1.a)*100/x)
    chart.series[2].data[0].update(parseInt($scope.reporte1.sla))
    

    $scope.logeandose=0        

});

}

$scope.reload()






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

$scope.logeandose=1

$interval(function () { $scope.reload2(); }, 5000);

$scope.maxvalue=0

$scope.reload2=function(){


$http.get("http://192.241.240.186:1000/reporte2/").success(function(response) {

$scope.reporte2 = response

$scope.maxvalue =response.gr3_aoc+response.gr3_ali+response.gr2_rdy+response.nrd+response.gr2_inb
 
console.log('hola,..',$scope.maxvalue)

 var chart = $('#pie').highcharts();



 chart.series[0].data[0].update(response.ali)
 chart.series[0].data[1].update(response.aoc)

 var chart1 = $('#3grafica').highcharts();

 chart1.series[0].data[0].update(response.gr2_nrd)
 chart1.series[0].data[1].update(response.gr2_rdy)
 chart1.series[0].data[2].update(response.gr2_inb)
 chart1.series[0].data[3].update(response.gr2_hold)
 chart1.series[0].data[4].update(response.gr2_acw)


 $scope.logeandose=0



})


}

$scope.reload2()


// Build the chart
Highcharts.chart('pie', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: null
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Libres',
            y: 0
        }, {
            name: 'Ocupados',
            y: 0,
            sliced: true,
            selected: true
        }]
    }]
});


// Build the chart
Highcharts.chart('3grafica', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: null
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Not Ready',
            y: 0
        }, {
            name: 'Ready',
            y: 0,
            sliced: true
        },
        {
            name: 'Inbound',
            y: 0,
            sliced: true
        },
        {
            name: 'Hold',
            y: 0,
            sliced: true
        },
        {
            name: 'ACW',
            y: 0,
            sliced: true
        }]
    }]
});


    
////////

 ////
	
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
 