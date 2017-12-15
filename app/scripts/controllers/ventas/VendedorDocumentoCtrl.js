'use strict';

angular
    .module('softvApp')
    .controller('VendedorDocumentoCtrl', function(VentasFactory, distribuidorFactory, ngNotify, $uibModal, $rootScope, $state, $localStorage){
        
        function ResetEvidencia(){
            vm.Evidencia = null;
            vm.File = null;
            angular.element("input[type='file']").val(null);
        }

        var vm = this;
        vm.ResetEvidencia = ResetEvidencia;

    });