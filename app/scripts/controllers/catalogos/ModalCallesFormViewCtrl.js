'use strict';

angular
    .module('softvApp')
    .controller('ModalCalleFormViewCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state, IdCalle){

        function initData(){
            CatalogosFactory.GetMuestraEstados_RelColList().then(function(data){
                vm.EstadoList = data.GetMuestraEstados_RelColListResult;
            });
            GetCalle();
        }

        function GetCalle(){
            CatalogosFactory.GetDeepCalles_New(IdCalle).then(function(data){
                var Calle = data.GetDeepCalles_NewResult;
                vm.IdCalle = Calle.Clv_Calle;
                vm.Calle = Calle.NOMBRE;
                GetRelCalle();
            });
        }

        function GetCiudadList(){
            if(vm.Estado != undefined){  
                CatalogosFactory.GetMuestraCdsEdo_RelColoniaList(vm.Estado.Clv_Estado).then(function(data){
                    vm.CiudadList = data.GetMuestraCdsEdo_RelColoniaListResult;
                });
            }else{
                vm.CiudadList = '';
            }
            vm.LocalidadList = '';
        }
        
        function GetLocalidadList(){
            if(vm.Municipio != undefined){
                CatalogosFactory.GetMuestraLocalidades_CalleList(vm.Municipio.Clv_Ciudad).then(function(data){
                    vm.LocalidadList = data.GetMuestraLocalidades_CalleListResult;
                    vm.ColoniaList = null;
                });
            }else{
                vm.LocalidadList = null;
                vm.ColoniaList = null;
            }
        }
        
        function GetColoniaList(){
             if(vm.Localidad != undefined){
                CatalogosFactory.GetMuestraColonias_CalleList(vm.Localidad.Clv_Localidad).then(function(data){
                    vm.ColoniaList = data.GetMuestraColonias_CalleListResult;
                });
            }else{
                vm.ColoniaList = null;
            }
        }

        function GetRelCalle(){
            CatalogosFactory.GetRelColoniasCalles_NewList(vm.IdCalle).then(function(data){
                vm.RelCalleList = data.GetRelColoniasCalles_NewListResult;
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Detalle Registro - ';
        vm.Icono = 'fa fa-pencil-square-o';
        vm.Show = false;
        vm.View = true;
        vm.GetCiudadList = GetCiudadList;
        vm.GetLocalidadList = GetLocalidadList;
        vm.GetColoniaList = GetColoniaList;
        vm.cancel = cancel;
        initData();

    });