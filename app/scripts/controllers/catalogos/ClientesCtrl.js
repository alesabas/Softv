'use strict';

angular
    .module('softvApp')
    .controller('ClientesCtrl', function(CatalogosFactory, $localStorage){

        function initData(){
            CatalogosFactory.GetPlazaList($localStorage.currentUser.idUsuario).then(function(data){
                vm.PlazaList = data.GetPlazaListResult;
            });

            CatalogosFactory.GetEstados_NewList().then(function(data){
                vm.EstadoList = data.GetEstados_NewListResult;
            });

            GetClienteList();
        }

        function GetClienteList(){
            var lstCliente = {};
            CatalogosFactory.GetClientesFiltosNew(lstCliente).then(function(data){
                vm.ClienteList = data.GetClientesFiltosNewResult.Entities;
                if (vm.ClienteList.length == 0) {
					vm.SinRegistros = true;
					vm.ConRegistros = false;
				} else {
					vm.SinRegistros = false;
					vm.ConRegistros = true;
				}
            });
        }

        function SearchContrato(){
            var lstCliente = {
                'ContratoCom': vm.Contrato
            };
            CatalogosFactory.GetClientesFiltosNew(lstCliente).then(function(data){
                vm.ClienteList = data.GetClientesFiltosNewResult.Entities;
                if (vm.ClienteList.length == 0) {
					vm.SinRegistros = true;
					vm.ConRegistros = false;
				} else {
					vm.SinRegistros = false;
					vm.ConRegistros = true;
				}
            });
        }

        function GetCiudadMunicipio(){
            if(vm.Estado != undefined){
                var RelEstMun = {
                    'clv_estado' : vm.Estado.Clv_Estado,
                    'idcompania' : vm.Plaza.id_compania
                };
                CatalogosFactory.GetMuestraCiudadesEstadoList(RelEstMun).then(function(data){
                    vm.CiudadMunicipioList = data.GetMuestraCiudadesEstadoListResult;
                });
            }else{
                vm.CiudadMunicipioList = null;
            }
            vm.LocalidadList = null;
            vm.ColoniaList = null;
            vm.CalleList = null;
        }

        function GetLocalidad(){
            if(vm.CiuMun != undefined){
                CatalogosFactory.GetMuestraLocalidadCiudadList(vm.CiuMun.Clv_Ciudad).then(function(data){
                    vm.LocalidadList = data.GetMuestraLocalidadCiudadListResult;
                });
            }else{
                vm.LocalidadList = null;
            }
            vm.ColoniaList = null;
            vm.CalleList = null;
        }

        function GetColonia(){
            if(vm.Localidad != undefined){
                CatalogosFactory.GetMuestraColoniaLocalidadList(vm.Localidad.Clv_Localidad).then(function(data){
                    vm.ColoniaList = data.GetMuestraColoniaLocalidadListResult;
                });
            }else{
                vm.ColoniaList = null;
            }
            vm.CalleList = null;
        }

        function GetCalle(){
            if(vm.Colonia != undefined){
                CatalogosFactory.GetMuestraCalleColoniaList(vm.Colonia.CLV_COLONIA).then(function(data){
                    vm.CalleList = data.GetMuestraCalleColoniaListResult;
                });
            }else{
                vm.CalleList = null;
            }
        }

        function SearchDireccion(){
            var lstCliente = {
                'Clv_Estado': vm.Estado.Clv_Estado,
                'Clv_Ciudad': vm.CiuMun.Clv_Ciudad,
                'Clv_Localidad': vm.Localidad.Clv_Localidad,
                'Clv_Colonia': vm.Colonia.CLV_COLONIA,
                'Clv_Calle': vm.Calle.Clv_Calle,
                'NUMERO': vm.Numero
            };
            CatalogosFactory.GetClientesFiltosNew(lstCliente).then(function(data){
                vm.ClienteList = data.GetClientesFiltosNewResult.Entities;
                if (vm.ClienteList.length == 0) {
					vm.SinRegistros = true;
					vm.ConRegistros = false;
				} else {
					vm.SinRegistros = false;
					vm.ConRegistros = true;
				}
            });
        }

        function SearchNombre(){
            var lstCliente = {
                'Nombre': vm.Nombre
            };
            CatalogosFactory.GetClientesFiltosNew(lstCliente).then(function(data){
                vm.ClienteList = data.GetClientesFiltosNewResult.Entities;
                if (vm.ClienteList.length == 0) {
					vm.SinRegistros = true;
					vm.ConRegistros = false;
				} else {
					vm.SinRegistros = false;
					vm.ConRegistros = true;
				}
            });
        }

        function SearchPlaza(){
            var lstCliente = {
                'IdCompania': vm.Plaza.id_compania
            };
            CatalogosFactory.GetClientesFiltosNew(lstCliente).then(function(data){
                vm.ClienteList = data.GetClientesFiltosNewResult.Entities;
                if (vm.ClienteList.length == 0) {
					vm.SinRegistros = true;
					vm.ConRegistros = false;
				} else {
					vm.SinRegistros = false;
					vm.ConRegistros = true;
				}
            });
        }

        var vm = this;
        vm.SearchContrato = SearchContrato;
        vm.GetCiudadMunicipio = GetCiudadMunicipio;
        vm.GetLocalidad = GetLocalidad;
        vm.GetColonia = GetColonia;
        vm.GetCalle = GetCalle;
        vm.SearchDireccion = SearchDireccion;
        vm.SearchNombre = SearchNombre;
        vm.SearchPlaza = SearchPlaza;
        initData();

    });