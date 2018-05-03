'use strict';
angular
	.module('softvApp')
	.controller('reporteEntregaParcialCtrl', function($state, $localStorage, $rootScope, reportesFactory, ngNotify, $filter, globalService) {

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
       
        var vm=this;
        vm.titulo='Selecciona Cajeros';
       
        Init();
    });