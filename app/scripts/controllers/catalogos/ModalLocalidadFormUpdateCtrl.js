'use strict';

angular
    .module('softvApp')
    .controller('ModalLocalidadFormUpdateCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state,logFactory, IdLocalidad, $localStorage){

        function initData(){
            var ObjCiudad = {
                'Clv_Ciudad': 0,
                'Nombre': '',
                'Op': 2
            };
            CatalogosFactory.GetBuscaCiudades(ObjCiudad).then(function(data){
                vm.CiudadLista = data.GetBuscaCiudadesResult;
            });
            CatalogosFactory.GetDeepLocalidades_New(IdLocalidad).then(function(data){
                var LocalidadResult = data.GetDeepLocalidades_NewResult;
                vm.IdLocalidad = LocalidadResult.Clv_Localidad;
                vm.Localidad = LocalidadResult.Nombre;
                vm.Titulo = 'Editar Localidad - '+ vm.Localidad;
                GetRelLocalidad();
            });

        }

        function GetRelLocalidad(){
            var ObjRel = {
                'clv_usuario': $localStorage.currentUser.idUsuario,
                'clv_localidad': vm.IdLocalidad,
                'clv_ciudad': 0,
                'opcion': 1
            };
            CatalogosFactory.GetRelCiudadLocalidadList(ObjRel).then(function(data){
                vm.RelLocalidadList = data.GetRelCiudadLocalidadListResult;
                vm.ViewList = (vm.RelLocalidadList.length > 0)? true:false;
            });
        }

        function AddEstMun(){
            if(vm.Ciudad != undefined && vm.Ciudad != 0){
                if(ExistsEstMun(vm.Ciudad.Clv_Ciudad) == false){
                    var objSPRelCiudadLocalidad = {
                        'clv_usuario':  $localStorage.currentUser.idUsuario,
                        'clv_localidad': vm.IdLocalidad,
                        'clv_ciudad': vm.Ciudad.Clv_Ciudad,
                        'opcion': 2
                    };
                    CatalogosFactory.AddSPRelCiudadLocalidad(objSPRelCiudadLocalidad).then(function(data){
                        if(data.AddSPRelCiudadLocalidadResult == -1){
                            var log={
                                'Modulo':'home.catalogos',
                                'Submodulo':'home.catalogos.localidades',
                                'Observaciones':'Se agregó relación ciudad-localidad',
                                'Comando':JSON.stringify(objSPRelCiudadLocalidad),
                                'Clv_afectada': vm.IdLocalidad
                            };
                    
                            logFactory.AddMovSist(log).then(function(result){ console.log('add'); });
                            ngNotify.set('CORRECTO, se agregó una relación.', 'success');
                            GetRelLocalidad()
                        }else{
                            ngNotify.set('ERROR, al agregar una relación.', 'warn');
                            GetRelLocalidad()
                        }
                    });
                }else{
                    ngNotify.set('ERROR, Ya existe esta relación.', 'warn');
                }
            }else{
                ngNotify.set('ERROR, Selecciona una ciudad.', 'warn');
            }
        }

        function ExistsEstMun(IdMunicipio){
            var ResultExists = 0;
            for(var i = 0; vm.RelLocalidadList.length > i; i ++){
                if(vm.RelLocalidadList[i].clv_ciudad == IdMunicipio){
                    ResultExists = ResultExists + 1
                }
            }
            return (ResultExists > 0)? true : false;
        }

        function DeleteEstMun(IdMunicipio){
            var ObjValidate = {
                'clv_localidad': vm.IdLocalidad,
                'clv_ciudad': IdMunicipio
            };
            CatalogosFactory.GetDeepValidaEliminaRelLocalidadCiudad(ObjValidate).then(function(data){
                var MsjError = data.GetDeepValidaEliminaRelLocalidadCiudadResult.error; 
                if(MsjError == null){
                    var ObjRel = {
                        'clv_usuario': $localStorage.currentUser.idUsuario,
                        'clv_localidad': vm.IdLocalidad,
                        'clv_ciudad': IdMunicipio,
                        'opcion': 3
                    };
                    CatalogosFactory.DeleteSPRelCiudadLocalidad(ObjRel).then(function(data){
                        var log={
                            'Modulo':'home.catalogos',
                            'Submodulo':'home.catalogos.localidades',
                            'Observaciones':'Se elininó relación ciudad-localidad',
                            'Comando':JSON.stringify(ObjRel),
                            'Clv_afectada': vm.IdLocalidad
                        };
                
                        logFactory.AddMovSist(log).then(function(result){ console.log('add'); });
                        ngNotify.set('CORRECTO, se eliminó la relación.', 'success');
                        GetRelLocalidad()
                    });
                }else{
                    ngNotify.set('ERROR, ' + MsjError, 'warn');
                }
            });
        }

        function SaveLocalidad(){
            var objValidaNombreLocalidad = {
                'nombre': vm.Localidad,
                'mismoNombre': 0,
                'clv_localidad': vm.IdLocalidad
            };
            CatalogosFactory.AddValidaNombreLocalidad(objValidaNombreLocalidad).then(function(data){
                if(data.AddValidaNombreLocalidadResult == 0){
                    var objLocalidades_New = {
                        'Clv_Localidad': vm.IdLocalidad,
                        'Nombre': vm.Localidad,
                        'opcion': 1,
                        'clvnuevo': vm.IdLocalidad
                    };
                    CatalogosFactory.UpdateLocalidades_New(objLocalidades_New).then(function(data){
                        if(data.UpdateLocalidades_NewResult == -1){
                            var log={
                                'Modulo':'home.catalogos',
                                'Submodulo':'home.catalogos.localidades',
                                'Observaciones':'Se editó localidad',
                                'Comando':JSON.stringify(objLocalidades_New),
                                'Clv_afectada': vm.IdLocalidad
                            };
                    
                            logFactory.AddMovSist(log).then(function(result){ console.log('add'); });
                            ngNotify.set('CORRECTO, se guardó la localidad.', 'success');
                        }else{
                            ngNotify.set('ERROR, al guardar la localidad.', 'warn');
                        }
                    });
                }else if(data.AddValidaNombreLocalidadResult == 1){
                    ngNotify.set('ERROR, ya existe una Localidad con el mis nombre.', 'warn');
                }
            });
        }

        function cancel() {
            $uibModalInstance.close();
        }

        var vm = this;
       
        vm.Icono = 'fa fa-pencil-square-o';
        vm.BtnCanTitulo = 'Salir';
        vm.ShowUpdate = false;
        vm.ShowSave = false;
        vm.View = false;
        vm.SaveLocalidad = SaveLocalidad;
        vm.AddEstMun = AddEstMun;
        vm.DeleteEstMun = DeleteEstMun;
        vm.cancel = cancel;
        initData();

    });