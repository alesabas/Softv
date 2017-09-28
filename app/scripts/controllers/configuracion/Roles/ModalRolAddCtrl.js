'use strict';
angular
    .module('softvApp')
    .controller('ModalRolAddCtrl', function(RolesFactory, $uibModalInstance, ngNotify, $state){
        
        function SaveRol(){
            var rol = {
                'IdRol': 0,
                'Nombre': vm.Rol,
                'Descripcion': vm.Descripcion,
                'Estado': (vm.Estado == 'T') ? true : false
            };
            RolesFactory.GetAddRol(rol).then(function(data){
                var RolResult = data.GetAddRolResult;
                if(RolResult > 0){
                    ngNotify.set('CORRECTO, se añadió un rol nuevo.', 'success');
                    $state.reload('home.configuracion.rolesweb');
                    cancel();
                }else{
                    ngNotify.set('ERROR, al añadir un rol nuevo.', 'warn');
                    $state.reload('home.configuracion.rolesweb');
                    cancel();
                }
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Nuevo Rol';
        vm.Icono = 'fa fa-plus';
        vm.Estado = 'T';
        vm.SaveRol = SaveRol;
        vm.cancel = cancel;
    });