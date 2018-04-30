angular
.module('softvApp')
.controller('ModalMotivoCancelFactAddCtrl', function(CatalogosFactory, $uibModalInstance, logFactory,ngNotify, $state){

    function SaveMotivo(){
        var ObjMotivo = {
            'Bandera': 0 , 
            'Descripcion': vm.Descripcion
        };
        CatalogosFactory.GetNUEMOTIVOSFACTURACANCELACION(ObjMotivo).then(function(data){
            

            if(data.GetNUEMOTIVOSFACTURACANCELACIONResult == 1){    

                var log={
                    'Modulo':'home.catalogos',
                    'Submodulo':'home.motivos.CancelacionFactura',
                    'Observaciones':'Se registró motivo de cancelación factura ',
                    'Comando':JSON.stringify(ObjMotivo),
                    'Clv_afectada':0
                };    
                logFactory.AddMovSist(log).then(function(result){ console.log('add'); });

                ngNotify.set('CORRECTO, se añadió un motivo de cancelación de factura nuevo.', 'success');
                cancel();
            }else{
                ngNotify.set('ERROR, al añadir un motivo de cancelación de factura nuevo.', 'warn');
            }
        });
    }

    function cancel() {
        $uibModalInstance.close();
    }

    var vm = this;
    vm.Titulo = 'Nuevo Motivo de Cancelación';
    vm.Icono = 'fa fa-plus';
    vm.SaveMotivo = SaveMotivo;
    vm.cancel = cancel;

});