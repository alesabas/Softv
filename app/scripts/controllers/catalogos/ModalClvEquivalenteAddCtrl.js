'use strict';

angular
    .module('softvApp')
    .controller('ModalClvEquivalenteAddCtrl', function($uibModalInstance, $uibModal, ServiciosFactory, CatalogosFactory, $state, ngNotify){
        
        function initData(){
            GetMedioList();
            GetClvEquivalenteList();
            SetClvEquivalenteList();
        }

        function GetMedioList(){
            ServiciosFactory.GetMedioList().then(function(data){
                console.log(data);
                vm.MedioList = data.GetMedioListResult;
            });
        }

        function GetClvEquivalenteList(){
            CatalogosFactory.Gettbl_politicasFibraList().then(function(data){
                console.log(data);
                vm.ClvEquiNetList = data.Gettbl_politicasFibraListResult;
            });
        }
        
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

        function OK(){
            $uibModalInstance.close(vm.ClvEquivalenteList);
        }

        function Cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Clave Equivalente';
        vm.ClvEquivalenteList = [];
        vm.AddClvEquivalente = AddClvEquivalente;
        vm.OK = OK;
        vm.Cancel = Cancel;
        initData();

    });