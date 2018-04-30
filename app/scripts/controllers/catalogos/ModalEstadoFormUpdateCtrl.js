'use strict';

angular
    .module('softvApp')
    .controller('ModalEstadoFormUpdateCtrl', function(CatalogosFactory, $uibModalInstance,logFactory, ngNotify, $state, Clv_Estado){
        
        function initData(){
            CatalogosFactory.GetDeepEstados_New(Clv_Estado).then(function(data){
                var EstadoResult = data.GetDeepEstados_NewResult;
                vm.IdEstado = EstadoResult.Clv_Estado;
                vm.Estado = EstadoResult.Nombre;
                vm.EstadoRef = EstadoResult.Nombre;
                vm.Titulo = 'Editar Estado - '+vm.Estado;
            });
        }

        function SaveEstado(){
            if(vm.Estado != vm.EstadoRef){
                var ObjEstado = {
                    'Nombre': vm.Estado,
                    'opcion': 0
                };
                CatalogosFactory.GetValidaNomEdo(ObjEstado).then(function(data){
                    if(data.GetValidaNomEdoResult == 0){
                        UpdateEstado();
                    }else if(data.GetValidaNomEdoResult == 1){
                        ngNotify.set('ERROR, Ya existe un estado con el mismo nombre.', 'warn');
                    }
                });
            }else{
                UpdateEstado();
            }
        }

        function UpdateEstado(){
            var objEstados_New = {
                'Nombre': vm.Estado,
                'opcion': 0,
                'clv_estadomod': vm.IdEstado
            };
            CatalogosFactory.UpdateEstados_New(objEstados_New).then(function(data){
                if(data.UpdateEstados_NewResult == -1){
                    var log={
                        'Modulo':'home.catalogos',
                        'Submodulo':'home.catalogos.estados',
                        'Observaciones':'Se editó  estado ',
                        'Comando':JSON.stringify(objEstados_New),
                        'Clv_afectada':vm.IdEstado
                    };

                    logFactory.AddMovSist(log).then(function(result){ console.log('add'); });

                    ngNotify.set('CORRECTO, se guardó el estado.', 'success');
                    cancel();
                }else{
                    ngNotify.set('ERROR, al guardar el estado.', 'warn');
                    cancel();
                }
            });
        }

        function cancel() {
            $uibModalInstance.close();
        }

        var vm = this;
       
        vm.Icono = 'fa fa-pencil-square-o';
        vm.View = false;
        vm.SaveEstado = SaveEstado;
        vm.cancel = cancel;
        initData();

    });