'use strict';

angular
    .module('softvApp')
    .controller('ModalCambioAparatosIgualCtrl', function(ordenesFactory, $uibModal, $uibModalInstance, ngNotify, $state, ObjOrdenSer){

        function initdata(){
            GetListClienteAparatos();
            GetStatusAparato();
        }

        function GetListClienteAparatos(){
            ordenesFactory.GetListClienteAparatos(vm.IdContrato).then(function(data){
                console.log(data);
                vm.AparatoList = data.GetListClienteAparatosResult;
            });
        }
        
        function GetStatusAparato(){
            ordenesFactory.GetSP_StatusAparatosList().then(function(data){
                console.log(data);
                vm.StatusAparatoList = data.GetSP_StatusAparatosListResult;
            });
        }

        function SetAparatoList(){
            vm.TipoAparatoList = undefined;
            vm.AparatoDispList = undefined;
            if(vm.AparatoC != undefined){
                if(vm.Trabajo == 'CAPAG'){
                    GetAparatosDispList();
                }else if(vm.Trabajo == 'CAPAT'){
                    GetTipoAparatosDispList();
                }
            }
        }

        function GetAparatosDispList(){
            if((vm.Trabajo == 'CAPAG' && vm.AparatoC != undefined) || (vm.Trabajo == 'CAPAT' && vm.TipoAparatoA != undefined)){
                var ObjAparato = {
                    'Clv_Tecnico': vm.ClvTecnico,
                    'Id_Articulo': (vm.Trabajo == 'CAPAG')? vm.AparatoC.idArticulo:vm.TipoAparatoA.IdArticulo
                };
                ordenesFactory.GetListAparatosDisponiblesByIdArticulo(ObjAparato).then(function(data){
                    console.log(data);
                    vm.AparatoDispList = data.GetListAparatosDisponiblesByIdArticuloResult;
                });
            }
        }

        function GetTipoAparatosDispList(){
            vm.AparatoDispList = undefined;
            var ObjAparato = {
                'Id_Articulo': vm.AparatoC.idArticulo,
                'ContratoNet': vm.AparatoC.ControNet,
            };
            ordenesFactory.GetListTipoAparatosByIdArticulo(ObjAparato).then(function(data){
                console.log(data);
                vm.TipoAparatoList = data.GetListTipoAparatosByIdArticuloResult;
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.IdContrato = ObjOrdenSer.IdContrato;
        vm.ClvTecnico = ObjOrdenSer.ClvTecnico;
        vm.Trabajo = ObjOrdenSer.Trabajo
        vm.ShowTipoCambio = (vm.Trabajo == 'CAPAG')? true:false;
        vm.SetAparatoList = SetAparatoList;
        vm.GetAparatosDispList = GetAparatosDispList;
        vm.cancel = cancel;
        initdata();
        console.log(ObjOrdenSer);
    });