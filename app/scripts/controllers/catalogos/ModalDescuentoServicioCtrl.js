'use strict';

angular
    .module('softvApp')
    .controller('ModalDescuentoServicioCtrl', function(CatalogosFactory, $uibModal, $uibModalInstance, ngNotify, $state, $rootScope, $localStorage, Clv_UnicaNet){
        
        function initData(){
            CatalogosFactory.GetClientesServicioList(Clv_UnicaNet).then(function(data){
                var ServicioResult = data.GetClientesServicioListResult[0];
                vm.Clv_UnicaNet = ServicioResult.Clv_UnicaNet;
                vm.Clv_Servicio = ServicioResult.Clv_Servicio;
                CatalogosFactory.GetDeepServicios_New(vm.Clv_Servicio).then(function(data){
                    vm.Clv_TipSer = data.GetDeepServicios_NewResult.Clv_TipSer;
                    var ObjRelDescuento = {
                        "Clv_UnicaNet": vm.Clv_UnicaNet,
                        "Clv_TipSer": vm.Clv_TipSer
                    };
                    CatalogosFactory.GetConRelCteDescuento(ObjRelDescuento).then(function(data){
                        var DescuentoServicio = data.GetConRelCteDescuentoResult;
                        if(DescuentoServicio.Clv_TipServ != null && DescuentoServicio.Clv_UnicaNet != null){
                            vm.Descuento = DescuentoServicio.Descuento;
                            vm.ConDescuento = false;
                        }else{
                            vm.Descuento = 0
                            vm.ConDescuento = true;
                        }
                    });
                });
            });
        }

        function AddDescuentoServicio(){
            var ObjRelDescuento = {
                "Clv_UnicaNet": vm.Clv_UnicaNet,
                "Clv_TipSer": vm.Clv_TipSer,
                "Descuento": vm.Descuento
            };
            CatalogosFactory.GetNueRelCteDescuento(ObjRelDescuento).then(function(data){
                if(data.GetNueRelCteDescuentoResult == -1){
                    ngNotify.set('CORRECTO, se guardó el descuento para el cliente.', 'success');
                    $rootScope.$emit('LoadDescuentoServicio', vm.Clv_TipSer);
                    cancel();
                }else{
                    ngNotify.set('ERROR, al agregar el descuento para el cliente.', 'warn');
                    $rootScope.$emit('LoadDescuentoServicio', vm.Clv_TipSer);
                    cancel();
                }
            });
        }

        function DeleteDescuentoServicio(){
            var ObjRelDescuento = {
                "Clv_UnicaNet": vm.Clv_UnicaNet,
                "Clv_TipSer": vm.Clv_TipSer
            };
            CatalogosFactory.GetBorRelCteDescuento(ObjRelDescuento).then(function(data){
                if(data.GetBorRelCteDescuentoResult == -1){
                    ngNotify.set('CORRECTO, se eliminó el descuento para el cliente.', 'success');
                    $rootScope.$emit('LoadDescuentoServicio', vm.Clv_TipSer);
                    cancel();
                }else{
                    ngNotify.set('ERROR, al eliminar el descuento para el cliente.', 'warn');
                    $rootScope.$emit('LoadDescuentoServicio', vm.Clv_TipSer);
                    cancel();
                }
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.ConDescuento = true;
        vm.cancel = cancel;
        vm.AddDescuentoServicio = AddDescuentoServicio;
        vm.DeleteDescuentoServicio = DeleteDescuentoServicio;
        initData();

    });