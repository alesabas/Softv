'use strict';
angular
	.module('softvApp')
	.controller('reporteAgendaTecnicoCtrl', function($state,reportesFactory,reportesVariosFactory,globalService,$sce,$localStorage) {	
		

	var vm=this;
	vm.report='AGENDATECNICO';
	vm.agendaorder = [{
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