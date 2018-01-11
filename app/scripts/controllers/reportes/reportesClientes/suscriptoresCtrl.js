'use strict';
angular
	.module('softvApp')
	.controller('suscriptoresCtrl', function($state,reportesFactory,globalService,$sce) {	

	 var vm=this;
	 vm.report='SUSCRIPTORES';
	 vm.suscriptoresorder = [{
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