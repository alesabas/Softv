'use strict';

angular
    .module('softvApp')
    .controller('BancosCtrl', function(CatalogosFactory, $uibModal){
        
        function initData(){
            GetBancoList();
        }

        function GetBancoList(){
            CatalogosFactory.GetBancoList().then(function(data){
                vm.BancoList = data.GetBancoListResult;
                if (vm.BancoList.length == 0) {
					vm.SinRegistros = true;
					vm.ConRegistros = false;
				} else {
					vm.SinRegistros = false;
					vm.ConRegistros = true;
				}
            });
        }

        function OpenAddBanco(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalBancoForm.html',
                controller: 'ModalBancoFormAddCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm'
            });
            modalInstance.result.then(function () {
                GetBancoList();
            });
        }

        function OpenUpdateBanco(IdBanco){
            var IdBanco = IdBanco;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalBancoForm.html',
                controller: 'ModalBancoFormUpdateCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                resolve: {
                    IdBanco: function () {
                        return IdBanco;
                    }
                }
            });
            modalInstance.result.then(function () {
                GetBancoList();
            });
        }

        function OpenViewBanco(IdBanco){
            var IdBanco = IdBanco;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalBancoForm.html',
                controller: 'ModalBancoFormViewCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                resolve: {
                    IdBanco: function () {
                        return IdBanco;
                    }
                }
            });
        }

        function OpenDeleteBanco(ObjBanco){
            var ObjBanco = ObjBanco;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalBancoDelete.html',
                controller: 'ModalBancoDeleteCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                resolve: {
                    ObjBanco: function () {
                        return ObjBanco;
                    }
                }
            });
            modalInstance.result.then(function () {
                GetBancoList();
            });
        }

        var vm = this;
        vm.OpenAddBanco = OpenAddBanco;
        vm.OpenUpdateBanco = OpenUpdateBanco;
        vm.OpenViewBanco = OpenViewBanco;
        vm.OpenDeleteBanco = OpenDeleteBanco;
        initData();

    });