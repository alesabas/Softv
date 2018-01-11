'use strict';
angular
	.module('softvApp')
	.controller('hotelesCtrl', function($state,reportesFactory,reportesVariosFactory,globalService,$sce,$localStorage) {	
		

	var vm=this;
	vm.report='HOTELES';
	vm.hotelesorder = [{
		'step': 1,
		function: 'getplazas',
		confirm: true
	  }]
	
});