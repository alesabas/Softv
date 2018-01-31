angular
.module('softvApp')
.controller('ModalMotivoAddCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state){

    function SaveMotivo(){
        var ObjMotivo = {
            'op':0 ,
            'MOTCAN': vm.Descripcion
        };
        CatalogosFactory.GetNUEMotivoCancelacion(ObjMotivo).then(function(data){
            if(data.GetNUEMotivoCancelacionResult == 1){
                ngNotify.set('CORRECTO, se añadió un motivo de cancelación nuevo.', 'success');
                cancel();
            }else{
                ngNotify.set('ERROR, al añadir un motivo de cancelación nuevo.', 'warn');
            }
        });
    }

    function cancel() {
        $uibModalInstance.close();
    }

var vm = this;
vm.Titulo = 'Nuevo Motivo de Cancelación';
vm.Icono = 'fa fa-plus';
vm.Clave = 0;
vm.Disable = true;
vm.blockdelete = true;
vm.SaveMotivo = SaveMotivo;
vm.cancel = cancel;
});