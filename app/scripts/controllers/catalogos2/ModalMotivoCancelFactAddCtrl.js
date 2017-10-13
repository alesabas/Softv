angular
.module('softvApp')
.controller('ModalMotivoCancelFactAddCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state){

    function SaveMotivo(){
        var ObjMotivo = {
            'Bandera': 0 , 
            'Descripcion': vm.Descripcion
        };
        CatalogosFactory.GetNUEMOTIVOSFACTURACANCELACION(ObjMotivo).then(function(data){
            if(data.GetNUEMOTIVOSFACTURACANCELACIONResult == 1){    
                ngNotify.set('CORRECTO, se añadió un motivo de cancelación de factura nuevo.', 'success');
                $state.reload('home.motivos.CancelacionFactura');
                cancel();
            }else{
                ngNotify.set('ERROR, al añadir un motivo de cancelación de factura nuevo.', 'warn');
            }
        });
    }

    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

    var vm = this;
    vm.Titulo = 'Nuevo Motivo de Cancelacion de Factura';
    vm.Icono = 'fa fa-plus';
    vm.SaveMotivo = SaveMotivo;
    vm.cancel = cancel;

});