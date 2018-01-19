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
    initData();    
    getPlazas();
  });
