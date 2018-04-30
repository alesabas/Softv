'use strict';

angular
    .module('softvApp')
    .controller('ModalEstadoEliminarCtrl', function(CatalogosFactory, $uibModalInstance,logFactory, ngNotify, $state, Clv_Estado){

        function initData(){
            CatalogosFactory.GetDeepEstados_New(Clv_Estado).then(function(data){
                var EstadoResult = data.GetDeepEstados_NewResult;
                vm.IdEstado = EstadoResult.Clv_Estado;
                vm.Estado = EstadoResult.Nombre;
            });
        }

        function DeleteEstado(){
            var ObjEstado = {
                'Nombre': vm.Estado,
                'opcion': 1,
                'clv_estadomod': vm.IdEstado
            };
            CatalogosFactory.DeleteEstados_New(ObjEstado).then(function(data){
                if(data.DeleteEstados_NewResult == -1){

                    var log={
                        'Modulo':'home.catalogos',
                        'Submodulo':'home.catalogos.estados',
                        'Observaciones':'Se eliminó estado ',
                        'Comando':'',
                        'Clv_afectada':vm.IdEstado
                    };

                    logFactory.AddMovSist(log).then(function(result){ console.log('add'); });

                    ngNotify.set('CORRECTO, se eliminó el estado.', 'success');
                    cancel();
                }else{
                    ngNotify.set('ERROR, al eliminar el estado.', 'warn');
                    cancel();
                }
            });
        }

        function cancel() {
            $uibModalInstance.close();
        }

        var vm = this;
        vm.DeleteEstado = DeleteEstado;
        vm.cancel = cancel;
        initData();
    });