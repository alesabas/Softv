'use strict';

angular
    .module('softvApp')
    .controller('ModalServicioClienteAddCtrl', function(CatalogosFactory, CatalogosRedIPFactory, $uibModal, $uibModalInstance, ngNotify, $state, $rootScope, IdContrato, $localStorage){
        
        function initData(){
            CatalogosFactory.GetMuestraTipSerPrincipal_SERList().then(function(data){
                vm.TipoServicioList = data.GetMuestraTipSerPrincipal_SERListResult;
            });

            CatalogosFactory.GetConsultaClientesList(IdContrato).then(function(data){
                console.log(data);
                var DatosCliente = data.GetConsultaClientesListResult[0];
                vm.CONTRATO = DatosCliente.CONTRATO;
                vm.IdCompania = DatosCliente.IdCompania;
                vm.Clv_Estado = DatosCliente.Clv_Estado;
                vm.Clv_Ciudad = DatosCliente.Clv_Ciudad;
                vm.Clv_Localidad = DatosCliente.Clv_Localidad;
                vm.Clv_Colonia = DatosCliente.Clv_Colonia;
                GetMedioList();
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
                'IdMedio': (vm.Medio != undefined)? vm.Medio.IdMedio:0,
                'TipServ': vm.TipoServicio.Clv_TipSerPrincipal,
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

        function GetMedioList(){
            var ObjMedioList = {
                'Clv_Ciudad': vm.Clv_Ciudad,
                'Clv_Localidad': vm.Clv_Localidad,
                'Clv_Colonia': vm.Clv_Colonia,
            };
            CatalogosRedIPFactory.GetCatMedioByCiuLocCol(ObjMedioList).then(function(data){
                console.log(data);
                vm.MedioList = data.GetCatMedioByCiuLocColResult;
                var count = 0;
                for (var i = 0; vm.MedioList.length > i; i ++){
                    if(vm.MedioList[i].Activo == 1){
                        count = count + 1;
                    }
                }
                if(count == 1){
                    vm.BlokMedioInst = true;
                    for (var i = 0; vm.MedioList.length > i; i ++){
                        if(vm.MedioList[i].Activo == 1){
                            vm.Medio = vm.MedioList[i];
                            break
                        }
                    }
                }
            });
        }

        function GetIPList(){
            if(vm.Medio != undefined){
                if(vm.TipoServicio != undefined){
                    if(vm.TipoServicio.Clv_TipSerPrincipal == 2){
                        CatalogosRedIPFactory.Get_ActivaIP().then(function(data){
                            console.log(data);
                            vm.ActivaIP = data.Get_ActivaIPResult.ActivaIP
                            if(vm.ActivaIP == true){
                                var ObjIpList = {
                                    'IdCompania': vm.IdCompania,
                                    'Clv_Estado': vm.Clv_Estado,
                                    'Clv_Ciudad': vm.Clv_Ciudad,
                                    'Clv_Localidad': vm.Clv_Localidad,
                                    'IdMedio': vm.Medio.IdMedio
                                };
                                CatalogosRedIPFactory.GetCatalogoIPByCliente(ObjIpList).then(function(data){
                                    console.log(data);
                                    vm.IPList = data.GetCatalogoIPByClienteResult;
                                    vm.ViewIP = true;
                                    vm.ViewListIP = (vm.IPList.length > 0)? true:false;
                                });
                            }
                        });
                    }else{
                        vm.IPList = null;
                        vm.ViewIP = false;
                    }
                }else{
                    vm.IPList = null;
                    vm.ViewIP = false;
                }
            }else{
                vm.IPList = null;
                vm.ViewIP = false;
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
        vm.BlokMedioInst = false;
        vm.ViewIP = false;
        vm.GetServiciosList = GetServiciosList;
        vm.AddServicioCliente = AddServicioCliente;
        vm.GetIPList = GetIPList;
        vm.cancel = cancel;
        initData();

    });