'use strict';

angular
    .module('softvApp')
    .controller('ModalReimprimirFoliosCtrl', function(SeriesFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope, $localStorage){
        
        function initData(){
            SeriesFactory.GetSP_SerieFolioList($localStorage.currentUser.idUsuario).then(function(data){
                console.log(data);
                vm.SerieList = data.GetSP_SerieFolioListResult;
                vm.Serie = vm.SerieList[0];
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.View = false;
        vm.cancel = cancel;
        initData();

    });