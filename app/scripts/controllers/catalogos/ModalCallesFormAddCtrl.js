'use strict';

angular
    .module('softvApp')
    .controller('ModalCalleFormAddCtrl', function(CatalogosFactory, $uibModal, $uibModalInstance, ngNotify, $state){

        function initData(){
            CatalogosFactory.GetMuestraEstados_RelColList().then(function(data){
                vm.EstadoList = data.GetMuestraEstados_RelColListResult;
            });
        }

        function SaveCalle(){
            var objValidaNombreCalle = {
                'nombre': vm.Calle,
                'clv_calle': 0
            };
            CatalogosFactory.AddValidaNombreCalle(objValidaNombreCalle).then(function(data){
                if(data.AddValidaNombreCalleResult == 0){
                    var objCalles_New = {
                        'NOMBRE': vm.Calle
                    };
                    CatalogosFactory.AddCalles_New(objCalles_New).then(function(data){
                        vm.Clv_Calle = data.AddCalles_NewResult;
                        if(vm.Clv_Calle > 0){
                            ngNotify.set('CORRECTO, se añadió una calle nueva, ahora puedes comenzar a agregar relaciones', 'success');
                            $state.reload('home.catalogos.calles');
                            vm.Disable = false;
                            vm.DisableAdd = true;
                            GetRelCalle();
                        }else{
                            ngNotify.set('ERROR, al añadir una calle nueva.', 'warn');
                            $state.reload('home.catalogos.calles');
                        }
                    });
                }else if(data.AddValidaNombreCalleResult == 1){
                    ngNotify.set('ERROR, ya existe una calle con el mismo nombre.', 'warn');
                }
            });
        }

        function GetRelCalle(){
            CatalogosFactory.GetRelColoniasCalles_NewList(vm.Clv_Calle).then(function(data){
                vm.RelCalleList = data.GetRelColoniasCalles_NewListResult;
            });
        }

        function AddRelCalle(){
            var objRelColoniasCalles_New = {
                'clv_estado': vm.Estado.Clv_Estado,
                'clv_ciudad': vm.Municipio.Clv_Ciudad,
                'clv_localidad': vm.Localidad.Clv_Localidad,
                'clv_colonia': vm.Colonia.CLV_COLONIA,
                'clv_calle': vm.Clv_Calle
            };
            CatalogosFactory.AddRelColoniasCalles_New(objRelColoniasCalles_New).then(function(data){
                if(data.AddRelColoniasCalles_NewResult == 0){
                    ngNotify.set('CORRECTO, se guardó la relación con la colonia.', 'success');
                    GetRelCalle();
                }else{
                    ngNotify.set('ERROR, al guardar la relación con la colonia, posiblemente esta relación ya existe para esta calle.', 'warn');
                    GetRelCalle();
                }
            });
        }

        function DeleteRelCalle(RelCalle){
            var ObjRelCalle = {
                'clv_Calle': vm.Clv_Calle,
                'clv_colonia': RelCalle.clv_colonia
            };
            CatalogosFactory.GetValidaEliminarRelColoniaCalle(ObjRelCalle).then(function(data){
                if(data.GetValidaEliminarRelColoniaCalleResult.Msj == null){
                    var ObjRelCalleD = {
                        'clv_estado': RelCalle.clv_estado,
                        'clv_ciudad': RelCalle.clv_ciudad,
                        'clv_localidad': RelCalle.clv_localidad,
                        'clv_colonia': RelCalle.clv_colonia,
                        'clv_calle': vm.Clv_Calle
                    };
                    CatalogosFactory.DeleteRelColoniasCalles_New(ObjRelCalleD).then(function(data){
                        if(data.DeleteRelColoniasCalles_NewResult == -1){
                            ngNotify.set('CORRECTO, se eliminó la relación con la colonia.', 'success');
                            GetRelCalle();
                        }else{
                            ngNotify.set('ERROR, al eliminar la relación con la colonia.', 'warn');
                            GetRelCalle();
                        }
                    });
                }else{
                    ngNotify.set('ERROR, al eliminar la relación con la colonia, posiblemente puede estar relacionada con uno o varios clientes.', 'warn');
                }
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

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Nueva Calle';
        vm.Icono = 'fa fa-plus';
        vm.Disable = true;
        vm.DisableAdd = false;
        vm.SaveCalle = SaveCalle;
        vm.GetCiudadList = GetCiudadList;
        vm.GetColoniaList = GetColoniaList;
        vm.GetLocalidadList = GetLocalidadList;
        vm.AddRelCalle = AddRelCalle;
        vm.DeleteRelCalle = DeleteRelCalle;
        vm.cancel = cancel;
        initData();

    });