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
            var ObjDate = ToDate(vm.FechaInicio, vm.FechaFinal)
            var objValidaPeriodos = {
                'Fec_Ini': parseInt(ObjDate.FIY+ '' + '' + ObjDate.FIM + '' + ObjDate.FID),
                'Fec_Fin': parseInt(ObjDate.FFY+ '' + '' + ObjDate.FFM + '' + ObjDate.FFD),
                'Ini': ObjDate.FID,
                'Fin': ObjDate.FFD,
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
                        'PRECIO': 0,
                        'DIA_INICIAL': ObjDate.FID,
                        'DIA_FINAL': ObjDate.FFD,
                        'BRINCA_MES': (vm.AvanzaMes == 'Y')? 1 : 0,
                        'Periodo_Inicial': parseInt(ObjDate.FIY+ '' + '' + ObjDate.FIM + '' + ObjDate.FID),
                        'Periodo_Final': parseInt(ObjDate.FFY+ '' + '' + ObjDate.FFM + '' + ObjDate.FFD),
                        'Porcetaje_Descuento': 0,
                        'Aplica_Comision': (vm.AplicaComision == 'Y')? 1 : 0,
                        'Genera_Orden': (vm.GeneraOrden == 'Y')? 1 : 0,
                        'Precio_Adicional': 0,
                        'Vigente': (vm.Vigente == 'Y')? 1 : 0,
                        'Porcetaje_Descuento_Adicional': 0,
                        'Clv_TipoPromocion': 0,
                        'Clv_Trabajo': (vm.GeneraOrden == 'Y')? vm.Trabajo.Clv_Trabajo : 0,
                        'Numero_Cortesias': 0,
                        'Precio_Inalambrico': 0,
                        'Clv_TipoCliente': vm.Clv_TipoCobro,
                        'Se_Cobra_Proporcional': (vm.SeCobraMensualidad == 'Y')? 1 : 0
                    }
                    if(vm.AplicaTodos == 'Y'){
                        CatalogosFactory.AddREL_TARIFADOS_SERVICIOSAll_New(objREL_TARIFADOS_SERVICIOS_New).then(function(data){
                            var Clv_Llave = data.AddREL_TARIFADOS_SERVICIOSAll_NewResult;
                            if(Clv_Llave > 0){
                                AddConceptoCajas(Clv_Llave);
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
                                AddConceptoCajas(Clv_Llave)
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

        function AddConceptoCajas(Clv_Llave){
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
                if(data.AddRelTarifadosServiciosCostoPorCaja_NewResult == -1){
                    var ObjInstalacion = {
                        'CLV_LLAVE': Clv_Llave,
                        'Clv_TipoCliente': vm.Clv_TipoCobro,
                        'opc': 2
                    };
                    CatalogosFactory.GetActualiza_InstalacionList(ObjInstalacion).then(function(data){
                        if(vm.Clv_TipSer == 2){
                            RentaAparato();
                        }else{
                            ngNotify.set('CORRECTO, se añadió un concepto nuevo.', 'success');
                            $rootScope.$emit('LoadConceptos', vm.Clv_Servicio);
                            cancel();
                        }
                    });
                }else{
                    ngNotify.set('ERROR, al añadir un concepto nuevo.', 'warn');
                    $rootScope.$emit('LoadRefPersonal', vm.IdContrato);
                    cancel();
                }
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
                if(data.UpdateModRentaAparatoResult == 1){
                    ngNotify.set('CORRECTO, se añadió un concepto nuevo.', 'success');
                    $rootScope.$emit('LoadConceptos', vm.Clv_Servicio);
                    cancel();
                }else{
                    ngNotify.set('ERROR, al añadir renta de aparato.', 'warn');
                    $rootScope.$emit('LoadRefPersonal', vm.IdContrato);
                    cancel();
                }
            });
        }

        function ToDate(FechaInicio, FechaFinal){
            var FIM = FechaInicio.getMonth() + 1;
            var FFM = FechaFinal.getMonth() + 1;
            var FID = FechaInicio.getDate();
            var FFD = FechaFinal.getDate();
            var ObjDate = {
               'FID': (String(FID).length == 1)? '0'+FID : FID,
               'FIM': (String(FIM).length == 1)? '0'+FIM : FIM,
               'FIY': FechaInicio.getFullYear(),
               'FFD': (String(FFD).length == 1)? '0'+FFD : FFD,
               'FFM': (String(FFM).length == 1)? '0'+FFM : FFM,
               'FFY': FechaFinal.getFullYear(),
            };
            return ObjDate;
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Nuevo Concepto';
        vm.Icono = 'fa fa-plus'
        vm.ShowOrden = false;
        vm.SetOrden = SetOrden;
        vm.cancel = cancel;
        vm.SaveConcepto = SaveConcepto;
        vm.Clv_TipoCobro = ObjServicio.Clv_TipoCobro;
        initData();

    });