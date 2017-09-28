'use strict';

angular
    .module('softvApp')
    .controller('ColoniaFormAddCtrl', function(CatalogosFactory, ngNotify, $state){

        function initData(){
            CatalogosFactory.GetTipo_Colonias1_NewList().then(function(data){
                console.log(data);
                vm.TipoColoniaList = data.GetTipo_Colonias1_NewListResult;
            });
            /*CatalogosFactory.GetTipServList().then(function(data){
                vm.TipoServicioList = data.GetTipServListResult;
            });

            CatalogosFactory.GetEstadoList2_web().then(function(data){
                vm.EstadoList = data.GetEstadoList2_webResult;
            });*/
        }

        function SaveColonia(){
            var objValidaNombreColonia = {
                'nombre': vm.Colonia,
                'mismoNombre': 0,
                'clv_colonia': 0
            };
            CatalogosFactory.AddValidaNombreColonia(objValidaNombreColonia).then(function(data){
                console.log(data);
                if(data.AddValidaNombreColoniaResult == 0){
                    console.log('ok');
                    var objColonias_New = {
                        'CP': vm.CP,
                        'Clv_Tipo': vm.TipoColonia.Clave,
                        'FechaEntrega': vm.FechaEntrega,
                        'Nombre': vm.Colonia,
                        'Op': 0
                    };
                    console.log(objColonias_New);
                    CatalogosFactory.AddColonias_New(objColonias_New).then(function(data){
                        console.log(data);
                        var Clv_Colonia = data.AddColonias_NewResult;
                        if(Clv_Colonia > 0){
                            ngNotify.set('CORRECTO, se añadió una colonia nueva.', 'success');
                            $state.go('home.catalogos.colonia_editar', { id:Clv_Colonia });
                        }else{
                            ngNotify.set('ERROR, al añadir una colonia nueva.', 'warn');
                            $state.go('home.catalogos.colonias');
                        }
                    });
                }else if(data.AddValidaNombreColoniaResult == 1){
                    ngNotify.set('ERROR, ya existe una colonia con el mismo nombre.', 'warn');
                }
            });
        }

        function GetCiudadMunicipio(){
            if(vm.Estado != undefined){
                CatalogosFactory.GetEstadosRelMun(vm.Estado.IdEstado).then(function(data){
                    vm.CiudadMunicipioList = data.GetEstadosRelMunResult;
                    vm.LocalidadList = null;
                });
            }else{
                vm.CiudadMunicipioList = null;
                vm.LocalidadList = null;
            }
        }

        function GetLocalidad(){
            if(vm.Ciudad != undefined){
                CatalogosFactory.GetLocalidadRelMun(vm.Ciudad.Municipio.IdMunicipio).then(function(data){
                    console.log(data);
                    vm.LocalidadList = data.GetLocalidadRelMunResult;
                });
            }else{
                vm.LocalidadList = null;
            }
        }


        var vm = this;
        vm.Titulo = 'Nueva Colonia';
        vm.GetCiudadMunicipio = GetCiudadMunicipio;
        vm.GetLocalidad = GetLocalidad;
        vm.SaveColonia = SaveColonia;
        initData();

    });