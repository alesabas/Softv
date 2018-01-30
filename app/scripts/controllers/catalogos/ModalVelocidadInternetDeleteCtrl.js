'use strict';

angular
    .module('softvApp')
    .controller('ModalVelocidadInternetDeleteCtrl', function(CatalogosFactory, $uibModal, $uibModalInstance, ngNotify, $state, id){

        function initData(){
            CatalogosFactory.GetDeeptbl_politicasFibra(id).then(function(data){
                var VelocidadInternet = data.GetDeeptbl_politicasFibraResult;
                vm.ClaveEquivalente = VelocidadInternet.Clv_equivalente;
                vm.VelocidadSubida = parseInt(VelocidadInternet.VelSub);
                vm.VelocidadBajada = parseInt(VelocidadInternet.VelBaj);
                var ClvUnidadMedidaSubida = VelocidadInternet.UnidadSub;
                var ClvUnidadMedidaBajada = VelocidadInternet.UnidadBaj;
                CatalogosFactory.GetDameUnidadesMedidasDeVelocidadList().then(function(data){
                    vm.UnidadMedidaList = data.GetDameUnidadesMedidasDeVelocidadListResult;
                    for(var i = 0; vm.UnidadMedidaList.length > i; i ++){
                        if(vm.UnidadMedidaList[i].Clave == ClvUnidadMedidaSubida){
                            vm.UnidadMedidaSubida = vm.UnidadMedidaList[i].Nombre;
                        }
                    }
                    for(var i = 0; vm.UnidadMedidaList.length > i; i ++){
                        if(vm.UnidadMedidaList[i].Clave == ClvUnidadMedidaBajada){
                            vm.UnidadMedidaBajada = vm.UnidadMedidaList[i].Nombre;
                        }
                    }
                });
            });
        }

        function DeleteVelocidadInternet(){
            CatalogosFactory.Deletetbl_politicasFibra(id).then(function(data){
                if(data.Deletetbl_politicasFibraResult == -1){
                    ngNotify.set('CORRECTO, se eliminó la política.', 'success');
                    cancel();
                }else{
                    ngNotify.set('ERROR, al eliminar la política.', 'warn');
                    cancel();
                }
            });
        }

        function cancel() {
            $uibModalInstance.close();
        }

        var vm = this;
        vm.DeleteVelocidadInternet = DeleteVelocidadInternet;
        vm.cancel = cancel;
        initData();

    });