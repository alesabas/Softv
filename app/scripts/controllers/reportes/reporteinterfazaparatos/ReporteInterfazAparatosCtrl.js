'use strict';
angular
	.module('softvApp')
	.controller('ReporteInterfazAparatosCtrl', function($state, encuestasFactory, ServiciosFactory, reportesFactory, globalService, $sce){	

        function initData(){
            encuestasFactory.GetMuestra_DistribuidoresEncList().then(function(data){
                console.log(data);
                vm.Distribuidores = data.GetMuestra_DistribuidoresEncListResult;
                encuestasFactory.GetTipSerEncList().then(function (data) {
                    console.log(data);
                    vm.Servicios = data.GetTipSerEncListResult;
                    ServiciosFactory.GetMedioList().then(function(result){
                        vm.tecnologias = result.GetMedioListResult;
                        console.log( vm.tecnologias);
                    });
                });
            });
        }

        function GetPlazaList(){
            encuestasFactory.Muestra_PlazaEnc(vm.distribuidor.Clv_Plaza).then(function (data) {
                console.log(data);
                vm.Plazas = data.GetMuestra_PlazaEncListResult;
            });
        }

        var vm = this;
        vm.GetPlazaList = GetPlazaList;
        initData();

    });