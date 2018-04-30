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
                    var log={
                        'Modulo':'home.catalogos',
                        'Submodulo':'home.catalogos.tipos_servicios',
                        'Observaciones':'Se registró nuevo tipo de servicio ',
                        'Comando':JSON.stringify(objTipServ_New),
                        'Clv_afectada':vm.IdTipoServicio
                    };

                    logFactory.AddMovSist(log).then(function(result){ console.log('add'); });
                    ngNotify.set('CORRECTO, se añadió un tipo de servicio nuevo.', 'success');
				    cancel();
                }else{
                    ngNotify.set('ERROR, al añadir un tipo de servicio nuevo.', 'warn');
				    cancel();
                }
            });
        }
        
        function cancel() {
            $uibModalInstance.close();
        }

        var vm = this;
        vm.Titulo = 'Editar Tipo de Servicio - ';
        vm.Icono = 'fa fa-pencil-square-o';
        vm.InpDis = false;
        vm.SaveTipoServicio = SaveTipoServicio;
        vm.cancel = cancel;
        initData();
    });