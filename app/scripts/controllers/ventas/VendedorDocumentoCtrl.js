'use strict';

angular
    .module('softvApp')
    .controller('VendedorDocumentoCtrl', function(DocVendedorClienteFactory, VentasFactory, distribuidorFactory, ngNotify, $uibModal, $rootScope, $state, $localStorage, $stateParams){
        
        function initData(){
            DocVendedorClienteFactory.GetDameDocumentosVendedor().then(function(data){
                console.log(data);
                vm.DocumentoList = data.GetDameDocumentosVendedorResult;
                GetDocumentoVendedorList();
            });
        }

        function GetDocumentoVendedorList(){
            DocVendedorClienteFactory.GetDameDocumentosVendedorGrid(vm.clv_vendedor).then(function(data){
                console.log(data);
                vm.DocumentoVendedorList = data.GetDameDocumentosVendedorGridResult;
                vm.ViewList = (vm.DocumentoVendedorList.length > 0)? true:false;
            });
        }

        function SaveDocumento(){
            console.log('Save');
        }

        function SetTouch(){
            vm.TouchFile = false;
        }

        function ResetEvidencia(){
            vm.Evidencia = null;
            vm.File = null;
            angular.element("input[type='file']").val(null);
        }

        var vm = this;
        vm.TouchFile = true;
        vm.clv_vendedor = $stateParams.id;
        console.log(vm.clv_vendedor);
        vm.ResetEvidencia = ResetEvidencia;
        vm.SaveDocumento = SaveDocumento;
        vm.SetTouch = SetTouch;
        console.log($localStorage);
        initData();

    });