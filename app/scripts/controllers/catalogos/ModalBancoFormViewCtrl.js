'use strict';

angular
    .module('softvApp')
    .controller('ModalBancoFormViewCtrl', function(CatalogosFactory, $uibModal, $uibModalInstance, ngNotify, $state, IdBanco){
        
        function initData(){
            CatalogosFactory.GetDeepBanco(IdBanco).then(function(data){
                var Banco = data.GetDeepBancoResult;
                vm.IdBanco = Banco.IdBanco;
                vm.Banco = Banco.Nombre;
                vm.Clave = Banco.ClaveTxt;
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Consulatr Banco - ';
        vm.Icono = 'fa fa-eye';
        vm.InpDes = true;
        vm.cancel = cancel;
        initData();

    });