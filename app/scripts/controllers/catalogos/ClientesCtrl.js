'use strict';

angular
    .module('softvApp')
    .controller('ClientesCtrl', function(CatalogosFactory, $localStorage, $scope){

        function initData(){
            CatalogosFactory.GetPlazaList($localStorage.currentUser.idUsuario).then(function(data){
                vm.PlazaList = data.GetPlazaListResult;
                vm.Plaza = vm.PlazaList[0];
                GetEstadoList();
                GetClienteList(0);
            });
        }

        function GetEstadoList(){
            if(vm.Plaza != undefined && vm.Plaza != null){
                CatalogosFactory.GetEstadoByPlaza(vm.Plaza.id_compania).then(function(data){
                    var EstadoL = data.GetEstadoByPlazaResult;
                    angular.forEach(EstadoL, function(value, key) {
                        var EstadoS = {
                            'Clv_Estado': value.Clv_Estado,
                            'Nombre': value.Nombre
                        };
                        vm.EstadoList.push(EstadoS);
                    });
                    vm.Estado = vm.EstadoList[0];
                });
            }
        }

        function GetClienteList(Op){
            var lstCliente = {
                'ContratoCom': (vm.Contrato != undefined && vm.Contrato != null)? vm.Contrato:'',
                'Nombre': (vm.Nombre != undefined && vm.Nombre != null)? vm.Nombre:'',
                'Clv_Estado': (vm.Estado != undefined && vm.Estado != null)? vm.Estado.Clv_Estado:0,
                'Clv_Ciudad': (vm.CiuMun != undefined && vm.CiuMun != null)? vm.CiuMun.Clv_Ciudad:0,
                'Clv_Localidad': (vm.Localidad != undefined && vm.Localidad != null)? vm.Localidad.Clv_Localidad:0,
                'Clv_Colonia': (vm.Colonia != undefined && vm.Colonia != null)? vm.Colonia.CLV_COLONIA:0,
                'Clv_Calle': (vm.Calle != undefined && vm.Calle != null)? vm.Calle.Clv_Calle:0,
                'NUMERO': (vm.Numero != undefined && vm.Numero != null)? vm.Numero:'',
                'IdCompania': vm.Plaza.id_compania,
                'IdUsuario': $localStorage.currentUser.idUsuario,
                'Op': (vm.Estado.Clv_Estado == 0 && Op == 3)? 0:Op
            };
            CatalogosFactory.GetConsultaClientes_Filtros_List(lstCliente).then(function(data){
                vm.ClienteList = data.GetConsultaClientes_Filtros_ListResult;
                if (vm.ClienteList.length == 0) {
					vm.SinRegistros = true;
					vm.ConRegistros = false;
				} else {
					vm.SinRegistros = false;
					vm.ConRegistros = true;
                }
                Reset(Op);
            });
        }

        function GetCiudadMunicipio(){
            if(vm.Estado != undefined){
                CatalogosFactory.GetMuestraCdsEdo_RelColoniaList(vm.Estado.Clv_Estado).then(function(data){
                    vm.CiudadMunicipioList = data.GetMuestraCdsEdo_RelColoniaListResult;
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

        function Reset(){
            vm.Contrato = null;
            vm.Nombre = null;
            vm.Estado = vm.EstadoList[0];
            vm.CiudadMunicipioList = null;
            vm.LocalidadList = null;
            vm.ColoniaList = null;
            vm.CalleList = null;
            vm.Numero = null;
        }

        var vm = this;
        vm.EstadoList = [{
            'Clv_Estado': 0,
            'Nombre': 'Selecciona'
        }];
        vm.Estado = vm.EstadoList[0];
        vm.GetClienteList = GetClienteList;
        vm.GetEstadoList = GetEstadoList;
        vm.GetCiudadMunicipio = GetCiudadMunicipio;
        vm.GetLocalidad = GetLocalidad;
        vm.GetColonia = GetColonia;
        vm.GetCalle = GetCalle;
        initData();

    });