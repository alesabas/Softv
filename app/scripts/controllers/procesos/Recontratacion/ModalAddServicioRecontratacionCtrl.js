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
            RecontratacionFactory.GetInfoContratoEnBaja(ObjCliente2).then(function(data){
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
            if(vm.TipoServicio != undefined){
                vm.ServicioList = null;
                vm.AparatoList = null;
                vm.AparatosRecon = null;
                vm.ViewAparatos = false;
                vm.Medio = vm.MedioList[vm.MR];
                var Obj = {
                    'IdContrato': vm.IdContrato,
                    'Clv_TipSer': vm.TipoServicio.Clv_TipSerPrincipal,
                    'ClvSession': vm.ClvSession
                };
                RecontratacionFactory.GetServiciosEnBaja(Obj).then(function(data){
                    vm.ServicioList = data.GetServiciosEnBajaResult;
                });
            }else{
                vm.ServicioList = null;
                vm.AparatoList = null;
                vm.AparatosRecon = [];
                vm.ViewAparatos = false;
                vm.Medio = vm.MedioList[vm.MR];
            }
        }

        function SetServicio(){
            vm.AparatoList = null;
            vm.AparatosRecon = [];
            vm.ViewAparatos = false;
            vm.Medio = vm.MedioList[vm.MR];
        }

        function GetMedioList(){
            var ObjMedioList = {
                'Clv_Ciudad': vm.Clv_Ciudad,
                'Clv_Localidad': vm.Clv_Localidad,
                'Clv_Colonia': vm.Clv_Colonia,
            };
            CatalogosRedIPFactory.GetCatMedioByCiuLocCol(ObjMedioList).then(function(data){
                vm.MedioList = data.GetCatMedioByCiuLocColResult;
                vm.MedioList.push(MedioList);
                for(var i = 0; vm.MedioList.length > i; i ++){
                    if(vm.MedioList[i].IdMedio == 0){
                        vm.Medio = vm.MedioList[i];
                        vm.MR = i;
                        break
                    }
                }
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

        function GetAparatoList(){
            vm.AparatoList = null;
            vm.AparatosRecon = [];
            vm.ViewAparatos = false;
            var ObjDet = {
                'ClvTipoServ': vm.TipoServicio.Clv_TipSerPrincipal,
                'Clv_Unicanet': vm.Servicio.Clv_UnicaNet,
                'IdMedio': (vm.Medio != undefined)? vm.Medio.IdMedio:0,
                'IdRecon': vm.IdRecon,
                'ClvSession': vm.ClvSession
            };
            RecontratacionFactory.GetListaAparatosEnBaja(ObjDet).then(function(data){
                vm.AparatoList = data.GetListaAparatosEnBajaResult;
                vm.ViewAparatos = (vm.AparatoList.length > 0)? true:false;
            });
            vm.AparatosRecon = [];
        }

        function SetAparatoList(){
            vm.ViewList = (vm.AparatosRecon.length > 0)? true:false;
        }

        function AddAparatoRecon(){
            if(vm.Aparato != undefined){
                if(ValidAparato(vm.Aparato.Clv_CableModem) == false){
                    var AparatoReconListTmp = {
                        'MacCableModem': vm.Aparato.MacCableModem,
                        'Clv_Cablemodem': vm.Aparato.Clv_CableModem,
                        'IdArticulo': vm.Aparato.IdArticulo
                    };
                    var AparatoReconTmp = {
                        'IdContrato': vm.IdContrato,
                        'ClvSession': vm.ClvSession,
                        'Clv_Cablemodem': vm.Aparato.Clv_CableModem,
                        'ContratoNet': vm.Aparato.ContratoNet,
                        'Clv_Unicanet': vm.Servicio.Clv_UnicaNet
                    };
                    vm.AparatosReconList.push(AparatoReconListTmp);
                    vm.AparatosRecon.push(AparatoReconTmp);
                    SetAparatoList();
                }
            }
        }

        function ValidAparato(Clv_CableModem){
            var Check = 0;
            if(vm.AparatosRecon.length > 0){
                for(var i = 0; vm.AparatosRecon.length > i; i++){
                    if(vm.AparatosRecon[i].Clv_Cablemodem == Clv_CableModem){
                        Check = Check + 1;
                    }
                }
            }
            return (Check > 0)? true:false;
        }

        function DeleteAparatoRecon(Clv_CableModem){
            for(var i = 0; vm.AparatosRecon.length > i; i++){
                if(vm.AparatosRecon[i].Clv_Cablemodem == Clv_CableModem){
                    vm.AparatosRecon.splice(i, 1);
                    vm.AparatosReconList.splice(i, 1)
                    SetAparatoList();
                    break;
                }
            }
        }

        function SaveRecontratacion(){
            if(vm.AparatosRecon.length == 0 && vm.ViewAparatos == false){
                SaveServicioRecontratacion()
            }else if(vm.AparatosRecon.length > 0 && vm.ViewAparatos == true){
                SaveServicioRecontratacion()
            }else if(vm.AparatosRecon.length == 0 && vm.ViewAparatos == true){
                ngNotify.set('ERROR, aun no se agrega ningún aparato.', 'warn');
            }
        }

        function SaveServicioRecontratacion(){
            var ObjRecontratacion = {
                'ClvSession': vm.ClvSession,
                'IdContrato': vm.IdContrato,
                'Clv_Unicanet': vm.Servicio.Clv_UnicaNet,
                'ClvTipoServ': vm.TipoServicio.Clv_TipSerPrincipal,
                'Clv_Servicio': vm.Servicio.Clv_Servicio,
                'IdMedio': vm.Medio.IdMedio,
            };
            RecontratacionFactory.GetAddServiciosEnBaja(ObjRecontratacion).then(function(data){
                vm.IdRecon = data.GetAddServiciosEnBajaResult;
                if(vm.IdRecon > 0){
                    if(vm.AparatoList.length > 0){
                        SaveAparatoRecontratacion();
                    }else{
                        ngNotify.set('CORRECTO, se agregó el servicio.', 'success');
                        OK();
                    }
                }else{
                    ngNotify.set('ERROR, al añadir un servicio.', 'warn');
                }
            });
        }

        function SaveAparatoRecontratacion(){
            vm.AparatosRecon.forEach(AddIdReconClvUnic);
            RecontratacionFactory.GetAddApararoEnBaja(vm.AparatosRecon).then(function(data){
                OK();
            });
        }

        function AddIdReconClvUnic(item, index){
            vm.AparatosRecon[index].IdRecon = vm.IdRecon;
        }

        function OK(){
            $uibModalInstance.close(vm.IdRecon);
        }

        function Cancel(){
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.BlokMedioInst = false;
        var MedioList = {
            'IdMedio': 0,
            'Descripcion': 'Definir en la instalación',
            'Activo': true
        };
        vm.AparatosReconList = [];
        vm.AparatosRecon = [];
        vm.ViewAparatos = false;
        vm.ClvSession = ObjCliente.ClvSession;
        vm.IdRecon = (ObjCliente.IdRecon != null)? ObjCliente.IdRecon:0;
        vm.SetServicio = SetServicio;
        vm.GetServiciosList = GetServiciosList;
        vm.GetAparatoList = GetAparatoList;
        vm.AddAparatoRecon = AddAparatoRecon;
        vm.DeleteAparatoRecon = DeleteAparatoRecon;
        vm.SaveRecontratacion = SaveRecontratacion;
        vm.Cancel = Cancel;
        initData();

    });