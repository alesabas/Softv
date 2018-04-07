'use strict'
angular
    .module('softvApp')
    .controller('ServicioAddCtrl', function(CatalogosFactory, ServiciosFactory, ngNotify, $uibModal, $state, $stateParams, $rootScope){

        function initData(){
            CatalogosFactory.GetDeepTipServ_New(vm.Clv_TipSer).then(function(data){
                var TipoServicioResult = data.GetDeepTipServ_NewResult;
                if(TipoServicioResult != null){
                    if(TipoServicioResult.Habilitar == 0){
                        vm.Clv_TipSer = TipoServicioResult.Clv_TipSer;
                        CatalogosFactory.GetMUESTRATRABAJOS_NewList(vm.Clv_TipSer).then(function(data){
                            vm.TrabajoList = data.GetMUESTRATRABAJOS_NewListResult;
                        });
                        CatalogosFactory.GetTipoClienteList_WebSoftvnew().then(function(data){
                            vm.TipoCobroList = data.GetTipoClienteList_WebSoftvnewResult;
                        });
                        /*CatalogosFactory.Gettbl_politicasFibraList().then(function(data){
                            console.log(data);
                            vm.ClvEquiNetList = data.Gettbl_politicasFibraListResult;
                        });*/
                    }else{
                        ngNotify.set('ERROR, el tipo se servicio que seleccionó no es válido.', 'warn');
                        $state.go('home.catalogos.servicios');
                    }
                }else{
                    ngNotify.set('ERROR, el tipo se servicio que seleccionó no es válido.', 'warn');
                    $state.go('home.catalogos.servicios');
                }
            });
        }

        function SaveServicios(){
            var objServicios_New = {
                'Clv_TipSer': vm.Clv_TipSer,
                'Descripcion': vm.Descripcion,
                'Clv_Txt': vm.Clave,
                'AplicanCom': (vm.AplicaComision == 'Y') ? 1 : 0,
                'Sale_en_Cartera': (vm.CobroMensual == 'Y') ? 1 : 0,
                'Precio': (vm.Precio != undefined) ? vm.Precio : 0,
                'Genera_Orden': (vm.GeneraOrden == 'Y') ? 1 : 0,
                'Es_Principal': (vm.Principal == 'Y') ? 1 : 0,
                'idcompania': 0,
                'EsToken': 0,
                'Gb': 0,
                'dolares':vm.dolares
            };
            
            CatalogosFactory.AddServicios_New(objServicios_New).then(function(data){
                var Clv_Servicio = data.AddServicios_NewResult;
                if(Clv_Servicio > 0){
                    CatalogosFactory.DeleteBORRel_Trabajos_NoCobroMensual(Clv_Servicio).then(function(data){
                        var BorrarTrabajo = data.DeleteBORRel_Trabajos_NoCobroMensualResult;
                        if(BorrarTrabajo == -1){
                            if(vm.GeneraOrden == 'Y'){
                                var objGUARDARel_Trabajos_NoCobroMensual = {
                                    'Clv_Servicio': Clv_Servicio,
                                    'Clv_Trabajo': vm.Trabajo.Clv_Trabajo
                                };
                                CatalogosFactory.UpdateGUARDARel_Trabajos_NoCobroMensual(objGUARDARel_Trabajos_NoCobroMensual).then(function(data){
                                    if(data.UpdateGUARDARel_Trabajos_NoCobroMensualResult == -1){
                                        if(vm.Clv_TipSer == 2){
                                            SaveServicio2(Clv_Servicio);
                                        }else if(vm.Clv_TipSer == 3){
                                            SaveServicio3(Clv_Servicio);
                                        }else{
                                            vm.Clv_Servicio = Clv_Servicio;
                                            ngNotify.set('CORRECTO, se añadió un servicio nuevo.', 'success');
                                            $state.go('home.catalogos.servicio_editar', {'id':vm.Clv_Servicio});
                                        }
                                    }else{
                                        ngNotify.set('ERROR, al agregar un trabajo.', 'warn');
                                        $state.go('home.catalogos.servicios');
                                    }
                                });
                            }else if(vm.CobroMensual == 'Y'){
                                var objNUEPuntos_Pago_Adelantado = {
                                    'CLV_SERVICIO': Clv_Servicio,
                                    'Puntos3': vm.Meses35,
                                    'Puntos6': vm.Meses611,
                                    'puntos11': vm.Meses11,
                                    'Punto_Pronto_Pago': vm.ProntoPago
                                };
                                CatalogosFactory.AddNUEPuntos_Pago_Adelantado(objNUEPuntos_Pago_Adelantado).then(function(data){
                                    if(vm.Clv_TipSer == 2){
                                        if(vm.ClvEquiNet != undefined){
                                            /*Chek*/
                                            /*
                                            var ObjClvEquiNet = {
                                                'Clv_Txt': vm.Clave, 
                                                'Clv_Eq': vm.ClvEquiNet.Clv_equivalente, 
                                                'Id': 0
                                            };
                                            CatalogosFactory.GetTblNetList(ObjClvEquiNet).then(function(data){
                                                vm.AddClvEquiNet = data.GetTblNetListResult[0];
                                                SaveServicio2(Clv_Servicio);
                                            });
                                            */
                                            /* foreach*/
                                            var ObjClvEquivalente = {
                                                'ClvServicio': Clv_Servicio,
                                                'Id': vm.ClvEquivalenteList.Id,
                                                'IdMedio': vm.ClvEquivalenteList.IdMedio
                                            };
                                            angular.forEach(vm.ClvEquivalenteList, function(value, key){
                                                var Obj = {
                                                    'ClvServicio': Clv_Servicio,
                                                    'Id': value.Id,
                                                    'IdMedio': value.IdMedio
                                                };
                                                ObjClvEquivalente.push(Obj);
                                            });
                                            ServiciosFactory.GetAddServicioClvEqMedio(ObjClvEquivalente).then(function(data){
                                                console.log(data);
                                                SaveServicio2(Clv_Servicio);
                                            });
                                        }else{
                                            SaveServicio2(Clv_Servicio);
                                        }
                                    }else if(vm.Clv_TipSer == 3){
                                        SaveServicio3(Clv_Servicio);
                                    }else{
                                        vm.Clv_Servicio = Clv_Servicio;
                                        ngNotify.set('CORRECTO, se añadió un servicio nuevo.', 'success');
                                        $state.go('home.catalogos.servicios');
                                    }
                                });
                            }else{
                                if(vm.Clv_TipSer == 2){
                                    SaveServicio2(Clv_Servicio);
                                }else if(vm.Clv_TipSer == 3){
                                    SaveServicio3(Clv_Servicio);
                                }else{
                                    vm.Clv_Servicio = Clv_Servicio;
                                    ngNotify.set('CORRECTO, se añadió un servicio nuevo.', 'success');
                                    $state.go('home.catalogos.servicios');
                                }
                            }
                        }else{
                            ngNotify.set('ERROR, al borrar trabajos.', 'warn');
                            $state.go('home.catalogos.servicios');
                        }
                    });
                }else{
                    ngNotify.set('ERROR, al añadir un servicio nuevo, posiblemente la clave que ingresó ya existe.', 'warn');
                    //$state.go('home.catalogos.servicios');
                }
            });
        }
        
        function SaveServicio2(Clv_Servicio){
            var objValidaAplicaSoloInternet = {
                'Clv_Servicio': Clv_Servicio
            };
            CatalogosFactory.AddValidaAplicaSoloInternet(objValidaAplicaSoloInternet).then(function(data){
                var ValildaInternetResult = data.AddValidaAplicaSoloInternetResult;
                if(ValildaInternetResult == 0){
                    var objNueAplicaSoloInternet = {
                        'Clv_Servicio': Clv_Servicio
                    }
                    CatalogosFactory.AddNueAplicaSoloInternet(objNueAplicaSoloInternet).then(function(data){
                        if(data.AddNueAplicaSoloInternetResult == -1){
                            if(vm.AddClvEquiNet != ''){
                                var Msg = (vm.AddClvEquiNet.Msg != null)? 'CORRECTO, se añadió un servicio nuevo, ' + vm.AddClvEquiNet.Msg + '.':'CORRECTO, se añadió un servicio nuevo.';
                            }else{
                                var Msg = 'CORRECTO, se añadió un servicio nuevo.';
                            }
                            vm.Clv_Servicio = Clv_Servicio;
                            ngNotify.set(Msg, 'success');
                            $state.go('home.catalogos.servicio_editar', {'id':vm.Clv_Servicio});
                        }else{
                            if(vm.AddClvEquiNet != ''){
                                var Msg = (vm.AddClvEquiNet.Msg != null)? 'ERROR, al validar solo internet, ' + vm.AddClvEquiNet.Msg + '.':'ERROR, al validar solo internet.';
                            }else{
                                var Msg = 'ERROR, al validar solo internet.';
                            }
                            ngNotify.set(Msg, 'warn');
                            $state.go('home.catalogos.servicios');
                        }
                    });
                }else if(ValildaInternetResult == 1){
                    CatalogosFactory.DeleteBorAplicaSoloInternet(Clv_Servicio).then(function(data){
                        if(data.DeleteBorAplicaSoloInternetResult == -1){
                            if(vm.AddClvEquiNet != ''){
                                var Msg = (vm.AddClvEquiNet.Msg != null)? 'CORRECTO, se añadió un servicio nuevo, ' + vm.AddClvEquiNet.Msg + '.':'CORRECTO, se añadió un servicio nuevo.';
                            }else{
                                var Msg = 'CORRECTO, se añadió un servicio nuevo.';
                            }
                            vm.Clv_Servicio = Clv_Servicio;
                            ngNotify.set(Msg, 'success');
                            $state.go('home.catalogos.servicio_editar', {'id':vm.Clv_Servicio});
                        }else{
                            if(vm.AddClvEquiNet != ''){
                                var Msg = (vm.AddClvEquiNet.Msg != null)? 'ERROR, al validar solo internet, ' + vm.AddClvEquiNet.Msg + '.':'ERROR, al validar solo internet.';
                            }else{
                                var Msg = 'ERROR, al validar solo internet.';
                            }
                            ngNotify.set(Msg, 'warn');
                            $state.go('home.catalogos.servicios');
                        }
                    });
                }else{
                    if(vm.AddClvEquiNet != ''){
                        var Msg = (vm.AddClvEquiNet.Msg != null)? 'ERROR, al validar solo internet, ' + vm.AddClvEquiNet.Msg + '.':'ERROR, al validar solo internet.';
                    }else{
                        var Msg = 'ERROR, al validar solo internet.';
                    }
                    ngNotify.set(Msg, 'warn');
                    $state.go('home.catalogos.servicios');
                }
            });
        }

        function SaveServicio3(Clv_Servicio){
            var objNUEVOClv_Equi = {
                'Clv_txt': vm.Clave,
                'Clv_Equivalente': vm.ClaveEquivalente
            };
            CatalogosFactory.UpdateNUEVOClv_Equi(objNUEVOClv_Equi).then(function(data){
                if(data.UpdateNUEVOClv_EquiResult == 1){
                    vm.Clv_Servicio = Clv_Servicio;
                    ngNotify.set('CORRECTO, se añadió un servicio nuevo.', 'success');
                    $state.go('home.catalogos.servicio_editar', {'id':vm.Clv_Servicio});
                }else{
                    ngNotify.set('ERROR, al agregar uivalente al servicio nuevo.', 'warn');
                    $state.go('home.catalogos.servicios');
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

        $rootScope.$on('LoadConceptos', function(e, Clv_Servicio){
            GetTarifa(Clv_Servicio);
        });

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

        function OpenClvEquivalente(){
            var ClvEquiList = vm.ClvEquivalenteList;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalClvEquivalenteForm.html',
                controller: 'ModalClvEquivalenteAddCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    ClvEquiList: function () {
                        return ClvEquiList;
                    }
                }
            });
            modalInstance.result.then(function (ClvEquivalenteList) {
                vm.ClvEquivalenteList = ClvEquivalenteList;
                console.log(vm.ClvEquivalenteList);
            });
        }

        function SetTipoCobro(){
            if(vm.CobroMensual == 'Y'){
                vm.ShowCobroMensual = true;
                vm.HideCobroMensual = false;
                vm.ShowOrden = false;
                vm.GeneraOrden = 'N';
                vm.Trabajo = undefined;
                vm.AplicaComision = 'N';
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
                vm.Trabajo = undefined;
                vm.AplicaComision = 'N';
                vm.ShowClaveEquivalente = false;
                vm.ShowClaveEquivalenteNet = false;
            }
        }

        function SetClvEquiNet(){
            if(vm.Clv_TipSer == 2 && vm.Principal == 'Y' && vm.CobroMensual == 'Y'){
                vm.ShowClaveEquivalenteNet = true;
            }else{
                vm.ShowClaveEquivalenteNet = false;
            }
        }

        function SetOrden(){
            if(vm.GeneraOrden == 'Y'){
                vm.ShowOrden = true;
                vm.Trabajo = undefined;
            }
            else if(vm.GeneraOrden == 'N'){
                vm.ShowOrden = false;
                vm.Trabajo = undefined;
            }
        }

        var vm = this;
        vm.Titulo = 'Servicio ';
        vm.ShowCobroMensual = false;
        vm.HideCobroMensual = true;
        vm.ShowOrden = false;
        vm.ShowClaveEquivalente = false;        
        vm.ShowClaveEquivalenteNet = false;
        vm.Disable = false;
        vm.View = false;
        vm.ActiveTab = 1;
        vm.AddClvEquiNet = '';
        var ObjClvEquivalente = [];
        vm.ClvEquivalenteList = [];
        vm.Clv_TipSer = $stateParams.id;
        vm.SetTipoCobro = SetTipoCobro;
        vm.SetOrden = SetOrden;
        vm.OpenAddConcepto = OpenAddConcepto;
        vm.OpenUpdateConcepto = OpenUpdateConcepto;
        vm.OpenDeleteConcepto = OpenDeleteConcepto;
        vm.SaveServicios = SaveServicios;
        vm.GetTarifa = GetTarifa;
        vm.OpenConfigurar = OpenConfigurar;
        vm.OpenClvEquivalente = OpenClvEquivalente;
        vm.SetClvEquiNet = SetClvEquiNet;
        initData();
    });