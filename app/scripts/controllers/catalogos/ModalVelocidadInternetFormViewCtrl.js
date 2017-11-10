'use strict';

angular
    .module('softvApp')
    .controller('ModalVelocidadInternetFormViewCtrl', function(CatalogosFactory, $uibModal, $uibModalInstance, ngNotify, $state, id){

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
                            vm.UnidadMedidaSubida = vm.UnidadMedidaList[i];
                        }
                    }
                    for(var i = 0; vm.UnidadMedidaList.length > i; i ++){
                        if(vm.UnidadMedidaList[i].Clave == ClvUnidadMedidaBajada){
                            vm.UnidadMedidaBajada = vm.UnidadMedidaList[i];
                        }
                    }
                });
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Detalle Velocidad de Internet';
        vm.Icono = 'fa fa-eye';
        vm.BlockInput = true;
        vm.View = true;
        vm.cancel = cancel;
        initData();

    });