'use strict';

angular
    .module('softvApp')
    .controller('ModalBancoFormAddCtrl', function(CatalogosFactory, $uibModal, $uibModalInstance, ngNotify, $state){
    
        function SaveBanco(){
             var objBanco = {
                'Nombre': vm.Banco,
                'ClaveRel': '',
                'ClaveTxt': vm.Clave
             };
             CatalogosFactory.AddBanco(objBanco).then(function(data){
                if(data.AddBancoResult > 0){
                    ngNotify.set('CORRECTO, se añadió un banco nuevo.', 'success');
                    cancel();
                }else{
                    ngNotify.set('ERROR, al añadir un banco nuevo.', 'warn');
                }
             });
        }

        function cancel() {
            $uibModalInstance.close();
        }

        var vm = this;
        vm.Titulo = 'Nuevo Banco';
        vm.Icono = 'fa fa-plus';
        vm.InpDes = false;
        vm.SaveBanco = SaveBanco;
        vm.cancel = cancel;

    });