'use strict';

angular
    .module('softvApp')
    .controller('ModalEditarRefClienteCtrl', function($uibModalInstance, $uibModal, ObjRefCliente, CatalogosFactory, $state, $rootScope, ngNotify){

        function UpdateRefPersonal(){
            var objtblReferenciasClietes = {
                'contrato': vm.IdContrato,
                'nombre': vm.NombreRef,
                'direccion': vm.DireccionRef,
                'email': vm.EmailRef,
                'telefono': vm.TelefonoRef,
                'id_referencia': vm.IdReferencia,
                'op': 1,
                'tipo': 'C'
            };
            CatalogosFactory.UpdatetblReferenciasClietes(objtblReferenciasClietes).then(function(data){
                if(data.UpdatetblReferenciasClietesResult == -1){
                    ngNotify.set('CORRECTO, se guardó la referencia personal.', 'success');
                    $rootScope.$emit('LoadRefPersonal', vm.IdContrato);
                    cancel();
                }else{
                    ngNotify.set('ERROR, al guardar la referencia personal.', 'warn');
                    $rootScope.$emit('LoadRefPersonal', vm.IdContrato);
                    cancel();
                }
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Icono = 'fa fa-pencil-square-o';
        vm.Titulo = 'Editar Referencia Personal - # ';
        vm.IdReferencia = ObjRefCliente.id_referencia;
        vm.IdContrato = ObjRefCliente.contrato;
        vm.NombreRef = ObjRefCliente.nombre;
        vm.TelefonoRef = ObjRefCliente.telefono;
        vm.EmailRef = ObjRefCliente.email;
        vm.DireccionRef = ObjRefCliente.direccion;
        vm.cancel = cancel;
        vm.UpdateRefPersonal = UpdateRefPersonal;
        
    });