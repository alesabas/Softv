'use strict';

angular
    .module('softvApp')
    .controller('ColoniaFormAddCtrl', function(CatalogosFactory, ngNotify, $state,logFactory){

        function initData(){
            CatalogosFactory.GetTipo_Colonias1_NewList().then(function(data){
                vm.TipoColoniaList = data.GetTipo_Colonias1_NewListResult;
            });
        }

        function SaveColonia(){
            var objValidaNombreColonia = {
                'nombre': vm.Colonia,
                'mismoNombre': 0,
                'clv_colonia': 0
            };
            CatalogosFactory.AddValidaNombreColonia(objValidaNombreColonia).then(function(data){
                if(data.AddValidaNombreColoniaResult == 0){
                    var objColonias_New = {
                        'Clv_Tipo': vm.TipoColonia.Clave,
                        'FechaEntrega': vm.FechaEntrega,
                        'Nombre': vm.Colonia,
                        'Op': 0
                    };
                    CatalogosFactory.AddColonias_New(objColonias_New).then(function(data){
                        var Clv_Colonia = data.AddColonias_NewResult;
                        if(Clv_Colonia > 0){
                            var log={
                                'Modulo':'home.catalogos',
                                'Submodulo':'home.catalogos.colonias',
                                'Observaciones':'Se registró nueva colonia ',
                                'Comando':JSON.stringify(objColonias_New),
                                'Clv_afectada':Clv_Colonia
                            };
        
                            logFactory.AddMovSist(log).then(function(result){ console.log('add'); });


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

        var vm = this;
        vm.Titulo = 'Nueva Colonia';
        vm.Disable = true;
        vm.View = false;
        vm.SaveColonia = SaveColonia;
        initData();

    });