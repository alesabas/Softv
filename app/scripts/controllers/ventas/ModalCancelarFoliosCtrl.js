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
            var objCancela_Folios = {
                'Vendedor': vm.Vendedor.Clv_Vendedor,
                'Serie': vm.Serie.SERIE,
                'Folio': vm.FolioDisponible.Folio,
                'comentario': vm.Comentario
            };
            SeriesFactory.UpdateCancela_Folios(objCancela_Folios).then(function(data){
                console.log(data);
                if(vm.Evidencia != undefined){
                    GuardarEvidencia();
                }else{
                    ngNotify.set('CORRECTO, Se cancelo el Folio.', 'success');
                    $rootScope.$emit('LoadSerieList');
                    cancel();
                }
            });
        }

        function GuardarEvidencia(){
            console.dir(vm.Evidencia);
            var EvidenciaFD = new FormData();
            EvidenciaFD.append('file', vm.Evidencia);
            SeriesFactory.imageToByteArray(EvidenciaFD).then(function(data){
                console.log(data);
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

        function cancel(){
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.View = false;
        vm.CancelarFolio = CancelarFolio;
        vm.GetSerieList = GetSerieList;
        vm.GetFolioDisponible = GetFolioDisponible;
        vm.cancel = cancel;
        initData();
        
        vm.GuardarEvidencia = GuardarEvidencia;
        
    });