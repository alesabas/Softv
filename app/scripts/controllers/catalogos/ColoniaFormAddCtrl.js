'use strict';

angular
    .module('softvApp')
    .controller('ColoniaFormAddCtrl', function(CatalogosFactory, ngNotify, $state, $uibModal){

        function initData(){
            CatalogosFactory.GetTipo_Colonias1_NewList().then(function(data){
                vm.TipoColoniaList = data.GetTipo_Colonias1_NewListResult;
            });
            CatalogosFactory.GetMuestraEstados_RelColList().then(function(data){
                vm.EstadoList = data.GetMuestraEstados_RelColListResult;
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
                        vm.Clv_Colonia = data.AddColonias_NewResult;
                        if(vm.Clv_Colonia > 0){
                            ngNotify.set('CORRECTO, se añadió una colonia nueva.', 'success');
                            vm.Disable = false;
                            vm.SaveBtnS = false; 
                            /*$state.go('home.catalogos.colonia_editar', { id:Clv_Colonia });*/
                        }else{
                            ngNotify.set('ERROR, al añadir una colonia nueva.', 'warn');
                            /*$state.go('home.catalogos.colonias');*/
                        }
                    });
                }else if(data.AddValidaNombreColoniaResult == 1){
                    ngNotify.set('ERROR, ya existe una colonia con el mismo nombre.', 'warn');
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
            if(vm.Ciudad != undefined){
                var ObjLocalidadList = {
                    'clv_colonia': vm.Clv_Colonia,
                    'clv_ciudad': vm.Ciudad.Clv_Ciudad
                };
                CatalogosFactory.GetMuestraLoc_RelColoniaList(ObjLocalidadList).then(function(data){
                    vm.LocalidadList = data.GetMuestraLoc_RelColoniaListResult;
                });
            }else{
                vm.LocalidadList = '';
            }
        }

        function GetRelLocColList(){
            CatalogosFactory.GetInsertaRelColoniaLocalidadList(vm.Clv_Colonia).then(function(data){
                vm.RelColLocList = data.GetInsertaRelColoniaLocalidadListResult;
            });
        }

        function AddRelEstCiuLocCol(){
            var objInsertaRelColoniaLocalidad = {
                'Clv_Colonia': vm.Clv_Colonia,
                'Clv_Localidad': vm.Localidad.Clv_Localidad,
                'Clv_Ciudad': vm.Ciudad.Clv_Ciudad,
                'CodigoPostal': vm.CPRel
            };
            CatalogosFactory.AddInsertaRelColoniaLocalidad(objInsertaRelColoniaLocalidad).then(function(data){
                if(data.AddInsertaRelColoniaLocalidadResult == -1){
                    ngNotify.set('CORRECTO, se agregó la relación.', 'success');
                    GetRelLocColList();
                    GetCiudadList();
                    vm.ObjRelCol = null;
                    vm.ShowRel = false;
                    vm.CPRel = '';
                }else{
                    ngNotify.set('ERROR, al agregar la relación.', 'warn');
                    GetRelLocColList();
                    vm.CPRel = '';
                    vm.ObjRelCol = null;
                    vm.ShowRel = false;
                }
            });
        }

        function DeleteRelEstCiuLocCol(ObjRelLocCol){
            var objValidaCVELOCCOL = {
                'clv_localidad': ObjRelLocCol.Clv_Localidad,
                'clv_colonia': ObjRelLocCol.Clv_Colonia
            };
            CatalogosFactory.AddValidaCVELOCCOL(objValidaCVELOCCOL).then(function(data){
                if(data.AddValidaCVELOCCOLResult == 1){
                    var ObjRelLocColD = {
                        'Clv_Colonia': ObjRelLocCol.Clv_Colonia,
                        'Clv_Localidad': ObjRelLocCol.Clv_Localidad,
                        'Clv_Ciudad': ObjRelLocCol.Clv_Ciudad,
                        'CodigoPostal': ObjRelLocCol.CodigoPostal
                    };
                    CatalogosFactory.DeleteInsertaRelColoniaLocalidad(ObjRelLocCol).then(function(data){
                        if(data.DeleteInsertaRelColoniaLocalidadResult == -1){
                            ngNotify.set('CORRECTO, se eliminó la relación.', 'success');
                            GetRelLocColList();
                            GetCiudadList();
                            vm.CPRel = '';
                            vm.ObjRelCol = null;
                            vm.ShowRel = false;
                        }else{
                            ngNotify.set('ERROR, al eliminar la relación.', 'warn');
                            GetRelLocColList();
                            vm.CPRel = '';
                            vm.ObjRelCol = null;
                            vm.ShowRel = false;
                        }
                    });
                }else if(data.AddValidaCVELOCCOLResult == 0){
                    ngNotify.set('ERROR, al eliminar la relación, posiblemente puede estar relacionada con uno o varios clientes.', 'warn');
                }
            });
        }

        function OpenRelServicios(ObjRelColonia){
            var ObjRelColonia = ObjRelColonia;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalRelColoniaServicios.html',
                controller: 'ModalRelColoniaServiciosCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'lg',
                resolve: {
                    ObjRelColonia: function () {
                        return ObjRelColonia;
                    }
                }
            });
        }

        var vm = this;
        vm.Titulo = 'Nueva Colonia';
        vm.Disable = true;
        vm.View = false;
        vm.SaveBtnS = true; 
        vm.SaveColonia = SaveColonia;
        vm.GetCiudadList = GetCiudadList;
        vm.GetLocalidadList = GetLocalidadList;
        vm.AddRelEstCiuLocCol = AddRelEstCiuLocCol;
        vm.DeleteRelEstCiuLocCol = DeleteRelEstCiuLocCol;
        vm.OpenRelServicios = OpenRelServicios;
        initData();

    });