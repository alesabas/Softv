'use strict';

angular
    .module('softvApp')
    .controller('ModalVelocidadInternetFormUpdateCtrl', function(CatalogosFactory, $uibModal, $uibModalInstance, ngNotify, $state, id){

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

        function SaveVelocidadInternet(){
            var ObjVelocidad = {
                'id': id, 
                'Clv_equivalente': vm.ClaveEquivalente, 
                'VelSub': vm.VelocidadSubida, 
                'VelBaj': vm.VelocidadBajada, 
                'UnidadSub': vm.UnidadMedidaSubida.Clave, 
                'UnidadBaj': vm.UnidadMedidaBajada.Clave
            };
            CatalogosFactory.GetSp_guardaPolitica(ObjVelocidad).then(function(data){
                var Msj = data.GetSp_guardaPoliticaResult[0].Msj;
                if(Msj == 'Politica cambiada correctamente'){
                    ngNotify.set(Msj + '.', 'success');
                    $state.reload('home.catalogos.VelocidadInternet');
                    cancel();
                }else{
                    ngNotify.set(Msj + '.', 'warn');
                }
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Editar Velocidad de Internet';
        vm.Icono = 'fa fa-pencil-square-o';
        vm.BlockInput = true;
        vm.View = false;
        vm.SaveVelocidadInternet = SaveVelocidadInternet;
        vm.cancel = cancel;
        initData();

    });