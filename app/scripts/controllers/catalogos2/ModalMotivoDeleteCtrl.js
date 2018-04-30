
angular
.module('softvApp')
.controller('ModalMotivoDeleteCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state, Clv_motivo,logFactory){

    function initData(){
        var OjbMotivo = {
          'Clv_MOTCAN': Clv_motivo,
          'MOTCAN': 0,
          'op': 0
        };
        CatalogosFactory.GetBuscaMotivoCancelacion(OjbMotivo).then(function(data){
          var Motivo = data.GetBuscaMotivoCancelacionResult[0];
          vm.Clave = Motivo.Clv_motivo;
          vm.Descripcion = Motivo.Descripcion;
        });
    }

    function DeleteMotivo(){
        CatalogosFactory.GetBORMotivoCancelacion(vm.Clave).then(function(data){
            if(data.GetBORMotivoCancelacionResult == -1){

                var log={
                    'Modulo':'home.catalogos',
                    'Submodulo':'home.motivos.MotivosDeCancelacion',
                    'Observaciones':'Se eliminó motivo de cancelación',
                    'Comando':'',
                    'Clv_afectada':vm.Clave
                };

                logFactory.AddMovSist(log).then(function(result){ console.log('add'); });

                ngNotify.set('CORRECTO, se eliminó el motivo de cancelación.', 'success');
                $state.reload('home.motivos.MotivosDeCancelacion');
                 
               
                cancel();
            }else{
                ngNotify.set('ERROR, al eliminar el motivo de cancelación.', 'warn');
            }
        })
    }

    function cancel() {
        $uibModalInstance.close();
    }

    var vm = this;
    vm.Titulo = 'Eliminar Motivo de Cancelación';
    vm.Icono = 'fa fa-less';
    vm.DeleteMotivo = DeleteMotivo;
    vm.cancel = cancel;
    initData();
});