'use strict';

angular
    .module('softvApp')
    .controller('ModalCiudadFormUpdateCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state, IdMunicipio){

        function initData(){
            CatalogosFactory.GetMuestraCiudadById(IdMunicipio).then(function(data){
                var Ciudad = data.GetMuestraCiudadByIdResult[0];
                vm.IdCiudad = Ciudad.Clv_Ciudad;
                vm.Ciudad = Ciudad.Nombre;
            });
            GetRelEstMun(IdMunicipio);
            GetEstadoList(IdMunicipio);
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
                    $state.reload('home.catalogos.ciudades');
                    cancel();
                }
            })
        }

        function SaveCiudad(){
            var objCiudades_New = {
                'Nombre': vm.Ciudad,
                'Clv_Ciudad': vm.IdCiudad
            };
            CatalogosFactory.UpdateCiudades_New(objCiudades_New).then(function(data){
                if(data.UpdateCiudades_NewResult == -1){
                    ngNotify.set('CORRECTO, se guardó la ciudad.', 'success');
                    $state.reload('home.catalogos.ciudades');
                    cancel();
                }else{
                    GetRelEstMun(vm.IdCiudad);
                    ngNotify.set('ERROR, al guardar la ciudad.', 'warn');
                    $state.reload('home.catalogos.ciudades');
                    cancel();
                }
            });
        }
        
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Editar Registro - ';
        vm.Icono = 'fa fa-pencil-square-o';
        vm.ShowEdit = true;
        vm.RelEstViewList = [];
        vm.AddRelEst = AddRelEst;
        vm.DeleteRelEst = DeleteRelEst;
        vm.SaveCiudad = SaveCiudad;
        vm.cancel = cancel;
        initData();

    });