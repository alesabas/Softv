'use strict';

angular
    .module('softvApp')
    .controller('ModalConfiguracionAddCtrl', function($uibModalInstance, $uibModal, CatalogosFactory, $state, $rootScope, ngNotify, Clv_Servicio){

        function initData(){
            CatalogosFactory.GetMuestra_Plazas_ConfiguracionServiciosList(0).then(function(data){
                vm.DistribuidorList = data.GetMuestra_Plazas_ConfiguracionServiciosListResult;
            });
        }

        function GetRelComEstCiu(){
            if(vm.Distribuidor != undefined){
                CatalogosFactory.GetDameRelCompaniaEstadoCiudadList(vm.Distribuidor.clv_plaza).then(function(data){
                    vm.RelComEstCiuList = data.GetDameRelCompaniaEstadoCiudadListResult;
                });
            }
            vm.RelComEstCiuList = '';
            vm.Servicio1List = '';
            vm.Servicio2List = '';
            vm.ObjSerRelComEstCiu = '';
            vm.ShowRel = false;
        }

        function GetSerRelComEstCiu1(ObjRelComEstCiu1){
            vm.ObjSerRelComEstCiu = {
                'clv_plaza': vm.Distribuidor.clv_plaza, 
                'id_compania': ObjRelComEstCiu1.id_compania, 
                'Clv_Estado': ObjRelComEstCiu1.Clv_Estado, 
                'Clv_Ciudad': ObjRelComEstCiu1.Clv_Ciudad, 
                'Clv_Servicio': vm.Clv_Servicio
            };
            CatalogosFactory.GetDameServiciosRelComEdoCd_PorServicio1_NewList(vm.ObjSerRelComEstCiu).then(function(data){
                vm.Servicio1List = data.GetDameServiciosRelComEdoCd_PorServicio1_NewListResult;
                vm.Servicio1 = vm.Servicio1List[0];
            });
            CatalogosFactory.GetDameServiciosRelComEdoCd_PorServicio2_NewList(vm.ObjSerRelComEstCiu).then(function(data){
                vm.Servicio2List = data.GetDameServiciosRelComEdoCd_PorServicio2_NewListResult;
            });
            vm.ShowRel = true;
        }

        function AddServicioPlaza(){
            var objinsertaServiciosRelCompaniaEstadoCiudad = {
                'clv_plaza': vm.ObjSerRelComEstCiu.clv_plaza,
                'id_compania': vm.ObjSerRelComEstCiu.id_compania,
                'Clv_Estado': vm.ObjSerRelComEstCiu.Clv_Estado,
                'Clv_Ciudad': vm.ObjSerRelComEstCiu.Clv_Ciudad,
                'clv_servicio': vm.Servicio1.Clv_Servicio
            };
            CatalogosFactory.AddinsertaServiciosRelCompaniaEstadoCiudad(objinsertaServiciosRelCompaniaEstadoCiudad).then(function(data){
                if(data.AddinsertaServiciosRelCompaniaEstadoCiudadResult == -1){
                    ngNotify.set('CORRECTO, se añadió el servicio.', 'success');
                    GetSerRelComEstCiu1(vm.ObjSerRelComEstCiu);
                }else{
                    ngNotify.set('ERROR, al añadir el servicio.', 'warn');
                }
            });
        }

        function DeleteServicioPlaza(){
            var ObjDeletRelSer = {
                'clv_plaza': vm.ObjSerRelComEstCiu.clv_plaza, 
                'id_compania': vm.ObjSerRelComEstCiu.id_compania, 
                'Clv_Estado': vm.ObjSerRelComEstCiu.Clv_Estado, 
                'Clv_Ciudad': vm.ObjSerRelComEstCiu.Clv_Ciudad, 
                'clv_servicio': vm.ObjSerRelComEstCiu.Clv_Servicio
            };
            CatalogosFactory.DeleteinsertaServiciosRelCompaniaEstadoCiudad(ObjDeletRelSer).then(function(data){
                if(data.DeleteinsertaServiciosRelCompaniaEstadoCiudadResult == -1){
                    ngNotify.set('CORRECTO, se eliminó el servicio.', 'success');
                    GetSerRelComEstCiu1(vm.ObjSerRelComEstCiu);
                }else{
                    ngNotify.set('ERROR, al eliminar el servicio.', 'warn');
                }
            });
       }

       function AddServicioPlazaTodas(){
            var objinsertaServiciosRelCompaniaEstadoCiudadATodos = {
                'clv_plaza': vm.ObjSerRelComEstCiu.clv_plaza,
                'clv_servicio': vm.ObjSerRelComEstCiu.Clv_Servicio
            };
            CatalogosFactory.AddinsertaServiciosRelCompaniaEstadoCiudadATodos(objinsertaServiciosRelCompaniaEstadoCiudadATodos).then(function(data){
                if(data.AddinsertaServiciosRelCompaniaEstadoCiudadATodosResult == -1){
                    ngNotify.set('CORRECTO, se añadió el servicio a todas las plazas.', 'success');
                    GetSerRelComEstCiu1(vm.ObjSerRelComEstCiu);
                }else{
                    ngNotify.set('ERROR, al añadir el servicio a todas las plazas.', 'warn');
                }
            });
        }

        function DeleteServicioPlazaTodas(){
            var ObjDeletRelSer = {
                'clv_plaza': vm.ObjSerRelComEstCiu.clv_plaza,
                'clv_servicio': vm.ObjSerRelComEstCiu.Clv_Servicio
            };
            CatalogosFactory.DeleteinsertaServiciosRelCompaniaEstadoCiudadATodos(ObjDeletRelSer).then(function(data){
                if(data.DeleteinsertaServiciosRelCompaniaEstadoCiudadATodosResult == -1){
                    ngNotify.set('CORRECTO, se añadió el servicio a todas las plazas.', 'success');
                    GetSerRelComEstCiu1(vm.ObjSerRelComEstCiu);
                }else{
                    ngNotify.set('ERROR, al añadir el servicio a todas las plazas.', 'warn');
                }
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
        
        var vm = this;
        vm.cancel = cancel;
        vm.ShowRel = false;
        vm.Clv_Servicio = Clv_Servicio;
        vm.GetRelComEstCiu = GetRelComEstCiu;
        vm.GetSerRelComEstCiu1 = GetSerRelComEstCiu1;
        vm.AddServicioPlaza = AddServicioPlaza;
        vm.DeleteServicioPlaza = DeleteServicioPlaza;
        vm.AddServicioPlazaTodas = AddServicioPlazaTodas;
        vm.DeleteServicioPlazaTodas = DeleteServicioPlazaTodas;
        initData();
    });