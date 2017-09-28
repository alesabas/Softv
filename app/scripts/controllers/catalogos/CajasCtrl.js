'use strict';

angular
  .module('softvApp')
  .controller('CajasCtrl', function (CatalogosFactory, atencionFactory, $uibModal) {

    function init() {
      atencionFactory.getPlazas().then(function (data) {
        vm.plazas = data.GetMuestra_Compania_RelUsuarioListResult;
        vm.plaza = vm.plazas[0];
        buscar(2);
      });
    }

    function buscar(op) {
      var Parametros = {
        'Clave': (op === 0) ? vm.clave : 0,
        'Descripcion': (op === 1) ? vm.Caja : '',
        'OP': op,
        'idcompania': (op === 3) ? vm.Plaza.id_compania : 0
      };
      CatalogosFactory.GetCatalogoCajasList(Parametros)
        .then(function (data) {
          vm.cajas = data.GetCatalogoCajasListResult;
          console.log(data);
        });

    } 

    function OpenDeleteCaja() {
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/catalogos/ModalCajaEliminar.html',
        controller: 'ModalCajaEliminarCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        class: 'modal-backdrop fade',
        size: 'sm'
      });
    }

    var vm = this;
    init(); 
    vm.OpenDeleteCaja = OpenDeleteCaja;
    vm.buscar=buscar;
  });
