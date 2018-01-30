'use strict';

angular
    .module('softvApp')
    .controller('ModalTipoServicioFormViewCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state, Clv_TipSer){

        function initData(){
            CatalogosFactory.GetDeepTipServ_New(Clv_TipSer).then(function(data){
                var TipoServicioResult = data.GetDeepTipServ_NewResult;
                vm.TipoServicio = TipoServicioResult.Concepto;
                vm.IdTipoServicio = TipoServicioResult.Clv_TipSer;
            });
        }
        
        function cancel() {
            $uibModalInstance.close();
        }

        var vm = this;
        vm.Titulo = 'Detalle Tipo de Servicio - ';
        vm.Icono = 'fa fa-eye';
        vm.InpDis = true;
        vm.cancel = cancel;
        initData();
    });