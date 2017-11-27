'use strict';

angular
    .module('softvApp')
    .controller('ModalCancelarFoliosCtrl', function(SeriesFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope, $localStorage){
        
        function initData(){
            var ObjVendedorList = {
                'ClvUsuario': $localStorage.currentUser.idUsuario, 
                'Op': 0
            };
            SeriesFactory.GetVendedores_dosList(ObjVendedorList).then(function(data){
                console.log(data);
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
                    console.log(data);
                    vm.SerieList = data.GetUltimo_SERIEYFOLIOListResult;
                    vm.Serie = vm.SerieList[0];
                    GetFolioDisponible();
                });
            }
        }

        function GetFolioDisponible(){
            var ObjFolioDisponible = {
                'CLV_VENDEDOR': vm.Vendedor.Clv_Vendedor, 
                'SERIE': vm.Serie.SERIE,
                'CONTRATO': 0
            };
            SeriesFactory.GetFolio_DisponibleList(ObjFolioDisponible).then(function(data){
                console.log(data);
            });
        }

        function cancel(){
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.View = false;
        vm.GetSerieList = GetSerieList;
        vm.GetFolioDisponible = GetFolioDisponible;
        vm.cancel = cancel;
        initData();
        
    });