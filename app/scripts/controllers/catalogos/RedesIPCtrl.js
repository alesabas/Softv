'use strict';

angular
    .module('softvApp')
    .controller('RedesIPCtrl', function(CatalogosRedIPFactory, ngNotify, $uibModal, $state, $stateParams, $rootScope, $localStorage){

        function initData(){
            CatalogosRedIPFactory.GetDeepCatalogo_Ips($stateParams.id).then(function(data){
                var Red = data.GetDeepCatalogo_IpsResult;
                if(Red != null && ($stateParams.mod == '0' || $stateParams.mod == '1') ){
                    vm.IdRed = $stateParams.id;
                    vm.Mod = $stateParams.mod;
                    vm.blockC = (vm.Mod == 1)? true:false;
                    vm.blockE = (vm.Mod == 0)? true:false;
                    GetList();
                }else{
                    ngNotify.set('ERROR, No se encontró la Red seleccionada.', 'warn');
                    $state.go('home.catalogos.redes');
                }
            });
        }

        function GetList(){
            var ObjIPList = {
                "IdRed": $stateParams.id, 
                "Op": 1,
                "IdIP": 0
            }
            CatalogosRedIPFactory.GetcatalogoIps_dosList(ObjIPList).then(function(data){
                vm.IPList = data.GetcatalogoIps_dosListResult;
                 vm.ViewList = (vm.IPList.length > 0)? true:false;
            });
        }

        $rootScope.$on('LoadLista', function(e){
             GetList();
        });

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
        vm.OpenUpdateIP = OpenUpdateIP;
        vm.OpenViewIP = OpenViewIP;
        initData();
    });