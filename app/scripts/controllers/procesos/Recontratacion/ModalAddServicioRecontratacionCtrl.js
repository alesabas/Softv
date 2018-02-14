'use strict';

angular
    .module('softvApp')
    .controller('ModalAddServicioRecontratacionCtrl', function(RecontratacionFactory, CatalogosFactory, CatalogosRedIPFactory, $uibModalInstance, $uibModal, ngNotify, $state, $localStorage, ObjCliente){
        
        function initData(){
            CatalogosFactory.GetMuestraTipSerPrincipal_SERList().then(function(data){
                vm.TipoServicioList = data.GetMuestraTipSerPrincipal_SERListResult;
            });

            RecontratacionFactory.GetInfoContratoEnBaja(ObjCliente.IdContrato).then(function(data){
                console.log(data);
                var Cliente = data.GetInfoContratoEnBajaResult;
                vm.IdContrato = Cliente.CONTRATO;
                vm.IdCompania = Cliente.IdCompania;
                vm.Clv_Estado = Cliente.Clv_Estado;
                vm.Clv_Ciudad = Cliente.Clv_Ciudad;
                vm.Clv_Localidad = Cliente.Clv_Localidad;
                vm.Clv_Colonia = Cliente.Clv_Colonia;
                GetMedioList();
            });
        }

        function GetServiciosList(){
            var Obj = {
                'IdContrato': vm.IdContrato,
                'Clv_TipSer': vm.TipoServicio.Clv_TipSerPrincipal
            };
            RecontratacionFactory.GetServiciosEnBaja(Obj).then(function(data){
                console.log(data);
                vm.ServicioList = data.GetServiciosEnBajaResult;
            });
        }

        /*
        function SetCliente(ContratoS) {
            $uibModalInstance.close(ContratoS);
        }
        */

        function GetMedioList(){
            var ObjMedioList = {
                'Clv_Ciudad': vm.Clv_Ciudad,
                'Clv_Localidad': vm.Clv_Localidad,
                'Clv_Colonia': vm.Clv_Colonia,
            };
            console.log(ObjMedioList);
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

        function SaveRecontratacionServicio(){
            var ObjRecontracion = {
                'ClvSession': vm.ClvSession,
                'IdContrato': vm.IdContrato,
                'Clv_Unicanet': vm.Servicio.Clv_UnicaNet,
                'ClvTipoServ': vm.TipoServicio.Clv_TipSerPrincipal,
                'Clv_Servicio': vm.Servicio.Clv_Servicio,
                'IdMedio': vm.Medio.IdMedio,
            };
            console.log(ObjRecontracion);
            RecontratacionFactory.GetAddServiciosEnBaja(ObjRecontracion).then(function(data){
                console.log(data);
                vm.IdRecon = data.GetAddServiciosEnBajaResult;
                if(vm.IdRecon > 0){
                    Cancel();
                    OpenAddAparatoRecontratacion();
                }else{
                    ngNotify.set('ERROR, al añadir un servicio.', 'warn');
                }
            });
        }

        function OpenAddAparatoRecontratacion(){
            var ObjSession = {
                'IdContrato': vm.IdContrato,
                'ClvSession': vm.ClvSession
            };
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body', 
                templateUrl: 'views/procesos/ModalAparatoRecontratacion.html',
                controller: 'ModalAddAparatoRecontratacionCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                resolve: {
                    ObjSession: function () {
                        return ObjSession;
                    }
                }
            });
        }

        function Cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.ClvSession = ObjCliente.ClvSession;
        vm.GetServiciosList = GetServiciosList;
        vm.SaveRecontratacionServicio = SaveRecontratacionServicio;
        vm.Cancel = Cancel;
        initData();
        console.log('2');

    });