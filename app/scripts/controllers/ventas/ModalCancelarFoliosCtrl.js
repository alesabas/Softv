'use strict';

angular
    .module('softvApp')
    .controller('ModalCancelarFoliosCtrl', function($scope, SeriesFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope, $localStorage){
        
        function initData(){
            var ObjVendedorList = {
                'ClvUsuario': $localStorage.currentUser.idUsuario, 
                'Op': 0
            };
            SeriesFactory.GetVendedores_dosList(ObjVendedorList).then(function(data){
                console.log(data);
                vm.VendedorList = data.GetVendedores_dosListResult;
                vm.Vendedor = vm.VendedorList[0];
                GetSerieList();
            });
        }

        function CancelarFolio(){
            if(vm.Evidencia != undefined ){
                console.log(vm.Evidencia.type);
                if(vm.Evidencia.type == 'image/jpeg' ||
                    vm.Evidencia.type == 'image/bmp' || 
                    vm.Evidencia.type == 'image/gif' || 
                    vm.Evidencia.type == 'image/tiff' || 
                    vm.Evidencia.type == 'image/png' || 
                    vm.Evidencia.type == 'application/pdf'){
                    if(vm.Evidencia.size <= 1000000){
                        GetCancelaFolio();
                    }else{
                        ngNotify.set('ERROR, el tamaño del archivo es invalido.', 'warn');
                        ResetEvidencia()
                    }
                }else{
                    ngNotify.set('ERROR, el formato del archivo es invalido.', 'warn');
                    ResetEvidencia()
                }
            }else{
               GetCancelaFolio();
            }
        }

        function  GetCancelaFolio(){
            var objCancela_Folios = {
                'Vendedor': vm.Vendedor.Clv_Vendedor,
                'Serie': vm.Serie.SERIE,
                'Folio': vm.FolioDisponible.Folio,
                'comentario': vm.Comentario
            };
            SeriesFactory.UpdateCancela_Folios(objCancela_Folios).then(function(data){
                if(vm.Evidencia != undefined){
                    GuardarEvidencia();
                }else{
                    ngNotify.set('CORRECTO, se canceló el Folio.', 'success');
                    cancel();
                }
            });
        }

        function GuardarEvidencia(){
            console.dir(vm.Evidencia);
            var objGuardaEvidenciaCancelacionFolio = {
                'folio': vm.FolioDisponible.Folio,
                'serie': vm.Serie.SERIE,
                'clv_vendedor': vm.Vendedor.Clv_Vendedor,
                'archivo': vm.Evidencia,
                'tipo': GetTipo()
            }
            console.log(objGuardaEvidenciaCancelacionFolio);
            SeriesFactory.UpdateGuardaEvidenciaCancelacionFolio(objGuardaEvidenciaCancelacionFolio).then(function(data){
                console.log(data);
                ngNotify.set('CORRECTO, se canceló el Folio.', 'success');
                cancel();
            });
        }

        function GetSerieList(){
            if(vm.Vendedor != undefined){
                var ObjSerieList = {
                    'ClvVendedor': vm.Vendedor.Clv_Vendedor, 
                    'Contrato': 0
                };
                SeriesFactory.GetUltimo_SERIEYFOLIOList(ObjSerieList).then(function(data){
                    console.log(data);
                    vm.SerieList = data.GetUltimo_SERIEYFOLIOListResult;
                    vm.Serie = vm.SerieList[0];
                    GetFolioDisponible();
                });
            }
        }

        function GetFolioDisponible(){
            var ObjFolioDisponible = {
                'CLV_VENDEDOR': vm.Vendedor.Clv_Vendedor, 
                'SERIE': vm.Serie.SERIE,
                'CONTRATO': 0
            };
            SeriesFactory.GetFolio_DisponibleList(ObjFolioDisponible).then(function(data){
                console.log(data);
                vm.FolioDisponibleList = data.GetFolio_DisponibleListResult;
                vm.FolioDisponible = FolioDisponibleList[0];
            });
        }
        
        function ResetEvidencia(){
            vm.Evidencia = null;
            vm.FilePath = null;
            vm.File = null;
            angular.element("input[type='file']").val(null);
        }

        function GetTipo(){
            if(vm.Evidencia.type == 'image/jpeg' ||
               vm.Evidencia.type == 'image/bmp' || 
               vm.Evidencia.type == 'image/gif' || 
               vm.Evidencia.type == 'image/tiff' || 
               vm.Evidencia.type == 'image/png'){
                return 'image';
            }else if(vm.Evidencia.type == 'application/pdf'){
                return 'pdf';
            }
        }

        function cancel(){
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.View = false;
        vm.CancelarFolio = CancelarFolio;
        vm.GetSerieList = GetSerieList;
        vm.GetFolioDisponible = GetFolioDisponible;
        vm.ResetEvidencia = ResetEvidencia;
        vm.cancel = cancel;
        initData();
        
    });