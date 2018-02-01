'use strict';

angular
    .module('softvApp')
    .controller('ClienteNuevoCtrl', function(CatalogosFactory, ngNotify, $uibModal, $rootScope, $state, $localStorage){

        function initData(){
            CatalogosFactory.GetPlazaList($localStorage.currentUser.idUsuario).then(function(data){
                vm.PlazaList = data.GetPlazaListResult;
            });

            CatalogosFactory.GetTipoClienteList_WebSoftvnew().then(function(data){
                vm.TipoCobroList = data.GetTipoClienteList_WebSoftvnewResult;
            });

            CatalogosFactory.GetBancoList().then(function(data){
                vm.BancoList = data.GetBancoListResult;
            });
        }

        function AddDatosPersonales(){
            var FechaNacD = vm.FechaNac.getDate();
            var FechaNacM = vm.FechaNac.getMonth() + 1;
            var FechaNacY = vm.FechaNac.getFullYear();
            var ObjCliente = {
                'Nombre': vm.Nombre, 
                'SegundoNombre': vm.NombreAdi,
                'Apellido_Paterno': vm.PrimerApe,
                'Apellido_Materno': vm.SegundoApe,
                'FechaNacimiento': FechaNacD + '/' + FechaNacM + '/' + FechaNacY,
                'EsFisica': (vm.TipoPersona == 'F') ? 1 : 0,
                'TELEFONO': vm.Telefono, 
                'CELULAR': vm.Celular, 
                'Email': vm.Email, 
                'ClaveElector': vm.ClaveElector, 
                'IdCompania': vm.Plaza.id_compania, 
                'Clv_Estado': vm.Estado.Clv_Estado, 
                'Clv_Ciudad': vm.CiuMun.Clv_Ciudad, 
                'Clv_Localidad': vm.Localidad.Clv_Localidad, 
                'Clv_Colonia': vm.Colonia.CLV_COLONIA, 
                'Clv_Calle': vm.Calle.Clv_Calle, 
                'ENTRECALLES': vm.EntCalles,
                'NUMERO': vm.NumExt, 
                'NumInt': vm.NumInt, 
                'CodigoPostal': vm.CodigoPos, 
                'IdUsuario': $localStorage.currentUser.idUsuario,
                'TipoCliente': vm.TipoCobro.CLV_TIPOCLIENTE
            };
            CatalogosFactory.GetCLIENTES_NewList(ObjCliente).then(function(data){
                vm.Cliente = data.GetCLIENTES_NewListResult;
                if(vm.Cliente.length == 1){
                    var IdCliente = vm.Cliente[0].CONTRATO;
                    var objRELCLIENTEOBS = {
                        'Contrato': IdCliente,
                        'Obs': vm.Observaciones
                    };
                    var objRoboDeSeñal_New = {
                        'Contrato': IdCliente,
                        'Descripcion': vm.Notas
                    };
                    CatalogosFactory.AddRELCLIENTEOBS(objRELCLIENTEOBS).then(function(data){
                        CatalogosFactory.AddRoboDeSeñal_New(objRoboDeSeñal_New).then(function(data){
                            var objMovSist = {
                                'Clv_usuario': $localStorage.currentUser.idUsuario, 
                                'Modulo': 'home.catalogos', 
                                'Submodulo': 'home.catalogos.cliente_nuevo', 
                                'Observaciones': 'Se registró nuevo cliente', 
                                'Usuario': $localStorage.currentUser.usuario, 
                                'Comando': JSON.stringify(ObjCliente), 
                                'Clv_afectada': IdCliente
                            };
                            CatalogosFactory.AddMovSist(objMovSist).then(function(data){
                                ngNotify.set('CORRECTO, se añadió un cliente nuevo.', 'success');
                                $state.go('home.catalogos.cliente_editar', { id:IdCliente });
                            });
                        });
                    });
                }else{
                    ngNotify.set('ERROR, al añadir un cliente nuevo.', 'warn');
                    $state.go('home.catalogos.clientes');
                }
            });
        }

        function GetEstado(){
            if(vm.Plaza != undefined){
                CatalogosFactory.GetMuestraEstadosCompaniaList(vm.Plaza.id_compania).then(function(data){
                    vm.EstadoList = data.GetMuestraEstadosCompaniaListResult;
                });
            }else{
                vm.EstadoList = null;
            }
            vm.CiudadMunicipioList = null;
            vm.LocalidadList = null;
            vm.ColoniaList = null;
            vm.CalleList = null;
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
                CatalogosFactory.GetmuestraCP_ColoniaLocalidadList(vm.Colonia.CLV_COLONIA).then(function(data){
                    vm.CodigoPos = data.GetmuestraCP_ColoniaLocalidadListResult[0].CodigoPostal;
                });
                CatalogosFactory.GetMuestraCalleColoniaList(vm.Colonia.CLV_COLONIA).then(function(data){
                    vm.CalleList = data.GetMuestraCalleColoniaListResult;
                });
            }else{
                vm.CalleList = null;
                vm.CodigoPos = null;
            }
        }

        function GetNumber(num){
            var res = [];
            for (var i = 0; i < num; i++) {
                res.push(i);
            }
            return res;
        }

        var vm = this;
        vm.ShowAccord = false;
        vm.BlockInput = false;
        vm.DisableInput = true;
        vm.ShowServiciosE = 8;
        vm.SetForm = 1;
        vm.TipoPersona = "F";
        vm.Title = 'Cliente Nuevo';
        vm.View = false;
        vm.maskOptions = {
            maskDefinitions:{'A': /[a-zA-Z]/, '9': /[0-9]/, '*': /[a-zA-Z0-9]/},
            clearOnBlur: false,
            eventsToHandle:['input', 'keyup', 'click']
        };
        vm.AddDatosPersonales = AddDatosPersonales;
        vm.GetEstado = GetEstado;
        vm.GetCiudadMunicipio = GetCiudadMunicipio;
        vm.GetLocalidad = GetLocalidad;
        vm.GetColonia = GetColonia;
        vm.GetCalle = GetCalle;
        vm.GetNumber = GetNumber;
        initData();
        
    });