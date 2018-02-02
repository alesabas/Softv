'use strict';

angular
    .module('softvApp')
    .controller('ModalEditarRefClienteCtrl', function($uibModalInstance, $uibModal, ObjRefCliente, CatalogosFactory, $state, $rootScope, ngNotify, $localStorage){

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
                    SaveMovimientoSistema(objtblReferenciasClietes)
                    cancel();
                }else{
                    ngNotify.set('ERROR, al guardar la referencia personal.', 'warn');
                    SaveMovimientoSistema(objtblReferenciasClietes)
                    cancel();
                }
            });
        }

        function SaveMovimientoSistema(Comando){
            var objMovSist = {
                'Clv_usuario': $localStorage.currentUser.idUsuario, 
                'Modulo': 'home.catalogos', 
                'Submodulo': 'home.catalogos.clientes', 
                'Observaciones': 'Se editó referencia a cliente', 
                'Usuario': $localStorage.currentUser.usuario, 
                'Comando': JSON.stringify(Comando), 
                'Clv_afectada': vm.IdContrato
            };
            CatalogosFactory.AddMovSist(objMovSist).then(function(data){
            });
        }

        function cancel() {
            $uibModalInstance.close();
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