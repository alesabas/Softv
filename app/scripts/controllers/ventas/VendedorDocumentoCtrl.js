'use strict';

angular
    .module('softvApp')
    .controller('VendedorDocumentoCtrl', function(DocVendedorClienteFactory, VentasFactory, distribuidorFactory, ngNotify, $uibModal, $rootScope, $state, $localStorage, $stateParams){
        
        function initData(){
            VentasFactory.GetDeepVendedores($stateParams.id).then(function(data){
                var Vendedor = data.GetDeepVendedoresResult;
                if(Vendedor != null){
                    vm.clv_vendedor = Vendedor.Clv_Vendedor;
                    DocVendedorClienteFactory.GetDameDocumentosVendedor().then(function(data){
                        vm.DocumentoList = data.GetDameDocumentosVendedorResult;
                        GetDocumentoVendedorList();
                    });
                }else{
                    $state.go('home.ventas.vendedores');
                    ngNotify.set('ERROR, El Vendedor no se encontro', 'warn');
                }
            });
        }

        function GetDocumentoVendedorList(){
            DocVendedorClienteFactory.GetDameDocumentosVendedorGrid(vm.clv_vendedor).then(function(data){
                vm.DocumentoVendedorList = data.GetDameDocumentosVendedorGridResult;
                vm.ViewList = (vm.DocumentoVendedorList.length > 0)? true:false;
            });
        }

        function SaveDocumento(){
            if(vm.Evidencia.type == "application/pdf"){
                var EvidenciaFD = new FormData();
                EvidenciaFD.append('file', vm.Evidencia); 
                EvidenciaFD.append('IdDocumento', vm.DocumentoVendedor.IdDocumento);
                EvidenciaFD.append('clv_vendedor', vm.clv_vendedor);
                DocVendedorClienteFactory.GetGuardaDocumentoPDFVendedor(EvidenciaFD).then(function(data){
                    ngNotify.set('CORRECTO, Correcto se guardó el documento para el vendedor.', 'success');
                    GetDocumentoVendedorList();
                    ResetEvidencia();
                });
            }else{
                ngNotify.set('ERROR, Formato invalido', 'warn');
            }
        }

        function GetDocumentoVendedor(IdDocumento){
            var ObjTipoDocumento = {
                'IdDocumento': IdDocumento,
                'clv_vendedor': vm.clv_vendedor
            };
            DocVendedorClienteFactory.GetDimeTipoDocumentoVendedor(ObjTipoDocumento).then(function(data){
                console.log(data);
            });
        }

        function SetTouch(){
            vm.TouchFile = true;
        }

        function ResetEvidencia(){
            vm.Evidencia = null;
            vm.File = null;
            vm.TouchFile = false;
            angular.element("input[type='file']").val(null);
        }

        var vm = this;
        vm.TouchFile = false;
        vm.ResetEvidencia = ResetEvidencia;
        vm.SaveDocumento = SaveDocumento;
        vm.GetDocumentoVendedor = GetDocumentoVendedor;
        vm.SetTouch = SetTouch;
        initData();

    });