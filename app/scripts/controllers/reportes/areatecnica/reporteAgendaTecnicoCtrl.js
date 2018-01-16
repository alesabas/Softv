'use strict';
angular
	.module('softvApp')
	.controller('reporteAgendaTecnicoCtrl', function($state,reportesFactory,$filter,reportesVariosFactory,globalService,$sce,$localStorage) {	
		
 function GetReport(){
  reportesFactory.GetReporteAgendaTecnico(vm.tecnicoAgenda.clv_tecnico, $filter('date')(vm.fechainicio, 'yyyy/MM/dd'), $filter('date')(vm.fechafin, 'yyyy/MM/dd'))
  .then(function (data) {
    console.log(data);
    vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + data.GetReporteAgendaTecnicoResult);
  });
 }


	var vm=this;
  vm.report='AGENDATECNICO';
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
        function: 'muestrafiltroAgenda',
        confirm: true
      }
    ]
	
});