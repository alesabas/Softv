'use strict';
angular
    .module('softvApp')
    .controller('ModalClvEquivalenteUpdateCtrl', function($uibModalInstance, $uibModal, ServiciosFactory, CatalogosFactory, $state, ngNotify, Clv_Servicio){
        
        function initData(){
            GetClvEquiNetList();
        }

        function GetClvEquiNetList(){
            CatalogosFactory.Gettbl_politicasFibraList().then(function(data){
                vm.ClvEquiNetList = data.Gettbl_politicasFibraListResult;
                GetMedioList();
            });
        }

        function GetMedioList(){
            ServiciosFactory.GetMedioList().then(function(data){
                vm.MedioList = data.GetMedioListResult;
                angular.forEach(vm.MedioList, function(value, key){
                    var Obj = {
                        'IdMedio': value.IdMedio,
                        'Descripcion': value.Descripcion,
                        'ClvEqui': null
                    };
                    vm.ClvEquiList.push(Obj);
                });
                GetClvEquiList();
            });
        }

        function GetClvEquiList(){
            ServiciosFactory.GetServicioClvEqMedioList(vm.Clv_Servicio).then(function(data){
                vm.ClvEquiOriginList = data.GetServicioClvEqMedioListResult;
                SetClvEquiList();
            });
        }

        function SetClvEquiList(){
            if(vm.ClvEquiOriginList.length > 0){
                angular.forEach(vm.ClvEquiList, function(value, key){
                    var IdMedio = value.IdMedio;
                    angular.forEach(vm.ClvEquiOriginList, function(val, ke){
                        if(val.IdMedio == IdMedio){
                            var id = val.Id;
                            angular.forEach(vm.ClvEquiNetList, function(v, k){
                                if(v.id == id){
                                    value.ClvEqui = v;
                                }
                            });
                        }
                    });
                });
            }
            vm.ViewList = (vm.ClvEquiList.length > 0)? true:false;
        }
        
        function Save(){
            var ObjClvEquivalente = [];
            angular.forEach(vm.ClvEquiList, function(value, key){
                var obj = {
                    'ClvServicio': vm.Clv_Servicio,
                    'Id': value.ClvEqui.id,
                    'IdMedio': value.IdMedio
                };
                ObjClvEquivalente.push(obj);
            });
            ServiciosFactory.GetUpdateServicioClvEqMedio(ObjClvEquivalente).then(function(data){
                OK();
            });
        }

        function OK(){
            $uibModalInstance.close();
        }
        
        function Cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.disable = false;
        vm.Titulo = 'Clave Equivalente';
        vm.ClvEquiList = [];
        vm.Save = Save;
        vm.OK = OK;
        vm.Cancel = Cancel;
        vm.Clv_Servicio = Clv_Servicio;
        initData();

    });