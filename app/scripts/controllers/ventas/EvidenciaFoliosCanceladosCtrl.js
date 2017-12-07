'use strict';

angular
    .module('softvApp')
    .controller('EvidenciaFoliosCanceladosCtrl', function(SeriesFactory, ngNotify, $uibModal, $rootScope, $state, $localStorage){
        
        function initData(){
            var ObjFoliosCancelados = {
                'busqueda': '',
                'clv_usuario': 4
            };
            SeriesFactory.GetMuestraFoliosCancelados(ObjFoliosCancelados).then(function(data){
                console.log(data);
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