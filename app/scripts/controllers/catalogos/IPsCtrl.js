'use strict';

angular
    .module('softvApp')
    .controller('IPsCtrl', function(CatalogosFactory, ngNotify, $uibModal, $state, $stateParams, $rootScope, $localStorage){

        function initData(){
             GetList();
        }

        function GetList(){
            var ObjIPList = {
                'IdRed': 0, 
                'Op': 0,
                'IdIP': 0
            };
            CatalogosFactory.GetcatalogoIps_dosList(ObjIPList).then(function(data){
                console.log(data);
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

        initData();

        var vm = this;
        vm.OpenUpdateIP = OpenUpdateIP;
        vm.OpenViewIP = OpenViewIP;
    });