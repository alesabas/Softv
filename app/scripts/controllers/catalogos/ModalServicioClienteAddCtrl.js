'use strict';

angular
    .module('softvApp')
    .controller('ModalServicioClienteAddCtrl', function(CatalogosFactory, $uibModal, $uibModalInstance, ngNotify, $state, $rootScope, IdContrato, $localStorage){
        
        function initData(){
            CatalogosFactory.GetMuestraTipSerPrincipal_SERList().then(function(data){
                vm.TipoServicioList = data.GetMuestraTipSerPrincipal_SERListResult;
            });
        }

        function AddServicioCliente(){
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
                'Clv_usuarioCapturo': $localStorage.currentUser.idUsuario
            };
            CatalogosFactory.AddClientesServicio(ObjServicioCliente).then(function(data){
                if(data.AddClientesServicioResult > 0){
                    ngNotify.set('CORRECTO, se agregó un servico al cliente.', 'success');
                    $rootScope.$emit('LoadServicioCliente', vm.IdContrato);
                    cancel();
                }else{
                    ngNotify.set('ERROR, al agregar un servico al cliente.', 'warn');
                    $rootScope.$emit('LoadServicioCliente', vm.IdContrato);
                    cancel();
                }
            });

        }

        function GetServiciosList(){
            if(vm.TipoServicio != undefined){
                CatalogosFactory.GetRelTipoServClienteList(vm.TipoServicio.Clv_TipSerPrincipal).then(function(data){
                    vm.ServicioList = data.GetRelTipoServClienteListResult;
                });
            }else{
                vm.ServicioList = '';
            }
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
        vm.Titulo = 'Agregar Servicio';
        vm.Icono = 'fa fa-plus';
        vm.IdContrato = IdContrato;
        vm.GetServiciosList = GetServiciosList;
        vm.AddServicioCliente = AddServicioCliente;
        vm.cancel = cancel;
        initData();

    });