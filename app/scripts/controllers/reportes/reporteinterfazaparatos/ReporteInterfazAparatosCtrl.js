'use strict';
angular
	.module('softvApp')
	.controller('ReporteInterfazAparatosCtrl', function($state, encuestasFactory, ServiciosFactory, reportesFactory, globalService, $sce, $filter){	

        function initData(){
            encuestasFactory.GetMuestra_DistribuidoresEncList().then(function(data){
                vm.Distribuidores = data.GetMuestra_DistribuidoresEncListResult;
                encuestasFactory.GetTipSerEncList().then(function (data) {
                    vm.Servicios = data.GetTipSerEncListResult;
                    ServiciosFactory.GetMedioList().then(function(result){
                        vm.tecnologias = result.GetMedioListResult;
                    });
                });
            });
        }

        function GetPlazaList(){
            encuestasFactory.Muestra_PlazaEnc(vm.distribuidor.Clv_Plaza).then(function (data) {
                vm.Plazas = data.GetMuestra_PlazaEncListResult;
            });
        }

        function GetReprote(){
            var ObjReporte = {
                'CLVDISTRIBUIDOR':(vm.distribuidor)?vm.distribuidor.Clv_Plaza:0,
                'CLVPLAZA':(vm.Plaza)? vm.Plaza.id_compania:0,
                'CLVTIPSER':(vm.servicio)?vm.servicio.Clv_TipSer:0,
                'fecha_habilitar':(vm.fechasolicitud)? $filter('date')(vm.fechasolicitud, 'yyyy/MM/dd'):'9999/09/09',
                'IdMedio':(vm.tecnologia)?vm.tecnologia.IdMedio:0,
                'Op': 5
            };
            reportesFactory.GetReporteInterfazAparatos(ObjReporte).then(function(data){
                vm.FileName = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + data.GetReporteInterfazAparatosResult);
                vm.OpenReporte = true;
            });
        }

        var vm = this;
        vm.OpenReporte = false;
        vm.GetPlazaList = GetPlazaList;
        vm.GetReprote = GetReprote;
        initData();

    });