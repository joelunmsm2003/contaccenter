angular.module('app.controllers', ['angularjs-gauge','ngStorage'])
  
.controller('menuCtrl', ['$scope', '$stateParams','$localStorage','$location','$ionicHistory',//,/ The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$localStorage,$location,$ionicHistory) {

    $scope.salir=function(){

        
        $location.url('/page1')

        delete $localStorage

        $ionicHistory.clearCache();

       delete $localStorage;

      ionic.Platform.exitApp();
    }

}])
   
.controller('indicadoresCtrl', ['$scope', '$stateParams','$http','$localStorage','$filter','$interval', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$localStorage,$filter,$interval) {




       $http.get("http://192.241.240.186:1000/loginuser/"+$localStorage.user+'/'+$localStorage.pass).success(function(response) {

        $scope.servicios = response['servicios']

        $scope.servicios = $filter('filter')($scope.servicios,{'tipo' : 'IN','tipo_reporte':3})

        $scope.colas = $scope.servicios[0]['cmps']

        $scope.id_cola = $scope.colas[0]['id']

        $localStorage.id_cola = $scope.id_cola

        $scope.serv = $scope.servicios[0]

        $scope.col = $scope.servicios[0]['cmps'][0]

    })



    $scope.seleccionacola=function(data){




        if(data){

            $scope.logeandose=1

            $scope.reload(data.id)

            

            $localStorage.id_cola = data.id

            console.log('Actualizando grafica...',data)
        }

        

        //$scope.colas=data.cmps

    }

    $scope.traecolas =function(data){

        $scope.logeandose=1

        if (data){

            $scope.colas=data.cmps


        }

        
    }

    $scope.logeandose=1


  $scope.reload=function(cola){

  


    // if ($localStorage.id_cola==undefined){

    //     $scope.logeandose=1

    // }
    

    $http.get("http://192.241.240.186:1000/loginuser/"+$localStorage.user+'/'+$localStorage.pass).success(function(response) {

        // $scope.servicios = response['servicios']

        // $scope.colas = response['servicios'][0]['cmps']

        $scope.id_cola = response['servicios'][0]['cmps'][0]['id']

        if(cola){

            $scope.id_cola = cola 
        }

         // $localStorage.id_cola = $scope.id_cola

         ///Graficas

            $http.get("http://192.241.240.186:1000/reporte4/"+$scope.id_cola+'/').success(function(response) {

                $scope.gestiones = response['gest']

                 $scope.consultas = response['cons']

                  $scope.reclamos = response['recl']

                  $scope.reporte4 = response


                 var chart = $('#containerx').highcharts();



                chart.series[0].data[0].update(parseInt($scope.reporte4.gest))
                chart.series[1].data[0].update(parseInt($scope.reporte4.cons))
                chart.series[2].data[0].update(parseInt($scope.reporte4.recl))

                 $scope.logeandose=0
        


            });


    })


}


$scope.reload()

$interval(function () { $scope.reload($localStorage.id_cola); }, 10000);


Highcharts.chart('containerx', {

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
            text: null
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
        legend: {

            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'top',
            x: 0,
            y: 0,
            backgroundColor:'#FFFFFF'
           
        },

        series: [{
            name: 'Gestion',
            color: '#e84530',
            data: [0]
        }, {
            name: 'Consulta',
            color: '#2a789e',
            data: [0]
        }, {
            name: 'Reclamo',
            color: '#5cbf0d',
            data: [0]
        }]
    });








}])


