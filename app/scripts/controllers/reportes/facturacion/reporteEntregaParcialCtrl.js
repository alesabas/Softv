'use strict';
angular
	.module('softvApp')
	.controller('reporteEntregaParcialCtrl', function($state, $localStorage, $rootScope,$sce, reportesFactory, ngNotify, $filter, globalService) {

        function Init(){
            reportesFactory.GetMUESTRAUSUARIOSEntregaParciales().then(function(result){
                vm.cajeros=result.GetMUESTRAUSUARIOSConEntregasParcialesResult;
                vm.cajerosObj = {
                    filterPlaceHolder: 'Buscar cajeros.',
                    labelAll: 'Cajeros Disponibles',
                    labelSelected: 'Cajeros Seleccionadas',
                    labelShow: 'Nombre',
                    orderProperty: 'Nombre',
                    items: vm.cajeros,
                    selectedItems: []
                };
               });
        }

        function aceptar(){
            var fechaInicio=$filter('date')(vm.fechainicio, 'yyyy/MM/dd');
            var fechaFin=$filter('date')(vm.fechafin, 'yyyy/MM/dd');
            var usuarios=vm.cajerosObj.selectedItems;
            console.log(fechaInicio);
            console.log(fechaFin);
            console.log(usuarios);
          reportesFactory.GetReporteEntregasParciales(fechaInicio,fechaFin,usuarios).then(function(result){
            vm.rptpanel=true;
            vm.url = $sce.trustAsResourceUrl(
              globalService.getUrlReportes() +
                "/Reportes/" +
                result.GetReporteEntregasParcialesResult
            );
            });
        
        }
       
        var vm=this;
        vm.titulo='Selecciona Cajeros';
       vm.aceptar=aceptar;
        Init();
    });