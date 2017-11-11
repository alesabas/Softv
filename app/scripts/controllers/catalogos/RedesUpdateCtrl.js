'use strict';

angular
    .module('softvApp')
    .controller('RedesUpdateCtrl', function(CatalogosRedIPFactory, ngNotify, $uibModal, $state, $stateParams, $rootScope, $localStorage){
        
        function initData(){
            GetRed();
            CatalogosRedIPFactory.GetGeneral_Sistema_II().then(function(data){
                console.log(data);
                vm.AlcanceRedIP = data.GetGeneral_Sistema_IIResult.AlcanceRedIp;
                vm.BlockTab1 = (1 <= vm.AlcanceRedIP)? true:false;
                vm.BlockTab2 = (2 <= vm.AlcanceRedIP)? true:false;
                vm.BlockTab3 = (3 <= vm.AlcanceRedIP)? true:false;
                vm.BlockTab4 = (4 <= vm.AlcanceRedIP)? true:false;
                vm.BlockTab5 = (5 <= vm.AlcanceRedIP)? true:false;
                vm.TabActive = (vm.AlcanceRedIP > 0)? 0:5;
                console.log(vm.AlcanceRedIP, vm.TabActive);
            });
        }

        function SaveRedes(){
            
        }

        function GetRed(){
            CatalogosRedIPFactory.GetDeepCatalogo_Ips($stateParams.id).then(function(data){
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
                console.log(data);
                vm.RelRedDistribuidorDisList = data.GetRelRedPlazaListResult;
            });
        }

        function GetRelRedDistribuidorIncList(){
            CatalogosRedIPFactory.GetRelRedPlaza_Inc(vm.IdRed).then(function(data){
                console.log(data);
                vm.RelRedDistribuidorIncList = data.GetRelRedPlaza_IncResult;
            });
        }

        function UpdateRelRedDistribuidor(Op, Clv_Plaza){
            var objRelRedPlaza = {
                'IdRed': vm.IdRed,
                'Clv_Plaza': Clv_Plaza,
                'Op': Op
            };
            console.log(objRelRedPlaza);
            CatalogosRedIPFactory.UpdateRelRedPlaza(objRelRedPlaza).then(function(data){
                console.log(data);
                GetRelRedDistribuidorDisList();
                GetRelRedDistribuidorIncList();
            });
        }

        function GetRelRedPlazaDisList(){
            CatalogosRedIPFactory.GetRelRedCompaniaList(vm.IdRed).then(function(data){
                console.log(data);
                vm.RelRedPlazaDisList = data.GetRelRedCompaniaListResult;
            });
        }

        function GetRelRedPlazaIncList(){
            CatalogosRedIPFactory.GetRelRedCompania_Inc(vm.IdRed).then(function(data){
                console.log(data);
                vm.RelRedPlazaIncList = data.GetRelRedCompania_IncResult;
            });
        }

        function UpdateRelRedPlaza(Op, IdCompania){
            var objRelRedCompania = {
                'IdRed': vm.IdRed,
                'IdCompania': IdCompania,
                'Op': Op
            };
            CatalogosRedIPFactory.UpdateRelRedCompania(objRelRedCompania).then(function(data){
                console.log(data);
                GetRelRedPlazaDisList();
                GetRelRedPlazaIncList();
            });
        }

        
        function GetRelRedEstadoDisList(){
            CatalogosRedIPFactory.GetRelRedEstado_Dis(vm.IdRed).then(function(data){
                console.log(data);
                vm.RelRedEstadoDisList = data.GetRelRedEstado_DisResult;
            });
        }

        function GetRelRedEstadoIncList(){
            CatalogosRedIPFactory.GetRelRedEstadoList(vm.IdRed).then(function(data){
                console.log(data);
                vm.RelRedEstadoIncList = data.GetRelRedEstadoListResult;
            });
        }

        function UpdateRelRedEstado(Op, Clv_Estado){
            var objRelRedEstado = {
                'IdRed': vm.IdRed,
                'Clv_Estado': Clv_Estado,
                'Op': Op
            };
            CatalogosRedIPFactory.UpdateRelRedEstado(objRelRedEstado).then(function(data){
                console.log(data);
                GetRelRedEstadoDisList();
                GetRelRedEstadoIncList();
            });
        }

        
        function GetRelRedCiudadDisList(){
            CatalogosRedIPFactory.GetRelRedCiudad_Dis(vm.IdRed).then(function(data){
                console.log(data);
                vm.RelRedCiudadDisList = data.GetRelRedCiudad_DisResult;
            });
        }

        function GetRelRedCiudadIncList(){
            CatalogosRedIPFactory.GetRelRedCiudadList(vm.IdRed).then(function(data){
                console.log(data);
                vm.RelRedCiudadIncList = data.GetRelRedCiudadListResult;
            });
        }

        function UpdateRelRedCiudad(Op, Clv_Ciudad){
            var objRelRedCiudad = {
                'IdRed': vm.IdRed,
                'Clv_Ciudad': Clv_Ciudad,
                'Op': Op
            };
            CatalogosRedIPFactory.UpdateRelRedCiudad(objRelRedCiudad).then(function(data){
                console.log(data);
                GetRelRedCiudadDisList();
                GetRelRedCiudadIncList();
            });
        }
        
        
        function GetRelRedLocalidadDisList(){
            CatalogosRedIPFactory.GetRelRedLocalidadList(vm.IdRed).then(function(data){
                console.log(data);
                vm.RelRedLocalidadDisList = data.GetRelRedLocalidadListResult;
            });
        }
        
        function GetRelRedLocalidadIncList(){
            CatalogosRedIPFactory.GetRelRedLocalidad_inc(vm.IdRed).then(function(data){
                console.log(data);
                vm.RelRedLocalidadIncList = data.GetRelRedLocalidad_incResult;
            });
        }

        function UpdateRelRedLocalidad(Op, Clv_Localidad){
            var objRelRedLocalidad = {
                'IdRed': vm.IdRed,
                'Clv_Localidad': Clv_Localidad,
                'Op': Op
            };
            CatalogosRedIPFactory.UpdateRelRedLocalidad(objRelRedLocalidad).then(function(data){
                console.log(data);
                GetRelRedLocalidadDisList();
                GetRelRedLocalidadIncList();
            });
        }

        function GetRelRedMedioDisList(){
            CatalogosRedIPFactory.GetRelRedMedioList(vm.IdRed).then(function(data){
                console.log(data);
                vm.RelRedMedioDisList = data.GetRelRedMedioListResult;
            });
        }

        function GetRelRedMedioIncList(){
            CatalogosRedIPFactory.GetRelRedMedio_Inc(vm.IdRed).then(function(data){
                console.log(data);
                vm.RelRedMedioIncList = data.GetRelRedMedio_IncResult;
            });
        }

         function UpdateRelRedMedio(Op, IdMedio){
             var objRelRedMedio = {
                'IdRed': vm.IdRed,
                'IdMedio': IdMedio,
                'Op': Op
             };
            CatalogosRedIPFactory.UpdateRelRedMedio(objRelRedMedio).then(function(data){
                console.log(data);
                GetRelRedMedioDisList();
                GetRelRedMedioIncList();
            });
         }        
                    
        function DivIP(IP) {
            var PartIP = IP.split(".");
            return PartIP;
        }

        var vm = this;
        vm.Block = true;
        vm.TabActive = 0;
        vm.SaveRedes = SaveRedes;
        vm.UpdateRelRedDistribuidor = UpdateRelRedDistribuidor;
        vm.UpdateRelRedPlaza = UpdateRelRedPlaza;
        vm.UpdateRelRedEstado = UpdateRelRedEstado;
        vm.UpdateRelRedCiudad = UpdateRelRedCiudad;
        vm.UpdateRelRedLocalidad = UpdateRelRedLocalidad;
        vm.UpdateRelRedMedio = UpdateRelRedMedio;
        initData();

    });