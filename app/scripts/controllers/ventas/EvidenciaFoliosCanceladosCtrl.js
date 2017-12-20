'use strict';

angular
    .module('softvApp')
    .controller('EvidenciaFoliosCanceladosCtrl', function(SeriesFactory, ngNotify, $uibModal, $rootScope, $state, $localStorage, globalService, $sce){
        
        function initData(){
            GetFolioCanceladoList(0);
        }

        function GetFolioCanceladoList(Op){
            var ObjFoliosCancelados = {
                'busqueda': vm.Busqueda,
                'clv_usuario': $localStorage.currentUser.idUsuario,
                'Op': (vm.Busqueda != null && vm.Busqueda != undefined)? 1:0
            };
            SeriesFactory.GetMuestraFoliosCancelados(ObjFoliosCancelados).then(function(data){
                console.log(data);
                vm.FolioCanceladoList = data.GetMuestraFoliosCanceladosResult;
                vm.ViewList = (vm.FolioCanceladoList.length > 0)? true:false;
                vm.Busqueda = null;
            });
        }

        function GetEvidencia(Evidencia){
            var ObjTipoEvidencia = {
                'serie': Evidencia.serie,
                'folio': Evidencia.folio,
                'clv_vendedor': Evidencia.clv_vendedor
            };
            SeriesFactory.GetDameTipoEvidencia(ObjTipoEvidencia).then(function(data){
                console.log(data);
                var TipoDocumento = data.GetDameTipoEvidenciaResult.tipoDocumento;
                vm.ShowDoc = (TipoDocumento == 1)? true:false;
                var ObjEvidencia = {
                    'serie': Evidencia.serie,
                    'folio': Evidencia.folio,
                    'clv_vendedor': Evidencia.clv_vendedor,
                    'tipoDocumento': TipoDocumento
                };
                SeriesFactory.GetEvidenciaSerieFolioVEndedor(ObjEvidencia).then(function(data){
                    console.log(data);
                    var Name = data.GetEvidenciaSerieFolioVEndedorResult;
                    var FileName = globalService.getUrlReportes() + '/Images/' + Name;
                    //vm.FileName = $sce.trustAsResourceUrl(vm.f);
                    vm.FileName = $sce.trustAsResourceUrl(FileName);
                });
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.View = false;
        vm.ShowDoc = true;
        vm.GetFolioCanceladoList = GetFolioCanceladoList;
        vm.GetEvidencia = GetEvidencia;
        vm.cancel = cancel;
        initData();
        
    });