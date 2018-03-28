'use strict';
angular
	.module('softvApp')
	.controller('suscriptoresCtrl', function($state,reportesFactory,globalService,$sce) {	

  function GetReport(){
    var Parametros = {
      'distribuidores': vm.responseparams.distribuidores,
      'plazas': vm.responseparams.plazas,
      'estados': vm.responseparams.estados,
      'mes': vm.Mes,
      'anio': vm.anio,
      'clv_reporte': (vm.tiporepsusc === 'D') ? 1 : 2
    };
    reportesFactory.GetReporteSuscriptores(Parametros).then(function (data) {
      vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + data.GetReporteSuscriptoresResult);
    });
  }
  

	 var vm=this;
   vm.report='SUSCRIPTORES';
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
        function: 'getEstadosByPlaza',
        confirm: false
      },
      {
        'step': 3,
        function: 'getfiltroPeriodo',
        confirm: true
      }
    ]
});