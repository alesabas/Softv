'use stricts';
angular
    .module('softvApp')
    .controller('TiposServicosCtrl', function(CatalogosFactory, $uibModal){

        function initData(){
            CatalogosFactory.GetTipServ_NewList().then(function(data){
                vm.TipoServicioList = data.GetTipServ_NewListResult;
                if (vm.TipoServicioList.length == 0) {
					vm.SinRegistros = true;
					vm.ConRegistros = false;
				} else {
					vm.SinRegistros = false;
					vm.ConRegistros = true;
				}
            });
        }

        function OpenAddTipoServicio(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalTipoServicioForm.html',
                controller: 'ModalTipoServicioFormAddCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md'
            });
        }

        function OpenUpdateTipoServicio(Clv_TipSer){
            var Clv_TipSer = Clv_TipSer;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalTipoServicioForm.html',
                controller: 'ModalTipoServicioFormUpdateCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    Clv_TipSer: function () {
                        return Clv_TipSer;
                    }
                }
            });
        }

        function OpenDeleteTipoServicio(Clv_TipSer){
            var Clv_TipSer = Clv_TipSer;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalTipoServicioDelete.html',
                controller: 'ModalTipoServicioDeleteCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                resolve: {
                    Clv_TipSer: function () {
                        return Clv_TipSer;
                    }
                }
            });
        }

        var vm = this;
        vm.OpenAddTipoServicio = OpenAddTipoServicio;
        vm.OpenUpdateTipoServicio = OpenUpdateTipoServicio;
        vm.OpenDeleteTipoServicio = OpenDeleteTipoServicio;
        initData();

    });