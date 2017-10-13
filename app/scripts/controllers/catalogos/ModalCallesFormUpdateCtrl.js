'use strict';

angular
    .module('softvApp')
    .controller('ModalCalleFormUpdateCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state, IdCalle){

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

        function AddRelCalle(){
            var objRelColoniasCalles_New = {
                'clv_estado': vm.Estado.Clv_Estado,
                'clv_ciudad': vm.Municipio.Clv_Ciudad,
                'clv_localidad': vm.Localidad.Clv_Localidad,
                'clv_colonia': vm.Colonia.CLV_COLONIA,
                'clv_calle': vm.IdCalle
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
                'clv_Calle': vm.IdCalle,
                'clv_colonia': RelCalle.clv_colonia
            };
            CatalogosFactory.GetValidaEliminarRelColoniaCalle(ObjRelCalle).then(function(data){
                if(data.GetValidaEliminarRelColoniaCalleResult.Msj == null){
                    var ObjRelCalleD = {
                        'clv_estado': RelCalle.clv_estado,
                        'clv_ciudad': RelCalle.clv_ciudad,
                        'clv_localidad': RelCalle.clv_localidad,
                        'clv_colonia': RelCalle.clv_colonia,
                        'clv_calle': vm.IdCalle
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

        function SaveCalle(){
            var objValidaNombreCalle = {
                'nombre': vm.Calle,
                'clv_calle': vm.IdCalle
            };
            CatalogosFactory.AddValidaNombreCalle(objValidaNombreCalle).then(function(data){
                if(data.AddValidaNombreCalleResult == 0){
                    var objCalles_New = {
                        'Clv_Calle': vm.IdCalle,
                        'NOMBRE': vm.Calle
                    };
                    CatalogosFactory.UpdateCalles_New(objCalles_New).then(function(data){
                        if(data.UpdateCalles_NewResult = -1){
                            ngNotify.set('CORRECTO, se guardó la calle.', 'success');
                            $state.reload('home.catalogos.calles');
                            GetCalle();
                        }else{
                            ngNotify.set('ERROR, al guardar la calle.', 'warn');
                            $state.reload('home.catalogos.calles');
                            GetCalle();
                        }
                    });
                }else if(data.AddValidaNombreCalleResult == 1){
                    ngNotify.set('ERROR, ya existe una calle con el mismo nombre.', 'warn');
                }
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Editar Registro - ';
        vm.Icono = 'fa fa-pencil-square-o';
        vm.Show = false;
        vm.GetCiudadList = GetCiudadList;
        vm.GetLocalidadList = GetLocalidadList;
        vm.GetColoniaList = GetColoniaList;
        vm.AddRelCalle = AddRelCalle;
        vm.DeleteRelCalle = DeleteRelCalle;
        vm.SaveCalle = SaveCalle;
        vm.cancel = cancel;
        initData();

    });