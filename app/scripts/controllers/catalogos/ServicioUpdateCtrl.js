'use strict'
angular
    .module('softvApp')
    .controller('ServicioUpdateCtrl', function(CatalogosFactory, ngNotify, $uibModal, $state, $stateParams, $rootScope){

        function initData(){
            CatalogosFactory.GetTipoClienteList_WebSoftvnew().then(function(data){
                vm.TipoCobroList = data.GetTipoClienteList_WebSoftvnewResult;
            });
            CatalogosFactory.Gettbl_politicasFibraList().then(function(data){
                vm.ClvEquiNetList = data.Gettbl_politicasFibraListResult;
            });
            GetServicio();
        }

        function GetServicio(){
            CatalogosFactory.GetDeepServicios_New(vm.Clv_Servicio).then(function(data){
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
                    vm.dolares=Servicio.dolares;
                    vm.HideCobroMensual = (Servicio.Sale_en_Cartera == true)? false : true;
                    vm.ShowCobroMensual = (Servicio.Sale_en_Cartera == true)? true : false;
                    vm.ShowClaveEquivalenteNet = (Servicio.Sale_en_Cartera == true && Servicio.Es_Principal == true && vm.Clv_TipSer == 2)? true:false;
                    vm.ShowClaveEquivalente = (Servicio.Sale_en_Cartera == true && vm.Clv_TipSer == 3)? true:false;
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
                    });
                    CatalogosFactory.GetMUESTRATRABAJOS_NewList(vm.Clv_TipSer).then(function(data){
                        vm.TrabajoList = data.GetMUESTRATRABAJOS_NewListResult;
                        if(Servicio.Genera_Orden == true){
                            GetTrabajo();
                        }else{
                            vm.Trabajo == undefined;
                        }
                    });

                    if(Servicio.Sale_en_Cartera == true && Servicio.Es_Principal == true && vm.Clv_TipSer == 2){
                        GetClvEquiNet();
                    }else if(Servicio.Sale_en_Cartera == true && vm.Clv_TipSer == 3){
                        GetClvEqui();                       
                    }
                }else{
                    ngNotify.set('ERROR, El servicio que seleccionó no se encuentra registrado.', 'warn');
                    $state.go('home.catalogos.servicios');
                }
            });
        }

        function GetTrabajo(){
            CatalogosFactory.GetDeepRel_Trabajos_NoCobroMensual(vm.Clv_Servicio).then(function(data){
                var ClvTrabajo = data.GetDeepRel_Trabajos_NoCobroMensualResult.Clv_Trabajo;
                for(var i = 0; vm.TrabajoList.length > i; i ++){
                    if(vm.TrabajoList[i].Clv_Trabajo == ClvTrabajo) {
                        vm.Trabajo = vm.TrabajoList[i];
                    }
                }
            });
        }

        function GetClvEquiNet(){
            CatalogosFactory.GetDeepTblNet(vm.Clave).then(function(data){
                var ClvEquiNet = data.GetDeepTblNetResult.Clv_Eq;
                for(var i = 0; vm.ClvEquiNetList.length > i; i ++){
                    if(vm.ClvEquiNetList[i].Clv_equivalente == ClvEquiNet){
                        vm.ClvEquiNet = vm.ClvEquiNetList[i];
                    }
                }
            });
        }

        function GetClvEqui(){
            var ObjClvEqui = {
                'Op':0,
                'Clv_txt': vm.Clave
            };
            CatalogosFactory.GetCONSULTAClv_Equi(ObjClvEqui).then(function(data){
                vm.ClaveEquivalente = data.GetCONSULTAClv_EquiResult.Clv_Equivalente;
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
                        CatalogosFactory.DeleteBORRel_Trabajos_NoCobroMensual(vm.Clv_Servicio).then(function(data){
                            var BorrarTrabajo = data.DeleteBORRel_Trabajos_NoCobroMensualResult;
                            if(BorrarTrabajo == -1){
                                if(vm.GeneraOrden == 'Y'){
                                    var objGUARDARel_Trabajos_NoCobroMensual = {
                                        'Clv_Servicio': vm.Clv_Servicio,
                                        'Clv_Trabajo': vm.Trabajo.Clv_Trabajo
                                    };
                                    CatalogosFactory.UpdateGUARDARel_Trabajos_NoCobroMensual(objGUARDARel_Trabajos_NoCobroMensual).then(function(data){
                                        if(data.UpdateGUARDARel_Trabajos_NoCobroMensualResult == -1){
                                            if(vm.Clv_TipSer == 2){
                                                SaveServicio2();
                                            }else if(vm.Clv_TipSer == 3){
                                                SaveServicio3();
                                            }else{
                                                ngNotify.set('CORRECTO, se guardó el servicio.', 'success');
                                                GetServicio();
                                            }
                                        }else{
                                            ngNotify.set('ERROR, al agregar un trabajo.', 'warn');
                                            GetServicio();
                                        }
                                    });
                                }else if(vm.CobroMensual == 'Y'){
                                    var objNUEPuntos_Pago_Adelantado = {
                                        'CLV_SERVICIO': vm.Clv_Servicio,
                                        'Puntos3': vm.Meses35,
                                        'Puntos6': vm.Meses611,
                                        'puntos11': vm.Meses11,
                                        'Punto_Pronto_Pago': vm.ProntoPago
                                    };
                                    CatalogosFactory.AddNUEPuntos_Pago_Adelantado(objNUEPuntos_Pago_Adelantado).then(function(data){
                                        if(vm.Clv_TipSer == 2){
                                            if(vm.ClvEquiNet != undefined){
                                                CatalogosFactory.GetDeepTblNet(vm.Clave).then(function(data){
                                                    if(data.GetDeepTblNetResult != null){
                                                        var objTblNet = {
                                                            'Clv_Txt': vm.Clave, 
                                                            'Clv_Eq': vm.ClvEquiNet.Clv_equivalente
                                                        }
                                                        CatalogosFactory.UpdateTblNet(objTblNet).then(function(data){
                                                            SaveServicio2();
                                                        });
                                                    }else{
                                                        var ObjClvEquiNet = {
                                                            'Clv_Txt': vm.Clave, 
                                                            'Clv_Eq': vm.ClvEquiNet.Clv_equivalente, 
                                                            'Id': 0
                                                        };
                                                        CatalogosFactory.GetTblNetList(ObjClvEquiNet).then(function(data){
                                                            vm.AddClvEquiNet = data.GetTblNetListResult[0];
                                                            SaveServicio2();
                                                        });
                                                    }
                                                });
                                            }else{
                                               SaveServicio2();
                                            }
                                        }else if(vm.Clv_TipSer == 3){
                                            SaveServicio3();
                                        }else{
                                            ngNotify.set('CORRECTO, se guardó el servicio.', 'success');
                                            GetServicio();
                                        }
                                    });
                                }else{
                                    if(vm.Clv_TipSer == 2){
                                        SaveServicio2();
                                    }else if(vm.Clv_TipSer == 3){
                                        SaveServicio3();
                                    }else{
                                        ngNotify.set('CORRECTO, se guardó el servicio.', 'success');
                                        GetServicio();
                                    }
                                }
                            }else{
                                ngNotify.set('ERROR, al borrar trabajos.', 'warn');
                                GetServicio();
                            }
                        });
                    }else{
                        ngNotify.set('ERROR, al guardar el servicio.', 'warn');
                        GetServicio();
                    }
                });
            });
        }

        function SaveServicio2(){
            var objValidaAplicaSoloInternet = {
                'Clv_Servicio': vm.Clv_Servicio
            };
            CatalogosFactory.AddValidaAplicaSoloInternet(objValidaAplicaSoloInternet).then(function(data){
                var ValildaInternetResult = data.AddValidaAplicaSoloInternetResult;
                if(ValildaInternetResult == 0){
                    var objNueAplicaSoloInternet = {
                        'Clv_Servicio': vm.Clv_Servicio
                    }
                    CatalogosFactory.AddNueAplicaSoloInternet(objNueAplicaSoloInternet).then(function(data){
                        if(data.AddNueAplicaSoloInternetResult == -1){
                            if(vm.AddClvEquiNet != ''){
                                var Msg = (vm.AddClvEquiNet.Msg != null)? 'CORRECTO, se guardó el servicio, ' + vm.AddClvEquiNet.Msg + '.':'CORRECTO, se añadió un servicio nuevo.';
                            }else{
                                var Msg = 'CORRECTO, se guardó el servicio.';
                            }
                            ngNotify.set(Msg, 'success');
                            GetServicio();
                        }else{
                            if(vm.AddClvEquiNet != ''){
                                var Msg = (vm.AddClvEquiNet.Msg != null)? 'ERROR, al validar solo internet, ' + vm.AddClvEquiNet.Msg + '.':'ERROR, al validar solo internet.';
                            }else{
                                var Msg = 'ERROR, al validar solo internet.';
                            }
                            ngNotify.set(Msg, 'warn');
                            GetServicio();
                        }
                    });
                }else if(ValildaInternetResult == 1){
                    CatalogosFactory.DeleteBorAplicaSoloInternet(vm.Clv_Servicio).then(function(data){
                        if(data.DeleteBorAplicaSoloInternetResult == -1){
                            if(vm.AddClvEquiNet != ''){
                                var Msg = (vm.AddClvEquiNet.Msg != null)? 'CORRECTO, se guardó servicio, ' + vm.AddClvEquiNet.Msg + '.':'CORRECTO, se añadió un servicio nuevo.';
                            }else{
                                var Msg = 'CORRECTO, se guardoó el servicio.';
                            }
                            ngNotify.set(Msg, 'success');
                            GetServicio();
                        }else{
                            if(vm.AddClvEquiNet != ''){
                                var Msg = (vm.AddClvEquiNet.Msg != null)? 'ERROR, al validar solo internet, ' + vm.AddClvEquiNet.Msg + '.':'ERROR, al validar solo internet.';
                            }else{
                                var Msg = 'ERROR, al validar solo internet.';
                            }
                            ngNotify.set(Msg, 'warn');
                            GetServicio();
                        }
                    });
                }else{
                    if(vm.AddClvEquiNet != ''){
                        var Msg = (vm.AddClvEquiNet.Msg != null)? 'ERROR, al validar solo internet, ' + vm.AddClvEquiNet.Msg + '.':'ERROR, al validar solo internet.';
                    }else{
                        var Msg = 'ERROR, al validar solo internet.';
                    }
                    ngNotify.set(Msg, 'warn');
                    GetServicio();
                }
            });
        }

        function SaveServicio3(){
            var objNUEVOClv_Equi = {
                'Clv_txt': vm.Clave,
                'Clv_Equivalente': vm.ClaveEquivalente
            };
            CatalogosFactory.UpdateNUEVOClv_Equi(objNUEVOClv_Equi).then(function(data){
                if(data.UpdateNUEVOClv_EquiResult == 1){
                    ngNotify.set('CORRECTO, se guardó el servicio.', 'success');
                    GetServicio();
                }else{
                    ngNotify.set('ERROR, al agregar clave equivalente al servicio.', 'warn');
                    GetServicio();
                }
            });
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
            var Obj = {
                'Clv_Servicio': vm.Clv_Servicio,
                'Origen': 'U'
            };
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
                    Obj: function () {
                        return Obj;
                    }
                }
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
                vm.ActiveTab = 1;
                if(vm.Clv_TipSer == 3){
                    vm.ShowClaveEquivalente = true;
                }else if(vm.Clv_TipSer == 2){
                    vm.ShowClaveEquivalente = false;
                    SetClvEquiNet();
                }else{
                    vm.ShowClaveEquivalente = false;
                }
            }else if(vm.CobroMensual == 'N'){
                vm.ShowCobroMensual = false;
                vm.HideCobroMensual = true;
                vm.ShowOrden = false;
                vm.GeneraOrden = 'N';
                vm.AplicaComision = 'N';
                vm.ShowClaveEquivalente = false;
                vm.ShowClaveEquivalenteNet = false;
                vm.ActiveTab = 0;
            }
        }

        function SetClvEquiNet(){
            if(vm.Clv_TipSer == 2 && vm.Principal == 'Y' && vm.CobroMensual == 'Y'){
                vm.ShowClaveEquivalenteNet = true;
                vm.ActiveTab = 1;
            }else{
                vm.ShowClaveEquivalenteNet = false;
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
        vm.Titulo = 'Servicio - ';
        vm.Clv_Servicio = $stateParams.id
        vm.ShowCobroMensual = false;
        vm.HideCobroMensual = true;
        vm.ShowOrden = false;
        vm.Disable = true;
        vm.View = false;
        vm.ActiveTab = 0;
        vm.AddClvEquiNet = '';
        vm.ShowClaveEquivalente = false;
        vm.ShowClaveEquivalenteNet = false;
        vm.SetTipoCobro = SetTipoCobro;
        vm.SetOrden = SetOrden;
        vm.OpenAddConcepto = OpenAddConcepto;
        vm.OpenUpdateConcepto = OpenUpdateConcepto;
        vm.OpenDeleteConcepto = OpenDeleteConcepto;
        vm.SaveServicios = SaveServicios;
        vm.OpenConfigurar = OpenConfigurar;
        vm.GetTarifa = GetTarifa;
        vm.SetClvEquiNet = SetClvEquiNet;
        initData();
    });