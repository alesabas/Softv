'use strict';

angular
    .module('softvApp')
    .controller('ModalTipoServicioFormAddCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state){
        
        function SaveTipoServicio(){
            var objTipServ_New = {
                'Concepto': vm.TipoServicio,
                'Habilitar': 0
            }
            CatalogosFactory.AddTipServ_New(objTipServ_New).then(function(data){
                if(data.AddTipServ_NewResult > 0){
                    ngNotify.set('CORRECTO, se añadió un tipo de servicio nuevo.', 'success');
                    $state.reload('home.catalogos.tipos_servicios');
				    cancel();
                }else{
                    ngNotify.set('ERROR, al añadir un tipo de servicio nuevo.', 'warn');
                    $state.reload('home.catalogos.tipos_servicios');
				    cancel();
                }
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Nuevo Registro';
        vm.Icono = 'fa fa-plus';
        vm.SaveTipoServicio = SaveTipoServicio;
        vm.cancel = cancel;
    });