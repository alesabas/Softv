'use strict';
angular
    .module('softvApp')
    .controller('ModalClvEquivalenteUpdateCtrl', function($uibModalInstance, $uibModal, ServiciosFactory, CatalogosFactory, $state, ngNotify, Clv_Servicio){
        
        function initData(){
            GetClvEquiNetList();
        }

        function GetClvEquiNetList(){
            CatalogosFactory.Gettbl_politicasFibraList().then(function(data){
                console.log(data);
                vm.ClvEquiNetList = data.Gettbl_politicasFibraListResult;
                GetMedioList();
            });
        }

        function GetMedioList(){
            ServiciosFactory.GetMedioList().then(function(data){
                console.log(data);
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
                console.log(data);
                vm.ClvEquiOriginList = data.GetServicioClvEqMedioListResult;
                SetClvEquiList();
            });
        }

        function SetClvEquiList(){
            if(vm.ClvEquiOriginList.length > 0){
                angular.forEach(vm.ClvEquiList, function(value, key){
                    var IdMedio = value.IdMedio;
                    console.log(IdMedio);
                    angular.forEach(vm.ClvEquiOriginList, function(val, ke){
                        console.log('post');
                        if(val.IdMedio == IdMedio){
                            console.log('exist');
                            var id = val.Id;
                            angular.forEach(vm.ClvEquiNetList, function(v, k){
                                console.log('politicas');
                                if(v.id == id){
                                    console.log('exist pol');
                                    console.log(v);
                                    value.ClvEqui = v;
                                }
                            });
                        }
                    });
                });
            }
            vm.ViewList = (vm.ClvEquiList.length > 0)? true:false;
        }

        function OK(){
            $uibModalInstance.close();
        }
        
        function Cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.ClvEquiList = [];
        vm.OK = OK;
        vm.Cancel = Cancel;
        vm.Clv_Servicio = Clv_Servicio;
        console.log(Clv_Servicio);
        initData();

    });