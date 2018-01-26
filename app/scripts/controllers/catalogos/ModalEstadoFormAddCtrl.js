'use strict';

angular
    .module('softvApp')
    .controller('ModalEstadoFormAddCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state){

        function SaveEstado(){
            var ObjEstado = {
                'Nombre': vm.Estado,
                'opcion': 0
            };
            CatalogosFactory.GetValidaNomEdo(ObjEstado).then(function(data){
                if(data.GetValidaNomEdoResult == 0){
                    var objEstados_New = {
                        'Nombre': vm.Estado,
                        'opcion': 0,
                        'clv_estadomod': 0
                    };
                    CatalogosFactory.AddEstados_New(objEstados_New).then(function(data){
                        if(data.AddEstados_NewResult > 0){
                            ngNotify.set('CORRECTO, se añadió un estado nuevo.', 'success');
                            cancel();
                        }else{
                            ngNotify.set('ERROR, al añadir un estado nuevo.', 'warn');
                            cancel();
                        }
                    });
                }else if(data.GetValidaNomEdoResult == 1){
                    ngNotify.set('ERROR, Ya existe un estado con el mismo nombre.', 'warn');
                }
            });
        }

        function cancel(){
            $uibModalInstance.close();
        }

        var vm = this;
        vm.Titulo = 'Nuevo Estado';
        vm.Icono = 'fa fa-plus';
        vm.View = false;
        vm.SaveEstado = SaveEstado;
        vm.cancel = cancel;

    });