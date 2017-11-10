'use strict';

angular
    .module('softvApp')
    .controller('IPsUpdateCtrl', function(CatalogosFactory, $uibModalInstance, $uibModal, ngNotify, $state, IdIP, $rootScope){
        
        function initData(){
            CatalogosFactory.GetDeepcatalogoIps_dos(IdIP).then(function(data){
                console.log(data);
                var ListIp = data.GetDeepcatalogoIps_dosResult;
                console.log(ListIp);
                vm.IP= ListIp.IP_ALL;
                vm.Red= ListIp.IPRed;
                vm.FechaAsignacion= (ListIp.UltimaFechaAsignacion != null)? toDate(ListIp.UltimaFechaAsignacion):ListIp.UltimaFechaAsignacion;
                vm.FechaLiberacion=(ListIp.UltimaFechaLiberacion != null) ? toDate(ListIp.UltimaFechaLiberacion): ListIp.UltimaFechaLiberacion;
                vm.FechaAsignacionR= (ListIp.UltimaFechaAsignacion != null)? toDate(ListIp.UltimaFechaAsignacion):ListIp.UltimaFechaAsignacion;
                vm.FechaLiberacionR=(ListIp.UltimaFechaLiberacion != null) ? toDate(ListIp.UltimaFechaLiberacion): ListIp.UltimaFechaLiberacion;
                console.log(vm.FechaLiberacion);
                vm.IdIp = ListIp.IdIP;
                vm.StatusIP= ListIp.Status;
                vm.ClienteAsignado= ListIp.UltimoClienteAsignado;
                CatalogosFactory.GetListCombo().then(function(data){
                    console.log(data);
                    vm.ListCombo = data.GetListComboResult;
                    for (var b = 0; b < vm.ListCombo.length; b++) {
                        if(vm.ListCombo[b].Status == vm.StatusIP) {
                            vm.Status = vm.ListCombo[b];
                        }
                    }
                });
            });
        }

        function ValidaS(){
            if(vm.Status != undefined){
                if (vm.Status.Status== 'A'){
                    vm.RFechaA = (vm.StatusIP == 'A')? false:true;
                    vm.RFechaL = false;
                    vm.FechaLiberacion = vm.FechaLiberacionR;
                    vm.BlockFL = true;
                    vm.BlockFA = (vm.StatusIP == 'A')? true:false;
                    ValidateSetFecha(1);
                }else if(vm.Status.Status == 'D'){
                    vm.RFechaL = (vm.StatusIP == 'A')? true:false;
                    vm.BlockFL = (vm.StatusIP == 'A')? false:true;
                    vm.RFechaA = false;
                    vm.BlockFA = true;
                    vm.FechaAsignacion = vm.FechaAsignacionR;
                }
            }
        }

        function toDate(dateStr) {
            var parts = dateStr.split("/");
            return new Date(parts[2], parts[1] - 1, parts[0]);
        }

        function Fechas(Fecha){
            var FechaD = Fecha.getDate();
            var FechaM = Fecha.getMonth() + 1;
            var FechaY = Fecha.getFullYear();
            return FechaD + '/' + FechaM + '/' + FechaY;
        }

        function FechasV(Fecha){
            var FechaD = Fecha.getDate();
            var FechaM = Fecha.getMonth();
            var FechaY = Fecha.getFullYear();
            return new Date(FechaY, FechaM, FechaD);
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function Guardar(){
            var objcatalogoIps_dos= {
                'IdIP': vm.IdIp,
                'UltimaFechaLiberacion': (vm.FechaLiberacion != null)? Fechas(vm.FechaLiberacion):vm.FechaLiberacion,
                'UltimaFechaAsignacion': (vm.FechaAsignacion != null)? Fechas(vm.FechaAsignacion):vm.FechaAsignacion,
                'Status': vm.Status.Status
            }
            CatalogosFactory.UpdatecatalogoIps_dos(objcatalogoIps_dos).then(function(data){
                console.log(data);
                ngNotify.set('CORRECTO, se guardaron los cambios.', 'success');
                //$state.reload('home.catalogos.ips');
                $rootScope.$emit('LoadLista');
                cancel();
            });
        }

        function ValidateSetFecha(Op){
            var FV = new Date();
            var DateToDay = FechasV(FV);
            if(Op == 2){
                var DateL = FechasV(vm.FechaLiberacion);
                vm.FechaV = (DateL.getTime() == DateToDay.getTime())? true:false;
            }else if(Op == 1 && vm.FechaAsignacion != null){
                var DateA = FechasV(vm.FechaAsignacion);
                vm.FechaVA = (DateA.getTime() == DateToDay.getTime())? true:false;
            }
        }

        var vm = this;
        vm.Titulo = 'Editar IP';
        vm.Icono = 'fa fa-pencil-square-o';
        vm.View = false;
        vm.RFechaA= false;
        vm.RFechaL = false;
        vm.BlockFA = true;
        vm.BlockFL = true; 
        vm.ValidaS= ValidaS;
        vm.cancel = cancel;
        vm.Guardar = Guardar;
        vm.ValidateSetFecha = ValidateSetFecha;
        initData();
    });