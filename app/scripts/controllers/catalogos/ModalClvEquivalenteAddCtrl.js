'use strict';
angular
    .module('softvApp')
    .controller('ModalClvEquivalenteAddCtrl', function($uibModalInstance, $uibModal, ServiciosFactory, CatalogosFactory, $state, ngNotify, ClvEquiListPost){
        
        function initData(){
            GetClvEquivalenteList();
        }

        function GetClvEquivalenteList(){
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
                if(ClvEquiListOrigin.length > 0){
                    angular.forEach(vm.ClvEquiList, function(value, key){
                        var IdMedio = value.IdMedio;
                        angular.forEach(ClvEquiListOrigin, function(val, ke){
                            if(val.IdMedio == IdMedio){
                                var id = val.id;
                                angular.forEach(vm.ClvEquiNetList, function(v, k){
                                    if(v.id == id){
                                        value.ClvEqui = v;
                                    }
                                });
                            }
                        });
                    });
                    angular.forEach(vm.ClvEquiList, function(value, key){
                        if(value.ClvEqui != null){
                            Add(value);
                        }
                    });
                }
                vm.ViewList = (vm.ClvEquiList.length > 0)? true:false;
            });
        }
        
        function AddClvEquivalente(ClV){
            if(vm.ClvEquiListResponse.length > 0){
                if(ValidateClvEquivalente(ClV) == true){
                    Add(ClV);
                }else{
                    angular.forEach(vm.ClvEquiListResponse, function(value, key){
                        if(value.IdMedio == ClV.IdMedio){
                            value.id = ClV.ClvEqui.id;
                        }
                    });
                }
            }else{
                Add(ClV);
            }
        }

        function Add(ClV){
            var obj = {
                'IdMedio': ClV.IdMedio,
                'id': ClV.ClvEqui.id
            };
            vm.ClvEquiListResponse.push(obj);
        }

        function ValidateClvEquivalente(CLV){
            var Count = 0;
            angular.forEach(vm.ClvEquiListResponse, function(value, key){
                if(value.IdMedio == CLV.IdMedio){
                    Count ++;
                }
            });
            return (Count > 0)? false:true;
        }
        
        function Save(){
            $uibModalInstance.close(vm.ClvEquiListResponse);
        }
        
        function Cancel() {
            $uibModalInstance.dismiss('cancel');
        }
        
        var vm = this;
        vm.disable = false;
        vm.Titulo = 'Clave Equivalente';
        vm.ClvEquiListResponse = [];
        var ClvEquiListOrigin = ClvEquiListPost;
        vm.ClvEquiList = [];
        vm.AddClvEquivalente = AddClvEquivalente;
        vm.Save = Save;
        vm.Cancel = Cancel;
        initData();

    });