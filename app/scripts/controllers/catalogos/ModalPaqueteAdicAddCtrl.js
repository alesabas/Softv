'use strict';

angular
    .module('softvApp')
    .controller('ModalPaqueteAdicAddCtrl', function(CatalogosFactory, ClienteServicioFactory, $uibModal, $uibModalInstance, ngNotify, $state, $rootScope, ObjPaqAdic, $localStorage){
        
        function initData(){
            ClienteServicioFactory.GetListServicioAdicTvDig().then(function(data){
                console.log(data);
                vm.ServicioList = data.GetListServicioAdicTvDigResult;
            });
        }

        function AddPaqueteAdic(){
            var Hoy = ToDate(new Date());
            var ObjServicioCliente = {
                'Contrato': vm.IdContrato,
                'Clv_Servicio': vm.Servicio.Clv_Servicio,
                'status': 'C',
                'fecha_solicitud': Hoy,
                'fecha_instalacio': '',
                'fecha_suspension': '',
                'fecha_baja': '',
                'fecha_Fuera_Area': '',
                'FECHA_ULT_PAGO': '',
                'PrimerMensualidad': 1,
                'ultimo_mes': 0,
                'ultimo_anio': 0,
                'primerMesAnt': 0,
                'statusAnt': 'C',
                'facturaAnt': '',
                'GENERAOSINSTA': 1,
                'factura': '',
                'Clv_Vendedor': 0,
                'Clv_Promocion': 0,
                'Email': '',
                'Obs': '',
                'CLV_MOTCAN': 0,
                'Cortesia': 0,
                'Adic': 0,
                'TVSINPAGO': 0,
                'TVCONPAGO': 0,
                'IdMedio': 0,
                'Clv_usuarioCapturo': $localStorage.currentUser.idUsuario,
                'ParentClv_UnicaNet': vm.ParentClv_UnicaNet
            };
            ClienteServicioFactory.GetAddPqueteAdic(ObjServicioCliente).then(function(data){
                console.log(data);
                /*vm.Clv_UnicaNet = data.AddClientesServicioResult;
                if(vm.Clv_UnicaNet > 0){
                    ngNotify.set('CORRECTO, se agregó un servico al cliente.', 'success');
                    //$rootScope.$emit('LoadServicioCliente', vm.IdContrato);
                    cancel();
                }else{
                    ngNotify.set('ERROR, al agregar un servico al cliente.', 'warn');
                    //$rootScope.$emit('LoadServicioCliente', vm.IdContrato);
                    cancel();
                }*/
            });
        }

        function ToDate(Fecha){
            var D = Fecha.getDate();
            var M = Fecha.getMonth() + 1;
            var FD = (String(D).length == 1)? '0'+D : D;
            var FM = (String(M).length == 1)? '0'+M : M;
            var FY = Fecha.getFullYear();
            var FDate =  String(FD) + '/' + String(FM) + '/' + String(FY);
            return FDate;
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    
        var vm = this;
        vm.Titulo = 'Agregar Paquete Adicional';
        vm.Icono = 'fa fa-plus';
        vm.ParentClv_UnicaNet = ObjPaqAdic.Clv_UnicaNet;
        vm.IdContrato = ObjPaqAdic.IdContrato;
        vm.AddPaqueteAdic = AddPaqueteAdic;
        vm.cancel = cancel;
        initData();

    });