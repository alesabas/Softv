'use strict';

angular
    .module('softvApp')
    .controller('ModalVendedorUpdateCtrl', function(VentasFactory, $localStorage, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope, Clv_Vendedor){
        
        function initData(){
            VentasFactory.GetMuestra_PlazasPorUsuarioList($localStorage.currentUser.idUsuario).then(function(data){
                vm.DistribuidorList = data.GetMuestra_PlazasPorUsuarioListResult;
                GetVendedor();
            });
        }

        function GetVendedor(){
            VentasFactory.GetDeepVendedores(Clv_Vendedor).then(function(data){
                var Vendedor = data.GetDeepVendedoresResult;
                vm.Clv_Vendedor = Vendedor.Clv_Vendedor;
                vm.Nombre = Vendedor.Nombre;
                vm.Domicilio = Vendedor.Domicilio;
                vm.Colonia = Vendedor.Colonia;
                vm.FechaIngreso = GetDate(Vendedor.FechaIngreso);
                vm.FechaSalida = (Vendedor.FechaSalida != "01/01/1900" && Vendedor.FechaSalida != null)? GetDate(Vendedor.FechaSalida): null;
                vm.FechaSalidaP = (Vendedor.FechaSalida != "01/01/1900" && Vendedor.FechaSalida != null)? GetDate(Vendedor.FechaSalida): null;
                vm.ActivoP = Vendedor.Activo;
                vm.Activo = Vendedor.Activo;
                MovimientoSistemaList[0].valorant = Vendedor.Nombre;
                MovimientoSistemaList[1].valorant = Vendedor.Domicilio;
                MovimientoSistemaList[2].valorant = Vendedor.Colonia;
                MovimientoSistemaList[3].valorant = Vendedor.Activo;
                MovimientoSistemaList[4].valorant = Vendedor.FechaIngreso;
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
            MovimientoSistemaList[0].valornuevo = vm.Nombre;
            MovimientoSistemaList[1].valornuevo = vm.Domicilio;
            MovimientoSistemaList[2].valornuevo = vm.Colonia;
            MovimientoSistemaList[3].valornuevo = vm.Activo;
            MovimientoSistemaList[4].valornuevo =SaveDate(vm.FechaIngreso);
            VentasFactory.UpdateVendedores(objVendedores).then(function(data){
                SetMovimientoSistema();
            });
        }
        
        function SetMovimientoSistema(){
            for(var i = 0; MovimientoSistemaList.length > i; i++){
                if(MovimientoSistemaList[i].valorant != MovimientoSistemaList[i].valornuevo){
                    AddMovimientoSistema(i);
                }
            }
            ngNotify.set('CORRECTO, se guardó el Vendedor.', 'success');
            $rootScope.$emit('LoadVendedorList');
            cancel();
        }

        function AddMovimientoSistema(i){
            var ObjMovimientoSistema = {
                'usuario': $localStorage.currentUser.usuario,
                'contrato': 0,
                'Sistema': 'Softv',
                'Pantalla': 'Catálogo de Vendedores',
                'control': MovimientoSistemaList[i].control,
                'valorant': MovimientoSistemaList[i].valorant,
                'valornuevo': MovimientoSistemaList[i].valornuevo,
                'clv_ciudad': 'AG'
            };
            VentasFactory.GetInserta_MovSist(ObjMovimientoSistema).then(function(data){
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
            if(vm.ActivoP == true && vm.Activo == false){
                if(vm.FechaSalida != undefined || vm.FechaSalida != null){
                    var F = SaveDate(vm.FechaSalida);
                    return F;
                }else{
                    var F = new Date();
                    var D = F.getDate();
                    var M = F.getMonth() + 1;
                    var Y = F.getFullYear();
                    return D + '/' + M + '/' + Y;
                }
            }else if(vm.ActivoP == false && vm.Activo == false){
                if(vm.FechaSalida != undefined || vm.FechaSalida != null){
                    var F = SaveDate(vm.FechaSalida);
                    return F;
                }else{
                    var F = vm.FechaSalidaP;
                    var D = F.getDate();
                    var M = F.getMonth() + 1;
                    var Y = F.getFullYear();
                    return D + '/' + M + '/' + Y;
                }
            }
        }

        function OpenDocumentos(){
            $state.go('home.ventas.vendedores_documentos', {'id':vm.Clv_Vendedor});
            cancel();
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Editar Vendedor - ';
        vm.Icono = 'fa fa-pencil-square-o';
        vm.View = false;
        vm.DisAdd = false;
        var MovimientoSistemaList = [
            {'control': 'Nombre', 'valorant': '', valornuevo: ''},
            {'control': 'Domicilio', 'valorant': '', valornuevo: ''},
            {'control': 'Colonia', 'valorant': '', valornuevo: ''},
            {'control': 'Activo', 'valorant': '', valornuevo: ''},
            {'control': 'Fecha De Ingreso', 'valorant': '', valornuevo: ''}
        ];
        vm.SaveVendedor = SaveVendedor;
        vm.OpenDocumentos = OpenDocumentos;
        vm.cancel = cancel;
        initData();
        
    });