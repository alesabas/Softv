'use strict';

angular
    .module('softvApp')
    .controller('ModalFoliosFaltantesCtrl', function(SeriesFactory, $localStorage, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope){
        
        function initData(){
            var ObjVendedorList = {
                'ClvUsuario': $localStorage.currentUser.idUsuario, 
                'Op': 0
            };
            SeriesFactory.GetVendedores_dosList(ObjVendedorList).then(function(data){
                vm.VendedorList = data.GetVendedores_dosListResult;
                vm.Vendedor = vm.VendedorList[0];
                GetSerieList();
            });
        }

        function GetSerieList(){
            if(vm.Vendedor != undefined){
                var ObjSerieList = {
                    'ClvVendedor': vm.Vendedor.Clv_Vendedor, 
                    'Contrato': 0
                };
                SeriesFactory.GetUltimo_SERIEYFOLIOList(ObjSerieList).then(function(data){
                    vm.SerieList = data.GetUltimo_SERIEYFOLIOListResult;
                    vm.Serie = vm.SerieList[0];
                    GetFolioDisponible();
                });
            }
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.View = false;
        vm.GetSerieList = GetSerieList;
        vm.cancel = cancel;
        initData();

    });