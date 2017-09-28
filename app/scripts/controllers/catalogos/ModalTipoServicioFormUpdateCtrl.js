'use strict';

angular
    .module('softvApp')
    .controller('ModalTipoServicioFormUpdateCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state, Clv_TipSer){

        function initData(){
            CatalogosFactory.GetDeepTipServ_New(Clv_TipSer).then(function(data){
                var TipoServicioResult = data.GetDeepTipServ_NewResult;
                vm.TipoServicio = TipoServicioResult.Concepto;
                vm.IdTipoServicio = TipoServicioResult.Clv_TipSer;
            });
        }

        function SaveTipoServicio(){
            var objTipServ_New = {
                'Concepto': vm.TipoServicio,
                'Clv_TipSer': vm.IdTipoServicio,
                'Habilitar': 0
            }
            CatalogosFactory.UpdateTipServ_New(objTipServ_New).then(function(data){
                if(data.UpdateTipServ_NewResult == -1){
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
        vm.Titulo = 'Editar Registro - ';
        vm.Icono = 'fa fa-pencil-square-o';
        vm.SaveTipoServicio = SaveTipoServicio;
        vm.cancel = cancel;
        initData();
    });