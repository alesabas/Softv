'use strict';

angular
    .module('softvApp')
    .controller('ModaRecontratacionClienteCtrl', function(RecontratacionFactory, $uibModalInstance, $uibModal, ngNotify, $state, $localStorage){

        function initData(){
            GetColoniaList();
            GetClienteList(0);
        }

        function GetColoniaList(){
            RecontratacionFactory.Get_uspConsultaColoniasPorUsuario().then(function(data){
                console.log(data);
                vm.ColoniaList = data.Get_uspConsultaColoniasPorUsuarioResult;
                vm.Colonia = vm.ColoniaList[0];
            });
        }

        function GetClienteList(Op){
            var ObjCliente = {
                'Op': Op,
                'IdUsuario': $localStorage.currentUser.idUsuario,
                'ContratoCom': (vm.Contrato != null && vm.Contrato != undefined)? vm.Contrato:'',
                'SetUpBox': (vm.SetUpBox != null && vm.SetUpBox != undefined)? vm.SetUpBox:'',
                'Nombre': (vm.Nombre != null && vm.Nombre != undefined)? vm.Nombre:'',
                'Apellido_Paterno': (vm.ApellidoP != null && vm.ApellidoP != undefined)? vm.ApellidoP:'',
                'Apellido_Materno': (vm.ApellidoM != null && vm.ApellidoM != undefined)? vm.ApellidoM:'',
                'NUMERO': (vm.Numero != null && vm.Numero != undefined)? vm.Numero:'',
                'Calle': (vm.Calle != null && vm.Calle != undefined)? vm.Calle:'',
                'Cd_Mun': (vm.Ciudad != null && vm.Ciudad != undefined)? vm.Ciudad:'',
                'Clv_Colonia': (vm.Colonia != null && vm.Colonia != undefined)? vm.Colonia.Clv_Colonia:0
            };
            console.log(ObjCliente);
            RecontratacionFactory.Get_uspBusCliPorContratoSeparadoEnBaja(ObjCliente).then(function(data){
                console.log(data);
                vm.ClienteList = data.Get_uspBusCliPorContratoSeparadoEnBajaResult;
                console.log(vm.ClienteList);
                vm.ViewList = (vm.ClienteList.length > 0)? true:false;
                console.log(vm.ViewList);
                vm.Contrato = null;
                vm.SetUpBox = null;
                vm.Nombre = null;
                vm.ApellidoP = null;
                vm.ApellidoM = null;
                vm.Numero = null;
                vm.Calle = null;
                vm.Ciudad = null;
            });
        }

        function SetCliente(IdContrato) {
            var ObjCliente = {
                'Op': 0,
                'IdContrato': IdContrato,
                'ContratoCompuesto': ''
            }
            console.log(ObjCliente);
            $uibModalInstance.close(ObjCliente);
        }

        function Cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.ViewList = false;
        vm.GetClienteList = GetClienteList;
        vm.SetCliente = SetCliente;
        vm.Cancel = Cancel;
        initData();
        
    });