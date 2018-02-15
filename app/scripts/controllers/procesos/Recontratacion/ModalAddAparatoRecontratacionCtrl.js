'use strict';

angular
    .module('softvApp')
    .controller('ModalAddAparatoRecontratacionCtrl', function(RecontratacionFactory, CatalogosFactory, CatalogosRedIPFactory, $uibModalInstance, $uibModal, ngNotify, $state, $localStorage, ObjSession){
        
        function initData(){
            var ObjDet = {
                'IdRecon': ObjSession.IdRecon,
                'ClvSession': ObjSession.ClvSession
            }
            console.log(ObjDet);
            RecontratacionFactory.GetListaAparatosEnBaja(ObjDet).then(function(data){
                console.log(data);
                vm.AparatoList = data.GetListaAparatosEnBajaResult;
            });
        }

        function Cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Cancel = Cancel;
        console.log(ObjSession);
        initData();

    });