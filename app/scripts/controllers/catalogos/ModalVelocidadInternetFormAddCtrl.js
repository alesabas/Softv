'use strict';

angular
    .module('softvApp')
    .controller('ModalVelocidadInternetFormAddCtrl', function(CatalogosFactory, $uibModal, $uibModalInstance, ngNotify, $state){

        function SaveVelocidadInternet(){
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Nueva Velocidad de Internet';
        vm.Icono = 'fa fa-plus';
        vm.BlockInput = false;
        vm.View = false;
        vm.SaveVelocidadInternet = SaveVelocidadInternet;
        vm.cancel = cancel;

    });