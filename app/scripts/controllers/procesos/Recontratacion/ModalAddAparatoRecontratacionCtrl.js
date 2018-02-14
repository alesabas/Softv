'use strict';

angular
    .module('softvApp')
    .controller('ModalAddAparatoRecontratacionCtrl', function(RecontratacionFactory, CatalogosFactory, CatalogosRedIPFactory, $uibModalInstance, $uibModal, ngNotify, $state, $localStorage, ObjSession){
        
        function initData(){
            var ObjDet = {
                'IdRecon': ObjSession.IdRecon,
                'ClvSession': ObjSession.ClvSession
            }
            RecontratacionFactory.GetListaAparatosEnBaja().then(function(data){
                console.log(data);
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