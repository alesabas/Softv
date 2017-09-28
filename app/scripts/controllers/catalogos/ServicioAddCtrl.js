'use strict'
angular
    .module('softvApp')
    .controller('ServicioAddCtrl', function(CatalogosFactory, ngNotify, $uibModal, $state, $stateParams, $rootScope){

        function initData(){
            CatalogosFactory.GetMUESTRATRABAJOS_NewList(vm.Clv_TipSer).then(function(data){
                vm.TrabajoList = data.GetMUESTRATRABAJOS_NewListResult;
            });

            CatalogosFactory.GetTipoClienteList_WebSoftvnew().then(function(data){
                vm.TipoCobroList = data.GetTipoClienteList_WebSoftvnewResult;
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
                'Gb': 0
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
                                        if(vm.Clv_TipSer == 1){
                                            ngNotify.set('CORRECTO, se añadió un servicio nuevo.', 'success');
                                            $state.go('home.catalogos.servicios');
                                        }else if(vm.Clv_TipSer == 2){
                                            SaveServicio2(Clv_Servicio);
                                        }else if(vm.Clv_TipSer == 3){
                                            SaveServicio3();
                                        }
                                    }else{
                                        ngNotify.set('ERROR, al agregar un trabajo.', 'warn');
                                        $state.go('home.catalogos.servicios');
                                    }
                                });
                            }else{
                                if(vm.Clv_TipSer == 1){
                                    ngNotify.set('CORRECTO, se añadió un servicio nuevo.', 'success');
                                    $state.go('home.catalogos.servicios');
                                }else if(vm.Clv_TipSer == 2){
                                    SaveServicio2(Clv_Servicio);
                                }else if(vm.Clv_TipSer == 3){
                                    SaveServicio3();
                                }
                            }
                        }else{
                            ngNotify.set('ERROR, al borrar trabajos.', 'warn');
                            $state.go('home.catalogos.servicios');
                        }
                    });
                }else{
                    ngNotify.set('ERROR, al añadir un servicio nuevo.', 'warn');
                    $state.go('home.catalogos.servicios');
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
                            ngNotify.set('CORRECTO, se añadió un servicio nuevo.', 'success');
                            $state.go('home.catalogos.servicios');
                        }else{
                            ngNotify.set('ERROR, al añadir un servicio nuevo.', 'warn');
                            $state.go('home.catalogos.servicios');
                        }
                    });
                }else if(ValildaInternetResult == 1){
                    CatalogosFactory.DeleteBorAplicaSoloInternet(Clv_Servicio).then(function(data){
                        if(data.DeleteBorAplicaSoloInternetResult == -1){
                            ngNotify.set('CORRECTO, se añadió un servicio nuevo.', 'success');
                            $state.go('home.catalogos.servicios');
                        }else{
                            ngNotify.set('ERROR, al añadir un servicio nuevo.', 'warn');
                            $state.go('home.catalogos.servicios');
                        }
                    });
                }else{
                    ngNotify.set('ERROR, al validar el servicio nuevo.', 'warn');
                    $state.go('home.catalogos.servicios');
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
                    ngNotify.set('CORRECTO, se añadió un servicio nuevo.', 'success');
                    $state.go('home.catalogos.servicios');
                }else{
                    ngNotify.set('ERROR, al agregar clave equivalente al servicio nuevo.', 'warn');
                    $state.go('home.catalogos.servicios');
                }
            });
        }

        function ValidaSoloInternet(Clv_Servicio){
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
                            ngNotify.set('CORRECTO, se añadió un servicio nuevo.', 'success');
                            $state.go('home.catalogos.servicios');
                        }else{
                            ngNotify.set('ERROR, al añadir un servicio nuevo.', 'warn');
                            $state.go('home.catalogos.servicios');
                        }
                    });
                }else if(ValildaInternetResult == 1){
                    CatalogosFactory.DeleteBorAplicaSoloInternet(Clv_Servicio).then(function(data){
                        if(data.DeleteBorAplicaSoloInternetResult == -1){
                            ngNotify.set('CORRECTO, se añadió un servicio nuevo.', 'success');
                            $state.go('home.catalogos.servicios');
                        }else{
                            ngNotify.set('ERROR, al añadir un servicio nuevo.', 'warn');
                            $state.go('home.catalogos.servicios');
                        }
                    });
                }else{
                    ngNotify.set('ERROR, al validar el servicio nuevo.', 'warn');
                    $state.go('home.catalogos.servicios');
                }
            });
        }

        function SetTipoCobro(){
            if(vm.CobroMensual == 'Y'){
                vm.ShowCobroMensual = true;
                vm.HideCobroMensual = false;
                vm.ShowOrden = false;
                vm.GeneraOrden = 'N';
                vm.AplicaComision = 'N';
                if(vm.Clv_TipSer == 3){
                    vm.ShowClaveEquivalente = true;
                }else{
                    vm.ShowClaveEquivalente = false;
                }
            }
            else if(vm.CobroMensual == 'N'){
                vm.ShowCobroMensual = false;
                vm.HideCobroMensual = true;
                vm.ShowOrden = false;
                vm.GeneraOrden = 'N';
                vm.AplicaComision = 'N';
                vm.ShowClaveEquivalente = false;
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
        
        function OpenAddConcepto(Clv_TipoCobro){
            var Clv_TipoCobro = Clv_TipoCobro;
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
                    Clv_TipoCobro: function () {
                        return Clv_TipoCobro;
                    }
                }
            });
        }

        var vm = this;
        vm.Titulo = 'Servicio Nuevo';
        vm.ShowCobroMensual = false;
        vm.HideCobroMensual = true;
        vm.ShowOrden = false;
        vm.ShowClaveEquivalente = false;
        vm.Disable = false;
        vm.Clv_TipSer = $stateParams.id;
        vm.SetTipoCobro = SetTipoCobro;
        vm.SetOrden = SetOrden;
        vm.OpenAddConcepto = OpenAddConcepto;
        vm.SaveServicios = SaveServicios;
        initData();
    });