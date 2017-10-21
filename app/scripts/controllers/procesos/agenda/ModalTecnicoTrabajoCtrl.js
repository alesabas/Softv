'use strict';

angular
    .module('softvApp')
    .controller('ModalTecnicoTrabajoCtrl', function(agendaFactory, $uibModal, $uibModalInstance, ngNotify, $state, $rootScope, $localStorage, ObjTecnicoTrabajo){
        
        function initData(){
            GetTecnicoTrabajo();
        }
        
        function GetTecnicoTrabajo(){
            var ObjTecTrabajo = {
                'fecha': JToDate(vm.Fecha),
                'Clv_Tecnico': vm.ClvTecnico
            };
            console.log(ObjTecTrabajo);
            agendaFactory.GetTrabajosOrdenesTecnicoDia(ObjTecTrabajo).then(function(data){
                console.log(data);
                vm.TecnicoTrabajoList = data.GetTrabajosOrdenesTecnicoDiaResult;
            });
        }
        
        function JToDate(Fecha){
            var D = Fecha.getDate();
            var M = Fecha.getMonth() + 1;
            var FD = (String(D).length == 1)? '0'+D : D;
            var FM = (String(M).length == 1)? '0'+M : M;
            var FY = Fecha.getFullYear();
            var FDate =  String(FD) + '/' + String(FM) + '/' + String(FY);
            return FDate;
        }

        function toDate(dateStr) {
            var parts = dateStr.split("/");
            return new Date(parts[2], parts[1] - 1, parts[0]);
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.cancel = cancel;
        vm.ClvTecnico = ObjTecnicoTrabajo.Clvtecnico;
        vm.NombreTecnico = ObjTecnicoTrabajo.NombreTecnico;
        vm.Fecha = toDate(ObjTecnicoTrabajo.Fecha);
        console.log(ObjTecnicoTrabajo);
        initData();

    });