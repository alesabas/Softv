'use strict';

angular
    .module('softvApp')
    .controller('BancosCtrl', function(CatalogosFactory, $uibModal){
        
        function initData(){
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
                size: 'md'
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
                size: 'md',
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
        }

        var vm = this;
        vm.OpenAddBanco = OpenAddBanco;
        vm.OpenUpdateBanco = OpenUpdateBanco;
        vm.OpenDeleteBanco = OpenDeleteBanco;
        initData();

    });