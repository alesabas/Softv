'use strict';

angular
    .module('softvApp')
    .controller('VelocidadInternetCtrl', function(CatalogosFactory, $uibModal){
        
        function initData(){
            GetVelocidaInternetList();
        }

        function GetVelocidaInternetList(){
            CatalogosFactory.Gettbl_politicasFibraList().then(function(data){
                vm.VelocidadInternetList = data.Gettbl_politicasFibraListResult;
                if(vm.VelocidadInternetList.length > 0){
                    vm.ConRegistros = true;
                    vm.SinRegistros = false;
                }else{
                    vm.ConRegistros = false;
                    vm.SinRegistros = true;
                }
            });
        }

        function Search(){
            if(vm.ClaveEquivalente != undefined){
                var SearchObj = {
                    'Clv_equivalente': vm.ClaveEquivalente,
                    'id': 0
                };
                CatalogosFactory.GetSp_filtroPoliticas(SearchObj).then(function(data){
                    vm.VelocidadInternetList = data.GetSp_filtroPoliticasResult;
                    if(vm.VelocidadInternetList.length > 0){
                        vm.ConRegistros = true;
                        vm.SinRegistros = false;
                        vm.ClaveEquivalente = undefined;
                    }else{
                        vm.ConRegistros = false;
                        vm.SinRegistros = true;
                        vm.ClaveEquivalente = undefined;
                    }
                });
            }else{
                GetVelocidaInternetList();
            }
        }

        function OpenAddVelocidadInternet(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalVelocidadInternetForm.html',
                controller: 'ModalVelocidadInternetFormAddCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md'
            });
        }

        function OpenUpdateVelocidadInternet(id){
            var id = id;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalVelocidadInternetForm.html',
                controller: 'ModalVelocidadInternetFormUpdateCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    id: function () {
                        return id;
                    }
                }
            });
        }

        function OpenViewVelocidadInternet(id){
            var id = id;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalVelocidadInternetForm.html',
                controller: 'ModalVelocidadInternetFormViewCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    id: function () {
                        return id;
                    }
                }
            });
        }

        function OpenDeleteVelocidadInternet(id){
            var id = id;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalVelocidadInternetDelete.html',
                controller: 'ModalVelocidadInternetDeleteCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                resolve: {
                    id: function () {
                        return id;
                    }
                }
            });
        }

        var vm = this;
        vm.Search = Search;
        vm.OpenAddVelocidadInternet = OpenAddVelocidadInternet;
        vm.OpenUpdateVelocidadInternet = OpenUpdateVelocidadInternet;
        vm.OpenViewVelocidadInternet = OpenViewVelocidadInternet;
        vm.OpenDeleteVelocidadInternet = OpenDeleteVelocidadInternet;
        initData();

    });