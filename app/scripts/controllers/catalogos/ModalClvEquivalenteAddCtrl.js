'use strict';

angular
    .module('softvApp')
    .controller('ModalClvEquivalenteAddCtrl', function($uibModalInstance, $uibModal, ServiciosFactory, CatalogosFactory, $state, ngNotify, ClvEquiList){
        
        function initData(){
            GetMedioList();
            GetClvEquivalenteList();
            /*SetClvEquivalenteList();*/
        }

        function GetClvEquivalenteList(){
            CatalogosFactory.Gettbl_politicasFibraList().then(function(data){
                console.log(data);
                vm.ClvEquiNetList = data.Gettbl_politicasFibraListResult;
            });
        }

        function GetMedioList(){
            console.log('X');
            console.log(ClvEquiListM.length > 0);
            if (ClvEquiListM.length > 0){
                console.log('2');
                vm.MedioList = ClvEquiListM;
                vm.ViewList = (vm.MedioList.length > 0)? true:false;
            }else{
                console.log('1');
                ServiciosFactory.GetMedioList().then(function(data){
                    console.log(data);
                    var MedioList = data.GetMedioListResult;
                    angular.forEach(MedioList, function(value, key){
                        var Obj = {
                            'IdMedio': value.IdMedio,
                            'Descripcion': value.Descripcion,
                            'ClvEqui': null
                        };
                        vm.MedioList.push(Obj);
                    });
                    vm.ViewList = (vm.MedioList.length > 0)? true:false;
                });
            }
        }
        
        function AddClvEquivalente(ObjClvEqui){
            console.log(ObjClvEqui);
            console.log(vm.MedioList);
        }

        function Save(){
            vm.ClvEquivalenteList = vm.MedioList;
            OK();
        }

        function DontSave(){
            console.log(ClvEquiListO);
            vm.ClvEquivalenteList = ClvEquiListO;
            Cancel();
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
            $uibModalInstance.close(vm.ClvEquivalenteList);
        }
        
        function Cancel() {
            $uibModalInstance.dismiss('cancel');
        }
        
        var vm = this;
        vm.Titulo = 'Clave Equivalente';
        vm.MedioList = [];
        vm.ClvEquivalenteList = [];
        vm.AddClvEquivalente = AddClvEquivalente;
        vm.Save = Save;
        vm.DontSave = DontSave;
        console.log(ClvEquiList);
        var ClvEquiListO = ClvEquiList;
        var ClvEquiListM = ClvEquiList;
        initData();

    });