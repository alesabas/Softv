'use strict';

angular
    .module('softvApp')
    .controller('ColoniaFormUpdateCtrl', function(CatalogosFactory, ngNotify, $state, $stateParams){

        function initData(){
            CatalogosFactory.GetTipo_Colonias1_NewList().then(function(data){
                vm.TipoColoniaList = data.GetTipo_Colonias1_NewListResult;
                GetColonia();
            });
            CatalogosFactory.GetTipServ_NewList().then(function(data){
                vm.TipoServicioList = data.GetTipServ_NewListResult;
            });
            CatalogosFactory.GetMuestraEstados_RelColList().then(function(data){
                vm.EstadoList = data.GetMuestraEstados_RelColListResult;
            });
            var Obj = {};
            CatalogosFactory.GetMuestraMedios_NewList(Obj).then(function(data){
                vm.MedioList = data.GetMuestraMedios_NewListResult;
            });
            GetRelLocColList();
        }

        function GetColonia(){
            CatalogosFactory.GetDeepColonias_New(vm.Clv_Colonia).then(function(data){
                var Colonia = data.GetDeepColonias_NewResult;
                vm.Clv_Colonia = Colonia.Clv_Colonia;
                vm.Colonia = Colonia.Nombre;
                vm.FechaEntrega = toDate(Colonia.FechaEntrega);
                var TipoColoniaClave = Colonia.Clv_Tipo;
                for(var i = 0; vm.TipoColoniaList.length > i; i ++){
                    if(vm.TipoColoniaList[i].Clave == TipoColoniaClave){
                        vm.TipoColonia = vm.TipoColoniaList[i];
                    }
                }
            });
        }

        function SaveColonia(){
            var objValidaNombreColonia = {
                'nombre': vm.Colonia,
                'mismoNombre': 0,
                'clv_colonia': vm.Clv_Colonia
            };
            CatalogosFactory.AddValidaNombreColonia(objValidaNombreColonia).then(function(data){
                if(data.AddValidaNombreColoniaResult == 0){
                    var objColonias_New = {
                        'Clv_Colonia': vm.Clv_Colonia,
                        'Clv_Tipo': vm.TipoColonia.Clave,
                        'FechaEntrega': vm.FechaEntrega,
                        'Nombre': vm.Colonia
                    };
                    CatalogosFactory.UpdateColonias_New(objColonias_New).then(function(data){
                        if(data.UpdateColonias_NewResult == -1){
                            ngNotify.set('CORRECTO, se guardó la colonia.', 'success');
                            $state.go('home.catalogos.colonia_editar', { id:Clv_Colonia });
                            GetColonia();
                        }else{
                            ngNotify.set('ERROR, al guardar la colonia.', 'warn');
                            $state.go('home.catalogos.colonias');
                            GetColonia();
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

        function SetRelCol(ObjRelCol){
            vm.ObjRelCol = ObjRelCol;
            vm.ObjRelColSer = {
                'Clv_Colonia': vm.ObjRelCol.Clv_Colonia,
                'Clv_Localidad': vm.ObjRelCol.Clv_Localidad,
                'Clv_Ciudad': vm.ObjRelCol.Clv_Ciudad
            };
            GetRelColSerList();
            GetRelColMedList();
        }

        function GetRelColSerList(){
            CatalogosFactory.GetRelColoniasSerList(vm.ObjRelColSer).then(function(data){
                vm.RelColSerList = data.GetRelColoniasSerListResult;
                vm.ShowRel = true;
            });
        }
        
        function AddRelColSer(){
            var objRelColoniasSer = {
                'Clv_Localidad': vm.ObjRelCol.Clv_Localidad,
                'Clv_Ciudad': vm.ObjRelCol.Clv_Ciudad,
                'Clv_Colonia': vm.ObjRelCol.Clv_Colonia,
                'Clv_TipSer': vm.TipoServicio.Clv_TipSer
            };
            CatalogosFactory.AddRelColoniasSer(objRelColoniasSer).then(function(data){
                if(data.AddRelColoniasSerResult == -1){
                    ngNotify.set('CORRECTO, se agregó la relación con el Tipo de Servicio.', 'success');
                    GetRelColSerList();
                }else{
                    ngNotify.set('ERROR, al agregar la relación con el Tipo de Servicio.', 'warn');
                    GetRelColSerList();
                }
            });
        }

        function DeleteRelColSer(ObjRelColSer){
            var ObjRelColSerD = {
                'Clv_Localidad': vm.ObjRelColSer.Clv_Localidad,
                'Clv_Ciudad': vm.ObjRelColSer.Clv_Ciudad,
                'Clv_Colonia': vm.ObjRelColSer.Clv_Colonia,
                'Clv_TipSer': ObjRelColSer.Clv_TipSer
            };
            CatalogosFactory.DeleteRelColoniasSer(ObjRelColSerD).then(function(data){
                if(data.DeleteRelColoniasSerResult == -1){
                    ngNotify.set('CORRECTO, se eliminoó la relación con el Tipo de Servicio.', 'success');
                    GetRelColSerList();
                }else{
                    ngNotify.set('ERROR, al eliminarar la relación con el Tipo de Servicio.', 'warn');
                    GetRelColSerList();
                }
            });
        }

        function GetRelColMedList(){
            CatalogosFactory.GetRelColoniaMedioList(vm.ObjRelColSer).then(function(data){
                vm.RelColMesList = data.GetRelColoniaMedioListResult;
            });
        }

        function AddRelColMed(){
            var objRelColoniaMedio = {
                'Clv_Localidad': vm.ObjRelCol.Clv_Localidad,
                'Clv_Ciudad': vm.ObjRelCol.Clv_Ciudad,
                'Clv_Colonia': vm.ObjRelCol.Clv_Colonia,
                'IdMedio': vm.Medio.IdMedio
            };
            CatalogosFactory.AddRelColoniaMedio(objRelColoniaMedio).then(function(data){
                if(data.AddRelColoniaMedioResult == -1){
                    ngNotify.set('CORRECTO, se agregó la relación con el Medio.', 'success');
                    GetRelColMedList();
                }else{
                    ngNotify.set('ERROR, al agregar la relación con el Medio.', 'warn');
                    GetRelColMedList();
                }
            });
        }

        function DeleteRelColMed(ObjRelColMed){
            var ObjRelColMedD = {
                'Clv_Localidad': vm.ObjRelColSer.Clv_Localidad,
                'Clv_Ciudad': vm.ObjRelColSer.Clv_Ciudad,
                'Clv_Colonia': vm.ObjRelColSer.Clv_Colonia,
                'IdMedio': ObjRelColMed.IdMedio
            };
            CatalogosFactory.DeleteRelColoniaMedio(ObjRelColMedD).then(function(data){
                if(data.DeleteRelColoniaMedioResult == -1){
                    ngNotify.set('CORRECTO, se eliminoó la relación con el Medio.', 'success');
                    GetRelColMedList();
                }else{
                    ngNotify.set('ERROR, al eliminarar la relación con el Medio.', 'warn');
                    GetRelColMedList();
                }
            });
        }

        function toDate(dateStr) {
            var parts = dateStr.split("/");
            return new Date(parts[2], parts[1] - 1, parts[0]);
        }

        var vm = this;
        vm.Titulo = 'Editar Colonia - ';
        vm.ShowRel = false;
        vm.Disable = false;
        vm.Clv_Colonia = $stateParams.id;
        vm.SaveColonia = SaveColonia;
        vm.GetCiudadList = GetCiudadList;
        vm.GetLocalidadList = GetLocalidadList;
        vm.AddRelEstCiuLocCol = AddRelEstCiuLocCol;
        vm.DeleteRelEstCiuLocCol = DeleteRelEstCiuLocCol;
        vm.AddRelColSer = AddRelColSer;
        vm.DeleteRelColSer = DeleteRelColSer;
        vm.SetRelCol = SetRelCol;
        vm.AddRelColMed = AddRelColMed;
        vm.DeleteRelColMed = DeleteRelColMed;
        initData();
    });