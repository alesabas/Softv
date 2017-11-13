'use strict';

angular
    .module('softvApp')
    .controller('RedesAddCtrl', function(CatalogosRedIPFactory, ngNotify, $uibModal, $state, $stateParams, $rootScope, $localStorage){

        function initData(){
            CatalogosRedIPFactory.GetGeneral_Sistema_II().then(function(data){
                vm.AlcanceRedIP = data.GetGeneral_Sistema_IIResult.AlcanceRedIp;
                vm.BlockTab1 = (1 <= vm.AlcanceRedIP)? true:false;
                vm.BlockTab2 = (2 <= vm.AlcanceRedIP)? true:false;
                vm.BlockTab3 = (3 <= vm.AlcanceRedIP)? true:false;
                vm.BlockTab4 = (4 <= vm.AlcanceRedIP)? true:false;
                vm.BlockTab5 = (5 <= vm.AlcanceRedIP)? true:false;
                vm.TabActive = (vm.AlcanceRedIP > 0)? 0:5;
            });
        }

        function SaveRedes(){
            var ObjRedIP = {
                'a': vm.IP1, 
                'b': vm.IP2, 
                'c': vm.IP3, 
                'd': vm.IP4, 
                'mask': vm.Mask, 
                'status': 'D'
            };
            CatalogosRedIPFactory.GetCatalogo_IpsList(ObjRedIP).then(function(data){
                console.log(data);
                if(data.GetCatalogo_IpsListResult[0].IdRed != undefined){
                    vm.IdRed = data.GetCatalogo_IpsListResult[0].IdRed;
                    vm.Titulo = 'Red - ';
                    vm.View = false;
                    vm.Block = true;
                    GetRed();
                    ngNotify.set('CORRECTO, se añadió una red nueva', 'success');
                }else{
                    ngNotify.set('ERROR, al añadir una red nueva', 'warn');
                }
            });
        }

        function GetRed(){
            CatalogosRedIPFactory.GetDeepCatalogo_Ips(vm.IdRed).then(function(data){
                var Red = data.GetDeepCatalogo_IpsResult;
                if(Red != null){
                    vm.IdRed = Red.IdRed;
                    vm.Mask = Red.mask;
                    vm.Mod = 0;
                    var IPRed = DivIP(Red.IPRed);
                    vm.IP1 = parseInt(IPRed[0]);
                    vm.IP2 = parseInt(IPRed[1]);
                    vm.IP3 = parseInt(IPRed[2]);
                    vm.IP4 = parseInt(IPRed[3]);
                    GetRelRedDistribuidorDisList();
                    GetRelRedDistribuidorIncList();
                    GetRelRedPlazaDisList();
                    GetRelRedPlazaIncList();
                    GetRelRedEstadoDisList();
                    GetRelRedEstadoIncList();
                    GetRelRedCiudadDisList();
                    GetRelRedCiudadIncList();
                    GetRelRedLocalidadDisList();
                    GetRelRedLocalidadIncList();
                    GetRelRedMedioDisList();
                    GetRelRedMedioIncList();
                }else{
                    ngNotify.set('ERROR, No se encontró la Red seleccionada.', 'warn');
                    $state.go('home.catalogos.redes');
                }
            });
        }

        function GetRelRedDistribuidorDisList(){
            CatalogosRedIPFactory.GetRelRedPlazaList(vm.IdRed).then(function(data){
                vm.RelRedDistribuidorDisList = data.GetRelRedPlazaListResult;
                vm.BlockDistribuidorDis = (vm.RelRedDistribuidorDisList.length > 0)? false:true;  
            });
        }

        function GetRelRedDistribuidorIncList(){
            CatalogosRedIPFactory.GetRelRedPlaza_Inc(vm.IdRed).then(function(data){
                vm.RelRedDistribuidorIncList = data.GetRelRedPlaza_IncResult;
                vm.BlockDistribuidorInc = (vm.RelRedDistribuidorIncList.length > 0)? false:true;
            });
        }

        function UpdateRelRedDistribuidor(Op, Clv_Plaza){
            var objRelRedPlaza = {
                'IdRed': vm.IdRed,
                'Clv_Plaza': Clv_Plaza,
                'Op': Op
            };
            CatalogosRedIPFactory.UpdateRelRedPlaza(objRelRedPlaza).then(function(data){
                GetRelRedDistribuidorDisList();
                GetRelRedDistribuidorIncList();
            });
        }

        function GetRelRedPlazaDisList(){
            CatalogosRedIPFactory.GetRelRedCompaniaList(vm.IdRed).then(function(data){
                vm.RelRedPlazaDisList = data.GetRelRedCompaniaListResult;
                vm.BlockPlazaDis = (vm.RelRedPlazaDisList.length > 0)? false:true;
            });
        }

        function GetRelRedPlazaIncList(){
            CatalogosRedIPFactory.GetRelRedCompania_Inc(vm.IdRed).then(function(data){
                vm.RelRedPlazaIncList = data.GetRelRedCompania_IncResult;
                vm.BlockPlazaInc = (vm.RelRedPlazaIncList.length > 0)? false:true;
            });
        }

        function UpdateRelRedPlaza(Op, IdCompania){
            var objRelRedCompania = {
                'IdRed': vm.IdRed,
                'IdCompania': IdCompania,
                'Op': Op
            };
            CatalogosRedIPFactory.UpdateRelRedCompania(objRelRedCompania).then(function(data){
                GetRelRedPlazaDisList();
                GetRelRedPlazaIncList();
            });
        }

        
        function GetRelRedEstadoDisList(){
            CatalogosRedIPFactory.GetRelRedEstado_Dis(vm.IdRed).then(function(data){
                vm.RelRedEstadoDisList = data.GetRelRedEstado_DisResult;
                vm.BlockEstadoDis = (vm.RelRedEstadoDisList.length > 0)? false:true; 
            });
        }

        function GetRelRedEstadoIncList(){
            CatalogosRedIPFactory.GetRelRedEstadoList(vm.IdRed).then(function(data){
                vm.RelRedEstadoIncList = data.GetRelRedEstadoListResult;
                vm.BlockEstadoInc = (vm.RelRedEstadoIncList.length > 0)? false:true; 
            });
        }

        function UpdateRelRedEstado(Op, Clv_Estado){
            var objRelRedEstado = {
                'IdRed': vm.IdRed,
                'Clv_Estado': Clv_Estado,
                'Op': Op
            };
            CatalogosRedIPFactory.UpdateRelRedEstado(objRelRedEstado).then(function(data){
                GetRelRedEstadoDisList();
                GetRelRedEstadoIncList();
            });
        }

        
        function GetRelRedCiudadDisList(){
            CatalogosRedIPFactory.GetRelRedCiudad_Dis(vm.IdRed).then(function(data){
                vm.RelRedCiudadDisList = data.GetRelRedCiudad_DisResult;
                vm.BlockCiudadDis = (vm.RelRedCiudadDisList.length > 0)? false:true;
            });
        }

        function GetRelRedCiudadIncList(){
            CatalogosRedIPFactory.GetRelRedCiudadList(vm.IdRed).then(function(data){
                vm.RelRedCiudadIncList = data.GetRelRedCiudadListResult;
                vm.BlockCiudadInc = (vm.RelRedCiudadIncList.length > 0)? false:true;
            });
        }

        function UpdateRelRedCiudad(Op, Clv_Ciudad){
            var objRelRedCiudad = {
                'IdRed': vm.IdRed,
                'Clv_Ciudad': Clv_Ciudad,
                'Op': Op
            };
            CatalogosRedIPFactory.UpdateRelRedCiudad(objRelRedCiudad).then(function(data){
                GetRelRedCiudadDisList();
                GetRelRedCiudadIncList();
            });
        }
        
        
        function GetRelRedLocalidadDisList(){
            CatalogosRedIPFactory.GetRelRedLocalidadList(vm.IdRed).then(function(data){
                vm.RelRedLocalidadDisList = data.GetRelRedLocalidadListResult;
                vm.BlockLocalidadDis = (vm.RelRedLocalidadDisList.length > 0)? false:true;
            });
        }
        
        function GetRelRedLocalidadIncList(){
            CatalogosRedIPFactory.GetRelRedLocalidad_inc(vm.IdRed).then(function(data){
                vm.RelRedLocalidadIncList = data.GetRelRedLocalidad_incResult;
                vm.BlockLocalidadInc = (vm.RelRedLocalidadIncList.length > 0)? false:true;
            });
        }

        function UpdateRelRedLocalidad(Op, Clv_Localidad){
            var objRelRedLocalidad = {
                'IdRed': vm.IdRed,
                'Clv_Localidad': Clv_Localidad,
                'Op': Op
            };
            CatalogosRedIPFactory.UpdateRelRedLocalidad(objRelRedLocalidad).then(function(data){
                GetRelRedLocalidadDisList();
                GetRelRedLocalidadIncList();
            });
        }

        function GetRelRedMedioDisList(){
            CatalogosRedIPFactory.GetRelRedMedioList(vm.IdRed).then(function(data){
                vm.RelRedMedioDisList = data.GetRelRedMedioListResult;
                vm.BlockMedioDis = (vm.RelRedMedioDisList.length > 0)? false:true;
            });
        }

        function GetRelRedMedioIncList(){
            CatalogosRedIPFactory.GetRelRedMedio_Inc(vm.IdRed).then(function(data){
                vm.RelRedMedioIncList = data.GetRelRedMedio_IncResult;
                vm.BlockMedioInc = (vm.RelRedMedioIncList.length > 0)? false:true;
            });
        }

        function UpdateRelRedMedio(Op, IdMedio){
            var objRelRedMedio = {
                'IdRed': vm.IdRed,
                'IdMedio': IdMedio,
                'Op': Op
            };
            CatalogosRedIPFactory.UpdateRelRedMedio(objRelRedMedio).then(function(data){
                GetRelRedMedioDisList();
                GetRelRedMedioIncList();
            });
        }

        function DivIP(IP) {
            var PartIP = IP.split(".");
            return PartIP;
        }

        var vm = this;
        vm.Titulo = 'Red Nueva';
        vm.Block = false;
        vm.TabActive = 0;
        vm.View = true;
        vm.SaveRedes = SaveRedes;
        vm.UpdateRelRedDistribuidor = UpdateRelRedDistribuidor;
        vm.UpdateRelRedPlaza = UpdateRelRedPlaza;
        vm.UpdateRelRedEstado = UpdateRelRedEstado;
        vm.UpdateRelRedCiudad = UpdateRelRedCiudad;
        vm.UpdateRelRedLocalidad = UpdateRelRedLocalidad;
        vm.UpdateRelRedMedio = UpdateRelRedMedio;
        initData();
    });