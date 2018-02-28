'use strict';

angular
    .module('softvApp')
    .controller('IPsCtrl', function(CatalogosRedIPFactory, ngNotify, $uibModal, $state, $stateParams, $rootScope, $localStorage){

        function initData(){
            var ObjRedList = {
                'IdRed': 0, 
                'Op': 0
            };
            CatalogosRedIPFactory.GetListCatalogo_Ips(ObjRedList).then(function(data){
                console.log(data);
                vm.RedList = data.GetListCatalogo_IpsResult;
            });
            GetList();
        }

        function GetList(){
            var ObjIPList = {
                'IdRed': (vm.Red != null && vm.Red != undefined)? vm.Red.IdRed:0, 
                'Op': (vm.Red != null && vm.Red != undefined)? 1:0,
                'IdIP': 0
            };
            console.log(ObjIPList);
            CatalogosRedIPFactory.GetcatalogoIps_dosList(ObjIPList).then(function(data){
                vm.IPList = data.GetcatalogoIps_dosListResult;
                vm.ViewList = (vm.IPList.length > 0)? true:false;
            });
        }

        function OpenUpdateIP(IdIP){
            var IdIP = IdIP;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalIPsForm.html',
                controller: 'IPsUpdateCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    IdIP: function () {
                        return IdIP;
                    }
                }
            });
        }
        
        $rootScope.$on('LoadLista', function(e){
             GetList();
        });

        function OpenViewIP(IdIP){
            var IdIP = IdIP;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalIPsForm.html',
                controller: 'IPsViewCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    IdIP: function () {
                        return IdIP;
                    }
                }
            });
        }

        var vm = this;
        vm.blockE = true;
        vm.OpenUpdateIP = OpenUpdateIP;
        vm.OpenViewIP = OpenViewIP;
        vm.GetList = GetList;
        initData();

    });