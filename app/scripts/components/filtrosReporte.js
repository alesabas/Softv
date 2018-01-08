'use strict';
var filtrosReporte = {
  bindings: {
    report: '='
  },
  controller: function (reportesVariosFactory, $localStorage,reportesFactory,$filter,globalService,$sce,atencionFactory,CatalogosFactory) {

   function getTipoServicios(){
    atencionFactory.getServicios().then(function(result){
     vm.Tiposervicios=result.GetMuestraTipSerPrincipalListResult;      
    });
   } 

   function getServicios(tiposer){
   var obj= {'Clv_TipSer': tiposer, 'Clv_Servicio': 0, 'Descripcion':'', 'Clv_Txt': '', 'Op': 2, 'idcompania': 1}
    CatalogosFactory.GetServicios_NewList(obj).then(function(result){
     var servicios=[];
     result.GetServicios_NewListResult.forEach(function(item){
        if(item.Es_Principal==true){   servicios.push(item); }
      });
      vm.options = {
        filterPlaceHolder: 'filtrar servicios',
        labelAll: 'Todos los servicios',
        labelSelected: 'servicios seleccionados',
        labelShow: 'Descripcion',
        orderProperty: 'Descripcion',
        items: servicios,
        selectedItems: []
      };
    });
   }

    function getDistribuidores() {
      reportesVariosFactory.mostrarDistribuidorByUsuario($localStorage.currentUser.idUsuario)
        .then(function (data) {
          vm.options = {
            filterPlaceHolder: 'filtrar distribuidor',
            labelAll: 'Todos los distribuidores',
            labelSelected: 'Distribuidores seleccionados',
            labelShow: 'Nombre',
            orderProperty: 'Nombre',
            items: data.GetDistribuidorByUsuarioResult,
            selectedItems: []
          };       
       });
    };

    function getplazas() {
      reportesVariosFactory.mostrarPlazaByDistribuidor($localStorage.currentUser.idUsuario, vm.options.selectedItems)
        .then(function (result) {      
          vm.options = {
            filterPlaceHolder: 'filtrar plazas',
            labelAll: 'Todos las plazas',
            labelSelected: 'Plazas seleccionadas',
            labelShow: 'razon_social',
            orderProperty: 'razon_social',
            items: result.GetPlazasByDistribuidorResult,
            selectedItems: []
          };
        });
    }

    function getEstadosByPlaza(){
      reportesVariosFactory.mostrarEstadoByPlaza(vm.plazas)
      .then(function (result) {      
        vm.options = {
          filterPlaceHolder: 'filtrar estados',
          labelAll: 'Todos los estados',
          labelSelected: 'estados seleccionadas',
          labelShow: 'Nombre',
          orderProperty: 'Nombre',
          items: result.GetEstadosByplazaResult,
          selectedItems: []
        }; 
      });
    }  

    function transfer(from, to, index) {
      if (index >= 0) {
        to.push(from[index]);
        from.splice(index, 1);
      } else {
        for (var i = 0; i < from.length; i++) {
          to.push(from[i]);
        }
        from.length = 0;
      }
    };

    function next(report) {
      console.log(report);
      vm.step= vm.step+1;      
      if (report === 'PROSPECTOS') {
        
        vm.prospectosOrder.forEach(function(item){
          if(item.step== vm.step){
          vm.confirm=item.confirm;          
          if(item.function==='getplazas') { 
            vm.distribuidores=vm.options.selectedItems;
            getplazas();
          }
          else if(item.function==='getRangosFechas'){ 
            vm.muestraFiltrosDist = false;
            vm.muestraRangosFecha = true;
          }
          }
        })          
      }
      if (report ==='HOTELES'){
        vm.hotelesOrder.forEach(function(item){
          if(item.step== vm.step){
          vm.confirm=item.confirm;         
          if(item.function==='getplazas') { 
             vm.distribuidores=vm.options.selectedItems;
                getplazas();
               }          
           }
        }) 
      }
      if (report ==='SUSCRIPTORES'){
        vm.suscriptoresOrder.forEach(function(item){
          if(item.step== vm.step){
          vm.confirm=item.confirm;         
          if(item.function==='getplazas') { 
             vm.distribuidores=vm.options.selectedItems;
                getplazas();
          }
          if(item.function==='getEstadosByPlaza') {            
            vm.plazas=vm.options.selectedItems;          
             getEstadosByPlaza();
         }
         if(item.function==='getfiltroPeriodo') {           
          vm.muestraFiltrosDist = false;
          vm.muestrafiltroPeriodo = true;
           }             
          }
        }) 
      }
      if(report=='PERMANENCIA'){
        vm.permanenciaOrder.forEach(function(item){
          if(item.step== vm.step){
          vm.confirm=item.confirm;        
          if(item.function==='getplazas') { 
            vm.distribuidores=vm.options.selectedItems;
            getplazas();
          }
          if(item.function==='getfiltroPermanencia'){ 
            vm.muestraFiltrosDist = false;
            vm.muestrafiltroPermanencia = true;
          }
          if(item.function==='getServicios'){
            vm.plazas=  vm.options.selectedItems;           
            vm.muestraFiltrosDist = true;
            vm.muestrafiltroPermanencia = false;           
            getServicios(vm.servicioPerm.Clv_TipSerPrincipal);            
          }
          }
        })          
      }
    }

    function generarReporte(){
      if(vm.report === 'PROSPECTOS'){        
        reportesFactory.GetReporteProspectos(vm.distribuidores,vm.options.selectedItems,$filter('date')(vm.fechainicio, 'yyyy/MM/dd'),$filter('date')(vm.fechafin, 'yyyy/MM/dd'))
        .then(function(data){
          vm.url=$sce.trustAsResourceUrl(globalService.getUrlReportes()+'/Reportes/'+data.GetReporteProspectosResult);       
        });
      }
      if(vm.report === 'HOTELES'){  
        reportesFactory.GetReporteHoteles(vm.distribuidores,vm.options.selectedItems)
        .then(function(data){
          vm.url=$sce.trustAsResourceUrl(globalService.getUrlReportes()+'/Reportes/'+data.GetReporteHotelesResult);         
        });
      }
      if(vm.report ==='SUSCRIPTORES'){
        var Parametros = {
          'distribuidores':vm.distribuidores,
          'plazas':vm.plazas,
          'estados':vm.options.selectedItems,
          'mes':vm.Mes,
          'anio':vm.anio,
          'clv_reporte':(vm.tiporepsusc==='D')?1:2
        };
        reportesFactory.GetReporteSuscriptores(Parametros).then(function(data){
          vm.url=$sce.trustAsResourceUrl(globalService.getUrlReportes()+'/Reportes/'+data.GetReporteSuscriptoresResult);
        });
      }
      if(vm.report==='PERMANENCIA'){
        var Parametros = {
          'distribuidores':vm.distribuidores,
          'plazas':vm.plazas,
          'servicios':vm.options.selectedItems,
          'mesInicio':vm.permInicioMes.id,
          'anioInicio':vm.permInicioAnio,
          'mesFin':vm.permFinMes.id,
          'anioFin': vm.permFinAnio,
          'StrmesInicio':vm.permInicioMes.nombre,
          'StrmesFin': vm.permInicioMes.nombre,
          'Clv_tipser':vm.servicioPerm.Clv_TipSerPrincipal
        };

        reportesFactory.GetReportePermanencia(Parametros)
        .then(function(data){ 
          vm.url=$sce.trustAsResourceUrl(globalService.getUrlReportes()+'/Reportes/'+data.GetReportePermanenciaResult);
         });
      }
    
    }

    var vm = this;
    vm.next = next;
    vm.transfer = transfer;
    vm.options = {};
    vm.step=0;
    vm.confirm=false;
    vm.muestraFiltrosDist = true;
    vm.muestraRangosFecha = false;
    vm.generarReporte=generarReporte;  
    vm.muestrafiltroPermanencia=false;
    //globales
    vm.plazas=[];
    vm.distribuidores=[];
    vm.prospectosOrder=[
        {'step':1,function:'getplazas',confirm:false },
        {'step':2,function:'getRangosFechas', confirm:true }
    ]
    vm.hotelesOrder=[
      {'step':1,function:'getplazas',confirm:true }      
    ]
    vm.suscriptoresOrder=[
      {'step':1,function:'getplazas',confirm:false } ,
      {'step':2,function:'getEstadosByPlaza',confirm:false },
      {'step':3,function:'getfiltroPeriodo',confirm:true }        
    ]
    vm.permanenciaOrder=[
      {'step':1,function:'getplazas',confirm:false } ,      
      {'step':3,function:'getfiltroPermanencia',confirm:false } ,
      {'step':4,function:'getServicios',confirm:true }    
    ];
    vm.meses=[
      {'id':1 ,'nombre': 'Enero' },
      {'id':2,'nombre': 'Febrero' },
      {'id':3 ,'nombre': 'Marzo' },
      {'id':4 ,'nombre': 'Abril' },
      {'id':5 ,'nombre': 'Mayo' },
      {'id':6 ,'nombre': 'Junio' },
      {'id':7 ,'nombre': 'Julio' },
      {'id':8 ,'nombre': 'Agosto' },
      {'id':9 ,'nombre': 'Septiembre' },
      {'id':10 ,'nombre': 'Octubre' },
      {'id':11 ,'nombre': 'Noviembre' },
      {'id':12 ,'nombre': 'Diciembre' },
    ]
    getDistribuidores();
    getTipoServicios();
  },
  templateUrl: 'views/components/filtrosReporte.html',
  controllerAs: '$ctrl'
};
angular.module('softvApp').component('filtrosReporte', filtrosReporte);
