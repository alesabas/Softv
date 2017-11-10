'use strict';

angular
    .module('softvApp')
    .controller('ModalDeleteCitaCtrl', function(agendaFactory, $uibModal, $uibModalInstance, ngNotify, $state, $rootScope, $localStorage, ObjCita){
        
        function DeleteCita(){
            agendaFactory.GetBOR_CITAS(vm.NoCita).then(function(data){
                if(data.GetBOR_CITASResult == -1){
                    ngNotify.set('CORRECTO, se eliminó la cita.', 'success');
                    $state.reload('home.procesos.agenda');
                    cancel();
                }else{
                    ngNotify.set('ERROR, al eliminar la cita.', 'warn');
                    $state.reload('home.procesos.agenda');
                    cancel();
                }
            });
        }
        
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.NoCita = ObjCita.No_Cita;
        vm.Tipo = ObjCita.Tipo;
        vm.Contrato = ObjCita.Contrato;
        vm.FECHA = ObjCita.FECHA;
        vm.Clv_OrdRep = ObjCita.Clv_OrdRep;
        vm.DeleteCita = DeleteCita;
        vm.cancel = cancel;
        
    });