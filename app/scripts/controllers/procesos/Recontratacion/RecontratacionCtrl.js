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
            modalInstance.result.then(function (ObjCliente) {
                console.log(ObjCliente);
                GetCliente(ObjCliente.Op, ObjCliente.IdContrato, ObjCliente.ContratoCompuesto);
            });
        }

        function SetCliente(){
            if (event.keyCode === 13) {
                event.preventDefault();
                GetCliente(1, 0, vm.Cliente.ContratoCom);
                /*if (vm.clv_orden == 0) {
                    detalleContrato();
                } else {
                    PreguntaAtencion(1);
                }*/
            }
        }

        function GetCliente(Op, IdContrato, ContratoCompuesto){
            console.log(Op, IdContrato, ContratoCompuesto);
            var ObjCliente = {
                'Op': Op,
                'IdContrato': IdContrato,
                'ContratoCompania': ContratoCompuesto
            }
            RecontratacionFactory.GetInfoContratoEnBaja(ObjCliente).then(function(data){
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
            console.log(ObjCliente);
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
                size: 'md',
                resolve: {
                    ObjCliente: function () {
                        return ObjCliente;
                    }
                }
            });
            modalInstance.result.then(function () {
                GetServicioList();
            });
        }

        function GetServicioList(){
            RecontratacionFactory.GetArbolRecontratacion(vm.ClvSession).then(function(data){
                console.log(data);
                vm.ServicioList = data.GetArbolRecontratacionResult;
                vm.expandedNodes=[];
                angular.forEach(vm.ServicioList, function(value, key) {
                    vm.expandedNodes.push(value);
                });
            });
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
        vm.SetCliente = SetCliente;
        vm.OpenAddServicioRecontratacion = OpenAddServicioRecontratacion;
        initData();

    });