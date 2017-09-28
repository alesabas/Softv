'use strict';

angular
    .module('softvApp')
    .controller('ColoniaFormUpdateCtrl', function(CatalogosFactory, ngNotify, $state, $stateParams){

        function initData(){
            CatalogosFactory.GetTipo_Colonias1_NewList().then(function(data){
                console.log(data);
                vm.TipoColoniaList = data.GetTipo_Colonias1_NewListResult;
            });
            CatalogosFactory.GetMuestraEstados_RelColList().then(function(data){
                vm.EstadoList = data.GetMuestraEstados_RelColListResult;
                console.log(data);
            });
            vm.Clv_Colonia = $stateParams.id;
        }

        function GetCiudadList(){
            if(vm.Estado != undefined){  
                CatalogosFactory.GetMuestraCdsEdo_RelColoniaList(vm.Estado.Clv_Estado).then(function(data){
                    console.log(data);
                    vm.CiudadList = data.GetMuestraCdsEdo_RelColoniaListResult;
                });
            }else{
                vm.CiudadList = '';
            }
            vm.LocalidadList = '';
        }

        function GetLocalidadList(){
            if(vm.Ciudad != undefined){
                var ObjLocalidadList = {
                    'clv_colonia': vm.Clv_Colonia,
                    'clv_ciudad': vm.Ciudad.Clv_Ciudad
                };
                CatalogosFactory.GetMuestraLoc_RelColoniaList(ObjLocalidadList).then(function(data){
                    console.log(data);
                    vm.LocalidadList = data.GetMuestraLoc_RelColoniaListResult;
                });
            }else{
                vm.LocalidadList = '';
            }
        }

        function AddRelEstCiuLocCol(){
            var objInsertaRelColoniaLocalidad = {
                'Clv_Colonia': Clv_Localidad,
                'Clv_Localidad': vm.Localidad,
                'Clv_Ciudad': vm.Ciudad.Clv_Ciudad,
                'CodigoPostal': vm.CPRel
            };
            CatalogosFactory.AddInsertaRelColoniaLocalidad(objInsertaRelColoniaLocalidad).then(function(data){
                console.log(data);
            });
        }

        var vm = this;
        vm.Titulo = 'Editar Colonia - ';
        vm.GetCiudadList = GetCiudadList;
        vm.GetLocalidadList = GetLocalidadList;
        initData();
    });