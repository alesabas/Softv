'use strict';

angular
    .module('softvApp')
    .controller('ModalAddServicioRecontratacionCtrl', function(RecontratacionFactory, CatalogosFactory, CatalogosRedIPFactory, $uibModalInstance, $uibModal, ngNotify, $state, $localStorage, ObjCliente){
        
        function initData(){
            CatalogosFactory.GetMuestraTipSerPrincipal_SERList().then(function(data){
                vm.TipoServicioList = data.GetMuestraTipSerPrincipal_SERListResult;
            });
            var ObjCliente2 = {
                'Op': 0,
                'IdContrato': ObjCliente.IdContrato,
                'ContratoCompania': ''
            };
            console.log(ObjCliente2);
            RecontratacionFactory.GetInfoContratoEnBaja(ObjCliente2).then(function(data){
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
            /*
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
                    vm.ViewAparatos = true;
                    GetAparatoList();
                }else{
                    ngNotify.set('ERROR, al añadir un servicio.', 'warn');
                }
            });
            */
        }

        function GetAparatoList(){
            var ObjDet = {
                'ClvTipoServ': vm.TipoServicio.Clv_TipSerPrincipal,
                'Clv_Unicanet': vm.Servicio.Clv_UnicaNet,
                'IdMedio': (vm.Medio != undefined)? vm.Medio.IdMedio:0
            };
            console.log(ObjDet);
            RecontratacionFactory.GetListaAparatosEnBaja(ObjDet).then(function(data){
                console.log(data);
                vm.AparatoList = data.GetListaAparatosEnBajaResult;
            });
        }

        function AddAparatoRecon(){
            if(vm.Aparato != undefined){
                vm.AparatoReconTmp ={

                };
                /*vm.AparatosRecon.push(vm.Aparato);
                console.log(vm.AparatosRecon);*/
            }
        }

        
    function EliminarArticulo(clave) {
      for (var i = 0; i < vm.articulos_.length; i++)
        if (vm.articulos_[i].NoArticulo === clave) {
          vm.articulos_.splice(i, 1);
          break;
        }
    }

        /*
        function OpenAddAparatoRecontratacion(){
            var ObjSession = {
                'IdRecon': vm.IdRecon,
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
        */

        function Cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        //vm.ViewAparatos = false;
        console.log('2');
        console.log(ObjCliente);
        vm.AparatosRecon = [];
        vm.ClvSession = ObjCliente.ClvSession;
        vm.GetServiciosList = GetServiciosList;
        vm.GetAparatoList = GetAparatoList;
        vm.AddAparatoRecon = AddAparatoRecon;
        vm.SaveRecontratacionServicio = SaveRecontratacionServicio;
        vm.Cancel = Cancel;
        console.log('3');
        initData();

    });