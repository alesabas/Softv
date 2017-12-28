angular
.module('softvApp')
.controller('ModalMotivoAddCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify,logFactory, $state){

    function SaveMotivo(){
        var ObjMotivo = {
            'op':0 ,
            'MOTCAN': vm.Descripcion
        };
        CatalogosFactory.GetNUEMotivoCancelacion(ObjMotivo).then(function(data){
            if(data.GetNUEMotivoCancelacionResult == 1){
                ngNotify.set('CORRECTO, se añadió un motivo de cancelación nuevo.', 'success');
                $state.reload('home.motivos.MotivosDeCancelacion');
                var log={
                    'Modulo':'home.catalogos',
                    'Submodulo':'home.motivos.MotivosDeCancelacion',
                    'Observaciones':'Se agregó motivo de cancelación ',
                    'Comando':JSON.stringify(ObjMotivo),
                    'Clv_afectada':0
                };

                logFactory.AddMovSist(log).then(function(result){ console.log('add'); });
                cancel();
            }else{
                ngNotify.set('ERROR, al añadir un motivo de cancelación nuevo.', 'warn');
            }
        });
    }

    function cancel() {
        $uibModalInstance.dismiss('cancel');
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