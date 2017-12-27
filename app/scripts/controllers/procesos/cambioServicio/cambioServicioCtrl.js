'use strict';

angular
  .module('softvApp')
  .controller('cambioServicioCtrl', function (procesoFactory, CatalogosFactory, ngNotify, atencionFactory, $uibModal, $localStorage) {

    function initData() {
    var obj={
        'clave':0,
        'Contrato': 0,
        'Nombre': '',
        'Clv_TipSer': 0,
        'Op':0,
        'idcompania': 488        
        }
      procesoFactory.GetConCambioServCliente(obj).then(function (result) {
        console.log(result.GetConCambioServClienteResult);
      });

    }

    

    var vm = this;
    initData();
   
  });
