'use strict';

angular
    .module('softvApp')
    .controller('ModalEliminarRefClienteCtrl', function($uibModalInstance, $uibModal, ObjRefCliente, CatalogosFactory, $state, $rootScope, ngNotify, $localStorage){

        function DeletRefPersonal(){
            var IdReferencia = vm.IdReferencia;
            CatalogosFactory.DeletetblReferenciasClietes(IdReferencia).then(function(data){
                if(data.DeletetblReferenciasClietesResult == -1){
                    ngNotify.set('CORRECTO, se eliminó la referencia personal.', 'success');
                    SaveMovimientoSistema();
                    cancel();
                }else{
                    ngNotify.set('ERROR, al eliminar la referencia personal.', 'warn');
                    cancel();
                }
            });
        }

        function SaveMovimientoSistema(){
            var objMovSist = {
                'Clv_usuario': $localStorage.currentUser.idUsuario, 
                'Modulo': 'home.catalogos', 
                'Submodulo': 'home.catalogos.clientes', 
                'Observaciones': 'Se eliminó referencia a cliente', 
                'Usuario': $localStorage.currentUser.usuario, 
                'Comando': '', 
                'Clv_afectada': vm.IdContrato
            };
            CatalogosFactory.AddMovSist(objMovSist).then(function(data){
            });
        }

        function cancel() {
            $uibModalInstance.close();
        }

        var vm = this;
        vm.IdReferencia = ObjRefCliente.id_referencia;
        vm.IdContrato = ObjRefCliente.contrato;
        vm.NombreRef = ObjRefCliente.nombre;
        vm.TelefonoRef = ObjRefCliente.telefono;
        vm.EmailRef = ObjRefCliente.email;
        vm.DireccionRef = ObjRefCliente.direccion;
        vm.cancel = cancel;
        vm.DeletRefPersonal = DeletRefPersonal;
        
    });