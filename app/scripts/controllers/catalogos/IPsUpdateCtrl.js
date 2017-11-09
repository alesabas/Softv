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

        function ValidaS(){
            if (vm.Status.Status== 'A')
            {
                vm.RFechaA= true;
            }
            else{
                vm.RFechaA= false;
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


        var vm = this;
        vm.Titulo = 'Editar IP';
        vm.Icono = 'fa fa-pencil-square-o';
        vm.View = false;
        vm.RFechaA= false;
        vm.ValidaS= ValidaS;
        vm.cancel = cancel;
        vm.Guardar = Guardar;
        initData();
    });