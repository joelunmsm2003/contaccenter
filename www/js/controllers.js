angular.module('app.controllers', ['angularjs-gauge','ngStorage'])
  
.controller('menuCtrl', ['$scope', '$stateParams','$localStorage','$location','$ionicHistory',//,/ The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$localStorage,$location,$ionicHistory) {

    $scope.salir=function(){

        
        $location.url('/page1')

        delete $localStorage

        $ionicHistory.clearCache();


      ionic.Platform.exitApp();
    }

}])
   
.controller('indicadoresCtrl', ['$scope', '$stateParams','$http','$localStorage','$filter','$interval','$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$localStorage,$filter,$interval,$ionicPopup) {



  $http.get("http://192.241.240.186:1000/loginuser/"+$localStorage.user+'/'+$localStorage.pass).success(function(response) {

     $localStorage.servicioback = response['servicios']

})

  $scope.grafic =0




    ///Popup

   // When button is clicked, the popup will be shown...
   $scope.showPopup = function() {
      $scope.data = {}
    
      // Custom popup
      var myPopup = $ionicPopup.show({
         template: '<li style="text-decoration: none;list-style: none;padding: 10px;" ng-repeat="item in servicios" ng-click="traecolas(item);cierra()">{{item.srvn}}</li>',
         scope: $scope,
         title:'Seleccione:',
         buttons: [
         { text: 'Cerrar',
            type: 'button-balanced'
          },
        ]
            
      });


       $scope.cierra=function(){

          myPopup.close()


         }   
   };


      $scope.showPopup1 = function() {
      $scope.data = {}
    
      // Custom popup
      var myPopup1 = $ionicPopup.show({
         template: '<li style="text-decoration: none;list-style: none;padding: 10px;" ng-repeat="item in colas" ng-click="seleccionacola(item);cierra()">{{item.cmpn}}</li>',
         scope: $scope,
         title:'Seleccione:',
         buttons: [
         { text: 'Cerrar',
           type: 'button-balanced'
          },
        ]

      });


       $scope.cierra=function(){
          myPopup1.close()
         }   
   };


   $scope.showPopup2 = function() {
      $scope.data = {}
    
      // Custom popup
      var myPopup2 = $ionicPopup.show({
         scope: $scope,
         title:'Informacion',
         template:'<center>No se encontraron datos</center>',
         buttons: [
         { text: 'Aceptar',
          type: 'button-balanced button-outline'
          },
        ]

      });

   


       $scope.cierra=function(){
          myPopup2.close()
         }   
   };



        $scope.servicios = $filter('filter')($localStorage.servicioback,{'tipo_reporte':3})


        if($scope.servicios.length>0){

          $scope.colas = $scope.servicios[0]['cmps']

          $localStorage.servicio= $scope.servicios[0]['id']

          $scope.id_cola = $scope.colas[0]['id']

          $localStorage.id_cola = $scope.id_cola

          $scope.serv = $scope.servicios[0]

          $scope.col = $scope.servicios[0]['cmps'][0]


        }

        if($scope.servicios.length==0){

            $scope.showPopup2()


        }







    $scope.seleccionacola=function(data){


        $scope.col = data



        if(data){

            $scope.grafic =1

            $scope.grafica(data.id)

            $localStorage.id_cola = data.id

            console.log('Actualizando grafica...',data)
        }

        

        //$scope.colas=data.cmps

    }

    $scope.traecolas =function(data){


        $scope.serv.srvn = data.srvn

        $localStorage.servicio = data.id  

        $scope.seleccionacola(data.cmps[0])

        $scope.logeandose=1

        if (data){

            $scope.colas=data.cmps


        }

        
    }

    $scope.logeandose=1

    $scope.ventasflag = false

    $scope.grafica=function(){


      $http.get("http://192.241.240.186:1000/reporte4/"+$localStorage.servicio+'/'+$localStorage.id_cola+'/').success(function(response) {

                $scope.gestiones = response['gest']

                 $scope.consultas = response['cons']

                  $scope.reclamos = response['recl']


                  console.log('servicio',$localStorage.servicio)


                


                  $scope.contitular = response['ctit']

                  $scope.ventas = response['vent']


                  var chart = $('#containerx').highcharts();



                  $scope.reporte4 = response


                    if($localStorage.servicio==143){

                      $scope.ventasflag = false
                    }

                    if($localStorage.servicio==142 || $localStorage.servicio==144){


                      $scope.ventasflag = true

                      $scope.reporte4.cons = response['ctit']

                      $scope.reporte4.recl = response['vent']

                      chart.series[0].update({name:"Ventas",color:'#5cbf0d'}, false);
                      chart.series[1].update({name:"Contactos Titular"}, false);
                      chart.series[2].update({name:"Gestiones",color:'#e84530'}, false);
                      chart.redraw();

                  }


                 

                chart.series[0].data[0].update(parseInt($scope.reporte4.recl))
                chart.series[1].data[0].update(parseInt($scope.reporte4.cons))
                chart.series[2].data[0].update(parseInt($scope.reporte4.gest))

                 $scope.grafic=0
        


            });



    }


  $scope.reload=function(cola){


      $http.get("http://192.241.240.186:1000/loginuser/"+$localStorage.user+'/'+$localStorage.pass).success(function(response) {

      $localStorage.servicioback = response['servicios']

      })


    // if ($localStorage.id_cola==undefined){

    //     $scope.logeandose=1

    // }
    
        // $scope.servicios = response['servicios']

        // $scope.colas = response['servicios'][0]['cmps']


        $scope.servicios = $filter('filter')($localStorage.servicioback,{'tipo_reporte':3})



        console.log('Indicadores',$scope.servicios)

        if($scope.servicios.length>0){

          $scope.id_cola = $scope.servicios[0]['cmps'][0]['id']

        }

        

        if(cola){

            $scope.id_cola = cola 
        }

         // $localStorage.id_cola = $scope.id_cola

         ///Graficas

         if($scope.servicios.length>0){


            $http.get("http://192.241.240.186:1000/reporte4/"+$localStorage.servicio+'/'+$localStorage.id_cola+'/').success(function(response) {

                $scope.gestiones = response['gest']

                 $scope.consultas = response['cons']

                  $scope.reclamos = response['recl']


                  $scope.contitular = response['ctit']

                  $scope.ventas = response['vent']

                  $scope.reporte4 = response


                 var chart = $('#containerx').highcharts();


                  if($localStorage.servicio==143){

                      $scope.ventasflag = false
                    }


                  if($localStorage.servicio==142 || $localStorage.servicio==144){

                      $scope.reporte4.cons = response['ctit']

                      $scope.reporte4.recl = response['vent']

                      chart.series[0].update({name:"Ventas",color:'#5cbf0d'}, false);
                      chart.series[1].update({name:"Contactos Titular"}, false);
                      chart.series[2].update({name:"Gestiones",color:'#e84530'}, false);
                      chart.redraw();

                  }



                chart.series[0].data[0].update(parseInt($scope.reporte4.recl))
                chart.series[1].data[0].update(parseInt($scope.reporte4.cons))
                chart.series[2].data[0].update(parseInt($scope.reporte4.gest))

              


           

                 $scope.logeandose=0
        


            });



          }
          if($scope.servicios.length==0){

            $scope.logeandose=0

          }






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
        plotOptions: {
        bar: {

            groupPadding:0,
            dataLabels: {
                enabled: true
            }
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

        series: [
        {
            name: 'Reclamo',
            color: '#5cbf0d',
            data: [0]
        },
        {
            name: 'Consulta',
            color: '#2a789e',
            data: [0]
        },
        {
            name: 'Gestion',
            color: '#e84530',
            data: [0]
        } ]
    });


      

  



}])


