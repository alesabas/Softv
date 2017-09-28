'use strict';

angular
    .module('softvApp')
    .controller('ModalCalleFormAddCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state){

        function initData(){
            CatalogosFactory.GetEstados_NewList().then(function(data){
                vm.EstadoList = data.GetEstados_NewListResult;
            });
        }

        function GetMunicipio(){
            if(vm.Estado != undefined){
                var RelEstMun = {
                    'clv_estado' : vm.Estado.Clv_Estado,
                    'idcompania' : 1//Delete
                };
                CatalogosFactory.GetMuestraCiudadesEstadoList(RelEstMun).then(function(data){
                    vm.MunicipioList = data.GetMuestraCiudadesEstadoListResult;
                });
            }else{
                vm.MunicipioList = null;
            }
            vm.LocalidadList = null;
            vm.ColoniaList = null;
            vm.CalleList = null;
        }
        
        function GetLocalidad(){
            if(vm.Municipio != undefined){
                CatalogosFactory.GetMuestraLocalidadCiudadList(vm.Municipio.Clv_Ciudad).then(function(data){
                    vm.LocalidadList = data.GetMuestraLocalidadCiudadListResult;
                });
            }else{
                vm.LocalidadList = null;
            }
            vm.ColoniaList = null;
            vm.CalleList = null;
        }
        
        function GetColonia(){
            if(vm.Localidad != undefined){
                CatalogosFactory.GetMuestraColoniaLocalidadList(vm.Localidad.Clv_Localidad).then(function(data){
                    vm.ColoniaList = data.GetMuestraColoniaLocalidadListResult;
                });
            }else{
                vm.ColoniaList = null;
            }
            vm.CalleList = null;
        }

        function AddRelCalle(){
            if(vm.Estado != undefined && vm.Estado != 0 &&
               vm.Municipio != undefined && vm.Municipio != 0 &&
               vm.Localidad != undefined && vm.Localidad != 0 &&
               vm.Colonia != undefined && vm.Colonia != 0){
                var RelCalle = {};
                RelCalle.IdEstado = vm.Estado.Clv_Estado;
                RelCalle.IdMunicipio = vm.Municipio.Clv_Ciudad;
                RelCalle.IdLocalidad = vm.Localidad.Clv_Localidad;
                RelCalle.IdColonia = vm.Colonia.CLV_COLONIA;
                var RelCalleView = {};
                RelCalleView.IdEstado = vm.Estado.Clv_Estado;
                RelCalleView.IdMunicipio = vm.Municipio.Clv_Ciudad;
                RelCalleView.IdLocalidad = vm.Localidad.Clv_Localidad;
                RelCalleView.IdColonia = vm.Colonia.CLV_COLONIA;
                RelCalleView.Estado = vm.Estado.Nombre;
                RelCalleView.Municipio = vm.Municipio.Nombre;
                RelCalleView.Localidad = vm.Localidad.NOMBRE;
                RelCalleView.Colonia = vm.Colonia.Nombre;
                if(ExistsRelCalle(RelCalle.IdEstado, RelCalle.IdMunicipio, RelCalle.IdLocalidad, RelCalle.IdColonia) == false){
                    vm.RelCalleList.push(RelCalle);
                    vm.RelCalleViewList.push(RelCalleView);
                }else{
                    ngNotify.set('ERROR, Ya existe esta relación.', 'warn');
                }
            }else{
                ngNotify.set('ERROR, Selecciona un estado, una ciudad, una localidad y una colonia.', 'warn');
            }
        }

        function ExistsRelCalle(IdEstado, IdMunicipio, IdLocalidad, IdColonia){
            var ResultExists = 0;
            for(var i = 0; vm.RelCalleList.length > i; i ++){
                if(vm.RelCalleList[i].IdEstado == IdEstado &&
                   vm.RelCalleList[i].IdMunicipio == IdMunicipio &&
                   vm.RelCalleList[i].IdLocalidad == IdLocalidad &&
                   vm.RelCalleList[i].IdColonia == IdColonia){
                    ResultExists = ResultExists + 1
                }
            }
            return (ResultExists > 0)? true : false;
        }

        function DeleteRelCalle(RelCalle){
            for(var i = 0; vm.RelCalleList.length > i; i ++){
                if(vm.RelCalleList[i].IdEstado == RelCalle.IdEstado &&
                   vm.RelCalleList[i].IdMunicipio == RelCalle.IdMunicipio &&
                   vm.RelCalleList[i].IdLocalidad == RelCalle.IdLocalidad &&
                   vm.RelCalleList[i].IdColonia == RelCalle.IdColonia){
                    vm.RelCalleList.splice(i, 1);
                    vm.RelCalleViewList.splice(i, 1);
                }
            }
        }

        function SaveCalle(){
            if(vm.RelCalleList.length > 0){
                var lstRelCalle = {};
                var RelCalleAdd = {};
                lstRelCalle.Nombre = vm.Calle;
                RelCalleAdd = vm.RelCalleList;
                CatalogosFactory.AddCalleL(lstRelCalle, RelCalleAdd).then(function(data){
                    if(data.AddCalleLResult > 0){
                        ngNotify.set('CORRECTO, se añadió una calle nueva.', 'success');
                        $state.reload('home.catalogos.calles');
				        cancel();
                    }else{
                        ngNotify.set('ERROR, al añadir una calle nueva.', 'warn');
                        $state.reload('home.catalogos.calles');
                        cancel();
                    }
                });
            }else{
                ngNotify.set('ERROR, Para añadir una nueva calle, se tiene que ingresar mínimo una relación.', 'warn');
            }
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Nuevo Registro';
        vm.Icono = 'fa fa-plus';
        vm.RelCalleList = [];
        vm.RelCalleViewList = [];
        vm.GetMunicipio = GetMunicipio;
        vm.GetLocalidad = GetLocalidad;
        vm.GetColonia = GetColonia;
        vm.AddRelCalle = AddRelCalle;
        vm.DeleteRelCalle = DeleteRelCalle;
        vm.SaveCalle = SaveCalle;
        vm.cancel = cancel;
        initData();

    });