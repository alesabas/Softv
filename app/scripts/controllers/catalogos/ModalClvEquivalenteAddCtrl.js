'use strict';
angular
    .module('softvApp')
    .controller('ModalClvEquivalenteAddCtrl', function($uibModalInstance, $uibModal, ServiciosFactory, CatalogosFactory, $state, ngNotify, ClvEquiListPost){
        
        function initData(){
            GetClvEquivalenteList();
            /*SetClvEquivalenteList();*/
        }

        function GetClvEquivalenteList(){
            CatalogosFactory.Gettbl_politicasFibraList().then(function(data){
                vm.ClvEquiNetList = data.Gettbl_politicasFibraListResult;
                GetMedioList();
            });
        }

        function GetMedioList(){
            /*console.log('X');
            console.log(ClvEquiListM.length > 0);
            if (ClvEquiListM.length > 0){
                console.log('2');
                vm.MedioList = ClvEquiListM;
                vm.ViewList = (vm.MedioList.length > 0)? true:false;
            }else{
                console.log('1');*/
                ServiciosFactory.GetMedioList().then(function(data){
                    vm.MedioList = data.GetMedioListResult;
                    console.log(ClvEquiListOrigin.length);
                    angular.forEach(vm.MedioList, function(value, key){
                        var Obj = {
                            'IdMedio': value.IdMedio,
                            'Descripcion': value.Descripcion,
                            'ClvEqui': null
                        };
                        vm.ClvEquiList.push(Obj);
                    });
                    if(ClvEquiListOrigin.length > 0){
                        console.log('Set List');
                        angular.forEach(vm.ClvEquiList, function(value, key){
                            var IdMedio = value.IdMedio;
                            console.log(IdMedio);
                            angular.forEach(ClvEquiListOrigin, function(val, ke){
                                console.log('post');
                                if(val.IdMedio == IdMedio){
                                    console.log('exist');
                                    var id = val.id;
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
                        angular.forEach(vm.ClvEquiList, function(value, key){
                            console.log(value);
                            if(value.ClvEqui != null){
                                Add(value);
                            }
                        });
                    }
                    console.log(vm.ClvEquiList);
                    vm.ViewList = (vm.ClvEquiList.length > 0)? true:false;
                });
            /*}*/
        }
        
        function AddClvEquivalente(ClV){
            console.log(ClV);
            console.log(vm.ClvEquiListResponse.length);
            if(vm.ClvEquiListResponse.length > 0){
                console.log('Chek');
                console.log(ValidateClvEquivalente(ClV));
                if(ValidateClvEquivalente(ClV) == true){
                    console.log('Add');
                    Add(ClV);
                    console.log(vm.ClvEquiListResponse);
                }else{
                    console.log('Update');
                    angular.forEach(vm.ClvEquiListResponse, function(value, key){
                        if(value.IdMedio == ClV.IdMedio){
                            value.id = ClV.ClvEqui.id;
                        }
                    });
                    console.log(vm.ClvEquiListResponse);
                }
            }else{
                console.log('Add');
                Add(ClV);
                console.log(vm.ClvEquiListResponse);
                /*console.log(ObjClvEqui.IdMedio);
                console.log(ObjClvEqui.ClvEqui.id);*/
            }
            /*console.log(ObjClvEqui);
            console.log(vm.MedioList);*/
        }

        function Add(ClV){
            var obj = {
                'IdMedio': ClV.IdMedio,
                'id': ClV.ClvEqui.id
            };
            vm.ClvEquiListResponse.push(obj);
            console.log(vm.ClvEquiListResponse);
        }

        function Save(){
            /*console.log(vm.ClvEquiList);
            vm.ClvEquiListResponse = [];
            angular.forEach(vm.ClvEquiList, function(value, key){
                var Obj = {
                    'IdMedio': value.IdMedio,
                    'Descripcion': value.Descripcion,
                    'Id': value.ClvEqui[0].id,
                    'ClvEqui': value.ClvEqui.Clv_equivalente
                };
                vm.ClvEquiListResponse.push(Obj);
            });
            console.log(vm.ClvEquiListResponse);*/
            OK();
        }
 
        function DontSave(){
            /*console.log(ClvEquiListO);
            vm.ClvEquivalenteList = ClvEquiListO;*/
            Cancel();
        }

        function ValidateClvEquivalente(CLV){
            console.log(CLV.IdMedio);
            console.log(CLV.ClvEqui.id);
            var Count = 0;
            angular.forEach(vm.ClvEquiListResponse, function(value, key){
                if(value.IdMedio == CLV.IdMedio){
                    Count ++;
                }
            });
            console.log(Count);
            return (Count > 0)? false:true;
        }
        
        /*
        function SetClvEquivalenteList(){
            vm.ViewList = (vm.ClvEquivalenteList.length > 0)? true:false;
        }

        function AddClvEquivalente(){
            if(vm.ClvEquivalenteList.length > 0){
                if(Validate() == true){
                    Add();
                }else{
                    Update();
                }
            }else{
                Add();
            }
        }

        function Add(){
            var ClvEquivalenteR = {
                'IdMedio': vm.Medio.IdMedio,
                'Descripcion': vm.Medio.Descripcion,
                'Id': vm.ClvEquivalente.id,
                'ClvEqui': vm.ClvEquivalente.Clv_equivalente
            };
            console.log(ClvEquivalenteR);
            vm.ClvEquivalenteList.push(ClvEquivalenteR);
            console.log(vm.ClvEquivalenteList);
            SetClvEquivalenteList();
        }

        function Update(){
            var Count = 0;
            for(var i = 0; vm.ClvEquivalenteList.length > i; i ++){
                if(vm.ClvEquivalenteList[i].IdMedio == vm.Medio.IdMedio){
                    vm.ClvEquivalenteList[i].Id = vm.ClvEquivalente.id;
                    vm.ClvEquivalenteList[i].ClvEqui = vm.ClvEquivalente.Clv_equivalente;
                    console.log(vm.ClvEquivalenteList);
                    break;
                }
            }
        }

        function Validate(){
            var Count = 0;
            for(var i = 0; vm.ClvEquivalenteList.length > i; i ++){
                if(vm.ClvEquivalenteList[i].IdMedio == vm.Medio.IdMedio){
                    Count = Count + 1;
                    break;
                }
            }
            console.log(Count);
            return (Count > 0)? false:true;
        }
        */
        function OK(){
            $uibModalInstance.close(vm.ClvEquiListResponse);
        }
        
        function Cancel() {
            $uibModalInstance.dismiss('cancel');
        }
        
        var vm = this;
        vm.Titulo = 'Clave Equivalente';
        vm.ClvEquiListResponse = [];
        var ClvEquiListOrigin = ClvEquiListPost;
        /*var ClvEquiListObj = ClvEquiListPost;*/
        /*vm.MedioList = [];*/
        vm.ClvEquiList = [];
        vm.AddClvEquivalente = AddClvEquivalente;
        vm.Save = Save;
        vm.DontSave = DontSave;
        console.log(ClvEquiListPost);
        /*var ClvEquiListO = ClvEquiList;*/
        /*var ClvEquiListM = ClvEquiList;*/
        initData();

    });