'use strict'
angular
    .module('softvApp')
    .controller('ServicioUpdateCtrl', function(CatalogosFactory, ngNotify, $uibModal, $state, $stateParams, $rootScope){

        function initData(){
            CatalogosFactory.GetTipoClienteList_WebSoftvnew().then(function(data){
                vm.TipoCobroList = data.GetTipoClienteList_WebSoftvnewResult;
            });
            GetServicio();
        }

        function GetServicio(){
            CatalogosFactory.GetDeepServicios_New(Clv_Servicio).then(function(data){
                console.log(data);
                var Servicio = data.GetDeepServicios_NewResult;
                if(Servicio != null){
                    vm.Clv_Servicio = Servicio.Clv_Servicio;
                    vm.Clv_TipSer = Servicio.Clv_TipSer;
                    vm.Descripcion = Servicio.Descripcion;
                    vm.Clave = Servicio.Clv_Txt;
                    vm.AplicaComision = (Servicio.AplicanCom == true)? 'Y' : 'N';
                    vm.CobroMensual = (Servicio.Sale_en_Cartera == true)? 'Y' : 'N';
                    vm.GeneraOrden = (Servicio.Genera_Orden == true)? 'Y' : 'N';
                    vm.ShowOrden = (Servicio.Genera_Orden == true)? true : false;
                    vm.Principal = (Servicio.Es_Principal == true)? 'Y' : 'N';
                    vm.Precio = (Servicio.Precio > 0)? Servicio.Precio : 0;
                    vm.HideCobroMensual = (Servicio.Sale_en_Cartera == true)? false : true;
                    vm.ShowCobroMensual = (Servicio.Sale_en_Cartera == true)? true : false;
                    var ObjPuntos = {
                        'clv_servicio': vm.Clv_Servicio,
                        'op':0
                    }
                    CatalogosFactory.GetBUSCAPuntos_Pago_Adelantado(ObjPuntos).then(function(data){
                        var Puntos = data.GetBUSCAPuntos_Pago_AdelantadoResult;
                        vm.Meses35 = Puntos.Puntos3;
                        vm.Meses611 = Puntos.Puntos6;
                        vm.Meses11 = Puntos.puntos11;
                        vm.ProntoPago  = Puntos.Punto_Pronto_Pago;
                        CatalogosFactory.GetMUESTRATRABAJOS_NewList(vm.Clv_TipSer).then(function(data){
                            vm.TrabajoList = data.GetMUESTRATRABAJOS_NewListResult;
                        });
                    });
                }else{
                    ngNotify.set('ERROR, El servicio que seleccionó no se encuentra registrado.', 'warn');
                    $state.go('home.catalogos.servicios');
                }
            });
        }

        function GetTarifa(){
            if(vm.TipoCobro != undefined){
                var ObjTarifa = {
                    'CLV_SERVICIO': vm.Clv_Servicio, 
                    'OP': 0, 
                    'Clv_TipoCliente': vm.TipoCobro.CLV_TIPOCLIENTE
                };
                CatalogosFactory.GetREL_TARIFADOS_SERVICIOS_NewList(ObjTarifa).then(function(data){
                    vm.TarifaList = data.GetREL_TARIFADOS_SERVICIOS_NewListResult;
                });
            }else{

            }  
        }

        function OpenAddConcepto(Clv_TipoCobro, Clv_Servicio){
            var ObjServicio = {
                'Clv_Servicio': Clv_Servicio,
                'Clv_TipoCobro': Clv_TipoCobro
            };
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalConceptoForm.html',
                controller: 'ModalConceptoAddCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    ObjServicio: function () {
                        return ObjServicio;
                    }
                }
            });
        }

        function OpenDeleteConcepto(ObjConcepto, CLV_TIPOCLIENTE){
            var ObjConcepto = {
                'ObjConcepto': ObjConcepto,
                'CLV_TIPOCLIENTE': CLV_TIPOCLIENTE
            };
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalConceptoDelete.html',
                controller: 'ModalConceptoDeleteCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    ObjConcepto: function () {
                        return ObjConcepto;
                    }
                }
            });
        }

        function OpenUpdateConcepto(CLV_LLAVE, CLV_TIPOCLIENTE, CONCEPTO){
            var ObjConcepto = {
                'CLV_LLAVE': CLV_LLAVE,
                'CLV_TIPOCLIENTE': CLV_TIPOCLIENTE,
                'CONCEPTO': CONCEPTO
            };
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalConceptoForm.html',
                controller: 'ModalConceptoUpdateCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    ObjConcepto: function () {
                        return ObjConcepto;
                    }
                }
            });
        }

        function OpenConfigurar(){
            var Clv_Servicio = vm.Clv_Servicio;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalConfiguracionForm.html',
                controller: 'ModalConfiguracionAddCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'lg',
                resolve: {
                    Clv_Servicio: function () {
                        return Clv_Servicio;
                    }
                }
            });
        }

        function SaveServicios(){
            var ObjValidaCambio = {
                'clv_servicio': vm.Clv_Servicio,
                'Clv_Txt': vm.Clave
            };
            CatalogosFactory.GetDeepValidaCambioDClvtxtServ(ObjValidaCambio).then(function(data){
                vm.MsjExt = data.GetDeepValidaCambioDClvtxtServResult.MSJ;
                    var objServicios_New = {
                    'Clv_Servicio': vm.Clv_Servicio,
                    'Clv_TipSer': vm.Clv_TipSer,
                    'Descripcion': vm.Descripcion,
                    'Clv_Txt': vm.Clave,
                    'AplicanCom': (vm.AplicaComision == 'Y') ? 1 : 0,
                    'Sale_en_Cartera': (vm.CobroMensual == 'Y') ? 1 : 0,
                    'Precio': (vm.Precio != undefined) ? vm.Precio : 0,
                    'Genera_Orden': (vm.GeneraOrden == 'Y') ? 1 : 0,
                    'Es_Principal': (vm.Principal == 'Y') ? 1 : 0,
                    'Concepto': 'x',
                    'EsToken': 0,
                    'Gb': 0
                };
                CatalogosFactory.UpdateServicios_New(objServicios_New).then(function(data){
                    if(data.UpdateServicios_NewResult == -1){
                        var objNUEPuntos_Pago_Adelantado = {
                            'CLV_SERVICIO': vm.Clv_Servicio,
                            'Puntos3': vm.Meses35,
                            'Puntos6': vm.Meses611,
                            'puntos11': vm.Meses11,
                            'Punto_Pronto_Pago': vm.ProntoPago
                        };
                        CatalogosFactory.AddNUEPuntos_Pago_Adelantado(objNUEPuntos_Pago_Adelantado).then(function(data){
                            if(data.AddNUEPuntos_Pago_AdelantadoResult == -1){
                                if(vm.MsjExt != null){
                                    var MSJ = 'NOTA:' + vm.MsjExt + ' CORRECTO, se guardó el servicio.';
                                }else{
                                    var MSJ = 'CORRECTO, se guardó el servicio.';
                                }
                                ngNotify.set(MSJ, 'success');
                                GetServicio();
                            }else{
                                if(vm.MsjExt != null){
                                    var MSJ = 'NOTA:' + vm.MsjExt + ' ERROR, al guardar el servicio.';
                                }else{
                                    var MSJ = 'ERROR, al guardar el servicio.';
                                }
                                ngNotify.set(MSJ, 'warn');
                                GetServicio();
                            }
                        });
                    }else{
                        if(vm.MsjExt != null){
                            var MSJ = 'NOTA:' + vm.MsjExt + ' ERROR, al guardar el servicio.';
                        }else{
                            var MSJ = 'ERROR, al guardar el servicio.';
                        }
                        ngNotify.set(MSJ, 'warn');
                        $state.go('home.catalogos.servicios');
                    }
                });
            });
        }

        $rootScope.$on('LoadConceptos', function(e, Clv_Servicio){
            GetTarifa(Clv_Servicio);
        });
        
        function SetTipoCobro(){
            if(vm.CobroMensual == 'Y'){
                vm.ShowCobroMensual = true;
                vm.HideCobroMensual = false;
                vm.ShowOrden = false;
                vm.GeneraOrden = 'N';
                vm.AplicaComision = 'N';
            }
            else if(vm.CobroMensual == 'N'){
                vm.ShowCobroMensual = false;
                vm.HideCobroMensual = true;
                vm.ShowOrden = false;
                vm.GeneraOrden = 'N';
                vm.AplicaComision = 'N';
            }
        }

        function SetOrden(){
            if(vm.GeneraOrden == 'Y'){
                vm.ShowOrden = true;
            }
            else if(vm.GeneraOrden == 'N'){
                vm.ShowOrden = false;
            }
        }

        var vm = this;
        vm.Titulo = 'Servicio Editar - ';
        var Clv_Servicio = $stateParams.id
        vm.ShowCobroMensual = false;
        vm.HideCobroMensual = true;
        vm.ShowOrden = false;
        vm.Disable = true;
        vm.SetTipoCobro = SetTipoCobro;
        vm.SetOrden = SetOrden;
        vm.OpenAddConcepto = OpenAddConcepto;
        vm.OpenUpdateConcepto = OpenUpdateConcepto;
        vm.OpenDeleteConcepto = OpenDeleteConcepto;
        vm.SaveServicios = SaveServicios;
        vm.OpenConfigurar = OpenConfigurar;
        vm.GetTarifa = GetTarifa;
        initData();
    });