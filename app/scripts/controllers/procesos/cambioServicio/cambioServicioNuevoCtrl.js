'use strict';

angular
  .module('softvApp')
  .controller('cambioServicioNuevoCtrl', function (CatalogosFactory, procesoFactory, ngNotify, $state, atencionFactory, $uibModal, $localStorage) {

    function initData() {
      procesoFactory.GetDameClv_SessionProceso().then(function (result) {
        vm.clvsession = result.GetDameClv_SessionProcesoResult;

        atencionFactory.getServicios().then(function (data) {
          vm.servicios = data.GetMuestraTipSerPrincipalListResult;
          vm.selectedServicio = vm.servicios[0];

        });
      });
    }

    function ModalClientes() {
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/procesos/ModalClientesActivos.html',
        controller: 'ModalClientesActivosCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        size: "lg"
      });

      modalInstance.result.then(function (selectedItem) {
        console.log(selectedItem);
        vm.datosCliente = selectedItem;
        ServiciosActuales();
      }, function () {});
    }


    function ServiciosActuales() {

      var Parametros = {
        'contrato': vm.datosCliente.CONTRATO,
        'clv_servicio': vm.selectedServicio.Clv_TipSerPrincipal
      };
      procesoFactory.GetServiciosClienteActuales(Parametros).then(function (result) {
        console.log(result.GetServiciosClienteActualesResult);
        if (result.GetServiciosClienteActualesResult.ServiciosCliente.length > 0) {
          vm.serviciosCliente = result.GetServiciosClienteActualesResult.ServiciosCliente;
          vm.muestraServCliente == true;

        } else {
          ngNotify.set(result.GetServiciosClienteActualesResult.mensaje, 'warn');
          vm.muestraServCliente == false;
        }

      });
    }

    function verOpciones(item) {
      console.log(item);
      vm.servicioActual=item;
      vm.muestraServPosibles = true;
      var Parametros = {
        'contrato': vm.datosCliente.CONTRATO,
        'clv_tipservicio': vm.selectedServicio.Clv_TipSerPrincipal,
        'clv_servicio': item.clv_servicio,
        'ultimomes': item.ultimomes,
        'ultimoanio': item.ultimoanio,
        'idcompania': 1,
        'Clv_Session': vm.clvsession
      };
      procesoFactory.GetServiciosClientePosibles(Parametros).then(function (result) {
        console.log(result);
        vm.serviciosPosibles = result.GetServiciosClientePosiblesResult.ServiciosCliente;
      });
    }

    function CambioServicio() {
      ServiciosActuales();
    }

    function DetalleContrato() {
      if (vm.contratoSelected) {
        var Parametros = {
          'contrato': vm.contratoSelected.split('-')[0],
          'nombre': '',
          'calle': '',
          'numero': '',
          'ciudad': '',
          'op': 0,
          'clvColonia': 0,
          'idcompania': vm.contratoSelected.split('-')[1],
          'SETUPBOX': '',
          'TARJETA': 0,
          'ClvUsuario': $localStorage.currentUser.idUsuario
        };
        procesoFactory.GetuspDameClientesActivos(Parametros).then(function (result) {
          if (result.GetuspDameClientesActivosResult.length > 0) {
            vm.datosCliente = result.GetuspDameClientesActivosResult[0];
            console.log();
            ServiciosActuales(vm.datosCliente,'datos cliente');
          } else {
            ngNotify.set('ingresa un contrato válido', 'danger');
          }
        });
      } else {
        ngNotify.set('ingresa un contrato válido', 'danger');
      }

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

    function CambiarServicio(item){
      var Parametros = {        
        'contrato':  vm.datosCliente.CONTRATO,
        'contratoNet': vm.servicioActual.contratonet,
        'clvtipser': vm.selectedServicio.Clv_TipSerPrincipal,
        'Clv_ServOld': vm.servicioActual.clv_servicio,
        'Clv_ServNew': item.clv_servicio,
        'Monto': item.cobro,
        'Clv_Session':  vm.clvsession,
        'Id':item.id
      };
      console.log(Parametros);
    procesoFactory.GetCambiaServCliente(Parametros).then(function(result){
      $state.go('home.procesos.cambioservicio');
     
        ngNotify.set('El cambio de servicio se guardo correctamemnte','success');
      });
     
    }

    var vm = this;
    initData();
    vm.servicioActual={};
    vm.ModalClientes = ModalClientes;
    vm.verOpciones = verOpciones;
    vm.muestraServCliente = true;
    vm.muestraServPosibles = false;
    vm.CambioServicio = CambioServicio;
    vm.EnterContrato = EnterContrato;
    vm.CambiarServicio=CambiarServicio;
  });
