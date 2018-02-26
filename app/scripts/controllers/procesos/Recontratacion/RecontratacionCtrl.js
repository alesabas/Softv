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
                size: 'lg'
            });
            modalInstance.result.then(function (ObjCliente) {
                GetCliente(ObjCliente.Op, ObjCliente.IdContrato, ObjCliente.ContratoCompuesto);
            });
        }

        function SetCliente(){
            if (event.keyCode === 13) {
                event.preventDefault();
                GetCliente(1, 0, vm.Cliente.ContratoCom);
            }
        }

        function GetCliente(Op, IdContrato, ContratoCompuesto){
            ResetMod();
            var ObjCliente = {
                'Op': Op,
                'IdContrato': IdContrato,
                'ContratoCompania': ContratoCompuesto
            }
            RecontratacionFactory.GetInfoContratoEnBaja(ObjCliente).then(function(data){
                var ClienteResult = data.GetInfoContratoEnBajaResult;
                if(ClienteResult.CONTRATO != null){
                    vm.Cliente = ClienteResult;
                    vm.IdContrato = vm.Cliente.CONTRATO;
                    vm.Nombre = SetNombre(vm.Cliente.Nombre, vm.Cliente.SegundoNombre, vm.Cliente.Apellido_Paterno, vm.Cliente.Apellido_Materno);
                    vm.ShowServicios = true;
                    RecontratacionFactory.GetDameClv_Session().then(function(data){
                        vm.ClvSession = data.GetDameClv_SessionResult;
                    });
                }else{
                    ngNotify.set('ERROR, no se encontró algún resultado con este contrato.', 'warn');
                    ResetMod();
                }
            });
        }

        function OpenAddServicioRecontratacion(){
            var ObjCliente = {
                'IdContrato': vm.IdContrato,
                'ClvSession': vm.ClvSession,
                'IdRecon': vm.IdRecon
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
                size: 'md',
                resolve: {
                    ObjCliente: function () {
                        return ObjCliente;
                    }
                }
            });
            modalInstance.result.then(function (IdRecon) {
                vm.IdRecon = IdRecon;
                GetServicioList();
            });
        }

        function GetServicioList(){
            RecontratacionFactory.GetArbolRecontratacion(vm.ClvSession).then(function(data){
                vm.ServicioList = data.GetArbolRecontratacionResult;
                vm.expandedNodes = [];
                angular.forEach(vm.ServicioList, function(value, key) {
                    vm.expandedNodes.push(value);
                });
            });
        }

        function SaveRecontratacion(){
            if(vm.IdContrato > 0 && vm.ClvSession > 0 && vm.ServicioList.length > 0){
                var ObjRecontratacion = {
                    'Contrato': vm.IdContrato,
                    'Clv_Usuario': $localStorage.currentUser.usuario,
                    'ClvSession': vm.ClvSession
                };
                RecontratacionFactory.GetGrabaReContratacion(ObjRecontratacion).then(function(data){
                    ngNotify.set('CORRECTO, se guardó recontratación.', 'success');
                    ResetMod();
                });
            }else{
                ngNotify.set('ERROR, aun no se ha seleccionado el cliente y/o no se han agregado los servicios a recontratar.', 'warn');
            }
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

        function ResetMod(){
            vm.Cliente = null;
            vm.IdContrato = 0;
            vm.Nombre = '';
            vm.ServicioList = [];
            vm.ShowServicios = false;
            if(vm.ClvSession > 0){
                DeleteClvSession();
            }
        }

        function DeleteClvSession(){
            RecontratacionFactory.GetBorReconSession(vm.ClvSession).then(function(data){
                vm.ClvSession = 0;
            });
        }

        var vm = this;
        vm.IdContrato = 0;
        vm.ClvSession = 0;
        vm.ServicioList = [];
        vm.IdRecon = 0;
        vm.ShowServicios = false;
        vm.OpenSearchCliente = OpenSearchCliente;
        vm.SetCliente = SetCliente;
        vm.OpenAddServicioRecontratacion = OpenAddServicioRecontratacion;
        vm.SaveRecontratacion = SaveRecontratacion;
        vm.ResetMod = ResetMod;
        initData();
        
    });