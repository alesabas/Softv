'use strict';

angular
    .module('softvApp')
    .controller('DistribuidoresCtrl', function(distribuidorFactory, $uibModal){

        function initData(){
            distribuidorFactory.Getplaza(0,"").then(function(data){
                vm.distribuidores = data.GetPlaza_DistribuidoresNewResult;
                vm.ViewList = (vm.distribuidores.length > 0)? true:false;
            });
        }

        function OpenDeleteDistribuidor(DistribuidorObj){
            var DistribuidorObj = DistribuidorObj;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalDistribuidorEliminar.html',
                controller: 'ModalDistribuidorEliminarCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                resolve: {
                    DistribuidorObj: function () {
                        return DistribuidorObj;
                    }
                }
            });
        }

        var vm = this;
        vm.OpenDeleteDistribuidor = OpenDeleteDistribuidor;
        initData();
        
    });