'use strict';
var filtrosReporte = {
  bindings: {
    report: '='
  },
  controller: function (reportesVariosFactory, $localStorage,reportesFactory,$filter,globalService,$sce) {

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
          console.log(result);
          vm.options = {};
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

    function getRangosFechas(){
      vm.muestraFiltrosDist = false;
      vm.muestraRangosFecha = true;
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
      vm.step= vm.step+1;  
      console.log(vm.step);
      if (report === 'PROSPECTOS') {
        
        vm.prospectosOrder.forEach(function(item){
          if(item.step== vm.step){
          vm.confirm=item.confirm;          
          if(item.function==='getplazas') { 
            vm.distribuidores=vm.options.selectedItems;
            getplazas();
          }
          else if(item.function==='getRangosFechas'){ getRangosFechas();}
          }
        })
          
        
      }
    }

    function generarReporte(){
      if(vm.report === 'PROSPECTOS'){        
        reportesFactory.GetReporteProspectos(vm.distribuidores,vm.options.selectedItems,$filter('date')(vm.fechainicio, 'yyyy/MM/dd'),$filter('date')(vm.fechafin, 'yyyy/MM/dd'))
        .then(function(data){
          vm.url=$sce.trustAsResourceUrl(globalService.getUrlReportes()+'/Reportes/'+data.GetReporteProspectosResult);
          console.log(data);
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
     
    //globales
    vm.plazas=[];
    vm.distribuidores=[];
    vm.prospectosOrder=[
        {'step':1,function:'getplazas',confirm:false },
        {'step':2,function:'getRangosFechas', confirm:true }
    ]
    getDistribuidores();


  },
  templateUrl: 'views/components/filtrosReporte.html',
  controllerAs: '$ctrl'
};

angular.module('softvApp').component('filtrosReporte', filtrosReporte);
