'use strict';

angular
    .module('softvApp')
    .controller('ModalFoliosCanceladosCtrl', function(SeriesFactory, $localStorage, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope){
        
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function initData(){
            var ObjClvSession = {
                'Clv_Session': 0
            };
            SeriesFactory.Get_clv_session_Reportes(ObjClvSession).then(function(data){
                vm.Clv_Session = data.Get_clv_session_ReportesResult.Clv_Session;
                GetVendedorProList(3, $localStorage.currentUser.idUsuario);
            });
        }

        function GetVendedorProList(Op, ClvUsuario){
            var ObjVendedor = {
                'Clv_Session': vm.Clv_Session,
                'Op': Op,
                'ClvUsuario': ClvUsuario
            };
            SeriesFactory.GetConVentasVendedoresPro(ObjVendedor).then(function(data){
                vm.VendedorProList = data.GetConVentasVendedoresProResult;
            });
        }

        function GetVendedorTmpList(){
            var ObjVendedor = {
                'Clv_Session': vm.Clv_Session
            };
            SeriesFactory.GetConVentasVendedoresTmp(ObjVendedor).then(function(data){
                vm.VendedorTmpList = data.GetConVentasVendedoresTmpResult;
            });
        }

        function AddVendedor(Op, Clv_Vendedor){
            var ObjVendedor = {
                'Clv_Vendedor': Clv_Vendedor,
                'Clv_Session': vm.Clv_Session,
                'Op': Op
            };
            SeriesFactory.GetInsertarVendedorTmp(ObjVendedor).then(function(data){
                GetVendedorProList(1, 0);
                GetVendedorTmpList();
            });
        }

        function DeleteVendedor(Op, Clv_Vendedor){
            var ObjVendedor = {
                'Clv_Vendedor': Clv_Vendedor,
                'Clv_Session': vm.Clv_Session,
                'Op': Op
            };
            SeriesFactory.GetBorrarVendedorTmp(ObjVendedor).then(function(data){
                GetVendedorProList(1, 0);
                GetVendedorTmpList();
            });
        }

        var vm = this;
        vm.View = false;
        vm.AddVendedor = AddVendedor;
        vm.DeleteVendedor = DeleteVendedor;
        vm.cancel = cancel;
        initData();

    });