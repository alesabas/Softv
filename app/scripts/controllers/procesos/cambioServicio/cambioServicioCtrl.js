'use strict';

angular
  .module('softvApp')
  .controller('cambioServicioCtrl', function (procesoFactory, CatalogosFactory, ngNotify, atencionFactory, $uibModal, $localStorage) {

    function initData() {
      filtros(0);

    }

    function getPlazas(){
      atencionFactory.getPlazas().then(function (data) {
        vm.plazas = data.GetMuestra_Compania_RelUsuarioListResult;
      });
    }

    function eliminaCambio(item){
      var info=item;
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/procesos/ModalEliminaCambioServicio.html',
        controller: 'ModalEliminaCambioServicioCtrl',
        controllerAs: '$ctrl',
        backdrop: 'static',
        keyboard: false,
        size: 'sm',
        resolve: {
          info: function () {
            return info;
          }
        }
      });

      modalInstance.result.then(function (result) {
        filtros(0);
      }, function () {});

    }

    function filtros(op){
      var obj={
        'clave':0,
        'Contrato': 0,
        'Nombre': '',
        'Clv_TipSer': 0,
        'Op':op,
        'idcompania': (vm.selectedPlaza)?vm.selectedPlaza.id_compania:0       
        }
      procesoFactory.GetConCambioServCliente(obj).then(function (result) {
        vm.cambios=result.GetConCambioServClienteResult;
      });
    }

    

    var vm = this;
    vm.filtros=filtros;
    vm.eliminaCambio=eliminaCambio;
    initData();    
    getPlazas();
    
  });
