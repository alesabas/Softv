'use strict';

angular
    .module('softvApp')
    .controller('ModalConceptoAddCtrl', function($uibModalInstance, $uibModal, CatalogosFactory, $state, $rootScope, ngNotify, ObjServicio){

        function initData(){
            CatalogosFactory.GetMUESTRASOLOTARIFADOSList().then(function(data){
                vm.TipoConceptoList = data.GetMUESTRASOLOTARIFADOSListResult;
                vm.TipoConcepto = vm.TipoConceptoList[0];
            });

            CatalogosFactory.GetDeepServicios_New(ObjServicio.Clv_Servicio).then(function(data){
                var Servicio = data.GetDeepServicios_NewResult;
                vm.Clv_Servicio = Servicio.Clv_Servicio;
                vm.Clv_TipSer = Servicio.Clv_TipSer;
                CatalogosFactory.GetMuestraTipoPromocionList(vm.Clv_TipSer).then(function(data){
                    vm.TipoPromcionList = data.GetMuestraTipoPromocionListResult;
                });
                CatalogosFactory.GetMUESTRATRABAJOS_NewList(vm.Clv_TipSer).then(function(data){
                    vm.TrabajoList = data.GetMUESTRATRABAJOS_NewListResult;
                });
            });
        }

        function SetOrden(){
            if(vm.GeneraOrden == 'Y'){
                vm.ShowOrden = true;
            }
            else if(vm.GeneraOrden == 'N'){
                vm.ShowOrden = false;
            }
        }

        function SaveConcepto(){
            var objValidaPeriodos = {
                'Clv_LLave': 0,
                'Fec_Ini': ToDateStr(vm.FechaInicio),
                'Fec_Fin': ToDateStr(vm.FechaFinal),
                'Ini': vm.DiaInicial,
                'Fin': vm.DiaFinal,
                'Clv_Servicio': vm.Clv_Servicio,
                'Clave': vm.TipoConcepto.Clave,
                'Clv_TipoCliente': vm.Clv_TipoCobro 
            }
            CatalogosFactory.AddValidaPeriodos(objValidaPeriodos).then(function(data){
                var result = data.AddValidaPeriodosResult;
                if(result == 0){
                    var objREL_TARIFADOS_SERVICIOS_New = {
                        'CLV_SERVICIO': vm.Clv_Servicio,
                        'CLAVE': vm.TipoConcepto.Clave,
                        'PRECIO': (vm.Clv_TipSer == 2)? vm.Precio:0,
                        'DIA_INICIAL': vm.DiaInicial,
                        'DIA_FINAL': vm.DiaFinal,
                        'BRINCA_MES': (vm.AvanzaMes == 'Y')? 1 : 0,
                        'Periodo_Inicial': ToDateStr(vm.FechaInicio),
                        'Periodo_Final': ToDateStr(vm.FechaFinal),
                        'Porcetaje_Descuento': 0,
                        'Aplica_Comision': (vm.AplicaComision == 'Y')? 1 : 0,
                        'Genera_Orden': (vm.GeneraOrden == 'Y')? 1 : 0,
                        'Precio_Adicional': 0,//X
                        'Vigente': (vm.Vigente == 'Y')? 1 : 0,
                        'Porcetaje_Descuento_Adicional': 0,
                        'Clv_TipoPromocion': 0,
                        'Clv_Trabajo': (vm.GeneraOrden == 'Y')? vm.Trabajo.Clv_Trabajo : 0,
                        'Numero_Cortesias': 0,
                        'Precio_Inalambrico': 1,
                        'Clv_TipoCliente': vm.Clv_TipoCobro,
                        'Se_Cobra_Proporcional': (vm.SeCobraMensualidad == 'Y')? 1 : 0
                    }
                    if(vm.AplicaTodos == 'Y'){
                        CatalogosFactory.AddREL_TARIFADOS_SERVICIOSAll_New(objREL_TARIFADOS_SERVICIOS_New).then(function(data){
                            var Clv_Llave = data.AddREL_TARIFADOS_SERVICIOSAll_NewResult;
                            if(Clv_Llave > 0){
                                SetInsdtalacion(Clv_Llave);
                            }else{
                                ngNotify.set('ERROR, al añadir un concepto nuevo.', 'warn');
                                $rootScope.$emit('LoadRefPersonal', vm.IdContrato);
                                cancel();
                            }
                        });
                    }else{
                        CatalogosFactory.AddREL_TARIFADOS_SERVICIOS_New(objREL_TARIFADOS_SERVICIOS_New).then(function(data){
                            var Clv_Llave = data.AddREL_TARIFADOS_SERVICIOS_NewResult;
                            if(Clv_Llave > 0){
                                SetInsdtalacion(Clv_Llave);
                            }else{
                                ngNotify.set('ERROR, al añadir un concepto nuevo.', 'warn');
                                $rootScope.$emit('LoadRefPersonal', vm.IdContrato);
                                cancel();
                            }
                        });
                    }
                }else{
                    ngNotify.set('ERROR, El periodo que se ingresó no es valido.', 'warn');
                    cancel();
                }
            });
        }

        function SetInsdtalacion(Clv_Llave){
            var ObjInstalacion = {
                'CLV_LLAVE': Clv_Llave,
                'Clv_TipoCliente': vm.Clv_TipoCobro,
                'opc': 2
            };
            CatalogosFactory.GetActualiza_InstalacionList(ObjInstalacion).then(function(data){
                if(vm.Clv_TipSer == 2){
                    RentaAparato();
                }else{
                    AddTarifado(Clv_Llave)
                }
            });
        }

        function AddTarifado(Clv_Llave){
            var objRelTarifadosServiciosCostoPorCaja_New = {
                'Clv_Llave': Clv_Llave,
                'CostoPrincipal': vm.Principal,
                'Costo1ra': vm.AdicionalN1,
                'Costo2da': vm.AdicionalN2,
                'Costo3ra': 0,
                'CostoPrincipal2': 0,
                'Costo1ra2': (vm.AdicionalS1 != undefined)? vm.AdicionalS1 : 0,
                'Costo2da2': (vm.AdicionalS2 != undefined)? vm.AdicionalS2 : 0,
                'Costo3ra2': 0,
                'op': (vm.AplicaTodos == 'Y')? 1 : 0
            };
            CatalogosFactory.AddRelTarifadosServiciosCostoPorCaja_New(objRelTarifadosServiciosCostoPorCaja_New).then(function(data){
                ngNotify.set('CORRECTO, se añadió un concepto nuevo.', 'success');
                $rootScope.$emit('LoadConceptos', vm.Clv_Servicio);
                cancel();
            });
        }

        function RentaAparato(){
            var objModRentaAparato = {
                'CLV_TIPOCLIENTE': vm.Clv_TipoCobro,
                'CLV_SERVICIO': vm.Clv_Servicio,
                'PRECIO': 0,
                'PRECIOADIC': 0
            };
            CatalogosFactory.UpdateModRentaAparato(objModRentaAparato).then(function(data){
                ngNotify.set('CORRECTO, se añadió un concepto nuevo.', 'success');
                $rootScope.$emit('LoadConceptos', vm.Clv_Servicio);
                cancel();
            });
        }

        function ToDateStr(Fecha){
            var F1 = Fecha.getDate();
            var F2 = Fecha.getMonth() + 1;
            var FD = (String(F1).length == 1)? '0'+F1 : F1;
            var FM = (String(F2).length == 1)? '0'+F2 : F2;
            var FY = Fecha.getFullYear();
            var FechaStr = String(FY) + String(FM) + String(FD);
            return FechaStr;
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Nuevo Concepto';
        vm.Icono = 'fa fa-plus'
        vm.ShowOrden = false;
        vm.DiaInicial = 0;
        vm.DiaFinal = 1;
        vm.SetOrden = SetOrden;
        vm.cancel = cancel;
        vm.SaveConcepto = SaveConcepto;
        vm.Clv_TipoCobro = ObjServicio.Clv_TipoCobro;
        initData();

    });