.controller('loginCtrl', ['$scope','$stateParams','$state','$http','$localStorage','$location',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$stateParams,$state,$http,$localStorage,$location) {


     $scope.logeandose = 0

     if($localStorage.user){


        console.log('dkkdkd')




     }


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

        

        $localStorage.user = data.usuario
        $localStorage.pass = data.password 

        //location.reload()
        //location.href = "#/side-menu21/page11";
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
   
.controller('slarelevantesCtrl', ['$state','$scope', '$stateParams','$http','$timeout','$interval','$localStorage','$filter',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($state,$scope, $stateParams,$http,$timeout,$interval,$localStorage,$filter) {




    $scope.addPoints = function () {
      var seriesArray = $scope.chartConfig.series
      var rndIdx = Math.floor(Math.random() * seriesArray.length);
      seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
    };

    var series = 0;
    $scope.addSeries = function () {
      var rnd = []
      for (var i = 0; i < 10; i++) {
        rnd.push(Math.floor(Math.random() * 20) + 1)
      }
      $scope.chartConfig.series.push({
        data: rnd,
        id: 'series_' + series++
      })
    }

    $scope.removeRandomSeries = function () {
      var seriesArray = $scope.chartConfig.series
      var rndIdx = Math.floor(Math.random() * seriesArray.length);
      seriesArray.splice(rndIdx, 1)
    }

    $scope.swapChartType = function () {
      if (this.chartConfig.chart.type === 'line') {
        this.chartConfig.chart.type = 'bar'
      } else {
        this.chartConfig.chart.type = 'line'
        this.chartConfig.chart.zoomType = 'x'
      }
    }








    $http.get("http://192.241.240.186:1000/loginuser/"+$localStorage.user+'/'+$localStorage.pass).success(function(response) {

        $scope.servicios = response['servicios']

        $localStorage.servicio= $scope.servicios[0]['id']

        $scope.servicios = $filter('filter')($scope.servicios,{'tipo' : 'IN','tipo_reporte':1})

        $scope.colas = $scope.servicios[0]['cmps']

        $scope.id_cola = $scope.colas[0]['id']

        $localStorage.id_cola = $scope.id_cola

        $scope.serv = $scope.servicios[0]

        $scope.col = $scope.servicios[0]['cmps'][0]

    })

    $scope.seleccionacola=function(data){



        console.log('seleccionando cola',data)


        if(data){

            $scope.reload(data.id)

            $scope.logeandose=1

            $localStorage.id_cola = data.id

            console.log('Actualizando grafica...',data)
        }

        

        //$scope.colas=data.cmps

    }

    $scope.traecolas =function(data){


        console.log('colas..',data)

        $localStorage.servicio = data.id  

        if (data){

            $scope.colas=data.cmps


        }

        
    }

    $scope.logeandose=1

$scope.reload=function(cola){


    if ($localStorage.id_cola==undefined){

        $scope.logeandose=1

    }
    

    $http.get("http://192.241.240.186:1000/loginuser/"+$localStorage.user+'/'+$localStorage.pass).success(function(response) {

        // $scope.servicios = response['servicios']

        // $scope.colas = response['servicios'][0]['cmps']

        $scope.id_cola = response['servicios'][0]['cmps'][0]['id']

        if(cola){

            $scope.id_cola = cola 
        }

         // $localStorage.id_cola = $scope.id_cola

         ///Graficas

            $http.get("http://192.241.240.186:1000/reporte1/"+$localStorage.servicio+'/'+$scope.id_cola).success(function(response) {

                $scope.reporte1 = response

                console.log('reporte1', $scope.reporte1)

                var chart = $('#chart1').highcharts();

                $http.get("http://192.241.240.186:1000/reporte2/"+$scope.id_cola+'/').success(function(response) {

                    $scope.reporte2 = response

              
                        chart.series[0].data[0].update(parseInt($scope.reporte1.sla))
                        chart.series[1].data[0].update(parseInt($scope.reporte1.po))
                        chart.series[2].data[0].update(parseInt($scope.reporte1.pa))



                    x=parseInt($scope.reporte1.a)+parseInt($scope.reporte1.r)

                    console.log('niv ser',$scope.ns)

                   
                    $scope.logeandose=0 


                })








            });


    })





}


    $scope.chartConfig = {
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
        type: 'bar',
        width: 370
      },
        title: {
            text: null
          },


        yAxis: {
            title: {
                text: 'Valores expresados en porcentaje'
            }
        },

        xAxis: {
            title: {
                text: null
            },
            lineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: 'transparent',
            minorTickLength: 0,
            tickLength: 0,
            labels: {
                   enabled: false
               }
        },
        legend: {

            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'top',
            x: 0,
            y: 0,
            backgroundColor:'#FFFFFF'
           
        },

      series: [{
            name: 'Nivel de Servicio',
            color: '#5dc10f',
            data: [0]
        }, {
            name: 'Ocupacion',
            color: '#2a77a0',
            data: [0]
        }, {
            name: 'Abandono',
            color: '#cd3e30',
            data: [0]
        }]
    }


$interval(function () { $scope.reload($localStorage.id_cola); }, 10000);



$scope.reload()

    









}])


.controller('marcadorpredictivoCtrl', ['$scope', '$stateParams','$http', '$localStorage','$filter','$interval',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$localStorage,$filter,$interval) {

  $scope.logeandose=0

 



  $http.get("http://192.241.240.186:1000/loginuser/"+$localStorage.user+'/'+$localStorage.pass).success(function(response) {


  $scope.servicios = response['servicios']

  $scope.servicios = $filter('filter')($scope.servicios,{'tipo' : 'OUT','tipo_reporte':2})


  $scope.colas = $scope.servicios[0]['cmps']


    $scope.id_cola = $scope.colas[0]['id']

    $localStorage.id_cola = $scope.id_cola

    $scope.serv = $scope.servicios[0]

    $scope.col = $scope.servicios[0]['cmps'][0]


})


  ////Traendos datos

     $scope.seleccionacola=function(data){


        if(data){

            console.log('campanas...',data.id)

            $scope.reload2(data.id)

            $scope.logeandose=1

            $localStorage.id_cola = data.id

            console.log('Actualizando grafica...',data)
        }

        
        //$scope.colas=data.cmps

    }

    $scope.traecolas =function(data){

        console.log('colas..',data)


        $localStorage.servicio=data.id

        

        if (data){

            $scope.colas=data.cmps


        }

        
    }




$scope.reload2=function(cola){


    if ($localStorage.id_cola==undefined){

        $scope.logeandose=1

    }


    $http.get("http://192.241.240.186:1000/loginuser/"+$localStorage.user+'/'+$localStorage.pass).success(function(response) {




    $scope.id_cola = response['servicios'][0]['cmps'][0]['id']

    console.log('cola',$scope.id_cola)

    if(cola){

        $scope.id_cola = cola 
    
    }

    //$localStorage.id_cola = $scope.id_cola

    $http.get("http://192.241.240.186:1000/reporte3/"+$localStorage.servicio+'/'+$localStorage.id_cola+'/').success(function(response) {

    $scope.reporte3 = response

    console.log('reporte3',response)

     $scope.logeandose=0


     var chart = $('#chartmarcador').highcharts();



    chart.series[0].data[0].update(parseInt($scope.reporte3.aban))
    chart.series[1].data[0].update(parseInt($scope.reporte3.cont))
    chart.series[2].data[0].update(parseInt($scope.reporte3.disc))
    chart.series[3].data[0].update(parseInt($scope.reporte3.disc)-parseInt($scope.reporte3.cont)-parseInt($scope.reporte3.aban))










    })


    })





}

$scope.reload2()

$interval(function () { $scope.reload2($localStorage.id_cola); }, 10000);

$scope.chartConfigmarcador = {
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
        type: 'bar',
        width: 370
      },
        title: {
            text: null
          },


         yAxis: {
            title: {
                text: 'Valores expresados en porcentaje'
            }
        },

        xAxis: {
            title: {
                text: null
            },
            lineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: 'transparent',
            minorTickLength: 0,
            tickLength: 0,
            labels: {
                   enabled: false
               }
        },
        legend: {

            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'top',
            x: 0,
            y: 0,
            backgroundColor:'#FFFFFF'
           
        },

      series: [{
            name: 'Abandono',
            color: '#df422e',
            data: [0]
        }, {
            name: 'Contestadas',
            color: '#2b78a0',
            data: [0]
        }, {
            name: 'Discadas',
            color: '#5dc00d',
            data: [0]
        },
        {
            name: 'Otros',
            color: '#f07a34',
            data: [0]
        }]
    }



    


    
}])


   
.controller('puestosyagentesCtrl', ['$scope', '$stateParams','$http','$interval','$localStorage','$filter',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$interval,$localStorage,$filter) {



     $scope.grafica2=function(){

        $scope.g1=0;$scope.g2=true;$scope.g3=false


  }

  $scope.grafica3=function(){

   

    $scope.g1=0;$scope.g2=false;$scope.g3=true
  }


  $scope.grafica1=function(){

    $scope.g1=1;$scope.g2=0;$scope.g3=0
  }

  $scope.g1=1

  $scope.g2=0 
  $scope.g3=0
$http.get("http://192.241.240.186:1000/loginuser/"+$localStorage.user+'/'+$localStorage.pass).success(function(response) {


  $scope.servicios = response['servicios']

if(response['servicios'].length>0){

    $localStorage.servicio= $scope.servicios[0]['id']

    $scope.servicios = $filter('filter')($scope.servicios,{'tipo' : 'IN','tipo_reporte':1})

    $scope.colas = $scope.servicios[0]['cmps']

    $scope.id_cola = $scope.colas[0]['id']

    $localStorage.id_cola = $scope.id_cola

    $scope.serv = $scope.servicios[0]

    $scope.col = $scope.servicios[0]['cmps'][0]

}





})

$scope.logeandose=1



$scope.maxvalue=0

   $scope.seleccionacola=function(data){


        if(data){

            $scope.reload2(data.id)



            $scope.logeandose=1

            $localStorage.id_cola = data.id

            console.log('Actualizando grafica...',data)
        }

        

        //$scope.colas=data.cmps

    }

    $scope.traecolas =function(data){



        $localStorage.servicio= data.id

        

        if (data){

            $scope.colas=data.cmps


        }

        
    }




$scope.reload2=function(cola){


    if ($localStorage.id_cola==undefined){

        $scope.logeandose=1

    }


    $http.get("http://192.241.240.186:1000/loginuser/"+$localStorage.user+'/'+$localStorage.pass).success(function(response) {



    console.log('hshsh',response['servicios'].length)

   

    if(response['servicios'].length>0){

        $scope.id_cola = response['servicios'][0]['cmps'][0]['id']


    }
    
    if(cola){

        $scope.id_cola = cola 
    
    }

    //$localStorage.id_cola = $scope.id_cola

    $http.get("http://192.241.240.186:1000/reporte2/"+$localStorage.servicio+'/'+$scope.id_cola).success(function(response) {

    $scope.reporte2 = response

    $scope.maxvalue =response.gr3_aoc+response.gr3_ali+response.gr2_rdy+response.nrd+response.gr2_inb
     


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
    legend: {

            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'top',
            x: 0,
            y: 0,
            backgroundColor:'#FFFFFF'
           
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
            y: 0,
            color:'#8ac432'
        }, {
            name: 'Ocupados',
            y: 0,
            sliced: true,
            selected: true,
            color:'#e47731'
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
                enabled: true,
                format: '<b>{point.name}</b>: {point.y} ',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            },
            showInLegend: true
        }
    },
     legend: {

            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'top',
            x: 0,
            y: 0,
            backgroundColor:'#FFFFFF'
           
        },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Not Ready',
            y: 0,
            color:'#e1422d'
        }, {
            name: 'Ready',
            y: 0,
            sliced: true,
            color:'#68b62f'
        },
        {
            name: 'Inbound',
            y: 0,
            sliced: true,
            color:'#6f47ab'
        },
        {
            name: 'Hold',
            y: 0,
            sliced: true,
            color:'#000000'
        },
        {
            name: 'ACW',
            y: 0,
            sliced: true,
            color:'#44839b'
        }]
    }]
});


$interval(function () { $scope.reload2($localStorage.id_cola); }, 10000);
    
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
 