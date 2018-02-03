'use strict';

angular
    .module('softvApp')
    .controller('ModalCambioAparatosIgualCtrl', function(ordenesFactory, $uibModal, $uibModalInstance, ngNotify, $state, ObjOrdenSer){

        function initdata(){
            GetCambioAparato();
        }

        function GetListClienteAparatos(){
            ordenesFactory.GetListClienteAparatos(vm.IdContrato).then(function(data){
                vm.AparatoList = data.GetListClienteAparatosResult;
                if(vm.AparatoCliente != null){
                    for(var i = 0; vm.AparatoList.length > i; i++){
                        if(vm.AparatoList[i].Clv_Aparato == vm.AparatoCliente){
                            vm.AparatoC = vm.AparatoList[i];
                            if(vm.Trabajo == 'CAPAG'){
                                GetAparatosDispList();
                            }else if(vm.Trabajo == 'CAPAT'){
                                GetTipoAparatosDispList();
                            }
                        }
                    }
                }
            });
        }
        
        function GetStatusAparato(){
            ordenesFactory.GetSP_StatusAparatosList().then(function(data){
                vm.StatusAparatoList = data.GetSP_StatusAparatosListResult;
                if(vm.StatusEntrega != null){
                    for(var i = 0; vm.StatusAparatoList.length > i; i++){
                        if(vm.StatusAparatoList[i].Clv_StatusCableModem == vm.StatusEntrega){
                            vm.StatusAparatoC = vm.StatusAparatoList[i];
                        }
                    }
                }
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
                    vm.AparatoDispList = data.GetListAparatosDisponiblesByIdArticuloResult;
                    if(vm.AparatoAsignar != null){
                        for(var i = 0; vm.AparatoDispList.length > i; i ++){
                            if(vm.AparatoDispList[i].Clv_Aparato == vm.AparatoAsignar){
                                vm.AparatoA = vm.AparatoDispList[i];
                            }
                        }
                    }
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
                vm.TipoAparatoList = data.GetListTipoAparatosByIdArticuloResult;
                if(vm.TipoAparatoAsignar != null){
                    for(var i = 0; vm.TipoAparatoList.length > i; i++){
                        if(vm.TipoAparatoList[i].IdArticulo == vm.TipoAparatoAsignar){
                            vm.TipoAparatoA = vm.TipoAparatoList[i];
                            GetAparatosDispList();
                        }
                    }
                }
            });
        }

        function SaveCambioAparato(){
            var ObjCambioAparato = {
                'ContratoNet': vm.AparatoC.ControNet,
                'ClvAparato': vm.AparatoA.Clv_Aparato,
                'ClvOrden': vm.Clv_Orden,
                'Trabajo': vm.Trabajo,
                'Status': vm.StatusAparatoC.Clv_StatusCableModem
            };
            ordenesFactory.GetSetCambioAparato(ObjCambioAparato).then(function(data){
                ngNotify.set('CORRECTO, se agrego cambio de aparato.', 'success');
                cancel();
            })
        }

        function GetCambioAparato(){
            ordenesFactory.GetCambioAparatoDeep(vm.Clv_Orden, vm.Clave).then(function(data){
                var CambioAparato = data.GetCambioAparatoDeepResult;
                vm.AparatoCliente = CambioAparato.AparatoCliente;
                vm.StatusEntrega = CambioAparato.StatusEntrega;
                vm.AparatoAsignar = CambioAparato.AparatoAsignar;
                vm.TipoAparatoAsignar = CambioAparato.TipoAparatoAsignar;
                GetListClienteAparatos();
                GetStatusAparato();
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Clave = ObjOrdenSer.Clave
        vm.Clv_Orden = ObjOrdenSer.Clv_Orden;
        vm.IdContrato = ObjOrdenSer.IdContrato;
        vm.ClvTecnico = ObjOrdenSer.ClvTecnico;
        vm.Trabajo = ObjOrdenSer.Trabajo
        vm.ShowTipoCambio = (vm.Trabajo == 'CAPAG')? true:false;
        vm.SetAparatoList = SetAparatoList;
        vm.GetAparatosDispList = GetAparatosDispList;
        vm.SaveCambioAparato = SaveCambioAparato;
        vm.cancel = cancel;
        initdata();
    });