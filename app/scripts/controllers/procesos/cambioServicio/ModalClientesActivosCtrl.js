'use strict';
angular
  .module('softvApp')
  .controller('ModalClientesActivosCtrl', function ($uibModalInstance, procesoFactory, $uibModal, $rootScope, ngNotify, $localStorage) {

    function initialData() {
      buscar(3);
    }

    function buscar(op) {
	
		if(!vm.calle){ vm.calle=''}
		if(!vm.numero){ vm.numero=''}
      var Parametros = {
        'contrato': (op == 0) ? vm.contrato.split('-')[0] : 0,
        'nombre': (op == 1) ? vm.nombre : '',
        'calle': (op == 2) ? vm.calle : '',
        'numero': (op == 2) ? vm.numero : '',
        'ciudad': (op == 2) ? vm.ciudad : '',
        'op': op,
        'clvColonia': 0,
        'idcompania': (op == 0) ? vm.contrato.split('-')[1] : 0,
        'SETUPBOX':  (op == 6) ? vm.SETUPBOX:'',
        'TARJETA': 0,
        'ClvUsuario': $localStorage.currentUser.idUsuario
      };
      procesoFactory.GetuspDameClientesActivos(Parametros).then(function (result) {
         vm.Clientes=result.GetuspDameClientesActivosResult;
      });

    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    var vm = this;
    vm.cancel = cancel;
	initialData();
	vm.buscar=buscar;
  });
