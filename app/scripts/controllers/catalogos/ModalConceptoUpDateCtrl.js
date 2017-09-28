'use strict';

angular
    .module('softvApp')
    .controller('ModalConceptoUpdateCtrl', function($uibModalInstance, $uibModal, CatalogosFactory, $state, $rootScope, ngNotify, ObjConcepto){
        
        function initData(){
            CatalogosFactory.GetMUESTRASOLOTARIFADOSList().then(function(data){
                vm.TipoConceptoList = data.GetMUESTRASOLOTARIFADOSListResult;
                GetConcepto();
            });
        }

        function SaveConcepto(){
            var ObjDate = ToDateF(vm.FechaInicio, vm.FechaFinal);
            var objValidaPeriodos = {
                'Fec_Ini': parseInt(ObjDate.FIY+ '' + '' + ObjDate.FIM + '' + ObjDate.FID),
                'Fec_Fin': parseInt(ObjDate.FFY+ '' + '' + ObjDate.FFM + '' + ObjDate.FFD),
                'Ini': ObjDate.FID,
                'Fin': ObjDate.FFD,
                'Clv_Servicio': vm.Clv_Servicio,
                'Clave': vm.TipoConcepto.Clave,
                'Clv_TipoCliente': vm.Clv_TipoCobro 
            };
            CatalogosFactory.AddValidaPeriodos(objValidaPeriodos).then(function(data){
                var result = data.AddValidaPeriodosResult;
                if(result == 0){
                    var objREL_TARIFADOS_SERVICIOS_New = {
                        'CLV_LLAVE': vm.CLV_LLAVE,
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
                    };
                    if(vm.AplicaTodos == 'Y'){
                        CatalogosFactory.UpdateREL_TARIFADOS_SERVICIOSAll_New(objREL_TARIFADOS_SERVICIOS_New).then(function(data){
                            ngNotify.set('CORRECTO, se añadió un concepto nuevo.', 'success');
                            $rootScope.$emit('LoadConceptos', vm.Clv_Servicio);
                            cancel();
                            if(data.UpdateREL_TARIFADOS_SERVICIOSAll_NewResult == -1){
                                AddConceptoCajas();
                            }else{
                                ngNotify.set('ERROR, al guardar un concepto nuevo.', 'warn');
                                $rootScope.$emit('LoadRefPersonal', vm.IdContrato);
                                cancel();
                            }
                        });
                    }else{
                        CatalogosFactory.UpdateREL_TARIFADOS_SERVICIOS_New(objREL_TARIFADOS_SERVICIOS_New).then(function(data){
                            if(data.UpdateREL_TARIFADOS_SERVICIOS_NewResult == -1){
                                AddConceptoCajas()
                            }else{
                                ngNotify.set('ERROR, al guardar un concepto nuevo.', 'warn');
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

        function AddConceptoCajas(){
            var objRelTarifadosServiciosCostoPorCaja_New = {
                'Clv_Llave': vm.CLV_LLAVE,
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
                    ngNotify.set('CORRECTO, se guardó un concepto nuevo.', 'success');
                    $rootScope.$emit('LoadConceptos', vm.Clv_Servicio);
                    cancel();
                }else{
                    ngNotify.set('ERROR, al guardar un concepto nuevo.', 'warn');
                    $rootScope.$emit('LoadRefPersonal', vm.IdContrato);
                    cancel();
                }
            });
        }

        function GetConcepto(){
            var ObjGetConcepto = {
                'CLV_LLAVE': ObjConcepto.CLV_LLAVE,
                'Clv_TipoCliente': ObjConcepto.CLV_TIPOCLIENTE
            };
            CatalogosFactory.GetDeepREL_TARIFADOS_SERVICIOS_New(ObjGetConcepto).then(function(data){
                var Concepto = data.GetDeepREL_TARIFADOS_SERVICIOS_NewResult;
                vm.CLV_LLAVE = Concepto.CLV_LLAVE;
                vm.Clv_Servicio = Concepto.CLV_SERVICIO;
                vm.FechaInicio = toDate(Concepto.Periodo_Inicial); 
                vm.FechaFinal = toDate(Concepto.Periodo_Final);
                vm.Vigente = (Concepto.Vigente == true)? 'Y' : 'N';
                vm.SeCobraMensualidad = (Concepto.Se_Cobra_Proporcional == true)? 'Y' : 'N';
                vm.AplicaComision = (Concepto.Aplica_Comision == true)? 'Y' : 'N';
                vm.GeneraOrden = (Concepto.Genera_Orden == true)? 'Y' : 'N';
                vm.ShowOrden = (Concepto.Genera_Orden == true)? true : false;
                vm.AvanzaMes = (Concepto.BRINCA_MES == true)? 'Y' : 'N';
                vm.Clv_TipoCobro = Concepto.Clv_TipoCliente;
                vm.Clv_Trabajo = Concepto.Clv_Trabajo;
                for(var i = 0; vm.TipoConceptoList.length > i; i ++){
                    if(vm.TipoConceptoList[i].Concepto == ObjConcepto.CONCEPTO){
                        vm.TipoConcepto = vm.TipoConceptoList[i];
                        break;
                    }
                }
                CatalogosFactory.GetDeepServicios_New(vm.Clv_Servicio).then(function(data){
                    var Servicio = data.GetDeepServicios_NewResult;
                    vm.Clv_TipSer = Servicio.Clv_TipSer;
                    CatalogosFactory.GetMuestraTipoPromocionList(vm.Clv_TipSer).then(function(data){
                        vm.TipoPromcionList = data.GetMuestraTipoPromocionListResult;
                    });
                    CatalogosFactory.GetMUESTRATRABAJOS_NewList(vm.Clv_TipSer).then(function(data){
                        vm.TrabajoList = data.GetMUESTRATRABAJOS_NewListResult;
                        for(var i = 0; vm.TrabajoList.length > i; i ++){
                            if(vm.TrabajoList[i].Clv_Trabajo == vm.Clv_Trabajo){
                                vm.Trabajo = vm.TrabajoList[i];
                            }
                        }
                    });
                });
                CatalogosFactory.GetDeepRelTarifadosServiciosCostoPorCaja_New(vm.CLV_LLAVE).then(function(data){
                    var ConceptoCajas = data.GetDeepRelTarifadosServiciosCostoPorCaja_NewResult;
                    vm.Principal = ConceptoCajas.CostoPrincipal;
                    vm.AdicionalN1 = ConceptoCajas.Costo1ra;
                    vm.AdicionalN2 = ConceptoCajas.Costo2da;
                    vm.AdicionalS1 = ConceptoCajas.Costo1ra2;
                    vm.AdicionalS2 = ConceptoCajas.Costo2da2;
                });
            });
        }

        function ToDateF(FechaInicio, FechaFinal){
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

        function SetOrden(){
            if(vm.GeneraOrden == 'Y'){
                vm.ShowOrden = true;
            }
            else if(vm.GeneraOrden == 'N'){
                vm.ShowOrden = false;
            }
        }

        function SetTipoConepto(){
            vm.Principal = '';
            vm.AdicionalN1 = '';
            vm.AdicionalN2 = '';
            vm.AdicionalS1 = '';
            vm.AdicionalS2 = '';
            vm.Vigente = 'N';
            vm.SeCobraMensualidad = 'N';
            vm.AplicaComision = 'N';
            vm.GeneraOrden = 'N';
            vm.AvanzaMes = 'N';
        }

        function toDate(dateStr) {
            var parts = dateStr.split("/");
            return new Date(parts[2], parts[1] - 1, parts[0]);
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Editar Concepto - ';
        vm.Icono = 'fa fa-pencil-square-o'
        vm.cancel = cancel;
        vm.SetOrden = SetOrden;
        vm.ShowOrden = false;
        vm.SetTipoConepto = SetTipoConepto;
        vm.SaveConcepto = SaveConcepto;
        initData();
    });