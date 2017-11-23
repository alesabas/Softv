'use strict';

angular
    .module('softvApp')
    .controller('ModalVendedorUpdateCtrl', function(VentasFactory, distribuidorFactory, $localStorage, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope, Clv_Vendedor){
        
        function initData(){
            distribuidorFactory.Getplaza(0,'').then(function(data){
                console.log(data);
                vm.DistribuidorList = data.GetPlaza_DistribuidoresNewResult;
                GetVendedor();
            });
        }

        function GetVendedor(){
            VentasFactory.GetDeepVendedores(Clv_Vendedor).then(function(data){
                console.log(data);
                var Vendedor = data.GetDeepVendedoresResult;
                vm.Clv_Vendedor = Vendedor.Clv_Vendedor;
                vm.Nombre = Vendedor.Nombre;
                vm.Domicilio = Vendedor.Domicilio;
                vm.Colonia = Vendedor.Colonia;
                vm.FechaIngreso = GetDate(Vendedor.FechaIngreso);
                vm.FechaSalida = (Vendedor.FechaSalida != "01/01/1900" && Vendedor.FechaSalida != null)? GetDate(Vendedor.FechaSalida): null;
                vm.ActivoP = Vendedor.Activo;
                vm.Activo = Vendedor.Activo;
                vm.Capacitacion = Vendedor.Capacitacion;
                var Distribuidor = Vendedor.idcompania;
                for(var i = 0; vm.DistribuidorList.length > i; i++){
                    if(vm.DistribuidorList[i].Clv_Plaza == Distribuidor){
                        vm.Distribuidor = vm.DistribuidorList[i];
                    }
                }
            });
        }

        function SaveVendedor(){
            var objVendedores = {
                'Clv_Vendedor': vm.Clv_Vendedor,
                'Nombre': vm.Nombre,
                'Domicilio': vm.Domicilio,
                'Colonia': vm.Colonia,
                'FechaIngreso': SaveDate(vm.FechaIngreso),
                'FechaSalida': ValidaFechaSalida(),
                'Activo': vm.Activo,
                'Clv_TipPro': 0,
                'Clv_Grupo': 0,
                'idcompania': vm.Distribuidor.Clv_Plaza,
                'Capacitacion': vm.Capacitacion,
                'ClvUsuario': $localStorage.currentUser.idUsuario
            };
            VentasFactory.UpdateVendedores(objVendedores).then(function(data){
                console.log(data);
                ngNotify.set('CORRECTO, se guardó el Vendedor.', 'success');
                $rootScope.$emit('LoadVendedorList');
                cancel();
            });
        }

        function GetDate(date) {
            var Parts = date.split("/");
            return new Date(Parts[2], Parts[1] - 1, Parts[0]);
        }

        function SaveDate(Fecha){
            var FechaD = Fecha.getDate();
            var FechaM = Fecha.getMonth() + 1;
            var FechaY = Fecha.getFullYear();
            return FechaD + '/' + FechaM + '/' + FechaY;
        }

        function ValidaFechaSalida(){
            if((vm.ActivoP == true && vm.Activo == false) || (vm.ActivoP == false && vm.Activo == false)){
                console.log(vm.FechaSalida);
                if(vm.FechaSalida != undefined || vm.FechaSalida != null){
                    var F = SaveDate(vm.FechaSalida);
                    return F;
                }else{
                    var F = new Date();
                    var D = F.getDate();
                    var M = F.getMonth();
                    var Y = F.getFullYear();
                    return D + '/' + M + '/' + Y;
                }
            }
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Editar Vendedor - ';
        vm.Icono = 'fa fa-pencil-square-o';
        vm.View = false;
        vm.SaveVendedor = SaveVendedor;
        vm.cancel = cancel;
        console.log(Clv_Vendedor);
        initData();
        
    });