'use strict';

angular
    .module('softvApp')
    .controller('ModaRecontratacionClienteCtrl', function(RecontratacionFactory, $uibModalInstance, $uibModal, ngNotify, $state, $localStorage){

        function initData(){
            GetClienteList(0);
        }

        function GetClienteList(Op){
            var ObjCliente = {
                'Op': Op,
                'IdUsuario': $localStorage.currentUser.idUsuario,
                'ContratoCom': '',
                'SetUpBox': '',
                'Nombre': '',
                'Apellido_Paterno': '',
                'Apellido_Materno': '',
                'NUMERO': '',
                'Calle': '',
                'Cd_Mun': '',
                'Clv_Colonia': 0
            };
            RecontratacionFactory.Get_uspBusCliPorContratoSeparadoEnBaja(ObjCliente).then(function(data){
                console.log(data);
                vm.ClienteList = data.Get_uspBusCliPorContratoSeparadoEnBajaResult;
                console.log(vm.ClienteList);
                vm.ViewList = (vm.ClienteList.length > 0)? true:false;
                console.log(vm.ViewList);
            });
        }

        function cancel() {
            $uibModalInstance.close();
        }

        var vm = this;
        vm.ViewList = false;
        vm.cancel = cancel;
        initData();
        
    });