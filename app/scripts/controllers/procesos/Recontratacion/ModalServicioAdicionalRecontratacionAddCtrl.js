'use strict';

angular
    .module('softvApp')
    .controller('ModalServicioAdicionalRecontratacionAddCtrl', function(RecontratacionFactory, ClienteServicioFactory, CatalogosRedIPFactory, $uibModalInstance, $uibModal, ngNotify, $state, $localStorage, ObjCliente){
        
        function initData(){
           ClienteServicioFactory.GetListServicioAdicTvDig().then(function(data){
                vm.ServicioList = data.GetListServicioAdicTvDigResult;
            }); 
        }

        function SavePaqueteAdic(){
            var ObjRecontracion = {
                'ClvSession': ObjCliente.ClvSession,
                'IdContrato': ObjCliente.IdContrato,
                'Clv_Unicanet': ObjCliente.Clv_UnicaNet,
                'ClvTipoServ': vm.Servicio.Clv_TipSer,
                'Clv_Servicio': vm.Servicio.Clv_Servicio,
                'IdRecon': ObjCliente.IdRecon
            }
            RecontratacionFactory.GetAddPaqueteAdicionalEnBaja(ObjRecontracion).then(function(data){
                if(data.GetAddPaqueteAdicionalEnBajaResult > 0){
                    ngNotify.set('CORRECTO, se agregó paquete adicional.', 'success');
                    OK();
                }else{
                    ngNotify.set('ERROR, al agregar un paquete adicional.', 'warn');
                    OK();
                }
            });
        }

        function OK(){
            $uibModalInstance.close(vm.IdRecon);
        }

        function Cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Cancel = Cancel;
        vm.SavePaqueteAdic = SavePaqueteAdic;
        initData();

    });