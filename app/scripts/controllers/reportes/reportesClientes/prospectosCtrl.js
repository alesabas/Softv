'use strict';
angular
	.module('softvApp')
	.controller('prospectosCtrl', function($state,reportesFactory,reportesVariosFactory,globalService,$sce,$localStorage) {	
		

	var vm=this;
	vm.report='PROSPECTOS';
	vm.prospectosorder = [{
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