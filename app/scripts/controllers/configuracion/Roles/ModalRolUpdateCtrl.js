'use strict';
angular
    .module('softvApp')
    .controller('ModalRolUpdateCtrl', function(RolesFactory, $uibModalInstance, ngNotify, $state, IdRol){
        
        function initData(){
            RolesFactory.GetRoleById(IdRol).then(function(data){
                var Rol = data.GetRoleByIdResult;
                vm.IdRol = Rol.IdRol;
                vm.Rol = Rol.Nombre;
                vm.Descripcion = Rol.Descripcion;
                vm.Estado = (Rol.Estado == true) ? 'T' : 'F'
            });
        }
        
        function SaveRol(){
            var rol = {
                'IdRol': vm.IdRol,
                'Nombre': vm.Rol,
                'Descripcion': vm.Descripcion,
                'Estado': (vm.Estado == 'T') ? true : false
            };
            RolesFactory.GetUpdateRol(rol).then(function(data){
                var RolResult = data.GetUpdateRolResult;
                if(RolResult == 1){
                    ngNotify.set('CORRECTO, se guardó el rol.', 'success');
                    $state.reload('home.configuracion.rolesweb');
                    cancel();
                }else{
                    ngNotify.set('ERROR, al guardar el rol.', 'warn');
                    $state.reload('home.configuracion.rolesweb');
                    cancel();
                }
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Editar Rol - ';
        vm.Icono = 'fa fa-pencil-square-o';
        vm.Estado = 'T';
        vm.SaveRol = SaveRol;
        vm.cancel = cancel;
        initData();
    });