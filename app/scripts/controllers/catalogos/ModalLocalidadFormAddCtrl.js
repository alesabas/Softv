'use strict';

angular
    .module('softvApp')
    .controller('ModalLocalidadFormAddCtrl', function(CatalogosFactory, $uibModalInstance, $uibModal, ngNotify, $state, $localStorage){

        function initData(){
            var ObjCiudad = {
                'Clv_Ciudad': 0,
                'Nombre': '',
                'Op': 2
            };
            CatalogosFactory.GetBuscaCiudades(ObjCiudad).then(function(data){
                vm.CiudadLista = data.GetBuscaCiudadesResult;
            });
        }

        function SaveLocalidad(){
            var objValidaNombreLocalidad = {
                'nombre': vm.Localidad,
                'mismoNombre': 0,
                'clv_localidad': 0
            };
            CatalogosFactory.AddValidaNombreLocalidad(objValidaNombreLocalidad).then(function(data){
                if(data.AddValidaNombreLocalidadResult == 0){
                    var objLocalidades_New = {
                        'Nombre': vm.Localidad,
                        'opcion': 0
                    };
                    CatalogosFactory.AddLocalidades_New(objLocalidades_New).then(function(data){
                        vm.IdLocalidad = data.AddLocalidades_NewResult;
                        if(vm.IdLocalidad > 0){
                            ngNotify.set('CORRECTO, se añadió una localidad nueva.', 'success');
                            GetRelLocalidad();
                            vm.ShowUpdate = true;
                            vm.BtnCanTitulo = 'Salir';
                        }else{
                            ngNotify.set('ERROR, al añadir una localidad nueva.', 'warn');
                            $state.reload('home.catalogos.localidades');
                            cancel();
                        }
                    });
                }else if(data.AddValidaNombreLocalidadResult == 1){
                    ngNotify.set('ERROR, ya existe una Localidad con el mis nombre.', 'warn');
                }
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
                            ngNotify.set('CORRECTO, se agregó una relación.', 'success');
                            GetRelLocalidad();
                        }else{
                            ngNotify.set('ERROR, al agregar una relación.', 'warn');
                            GetRelLocalidad();
                        }
                    });
                }else{
                    ngNotify.set('ERROR, Ya existe esta relación.', 'warn');
                }
            }else{
                ngNotify.set('ERROR, Selecciona una ciudad.', 'warn');
            }
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
                        ngNotify.set('CORRECTO, se eliminó la relación.', 'success');
                        GetRelLocalidad()
                    });
                }else{
                    ngNotify.set('ERROR, ' + MsjError, 'warn');
                }
            });
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

        function Ok(){
            $uibModalInstance.close();
        }

        function cancel() {
            $uibModalInstance.close();
        }

        var vm = this;
        vm.Titulo = 'Nueva Localidad';
        vm.Icono = 'fa fa-plus';
        vm.ShowUpdate = false;
        vm.View = false;
        vm.ViewList = false; 
        vm.BtnCanTitulo ='Cancelar';
        vm.SaveLocalidad = SaveLocalidad;
        vm.AddEstMun = AddEstMun;
        vm.DeleteEstMun = DeleteEstMun;
        vm.cancel = cancel;
        initData();
        
    });