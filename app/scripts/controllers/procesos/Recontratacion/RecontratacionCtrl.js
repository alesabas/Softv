'use strict';

angular
    .module('softvApp')
    .controller('RecontratacionCtrl', function(RecontratacionFactory, ngNotify, $uibModal, $rootScope, $state, $localStorage){

        function initData(){
        }

        function OpenSearchCliente(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body', 
                templateUrl: 'views/procesos/ModaRecontratacionCliente.html',
                controller: 'ModaRecontratacionClienteCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'lg'/*
                resolve: {
                    Clv_UnicaNet: function () {
                        return Clv_UnicaNet;
                    }
                }*/
            });
            modalInstance.result.then(function (ContratoS) {
                GetCliente(ContratoS);
            });
        }

        function GetCliente(ContratoS){
            console.log(ContratoS);
            RecontratacionFactory.GetInfoContratoEnBaja(ContratoS).then(function(data){
                console.log(data);
                vm.Cliente = data.GetInfoContratoEnBajaResult;
                vm.IdContrato = vm.Cliente.CONTRATO;
                vm.Nombre = SetNombre(vm.Cliente.Nombre, vm.Cliente.SegundoNombre, vm.Cliente.Apellido_Paterno, vm.Cliente.Apellido_Materno);
                vm.ShowServicios = true;
                RecontratacionFactory.GetDameClv_Session().then(function(data){
                    console.log(data);
                    vm.ClvSession = data.GetDameClv_SessionResult;
                    console.log(vm.ClvSession);
                });
            });
        }

        function OpenAddServicioRecontratacion(){
            console.log('1');
            var ObjCliente = {
                'IdContrato': vm.IdContrato,
                'ClvSession': vm.ClvSession
            };
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body', 
                templateUrl: 'views/procesos/ModalServicioRecontratacion.html',
                controller: 'ModalAddServicioRecontratacionCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                resolve: {
                    ObjCliente: function () {
                        return ObjCliente;
                    }
                }
            });
            /*modalInstance.result.then(function (ContratoS) {
                GetCliente(ContratoS);
            });*/
        }

        function SetNombre(N, S, AP, AM){
            if(S == null && AM == null){
                return N + ' ' + AP;
            }else if(S != null && AM == null){
                return N + ' ' + S + ' ' + AP;
            }else if(S == null && AM != null){
                return N + ' ' + AP + ' ' + AM;
            }else if(S != null && AM != null){
                return N + ' ' + S + ' ' + AP + ' ' + AM;
            }
        }

        var vm = this;
        vm.ShowServicios = false;
        vm.OpenSearchCliente = OpenSearchCliente;
        vm.OpenAddServicioRecontratacion = OpenAddServicioRecontratacion;
        initData();

    });