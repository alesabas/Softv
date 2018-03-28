'use strict';
angular
  .module('softvApp')
  .controller('hotelesCtrl',
   function ($state, reportesFactory,reportesVariosFactory,globalService,$sce,$localStorage,trabajosFactory,$filter,atencionFactory,CatalogosFactory) {
    function GetReport() {
		reportesFactory.GetReporteHoteles(vm.responseparams.distribuidores, vm.responseparams.plazas)
		.then(function (data) {
		  vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + data.GetReporteHotelesResult);
		});
	}

    var vm = this;
    vm.plazas = [];
    vm.distribuidores = [];
    vm.responseparams = {};
    vm.showfilters = false;
    vm.GetReport = GetReport;
    vm.report = 'HOTELES';
    vm.url = '';
    vm.order = [{
      'step': 1,
      function: 'getplazas',
      confirm: true
	},
	{
		'step': 2,
		function: 'getReporBtn',
		confirm: true
	  }

    ]

  });
