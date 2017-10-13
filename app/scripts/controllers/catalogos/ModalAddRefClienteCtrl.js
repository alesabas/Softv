'use strict';

angular
    .module('softvApp')
    .controller('ModalAddRefClienteCtrl', function($uibModalInstance, $uibModal, CatalogosFactory, $state, $rootScope, ngNotify, IdContrato){
        
        function UpdateRefPersonal(){
            if(vm.IdContrato != undefined){
                var objtblReferenciasClietes = {
                    'contrato': vm.IdContrato,
                    'nombre': vm.NombreRef,
                    'direccion': vm.DireccionRef,
                    'email': vm.EmailRef,
                    'telefono': vm.TelefonoRef,
                    'id_referencia': 0,
                    'op': 0,
                    'tipo': 'C'
                };
                CatalogosFactory.AddtblReferenciasClietes(objtblReferenciasClietes).then(function(data){
                    if(data.AddtblReferenciasClietesResult == -1){
                        ngNotify.set('CORRECTO, se guardó la referencia personal.', 'success');
                        $rootScope.$emit('LoadRefPersonal', vm.IdContrato);
                        cancel();
                    }else{
                        ngNotify.set('ERROR, al guardar la referencia personal.', 'warn');
                        $rootScope.$emit('LoadRefPersonal', vm.IdContrato);
                        cancel();
                    }
                });
            }else{
                ngNotify.set('Aun no se han registrado los datos personales.', 'warn');
            }
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Icono = 'fa fa-plus';
        vm.Titulo = 'Nueva Referencia Personal';
        vm.cancel = cancel;
        vm.IdContrato = IdContrato;
        vm.UpdateRefPersonal = UpdateRefPersonal;

    });