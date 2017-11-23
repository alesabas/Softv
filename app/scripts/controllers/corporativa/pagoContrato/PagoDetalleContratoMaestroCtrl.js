'use strict'
angular
  .module('softvApp')
  .controller('PagoDetalleContratoMaestroCtrl', PagoDetalleContratoMaestroCtrl);


function PagoDetalleContratoMaestroCtrl($stateParams, ContratoMaestroFactory,corporativoFactory, pagosMaestrosFactory, ngNotify,$uibModal) {

  var vm = this;
  vm.IdContratoMaestro = $stateParams.id;
  init();
  vm.agregarListaGeneral=agregarListaGeneral;


  function init() {
    corporativoFactory.singleContrato($stateParams.id).then(function (data) {
        console.log('contrato',data);
        vm.Contratos = data.GetRelContratosResult[0];
        pagosMaestrosFactory.cobraSaldoMaestro(vm.IdContratoMaestro).then(function (data) {
            vm.saldo = data.GetCobraContratoMaestroResult;
            HacerPregunta(vm.saldo.Clv_SessionPadre, 900);
            pagosMaestrosFactory.dameDetalle(vm.saldo.Clv_SessionPadre).then(function (detallePago) {
      
              if (detallePago.GetDetalleContratosMaestrosListResult.lista.length == 0) {
                vm.blockedocta = true;
                vm.blockPagar = true;
                vm.color = '#f3f3f3';
                ngNotify.set('No hay conceptos para facturar', 'warn');
              } else {
                vm.blockedocta = false;
                vm.blockPagar = false;
                vm.color = 'white';
              }
              vm.detallePago = detallePago.GetDetalleContratosMaestrosListResult.lista;
              vm.sumaPagos = detallePago.GetDetalleContratosMaestrosListResult.datosdetalle;
              vm.detallePagoAux = vm.detallePago;
              DetalleFactura(vm.saldo.Clv_SessionPadre);
            });
          });
    });

  
  }

  function DetalleFactura(clv_session) {
    ContratoMaestroFactory.Sp_DameDetalleFacturaMaestra(clv_session).then(function (result) {
      vm.detalleFactura = result.GetSp_DameDetalleFacturaMaestraListResult;
    });
  }

  function HacerPregunta(clv_session, option) {

    ContratoMaestroFactory.uspHaz_Pregunta(vm.IdContratoMaestro, 900).then(function (data) {
      vm.pregunta = data.GetDeepuspHaz_Pregunta_CMResult.Pregunta;
      vm.MesesAdelantados = data.GetDeepuspHaz_Pregunta_CMResult.MesesAdelantados;

      if (vm.pregunta != null) {
        var object = {};
        object.clv_session = clv_session;
        object.contrato = vm.IdContratoMaestro;
        object.pregunta = vm.pregunta;
        object.MesesAdelantados = vm.MesesAdelantados;
        object.option = option;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/corporativa/PagoContrato/ModalHazPregunta.html',
          controller: 'ModalHazPreguntaCtrl',
          controllerAs: '$ctrl',
          backdrop: 'static',
          keyboard: false,
          size: 'md',
          resolve: {
            object: function () {
              return object;
            }
          }
        });

      }

    });
  }

  function agregarListaGeneral(){        
    vm.animationsEnabled = true;
    vm.modalInstanceLista = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/corporativa/agregaListaPago.html',
        controller: 'agregaListaPagoCtrl',
        controllerAs: '$ctrl',
        backdrop: 'static',
        keyboard: false,
        size: 'lg',
        resolve: {
            Contratos : function () {
                return vm.Contratos;
            },
            Clv_SessionPadre : function () {
                return vm.saldo.Clv_SessionPadre;
            },
            detallePagoTodo : function () {
                return vm.detallePagoTodo;
            }
        }
    });   
    vm.modalInstanceLista.result.then(function () {
        pagosMaestrosFactory.dameDetalle(vm.saldo.Clv_SessionPadre).then(function (detallePago) {
            vm.detallePago = detallePago.GetDetalleContratosMaestrosListResult.lista.filter(function(value) { return value.Importe >= 0 });
            vm.detallePagoTodo = detallePago.GetDetalleContratosMaestrosListResult.lista;
            vm.sumaPagos = detallePago.GetDetalleContratosMaestrosListResult.datosdetalle;
            vm.detallePagoAux = vm.detallePago;
        });
        DetalleFactura(vm.saldo.Clv_SessionPadre);
    }, function () {
        //alert('Modal dismissed');
    });
}


}
