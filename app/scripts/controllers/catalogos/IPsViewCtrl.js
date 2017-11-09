'use strict';

angular
    .module('softvApp')
    .controller('IPsViewCtrl', function(CatalogosFactory, $uibModalInstance, $uibModal, ngNotify, $state, IdIP){
        
         function initData(){
            
            CatalogosFactory.GetDeepcatalogoIps_dos(IdIP).then(function(data){
                console.log(data);
                var ListIp = data.GetDeepcatalogoIps_dosResult;
                console.log(ListIp);
                vm.IP= ListIp.IP_ALL;
                vm.Red= ListIp.IPRed;
                vm.FechaAsignacion= (ListIp.UltimaFechaAsignacion != null)? toDate(ListIp.UltimaFechaAsignacion):ListIp.UltimaFechaAsignacion;
                vm.FechaLiberacion=(ListIp.UltimaFechaLiberacion != null) ? toDate(ListIp.UltimaFechaLiberacion): ListIp.UltimaFechaLiberacion;
                vm.IdIp = ListIp.IdIP;

                var Status= ListIp.Status;
                                
                vm.ClienteAsignado= ListIp.UltimoClienteAsignado;
                CatalogosFactory.GetListCombo().then(function(data){
                    console.log(data);
                    vm.ListCombo = data.GetListComboResult;

                    for (var b = 0; b < vm.ListCombo.length; b++) {
                        if(vm.ListCombo[b].Status == Status) {
                            vm.Status = vm.ListCombo[b];
                        }
                    }
                });
            });

            
        }

        function toDate(dateStr) {
            var parts = dateStr.split("/");
            return new Date(parts[2], parts[1] - 1, parts[0]);
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }


        var vm = this;
        vm.Titulo = 'Detalle IP';
        vm.Icono = 'fa fa-eye';
        vm.View = true;
        vm.RFechaA= false;
        vm.cancel = cancel;
        initData();
    });