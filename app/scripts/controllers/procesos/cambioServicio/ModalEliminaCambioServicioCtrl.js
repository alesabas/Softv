'use strict';
angular
  .module('softvApp')
  .controller('ModalEliminaCambioServicioCtrl', function ($uibModalInstance, procesoFactory, $uibModal, $rootScope, ngNotify, $localStorage,info) {

     

    function ok() {
        procesoFactory.GetBorCambioServCliente(info.Contrato).then(function(result){
           if(result.GetBorCambioServClienteResult.Res==1){
               ngNotify.set(result.GetBorCambioServClienteResult.Msj,'warn');
           }else{
            ngNotify.set('El cambio de servicio se eliminó correctamente','success');
            $uibModalInstance.close(result.GetBorCambioServClienteResult.Res);
           }
         
        });   
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    var vm = this;
    vm.cancel = cancel; 
    vm.ok = ok;
    vm.message='¿Estas seguro de eliminar el  cambio de servicio? del contrato ' +info.NumContrato ; //  Contrato:'+info.NumContrato +'\n\n  Cliente: '+info.Nombre;
  });
