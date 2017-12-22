'use strict';

angular
  .module('softvApp')
  .controller('resetAparatosCtrl', function ($uibModal, atencionFactory, procesoFactory, $localStorage, ngNotify,$rootScope) {


    function initData() {
        atencionFactory.serviciosNuevo().then(function (data) {
        vm.servicios = data.GetMuestraTipSerPrincipal2ListResult;
        vm.selectedServicio = vm.servicios[0];
      });
    }

    function EnterContrato(event) {
      if (event.keyCode == 13) {
        if (vm.selectedServicio == null) {
          ngNotify.set('Seleccione el servicio que tiene el cliente', 'error');
          return;
        }
        DetalleContrato();

      }
    }


    function DetalleContrato() {

      if (vm.contratoSelected == null || vm.contratoSelected == '' || !(/^\d{1,9}-\d{1,9}$/.test(vm.contratoSelected))) {
        ngNotify.set('Coloque un contrato válido ej. 15-1', 'error');
        return;
      }
      var res = vm.contratoSelected.split("-");
      if (res.length == 1) {
        ngNotify.set('Coloque un contrato válido ej. 15-1', 'error');
        return
      }
      LimpiaInformacion();
      var param = {};
      param.contrato = vm.contratoSelected;
      param.servicio = vm.selectedServicio.Clv_TipSerPrincipal;
      param.op = 0;
     
      atencionFactory.buscarCliente(param).then(function (data) {       
        if (data.GetuspBuscaContratoSeparado2ListResult.length == 0) {
          ngNotify.set('El cliente no tiene contratado el servicio, seleccione otro tipo por favor.', 'error');
          return;
        }

        var detalle = data.GetuspBuscaContratoSeparado2ListResult[0];
        var contrato = detalle.ContratoBueno;
        vm.GlobalContrato = contrato;
        console.log(vm.GlobalContrato);
        atencionFactory.ValidaContrato(vm.GlobalContrato, vm.selectedServicio.Clv_TipSerPrincipal).then(function (data) {
         
          if (data.GetuspContratoServListResult[0].Pasa == true) {
            vm.NombreCliente = detalle.Nombre + detalle.Apellido_Paterno + " " + detalle.Apellido_Materno;

            vm.Calle = detalle.CALLE;
            vm.Numero = detalle.NUMERO;
            vm.Colonia = detalle.COLONIA;
            vm.Ciudad = detalle.CIUDAD          

            procesoFactory.GetMuestraServCteReset(vm.GlobalContrato,vm.selectedServicio.Clv_TipSerPrincipal,vm.contratoSelected.split("-")[1]).then(function(reset){
                console.log('reset',reset);
                vm.aparatosReset=reset.GetMuestraServCteResetResult;
                atencionFactory.getServiciosCliente(contrato).then(function (data) {
                    vm.ServiciosCliente = data.GetDameSerDelCliFacListResult;
                    atencionFactory.GetConAtenTelCte(vm.GlobalContrato).then(function (data) {
                      vm.Telefono = data.GetConAtenTelCteResult.Telefono;
                    });
                  });
            });
           
          } else {
            LimpiaInformacion();
            ngNotify.set('El cliente no tiene contratado el servicio, seleccione otro tipo por favor.', 'error');
          }
        });


      });

    }


    function LimpiaInformacion() {
      vm.NombreCliente = '';
      vm.Calle = '';
      vm.Numero = '';
      vm.Colonia = '';
      vm.Ciudad = '';
      vm.Telefono = '';
      vm.GlobalContrato = null;
      vm.ServiciosCliente = '';  
      vm.GlobalContrato = null;
      vm.NombreCliente = 'No especificado';
      vm.DireccionCliente = 'No especificado';
      vm.ServiciosCliente = '';
      vm.aparatosReset=[];
     
    }

    function ModalClientes() {
      var options = {};
      options.CLV_TIPSER = vm.selectedServicio.Clv_TipSerPrincipal;
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/procesos/ModalBuscaCliente.html',
        controller: 'ModalBuscaClienteCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        size: "lg",
        resolve: {
          options: function () {
            return options;
          }
        }
      });
    }

    $rootScope.$on('cliente_seleccionado', function (e, detalle) {
        LimpiaInformacion();
      var contrato = detalle.ContratoBueno;
      vm.GlobalContrato = contrato;
      vm.contrato = detalle.CONTRATO;
      vm.contratoSelected = detalle.CONTRATO;
      vm.NombreCliente = detalle.Nombre + detalle.Apellido_Paterno + " " + detalle.Apellido_Materno;
      vm.Calle = detalle.CALLE;
      vm.Numero = detalle.NUMERO;
      vm.Colonia = detalle.COLONIA;
      vm.Ciudad = detalle.CIUDAD;
      atencionFactory.GetConAtenTelCte(vm.GlobalContrato).then(function (data) {
        vm.Telefono = data.GetConAtenTelCteResult.Telefono;
      });
      
      procesoFactory.GetMuestraServCteReset(vm.GlobalContrato,vm.selectedServicio.Clv_TipSerPrincipal,vm.contratoSelected.split("-")[1]).then(function(reset){
        console.log('reset',reset);
        vm.aparatosReset=reset.GetMuestraServCteResetResult;
        atencionFactory.getServiciosCliente(contrato).then(function (data) {
            vm.ServiciosCliente = data.GetDameSerDelCliFacListResult;
          });

      });
      

    })

    function Reset(x){
        procesoFactory.GetResetServCte(vm.GlobalContrato,x.CLV_CABLEMODEM,vm.selectedServicio.Clv_TipSerPrincipal,x.clv_unicanet).then(function(data){
        ngNotify.set('Comando ejecutado correctamente','success');
           
        });
    }


    var vm = this;
    initData();
    vm.EnterContrato = EnterContrato;
    vm.ModalClientes = ModalClientes;
    vm.titulo = 'Reset de aparatos';
    vm.Reset=Reset;
    vm.aparatosReset=[];
  });
