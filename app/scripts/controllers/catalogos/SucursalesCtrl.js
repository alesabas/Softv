'use strict';

angular
  .module('softvApp')
  .controller('SucursalesCtrl', function (CatalogosFactory, atencionFactory) {

    function initData() {

      atencionFactory.getPlazas().then(function (data) {
        vm.plazas = data.GetMuestra_Compania_RelUsuarioListResult;
        vm.plaza = vm.plazas[0];
        buscar(3);
      });

    }

    function buscar(op) {

      var Parametros = {
        'Clv_Sucursal': (op === 0) ? vm.clave : 0,
        'Nombre': (op === 1) ? vm.descripcion : '',
        'OP': op,
        'idcompania': (op === 2) ? vm.Plaza.id_compania : 0
      };     
      CatalogosFactory.GetSUCURSALES(Parametros)
        .then(function (data) {
            vm.suscursales=data.GetSUCURSALESResult;
          console.log(data);         
        });

    }





    var vm = this;
    initData();
    vm.buscar = buscar;

  });
