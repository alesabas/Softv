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

        function GetFolioMinExis(){
            if(vm.Serie != undefined){
                var objReimprimirFolios = {
                    'Serie': vm.Serie.Serie
                };
                SeriesFactory.GetReimpresionFoliosExistentesMin(objReimprimirFolios).then(function(data){
                    console.log(data);
                    vm.FolioExisMin = data.GetReimpresionFoliosExistentesMinResult.Minimo;
                });
                SeriesFactory.GetReimpresionFoliosExistentes(objReimprimirFolios).then(function(data){
                    console.log(data);
                    vm.FolioExis = data.GetReimpresionFoliosExistentesResult.Existentes;
                });
            }
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.View = false;
        vm.GetFolioMinExis = GetFolioMinExis;
        vm.cancel = cancel;
        initData();

    });