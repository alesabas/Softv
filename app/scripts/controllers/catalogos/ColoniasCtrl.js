'use strict';

angular
    .module('softvApp')
    .controller('ColoniasCtrl', function($uibModal, CatalogosFactory, $localStorage){
        
        function initData(){
            /*CatalogosFactory.GetPlazaList($localStorage.currentUser.idUsuario).then(function(data){
                vm.PlazaList = data.GetPlazaListResult;
            });*/
            GetColoniaList();
        }

        function GetColoniaList(){
            var ObjColList = {
                'IdCompania': (vm.Plaza != undefined)? vm.Plaza.id_compania : 0
            };
            CatalogosFactory.GetColonias_NewList(ObjColList).then(function(data){
                vm.ColoniaList = data.GetColonias_NewListResult;
                if (vm.ColoniaList.length == 0) {
					vm.SinRegistros = true;
					vm.ConRegistros = false;
				} else {
					vm.SinRegistros = false;
					vm.ConRegistros = true;
				}
            });
        }

        var vm = this;
        initData();
        vm.GetColoniaList = GetColoniaList;
    });