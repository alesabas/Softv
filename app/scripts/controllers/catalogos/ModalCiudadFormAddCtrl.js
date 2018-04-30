'use strict';

angular
    .module('softvApp')
    .controller('ModalCiudadFormAddCtrl', function(CatalogosFactory, $uibModalInstance, $uibModal,logFactory, ngNotify, $state){

        function SaveCiudad(){
            var ObjCiudad = {
                'Nombre': vm.Ciudad,
                'Id':0
            };
            CatalogosFactory.GetAddCiudades(ObjCiudad).then(function(data){
                if(data.GetAddCiudadesResult[0].mismoNombre == 0){
                    vm.IdCiudad = data.GetAddCiudadesResult[0].Clv_Ciudad;
                    ngNotify.set('CORRECTO, se añadió una ciudad nueva, ahora puedes comenzar a agregar relaciones', 'success');
                    vm.ShowEdit = false;
                    vm.ShowAdd = true;

                    var log={
                        'Modulo':'home.catalogos',
                        'Submodulo':'home.catalogos.ciudades',
                        'Observaciones':'Se registró una nueva ciudad',
                        'Comando':JSON.stringify(ObjCiudad),
                        'Clv_afectada':vm.IdCiudad
                    };

                    logFactory.AddMovSist(log).then(function(result){ console.log('add'); });

                    

                    GetEstadoList(vm.IdCiudad);
                }else if(data.GetAddCiudadesResult[0].mismoNombre == 1){
                    ngNotify.set('ERROR, Ya existe una ciudad con el mismo nombre.', 'warn');
                }else{
                    ngNotify.set('ERROR, al añadir una ciudad nueva.', 'warn');
                    cancel();
                }
            });
        }

        function GetEstadoList(IdMunicipio){
            CatalogosFactory.GetRelEstadoCiudad_NewList(IdMunicipio).then(function(data){
                vm.EstadoList = data.GetRelEstadoCiudad_NewListResult;
            });
        }

        function GetRelEstMun(IdMunicipio){
            var ObjMunicipio = {
                'Op': 3,
                'Clv_Ciudad': IdMunicipio 
            };
            CatalogosFactory.GetMuestraRelEdoCd(ObjMunicipio).then(function(data){
                vm.RelEstList = data.GetMuestraRelEdoCdResult;
            });
        }

        function AddRelEst(){
            var objRelEstadoCiudad_New = {
                'Clv_Ciudad': vm.IdCiudad,
                'Clv_Estado': vm.Estado.Clv_Estado,
                'Op': 1
            };
            CatalogosFactory.AddRelEstadoCiudad_New(objRelEstadoCiudad_New).then(function(data){
                if(data.AddRelEstadoCiudad_NewResult == -1){              
                  

                    ngNotify.set('CORRECTO, se agregó la relación.', 'success');
                    GetRelEstMun(vm.IdCiudad);
                    GetEstadoList(vm.IdCiudad);
                }else{
                    GetRelEstMun(vm.IdCiudad);
                    ngNotify.set('ERROR, al agregar la relación.', 'warn');
                    $state.reload('home.catalogos.ciudades');
                    cancel();
                }
            });
        }

        function DeleteRelEst(Clv_Estado){
            var ObjMunicipio = {
                "Op": 2,
                "Clv_Estado": Clv_Estado,
                "Clv_Ciudad": vm.IdCiudad
            };
            CatalogosFactory.DeleteRelEstadoCiudad_New(ObjMunicipio).then(function(data){
                if(data.DeleteRelEstadoCiudad_NewResult == -1){
                    ngNotify.set('CORRECTO, se eliminó la relación.', 'success');
                    GetRelEstMun(vm.IdCiudad);
                    GetEstadoList(vm.IdCiudad);
                }else{
                    GetRelEstMun(vm.IdCiudad);
                    ngNotify.set('ERROR, al eliminar la relación.', 'warn');
                    cancel();
                }
            });
        }

        function cancel() {
            $uibModalInstance.close();
        }

        var vm = this;
        vm.Titulo = 'Nueva Ciudad';
        vm.Icono = 'fa fa-plus';
        vm.ShowEdit = true;
        vm.ShowAdd = false;
        vm.DisableAdd = false;
        vm.DisableUpdate = true;
        vm.View = false;
        vm.SaveCiudad = SaveCiudad;
        vm.AddRelEst = AddRelEst;
        vm.DeleteRelEst = DeleteRelEst;
        vm.cancel = cancel;

    });