.controller('loginCtrl', ['$scope','$stateParams','$state','$http','$localStorage','$location',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$stateParams,$state,$http,$localStorage,$location) {


     $scope.logeandose = 0

     if($localStorage.user){

     }


    $scope.ingresar=function(data){


        $scope.logeandose = 1


        //https://www.ccf.com.pe/webresources/login/


$http.get("http://192.241.240.186:1000/loginuser/"+data.usuario+'/'+data.password).success(function(response) {



     $localStorage.servicioback = response['servicios']


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





    }


}])
   
.controller('slarelevantesCtrl', ['$state','$scope', '$stateParams','$http','$timeout','$interval','$localStorage','$filter','$ionicModal','$ionicPopup',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($state,$scope, $stateParams,$http,$timeout,$interval,$localStorage,$filter,$ionicModal,$ionicPopup) {


$http.get("http://192.241.240.186:1000/loginuser/"+$localStorage.user+'/'+$localStorage.pass).success(function(response) {

    $localStorage.servicioback = response['servicios']


})


$scope.grafic=0


    ///Popup

   // When button is clicked, the popup will be shown...
   $scope.showPopup = function() {
      $scope.data = {}
    
      // Custom popup
      var myPopup = $ionicPopup.show({
         template: '<li style="text-decoration: none;list-style: none;padding: 10px;" ng-repeat="item in servicios" ng-click="traecolas(item);cierra()">{{item.srvn}}</li>',
         scope: $scope,
         title:'Seleccione:',
         buttons: [
         { text: 'Cerrar',
          type: 'button-balanced'
           },
        ]
            
      });


       $scope.cierra=function(){

          myPopup.close()


         }   
   };


      $scope.showPopup1 = function() {
      $scope.data = {}
    
      // Custom popup
      var myPopup1 = $ionicPopup.show({
         template: '<li style="text-decoration: none;list-style: none;padding: 10px;" ng-repeat="item in colas" ng-click="seleccionacola(item);cierra()">{{item.cmpn}}</li>',
         scope: $scope,
         title:'Seleccione:',
         buttons: [
         { text: 'Cerrar',
          type: 'button-balanced'
          },
        ]

      });


       $scope.cierra=function(){
          myPopup1.close()
         }   
   };


        $scope.servicios = $filter('filter')($localStorage.servicioback,{'tipo_reporte':1})

        $localStorage.servicio_sla= $scope.servicios[0]['id']

        $scope.colas = $scope.servicios[0]['cmps']

        $scope.id_cola = $scope.colas[0]['id']

        $localStorage.id_cola_sla = $scope.id_cola

        $scope.serv = $scope.servicios[0]

        $scope.col = $scope.servicios[0]['cmps'][0]

        console.log('ser,cola',$localStorage.servicio,$scope.id_cola)



    $scope.seleccionacola=function(data){


        $scope.col.cmpn = data.cmpn

        $scope.grafic=1


        if(data){



            $scope.grafica(data.id)

            

            $localStorage.id_cola_sla = data.id


        }

        //$scope.colas=data.cmps

    }

    $scope.traecolas =function(data){

        $scope.serv.srvn = data.srvn


          $scope.seleccionacola(data.cmps[0])

    

        $localStorage.servicio_sla = data.id  

        if (data){

            $scope.colas=data.cmps

            $scope.cierra()


        }

        
    }

    $scope.logeandose=1


    $scope.grafica=function(cola){

    
    $http.get("http://192.241.240.186:1000/reporte1/"+$localStorage.servicio_sla+'/'+cola).success(function(response) {

                  $scope.reporte1 = response


                  var chart = $('#chart1').highcharts();


                  chart.series[0].data[0].update(parseInt($scope.reporte1.sla))
                  chart.series[1].data[0].update(parseInt($scope.reporte1.po))
                  chart.series[2].data[0].update(parseInt($scope.reporte1.pa))


                  x=parseInt($scope.reporte1.a)+parseInt($scope.reporte1.r)

                  $scope.grafic=0 

            });


}

    $scope.reload=function(cola){


      console.log('colas..',$localStorage.id_cola_sla,$localStorage.servicio_sla)


    if ($localStorage.id_cola_sla==undefined){

        $scope.logeandose=1

    }
    
        $scope.servicios = $filter('filter')($localStorage.servicioback,{'tipo_reporte':1})

        console.log('SLA',$scope.servicios)

        $scope.id_cola = $scope.servicios[0]['cmps'][0]['id']

        if(cola){

            $scope.id_cola = cola 
        }

         ///Graficas

            $http.get("http://192.241.240.186:1000/reporte1/"+$localStorage.servicio_sla+'/'+$localStorage.id_cola_sla).success(function(response) {

                  $scope.reporte1 = response


                  var chart = $('#chart1').highcharts();


                  chart.series[0].data[0].update(parseInt($scope.reporte1.sla))
                  chart.series[1].data[0].update(parseInt($scope.reporte1.po))
                  chart.series[2].data[0].update(parseInt($scope.reporte1.pa))


                  x=parseInt($scope.reporte1.a)+parseInt($scope.reporte1.r)

                  $scope.logeandose=0 

            });


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
        width: 330
      },
        title: {
            text: null
          },


        yAxis: {
            title: {
                text: 'Valores expresados en porcentaje'
            }
        },
        plotOptions: {
        bar: {

            groupPadding:0,
            dataLabels: {
                enabled: true
            }
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


.controller('marcadorpredictivoCtrl', ['$scope', '$stateParams','$http', '$localStorage','$filter','$interval','$ionicPopup',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$localStorage,$filter,$interval,$ionicPopup) {

$scope.grafic=0


$http.get("http://192.241.240.186:1000/loginuser/"+$localStorage.user+'/'+$localStorage.pass).success(function(response) {

    $localStorage.servicioback = response['servicios']


})


          ///Popup

   // When button is clicked, the popup will be shown...
   $scope.showPopup = function() {
      $scope.data = {}
    
      // Custom popup
      var myPopup = $ionicPopup.show({
         template: '<li style="text-decoration: none;list-style: none;padding: 10px;" ng-repeat="item in servicios" ng-click="traecolas(item);cierra()">{{item.srvn}}</li>',
         scope: $scope,
         title:'Seleccione:',
         buttons: [
         { text: 'Cerrar',
            type: 'button-balanced'
          },
        ]
            
      });


       $scope.cierra=function(){

          myPopup.close()


         }   
   };


      $scope.showPopup1 = function() {
      $scope.data = {}
    
      // Custom popup
      var myPopup1 = $ionicPopup.show({
         template: '<li style="text-decoration: none;list-style: none;padding: 10px;" ng-repeat="item in colas" ng-click="seleccionacola(item);cierra()">{{item.cmpn}}</li>',
         scope: $scope,
         title:'Seleccione:',
         buttons: [
         { text: 'Cerrar',
          type: 'button-balanced'
          },
        ]

      });


       $scope.cierra=function(){
          myPopup1.close()
         }   
   };


 $scope.showPopup2 = function() {
      $scope.data = {}
    
      // Custom popup
      var myPopup2 = $ionicPopup.show({
         scope: $scope,
         title:'Informacion',
         template:'<center>No se encontraron datos</center>',
         buttons: [
         { text: 'Aceptar',
          type: 'button-balanced button-outline'
          },
        ]

      });

   


       $scope.cierra=function(){
          myPopup2.close()
         }   
   };

    $scope.logeandose=0

    $scope.servicios = $filter('filter')($localStorage.servicioback,{'tipo_reporte':2})


    if($scope.servicios.length>0){

          $scope.colas = $scope.servicios[0]['cmps']

          $scope.id_cola = $scope.colas[0]['id']

          $localStorage.id_cola_marc = $scope.id_cola

          $scope.serv = $scope.servicios[0]

          $localStorage.servicio_marc= $scope.servicios[0]['id']

          $scope.col = $scope.servicios[0]['cmps'][0]
    }

    if($scope.servicios.length==0){

        $scope.showPopup2()

    }


  ////Traendos datos

     $scope.seleccionacola=function(data){

        if(data){

            $scope.col = data

            $scope.grafica(data.id)

            $scope.grafic=1

            $localStorage.id_cola_marc = data.id
 
        }


    }

    $scope.traecolas =function(data){


        console.log('colas...',data)

        $scope.seleccionacola(data.cmps[0])

        $scope.serv.srvn = data.srvn

        $localStorage.servicio_marc=data.id

        if (data){

            $scope.colas=data.cmps

        }        
    }


$scope.grafica=function(cola){

    
      $http.get("http://192.241.240.186:1000/reporte3/"+$localStorage.servicio_marc+'/'+cola+'/').success(function(response) {

      console.log(response)

      $scope.reporte3 = response

      $scope.grafic =0

      if($scope.reporte3.aban==0){

        $scope.showPopup2()

      }

      var chart = $('#chartmarcador').highcharts();

            chart.series[0].data[0].update(parseInt($scope.reporte3.disc)-parseInt($scope.reporte3.cont)-parseInt($scope.reporte3.aban))
            chart.series[1].data[0].update(parseInt($scope.reporte3.disc))
            chart.series[2].data[0].update($scope.reporte3.cont)
            chart.series[3].data[0].update($scope.reporte3.aban)
    })


}

$scope.reload2=function(cola){
    
    $scope.servicios = $filter('filter')($localStorage.servicioback,{'tipo_reporte':2})

    console.log('MPP',$scope.servicios.length)


    // if ($localStorage.id_cola==undefined){

    //     $scope.logeandose=1

    // }


    console.log('login..',$scope.logeandose,$localStorage.id_cola)


      if($scope.servicios.length>0){

        $scope.id_cola = $scope.servicios[0]['cmps'][0]['id']

      }

      

    console.log('cola',cola)



    if(cola){

        $scope.id_cola = cola 
    
    }

    if($scope.servicios.length>0){


            $http.get("http://192.241.240.186:1000/reporte3/"+$localStorage.servicio_marc+'/'+$localStorage.id_cola_marc+'/').success(function(response) {

            $scope.reporte3 = response

            $scope.logeandose= 0

            $scope.grafic =0
         
            var chart = $('#chartmarcador').highcharts();

            chart.series[0].data[0].update(parseInt($scope.reporte3.disc)-parseInt($scope.reporte3.cont)-parseInt($scope.reporte3.aban))
            chart.series[1].data[0].update(parseInt($scope.reporte3.disc))
            chart.series[2].data[0].update($scope.reporte3.cont)
            chart.series[3].data[0].update($scope.reporte3.aban)
          

            })


    }

    // if($scope.servicios.length==0){

    //   $scope.logeandose= 0

    // }




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
        width: 330
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
        plotOptions: {
        bar: {

            groupPadding:0,
            dataLabels: {
                enabled: true
            }
        }
    },

  

      series: [ 
        {
            name: 'Otros',
            color: '#f07a34',
            data: [0]
        },
        {
            name: 'Discadas',
            color: '#5dc00d',
            data: [0]
        },
        {
            name: 'Contestadas',
            color: '#2b78a0',
            data: [0]
        },
        {
            name: 'Abandono',
            color: '#df422e',
            data: [0]
        }]
    }


    
}])


   
.controller('puestosyagentesCtrl', ['$scope', '$stateParams','$http','$interval','$localStorage','$filter','$ionicPopup',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$interval,$localStorage,$filter,$ionicPopup) {


$scope.grafic=0
$http.get("http://192.241.240.186:1000/loginuser/"+$localStorage.user+'/'+$localStorage.pass).success(function(response) {

     $localStorage.servicioback = response['servicios']

})


//Popup


   $scope.showPopup = function() {

      // Custom popup
      var myPopup = $ionicPopup.show({
         template: '<li style="text-decoration: none;list-style: none;padding: 10px;" ng-repeat="item in servicios" ng-click="traecolas(item);cierra()">{{item.srvn}}</li>',
         scope: $scope,
         title:'Seleccione:',
         buttons: [
         { text: 'Cerrar',
            type: 'button-balanced'
       },
        ]
            
      });

       $scope.cierra=function(){

          myPopup.close()

         }   
   };


      $scope.showPopup1 = function() {
      $scope.data = {}
    
      // Custom popup
      var myPopup1 = $ionicPopup.show({
         template: '<li style="text-decoration: none;list-style: none;padding: 10px;" ng-repeat="item in colas" ng-click="seleccionacola(item);cierra()">{{item.cmpn}}</li>',
         scope: $scope,
         title:'Seleccione:',
         buttons: [
         { text: 'Cerrar',
            type: 'button-balanced'
          },
        ]

      });


       $scope.cierra=function(){
          myPopup1.close()
         }   
   };


   ///


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


  $scope.servicios = $filter('filter')($localStorage.servicioback,{'tipo' : 'IN','tipo_reporte':1})

  if($scope.servicios.length>0){

      $localStorage.servicio_pues= $scope.servicios[0]['id']

      $scope.colas = $scope.servicios[0]['cmps']

      $scope.id_cola = $scope.colas[0]['id']

      $localStorage.id_cola_pues = $scope.id_cola

      $scope.serv = $scope.servicios[0]

      $scope.col = $scope.servicios[0]['cmps'][0]

  }


$scope.logeandose=1

$scope.maxvalue=0

   $scope.seleccionacola=function(data){

        $scope.grafic=1

        $scope.col = data

        if(data){

            $scope.grafica(data.id)

            $scope.logeandose=1

            $localStorage.id_cola_pues = data.id


        }

        

        //$scope.colas=data.cmps

    }

    $scope.traecolas =function(data){

        $scope.serv.srvn = data.srvn

        $localStorage.servicio_pues= data.id

     
          $scope.seleccionacola(data.cmps[0])




        

        if (data){

            $scope.colas=data.cmps


        }

        
    }

$scope.grafica=function(cola){

    $http.get("http://192.241.240.186:1000/reporte2/"+$localStorage.servicio_pues+'/'+cola).success(function(response) {

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


     $scope.grafic=0



    })

}


$scope.reload2=function(cola){




    // if ($localStorage.id_cola==undefined){

    //     $scope.logeandose=1

    // }


  $scope.servicios = $filter('filter')($localStorage.servicioback,{'tipo' : 'IN','tipo_reporte':1})

  console.log('Puestos',$scope.servicios)


    if($scope.servicios.length>0){

        $scope.id_cola = $scope.servicios[0]['cmps'][0]['id']

    }
    
    if(cola){

        $scope.id_cola = cola 
    
    }

    //$localStorage.id_cola = $scope.id_cola

    $http.get("http://192.241.240.186:1000/reporte2/"+$localStorage.servicio_pues+'/'+$localStorage.id_cola_pues).success(function(response) {

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
        pointFormat: '<b>{point.y}</b>'
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
        name:'Valor:',
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
        pointFormat: '<b>{point.y}</b>'
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
 