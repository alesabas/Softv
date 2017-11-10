'use strict';

angular
    .module('softvApp')
    .controller('ModalVelocidadInternetFormAddCtrl', function(CatalogosFactory, $uibModal, $uibModalInstance, ngNotify, $state){

        function initData(){
            CatalogosFactory.GetDameUnidadesMedidasDeVelocidadList().then(function(data){
                vm.UnidadMedidaList = data.GetDameUnidadesMedidasDeVelocidadListResult;
            });
        }

        function SaveVelocidadInternet(){
            var ObjVelocidad = {
                'id': 0, 
                'Clv_equivalente': vm.ClaveEquivalente, 
                'VelSub': vm.VelocidadSubida, 
                'VelBaj': vm.VelocidadBajada, 
                'UnidadSub': vm.UnidadMedidaSubida.Clave, 
                'UnidadBaj': vm.UnidadMedidaBajada.Clave
            };
            CatalogosFactory.GetSp_guardaPolitica(ObjVelocidad).then(function(data){
                var Msj = data.GetSp_guardaPoliticaResult[0].Msj;
                if(Msj == 'Nueva politica guardada correctamente'){
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
        vm.Titulo = 'Nueva Velocidad de Internet';
        vm.Icono = 'fa fa-plus';
        vm.BlockInput = false;
        vm.View = false;
        vm.SaveVelocidadInternet = SaveVelocidadInternet;
        vm.cancel = cancel;
        initData();

    });