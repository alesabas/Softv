'use strict';
angular
	.module('softvApp')
	.controller('prospectosCtrl', function($state,reportesFactory,reportesVariosFactory,globalService,$sce,$localStorage, $filter) {	
  
    function GetReport() {
      reportesFactory.GetReporteProspectos(vm.responseparams.distribuidores, vm.responseparams.plazas, $filter('date')(vm.fechainicio, 'yyyy/MM/dd'), $filter('date')(vm.fechafin, 'yyyy/MM/dd'))
      .then(function (data) {
        vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + data.GetReporteProspectosResult);
      });

    }
  

	var vm=this;
  vm.report='PROSPECTOS';
  vm.GetReport=GetReport;
  vm.responseparams={};
  vm.showfilters=false;
 
	vm.order = [{
        'step': 1,
        function: 'getplazas',
        confirm: false
      },
      {
        'step': 2,
        function: 'getRangosFechas',
        confirm: true
      }
    ]
	
});