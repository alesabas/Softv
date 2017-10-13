'use strict';

angular
    .module('softvApp')
    .controller('ClienteEditarCtrl', function(CatalogosFactory, ngNotify, $uibModal, $state, $stateParams, $rootScope, $localStorage){

        function initData(){
            CatalogosFactory.GetStatusNet().then(function(data){
                vm.StatusServicioList = data.GetStatusNetResult;
            });
            CatalogosFactory.GetStatusCableModem().then(function(data){
                vm.StatusAparatoList = data.GetStatusCableModemResult;
            });
            CatalogosFactory.GetMuestraPromotoresNet().then(function(data){
                vm.VendedorList = data.GetMuestraPromotoresNetResult;
            });
            CatalogosFactory.GetConsultaClientesList(vm.IdContrato).then(function(data){
                if(data.GetConsultaClientesListResult.length > 0){
                    CatalogosFactory.GetPlazaList($localStorage.currentUser.idUsuario).then(function(data){
                        vm.PlazaList = data.GetPlazaListResult;
                        CatalogosFactory.GetTipoClienteList_WebSoftvnew().then(function(data){
                            vm.TipoCobroList = data.GetTipoClienteList_WebSoftvnewResult;
                            CatalogosFactory.GetBancoList().then(function(data){
                                vm.BancoList = data.GetBancoListResult;
                                CatalogosFactory.GetMUESTRATIPOSDECUENTAList().then(function(data){
                                    vm.TipoCuentaList = data.GetMUESTRATIPOSDECUENTAListResult;
                                    GetDatosClientes(vm.IdContrato);
                                    GetDatosFiscal(vm.IdContrato);
                                    GetDatosBancario(vm.IdContrato);
                                    GetReferenciasPersonales(vm.IdContrato);
                                    GetNotas(vm.IdContrato);
                                    GetServicios(vm.IdContrato);
                                });
                            });
                        });
                    });
                }else{
                    ngNotify.set('ERROR, No se encontró el contrato seleccionado.', 'warn');
                    $state.go('home.catalogos.clientes');
                }
            });
        }

        function GetDatosClientes(IdContratoCliente){
            CatalogosFactory.GetConsultaClientesList(IdContratoCliente).then(function(data){
                var DatosCliente = data.GetConsultaClientesListResult[0];
                vm.CONTRATO = DatosCliente.CONTRATO;
                vm.IdCliente = DatosCliente.ContratoCom;
                vm.IdPlaza = DatosCliente.IdCompania;
                vm.IdPeriodo = DatosCliente.Clv_Periodo;
                vm.IdTipoCliente = DatosCliente.TipoCliente;
                vm.Nombre = DatosCliente.Nombre;
                vm.NombreAdi = DatosCliente.SegundoNombre;
                vm.PrimerApe = DatosCliente.Apellido_Paterno;
                vm.SegundoApe = DatosCliente.Apellido_Materno;
                vm.ClaveElector = DatosCliente.ClaveElector;
                vm.Telefono = DatosCliente.TELEFONO;
                vm.Celular = DatosCliente.CELULAR;
                vm.Email = DatosCliente.Email;
                vm.EsPersonaFisica = DatosCliente.EsFisica;
                vm.FechaNac = toDate(DatosCliente.FechaNacimiento);
                vm.IdEstado = DatosCliente.Clv_Estado;
                vm.IdMunicipio = DatosCliente.Clv_Ciudad;
                vm.IdLocalidad = DatosCliente.Clv_Localidad;
                vm.IdColonia = DatosCliente.Clv_Colonia;
                vm.IdCalle = DatosCliente.Clv_Calle;
                vm.EntCalles = DatosCliente.ENTRECALLES;
                vm.NumExt = DatosCliente.NUMERO;
                vm.NumInt = DatosCliente.NumInt;
                vm.CodigoPos = DatosCliente.CP;
                for (var b = 0; b < vm.TipoCobroList.length; b++) {
                    if(vm.TipoCobroList[b].CLV_TIPOCLIENTE == vm.IdTipoCliente) {
                        vm.TipoCobro = vm.TipoCobroList[b];
                        vm.NombreTipoCobro = vm.TipoCobroList[b].DESCRIPCION;
                    }
                }
                if(vm.EsPersonaFisica == true){
                    vm.TipoPersona = "F";
                }else if(vm.EsPersonaFisica == false){
                    vm.TipoPersona = "M";
                }
                for(var b = 0; b < vm.PlazaList.length; b++){
                    if(vm.PlazaList[b].id_compania == vm.IdPlaza){
                        vm.Plaza = vm.PlazaList[b];
                        vm.NombrePlaza = vm.PlazaList[b].razon_social;
                    }
                }
                CatalogosFactory.GetMuestraEstadosCompaniaList(vm.IdPlaza).then(function(data){
                    vm.EstadoList = data.GetMuestraEstadosCompaniaListResult;
                    for (var b = 0; b < vm.EstadoList.length; b++) {
                        if (vm.EstadoList[b].Clv_Estado == vm.IdEstado) {
                            vm.Estado = vm.EstadoList[b];
                            vm.NombreEstado = vm.EstadoList[b].Nombre;
                            GetCiudadMunicipio(vm.IdMunicipio);
                        }
                    }
                });

            });
        }

        function GetCiudadMunicipio(IdMunicipio){
            if(vm.Estado != undefined){
                var RelEstMun = {
                    'clv_estado' : vm.Estado.Clv_Estado,
                    'idcompania' : vm.Plaza.id_compania
                };
                CatalogosFactory.GetMuestraCiudadesEstadoList(RelEstMun).then(function(data){
                    vm.CiudadMunicipioList = data.GetMuestraCiudadesEstadoListResult;
                    if(IdMunicipio != undefined){
                        for (var b = 0; b < vm.CiudadMunicipioList.length; b++) {
                            if (vm.CiudadMunicipioList[b].Clv_Ciudad == IdMunicipio) {
                                vm.CiuMun = vm.CiudadMunicipioList[b];
                                vm.NombreCiuMun = vm.CiudadMunicipioList[b].Nombre;
                                GetLocalidad(vm.IdLocalidad);
                            }
                        }
                    }
                });
            }else{
                vm.CiudadMunicipioList = null;
            }
            vm.LocalidadList = null;
            vm.ColoniaList = null;
            vm.CalleList = null;
        }

        function GetLocalidad(IdLocalidad){
            if(vm.CiuMun != undefined){
                CatalogosFactory.GetMuestraLocalidadCiudadList(vm.CiuMun.Clv_Ciudad).then(function(data){
                    vm.LocalidadList = data.GetMuestraLocalidadCiudadListResult;
                    if(IdLocalidad != undefined){
                        for (var b = 0; b < vm.LocalidadList.length; b++) {
                            if (vm.LocalidadList[b].Clv_Localidad == vm.IdLocalidad) {
                                vm.Localidad = vm.LocalidadList[b];
                                vm.NombreLocalidad = vm.LocalidadList[b].NOMBRE;
                                GetColonia(vm.IdColonia);
                            }
                        }
                    }
                });
            }else{
                vm.LocalidadList = null;
            }
            vm.ColoniaList = null;
            vm.CalleList = null;
        }
        
        function GetColonia(IdColonia){
            if(vm.Localidad != undefined){
                CatalogosFactory.GetMuestraColoniaLocalidadList(vm.Localidad.Clv_Localidad).then(function(data){
                    vm.ColoniaList = data.GetMuestraColoniaLocalidadListResult;
                    if(IdColonia != undefined){
                        for (var b = 0; b < vm.ColoniaList.length; b++) {
                            if (vm.ColoniaList[b].CLV_COLONIA == IdColonia) {
                                vm.Colonia = vm.ColoniaList[b];
                                vm.NombreColonia = vm.ColoniaList[b].Nombre;
                                GetCalle(vm.IdCalle);
                            }
                        }
                    }
                });
            }else{
                vm.ColoniaList = null;
            }
            vm.CalleList = null;
        }

        function GetCalle(IdCalle){
            if(vm.Colonia != undefined){
                CatalogosFactory.GetMuestraCalleColoniaList(vm.Colonia.CLV_COLONIA).then(function(data){
                    vm.CalleList = data.GetMuestraCalleColoniaListResult;
                    if(IdCalle){
                        for (var b = 0; b < vm.CalleList.length; b++) {
                            if (vm.CalleList[b].Clv_Calle == IdCalle) {
                                vm.Calle = vm.CalleList[b];
                                vm.NombreCalle = vm.CalleList[b].Nombre;
                            }
                        }
                    }
                });
                CatalogosFactory.GetmuestraCP_ColoniaLocalidadList(vm.Colonia.CLV_COLONIA).then(function(data){
                    vm.CodigoPos = data.GetmuestraCP_ColoniaLocalidadListResult[0].CodigoPostal;
                });
            }else{
                vm.CalleList = null;
                vm.CodigoPos = null;
            }
        }

        function AddDatosPersonales(){
            var FechaNacD = vm.FechaNac.getDate();
            var FechaNacM = vm.FechaNac.getMonth() + 1;
            var FechaNacY = vm.FechaNac.getFullYear();
            var objCLIENTES_New = {
                'CONTRATO': vm.IdContrato,
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
            CatalogosFactory.UpdateCLIENTES_New(objCLIENTES_New).then(function(data){
                if(data.UpdateCLIENTES_NewResult == -1){
                    ngNotify.set('CORRECTO, se guardaron datos personales.', 'success');
                    GetDatosClientes(vm.IdContrato);
                }else{
                    ngNotify.set('ERROR, al guardar datos personales.', 'warn');
                }
            });
        }

        function toDate(dateStr) {
            var parts = dateStr.split("/");
            return new Date(parts[2], parts[1] - 1, parts[0]);
        }

        function JToDate(Fecha){
            var D = Fecha.getDate();
            var M = Fecha.getMonth() + 1;
            var FD = (String(D).length == 1)? '0'+D : D;
            var FM = (String(M).length == 1)? '0'+M : M;
            var FY = Fecha.getFullYear();
            var FDate =  String(FD) + '/' + String(FM) + '/' + String(FY);
            return FDate;
        }

        function ValidateFechaVen(dateStr) {
            if(dateStr != undefined){
                if(dateStr.length == 4){
                    var P1 = String(dateStr[0]) + String(dateStr[1]);
                    var P2 = String(dateStr[2]) + String(dateStr[3]);
                    if(parseInt(P1) <= 12 && parseInt(P1) > 0 && parseInt(P2) >= 17){
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }

        function GetDatosFiscal(IdContrato){
            CatalogosFactory.GetDatosFiscalesList(IdContrato).then(function(data){
                var DatosFiscales = data.GetDatosFiscalesListResult[0];
                vm.RazonSoc = DatosFiscales.RAZON_SOCIAL;
                vm.RFC = DatosFiscales.RFC;
                vm.CURP = DatosFiscales.CURP;
                vm.CalleDF = DatosFiscales.CALLE_RS;
                vm.NumExtDF = DatosFiscales.NUMERO_RS;
                vm.EntCallesDF = DatosFiscales.ENTRECALLES;
                vm.Pais = DatosFiscales.PAIS;
                vm.EstadoDF = DatosFiscales.ESTADO_RS;
                vm.CiuMunDF = DatosFiscales.CIUDAD_RS;
                vm.ColoniaDF = DatosFiscales.COLONIA_RS;
                vm.CodigoPosDF = DatosFiscales.CP_RS;
                vm.TelefonoDF = DatosFiscales.TELEFONO_RS;
                vm.Fax = DatosFiscales.FAX_RS;
                vm.EmailDF = DatosFiscales.Email;
            });
        }

        function GetDatosBancario(IdContrato){
            CatalogosFactory.GetRELCLIBANCOList(IdContrato).then(function(data){
                var DatosBancariosL = data.GetRELCLIBANCOListResult;
                if(DatosBancariosL.length > 0){
                    vm.UpdateDB = true;
                }else{
                    vm.UpdateDB = false;
                }
                var DatosBancarios = DatosBancariosL[0];
                var P1 = String(DatosBancarios.VENCIMIENTO[0]) + String(DatosBancarios.VENCIMIENTO[1]);
                var P2 = String(DatosBancarios.VENCIMIENTO[3]) + String(DatosBancarios.VENCIMIENTO[4]);
                var FechaVen = String(P1) + String(P2);
                vm.IdBanco = DatosBancarios.CLV_BANCO;
                vm.Titular = DatosBancarios.NOMBRE;
                vm.NumTarjeta = DatosBancarios.CUENTA_BANCO;
                vm.CodigoSeg = DatosBancarios.CODIGOSEGURIDAD;
                vm.NumTarjetaC = DatosBancarios.CUENTA_BANCO;
                vm.CodigoSegC = DatosBancarios.CODIGOSEGURIDAD;
                vm.FechaVen = FechaVen;
                vm.NombreTipoCuenta = DatosBancarios.TIPO_CUENTA;
                for(var b = 0; vm.TipoCuentaList.length > b; b++){
                    if(vm.TipoCuentaList[b].Nombre = vm.NombreTipoCuenta){
                        vm.TipoCuenta = vm.TipoCuentaList[b];
                    }
                }
                for (var b = 0; b < vm.BancoList.length; b++) {
                    if (vm.BancoList[b].IdBanco == vm.IdBanco) {
                        vm.Banco = vm.BancoList[b];
                    }
                }
            });
        }

        function GetReferenciasPersonales(IdContrato){
            var ObjRef = {
                'contrato': IdContrato,
                'tipo': 'C'
            };
            CatalogosFactory.GettblReferenciasClietesList(ObjRef).then(function(data){
                vm.RefPerList = data.GettblReferenciasClietesListResult;
                if (vm.RefPerList.length == 0) {
					vm.SinRegistros = true;
					vm.ConRegistros = false;
				} else {
					vm.SinRegistros = false;
					vm.ConRegistros = true;
				}
            });
        }

        function GetNotas(IdContrato){
            CatalogosFactory.GetDeepRELCLIENTEOBS(IdContrato).then(function(data){
                var DataObser = data.GetDeepRELCLIENTEOBSResult;
                vm.Observaciones = DataObser.Obs;
                if(DataObser.Obs != null){
                    vm.UpdateObs = true;
                }else{
                    vm.UpdateObs = false;
                }
            });

            CatalogosFactory.GetDeepRoboDeSeñal_New(IdContrato).then(function(data){
                var DataNota = data.GetDeepRoboDeSeñal_NewResult;
                if(DataNota != null){
                    vm.Notas = DataNota.Descripcion;
                    vm.UpdateNot = true;
                }else{
                    vm.UpdateNot = false;
                }
            });
        }

        function AddDatosFiscales(){
            if(vm.IdContrato != undefined){
                var objDatosFiscales = {
                    'Contrato': vm.IdContrato,
                    'RAZON_SOCIAL' : vm.RazonSoc,
                    'RFC' : vm.RFC,
                    'CURP' : vm.CURP,
                    'PAIS' : vm.Pais,
                    'ESTADO_RS' : vm.EstadoDF,
                    'CIUDAD_RS' : vm.CiuMunDF,
                    'COLONIA_RS' : vm.ColoniaDF,
                    'CP_RS' : vm.CodigoPosDF,
                    'CALLE_RS' : vm.CalleDF,
                    'NUMERO_RS' : vm.NumExtDF,
                    'ENTRECALLES' : vm.EntCallesDF,
                    'TELEFONO_RS' : vm.TelefonoDF,
                    'FAX_RS' : vm.Fax,
                    'Email' : vm.EmailDF
                };
                CatalogosFactory.AddDatosFiscales(objDatosFiscales).then(function(data){
                    var DatosFiscales = data.AddDatosFiscalesResult;
                    if(DatosFiscales == -1){
                        ngNotify.set('CORRECTO, se guardaron datos fiscales.', 'success');
                        GetDatosFiscal(vm.IdContrato);
                    }else{
                        ngNotify.set('ERROR, al guardar datos fiscales.', 'warn');
                    }
                });
            }else{
                ngNotify.set('Aun no se han registrado los datos personales.', 'warn');
            }
        }

        function AddDatosBancarios(){
            if(vm.IdContrato != undefined){
                var FechaVen = String(vm.FechaVen[0]) + String(vm.FechaVen[1]) + '/' + String(vm.FechaVen[2]) + String(vm.FechaVen[3]);
                var objRELCLIBANCO = {
                    'Contrato': vm.IdContrato,
                    'CLV_BANCO': vm.Banco.IdBanco,
                    'CUENTA_BANCO': vm.NumTarjeta,
                    'TIPO_CUENTA': vm.TipoCuenta.NOMBRE,
                    'VENCIMIENTO': FechaVen,
                    'CODIGOSEGURIDAD': vm.CodigoSeg,
                    'NOMBRE': vm.Titular
                };
                if(vm.UpdateDB == false){
                    CatalogosFactory.AddRELCLIBANCO(objRELCLIBANCO).then(function(data){
                        if(data.AddRELCLIBANCOResult == 1){
                            ngNotify.set('CORRECTO, se guardaron datos bancarios.', 'success');
                            GetDatosBancario(vm.IdContrato);
                        }else{
                            ngNotify.set('ERROR, al guardar datos bancarios.', 'warn');
                        }
                    });
                }else if(vm.UpdateDB == true){
                    CatalogosFactory.UpdateRELCLIBANCO(objRELCLIBANCO).then(function(data){
                        if(data.UpdateRELCLIBANCOResult == 1){
                            ngNotify.set('CORRECTO, se guardaron datos bancarios.', 'success');
                            GetDatosBancario(vm.IdContrato);
                        }else{
                            ngNotify.set('ERROR, al guardar datos bancarios.', 'warn');
                        }
                    });
                }

            }else{
                ngNotify.set('Aun no se han registrado los datos personales.', 'warn');
            }
        }

        function AddRefPersonales(){
            if(vm.IdContrato != undefined){
                var objtblReferenciasClietes = {
                    'contrato': vm.IdContrato,
                    'nombre': vm.NombreRef,
                    'direccion': vm.DireccionRef,
                    'email': vm.EmailRef,
                    'telefono': vm.TelefonoRef,
                    'id_referencia': 0,
                    'op': 0,
                    'tipo': 'C'
                };
                CatalogosFactory.AddtblReferenciasClietes(objtblReferenciasClietes).then(function(data){
                    if(data.AddtblReferenciasClietesResult == -1){
                        ngNotify.set('CORRECTO, se guardó la referencia personal.', 'success');
                        GetReferenciasPersonales(vm.IdContrato);
                    }else{
                        ngNotify.set('ERROR, al guardar la referencia personal.', 'warn');
                    }
                });
            }else{
                ngNotify.set('Aun no se han registrado los datos personales.', 'warn');
            }
        }

        function OpenAddRefPersonal(){
            var IdContrato = vm.IdContrato;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalEditarRefCliente.html',
                controller: 'ModalAddRefClienteCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'lg',
                resolve: {
                    IdContrato: function () {
                        return IdContrato;
                    }
                }
            });
        }

        function OpenEditRefPersonal(ObjRefCliente){
            var ObjRefCliente = ObjRefCliente;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalEditarRefCliente.html',
                controller: 'ModalEditarRefClienteCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'lg',
                resolve: {
                    ObjRefCliente: function () {
                        return ObjRefCliente;
                    }
                }
            });
        }

        function OpenDeleteRefPersonal(ObjRefCliente){
            var ObjRefCliente = ObjRefCliente;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalEliminarRefCliente.html',
                controller: 'ModalEliminarRefClienteCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                resolve: {
                    ObjRefCliente: function () {
                        return ObjRefCliente;
                    }
                }
            });
        }

        $rootScope.$on('LoadRefPersonal', function(e, IdContrato){
            GetReferenciasPersonales(IdContrato);
        });

        function AddNotas(){
             if(vm.IdContrato != undefined){
                var objRELCLIENTEOBS = {
                    'Contrato': vm.IdContrato,
                    'Obs': vm.Observaciones
                };
                var objRoboDeSeñal_New = {
                    'Contrato': vm.IdContrato,
                    'Descripcion': vm.Notas
                };
                if(vm.UpdateObs == false && vm.UpdateNot == false){
                   CatalogosFactory.AddRELCLIENTEOBS(objRELCLIENTEOBS).then(function(data){
                        if(data.AddRELCLIENTEOBSResult == -1){
                            CatalogosFactory.AddRoboDeSeñal_New(objRoboDeSeñal_New).then(function(data){
                                if(data.AddRoboDeSeñal_NewResult == -1){
                                    ngNotify.set('CORRECTO, se guardó observaciones y notas.', 'success');
                                    GetNotas(vm.IdContrato);;
                                }else{
                                    ngNotify.set('ERROR, al guardar observaciones y notas.', 'warn');
                                    GetNotas(vm.IdContrato);
                                }
                            });
                        }else{
                            ngNotify.set('ERROR, al guardar observaciones y notas.', 'warn');
                            GetNotas(vm.IdContrato);
                        }
                    });
                }else if(vm.UpdateObs == true && vm.UpdateNot == true){
                    CatalogosFactory.UpdateRELCLIENTEOBS(objRELCLIENTEOBS).then(function(data){
                        if(data.UpdateRELCLIENTEOBSResult == -1){
                            CatalogosFactory.UpdateRoboDeSeñal_New(objRoboDeSeñal_New).then(function(data){
                                if(data.UpdateRoboDeSeñal_NewResult == -1){
                                    ngNotify.set('CORRECTO, se guardó observaciones y notas.', 'success');
                                    GetNotas(vm.IdContrato);
                                }else{
                                    ngNotify.set('ERROR, al guardar observaciones y notas.', 'warn');
                                    GetNotas(vm.IdContrato);
                                }
                            });
                        }else{
                            ngNotify.set('ERROR, al guardar observaciones y notas.', 'warn');
                            GetNotas(vm.IdContrato);
                        }
                    });
                }
            }else{
                ngNotify.set('Aun no se han registrado los datos personales.', 'warn');
            }
        }

        function GetServicios(IdContrato){
            CatalogosFactory.GetMuestraArbolServicios_ClientesList(IdContrato).then(function(data){
                console.log(data);
                vm.ServicioList = data.GetMuestraArbolServicios_ClientesListResult;
                vm.expandedNodes=[];
                angular.forEach(vm.ServicioList, function(value, key) {
                    vm.expandedNodes.push(value);
                });
                vm.ShowServicios = (vm.ServicioList.length > 0)? true : false;
                var CS = vm.ServicioList.length;
                console.log('Total S:',CS);
                var CA = 0;
                for(var i = 0; vm.ServicioList.length > i; i++){
                    CA = CA + vm.ServicioList[i].children.length;
                }
                vm.CT = CS + CA;
                console.log('Total:',vm.CT);
                vm.ShowServiciosE = (vm.CT >= 8)? 0 : 8 - vm.CT;
                console.log(vm.ShowServiciosE);
            });
        }

        function DetalleConcepto(ObjConcepto){
            console.log(ObjConcepto);
            if(ObjConcepto.Tipo == 'S'){
                vm.DivServicio = true;
                vm.DivAparato = false;
                vm.ShowServiciosE = false;
                var Clv_UnicaNet = ObjConcepto.Clv_UnicaNet;
                var IdMedio = ObjConcepto.idMedio;
                vm.NombreServicio = ObjConcepto.Nombre;
                vm.DetalleServicio = ObjConcepto.Detalle;
                CatalogosFactory.GetClientesServicioList(Clv_UnicaNet).then(function(data){
                    var ServicioResult = data.GetClientesServicioListResult[0];
                    vm.Clv_UnicaNet = ServicioResult.Clv_UnicaNet;
                    vm.Clv_Servicio = ServicioResult.Clv_Servicio;
                    vm.Factura = ServicioResult.factura;
                    vm.ObservacionesServicio = ServicioResult.Obs;
                    vm.UltimoMesServicio = ServicioResult.ultimo_mes;
                    vm.UltimoAnioServicio = ServicioResult.ultimo_anio;
                    vm.FechaContratacion = toDate(ServicioResult.fecha_solicitud);
                    vm.FechaInstalacion = toDate(ServicioResult.fecha_instalacio);
                    vm.FechaSuspencion = toDate(ServicioResult.fecha_suspension);
                    vm.FechaBaja = toDate(ServicioResult.fecha_baja);
                    vm.FechaFueraArea = toDate(ServicioResult.fecha_Fuera_Area);
                    vm.FechaUltimoPago = toDate(ServicioResult.FECHA_ULT_PAGO);
                    vm.PrimerMen = (ServicioResult.PrimerMensualidad == true)? 'Y' : 'N';
                    vm.Cortesia = (ServicioResult.Cortesia == 1)? 'Y' : 'N';
                    vm.Clv_usuarioCapturo = ServicioResult.Clv_usuarioCapturo;
                    vm.AdicServicio = ServicioResult.Adic;
                    vm.CLV_MOTCANServicio = ServicioResult.CLV_MOTCAN;
                    vm.Clv_PromocionServicio = ServicioResult.Clv_Promocion;
                    vm.EmailServicio = ServicioResult.Email;
                    vm.GENERAOSINSTAServicio = ServicioResult.GENERAOSINSTA;
                    vm.IdMedioServicio = ServicioResult.IdMedio;
                    vm.TVCONPAGOServicio = ServicioResult.TVCONPAGO;
                    vm.TVSINPAGOServicio = ServicioResult.TVSINPAGO;
                    vm.facturaAntServicio = ServicioResult.facturaAnt;
                    vm.primerMesAntServicio = ServicioResult.primerMesAnt;
                    vm.statusAntServicio = ServicioResult.statusAnt;
                    var Status = ServicioResult.status;
                    var Vendedor = ServicioResult.Clv_Vendedor;
                    if(Vendedor > 0){
                        for(var i = 0; vm.VendedorList.length > i; i ++){
                            if(vm.VendedorList[i].Clv_Vendedor == Vendedor){
                                vm.Vendedor = vm.VendedorList[i];
                            }
                        }
                    }else{
                        vm.Vendedor = undefined;
                    }
                    for(var i = 0; vm.StatusServicioList.length > i; i ++){
                        if(vm.StatusServicioList[i].Clv_StatusNet == Status){
                            vm.StatusServicio = vm.StatusServicioList[i];
                        }
                    }
                    CatalogosFactory.GetDeepServicios_New(vm.Clv_Servicio).then(function(data){
                        var Clv_TipSer = data.GetDeepServicios_NewResult.Clv_TipSer;
                        var ObjUsuario = {
                            'CLV_UNICANET': vm.Clv_UnicaNet,
                            'tipo_serv': Clv_TipSer
                        };
                        CatalogosFactory.GetMuestra_Usuarios(ObjUsuario).then(function(data){
                            vm.UsuarioList = data.GetMuestra_UsuariosResult;
                            for(var i = 0; vm.UsuarioList.length > i; i ++){
                                if(vm.UsuarioList[i].Clave == vm.Clv_usuarioCapturo){
                                    vm.Usuario = vm.UsuarioList[i];
                                    CatalogosFactory.GetDeepMuestraMedios_New(IdMedio).then(function(data){
                                        var MedioResult = data.GetDeepMuestraMedios_NewResult
                                        vm.Medio = (MedioResult != null)? MedioResult.Descripcion : '';
                                        GetDescuentoServicio(Clv_TipSer);
                                    });
                                }
                            }
                        });
                    });
                });                
            }else if(ObjConcepto.Tipo == 'A'){
                vm.DivServicio = false;
                vm.DivAparato = true;
                vm.ShowServiciosE = (vm.CT >= 8)? 0 : 8 - vm.CT;
                var ContratoNet = ObjConcepto.ContratoNet;
                vm.NombreAparato = ObjConcepto.Nombre;
                vm.DetalleAparato = ObjConcepto.Detalle;
                CatalogosFactory.GetClientesAparatoList(ContratoNet).then(function(data){
                    var AparatoResult = data.GetClientesAparatoListResult[0];
                    vm.ContratoNet = AparatoResult.ContratoNet;
                    vm.Clv_CableModem = AparatoResult.Clv_CableModem;
                    vm.ObservacionesAparatos = AparatoResult.Obs;
                    vm.FechaActivacionAparato = toDate(AparatoResult.Fecha_Activacion);
                    vm.FechaSuspencionAparato = toDate(AparatoResult.Fecha_Suspension);
                    vm.FechaBajaAparato = toDate(AparatoResult.Fecha_Baja);
                    vm.Fecha_Traspaso = toDate(AparatoResult.Fecha_Traspaso);
                    vm.SeRenta = (AparatoResult.SeRenta == true)? 'Y' : 'N';
                    vm.Clv_UsuarioAparato = AparatoResult.Clv_Usuario;
                    vm.NoCajaAparato = AparatoResult.NoCaja;
                    vm.Tipo_CablemodemAparato = AparatoResult.Tipo_Cablemodem;
                    vm.no_extensionesAparato = AparatoResult.no_extensiones;
                    vm.ventacablemodem1Aparato = AparatoResult.ventacablemodem1;
                    vm.ventacablemodem2Aparato = AparatoResult.ventacablemodem2;
                    var Status = AparatoResult.Status;
                    for(var i = 0; vm.StatusAparatoList.length > i; i ++){
                        if(vm.StatusAparatoList[i].Clv_StatusNet == Status){
                            vm.StatusAparato = vm.StatusAparatoList[i];
                        }
                    }
                    CatalogosFactory.GetModeloAparato(vm.Clv_CableModem).then(function(data){
                        vm.ModeloAparato = data.GetModeloAparatoResult.Nombre;
                    });
                });
            }
        }

        function UpdateServicioCliente(){
            var objClientesServicio = {
                'Clv_UnicaNet': vm.Clv_UnicaNet,
                'Contrato': vm.IdContrato,
                'Clv_Servicio': vm.Clv_Servicio,
                'status': vm.StatusServicio.Clv_StatusNet,
                'fecha_solicitud': JToDate(vm.FechaContratacion),
                'fecha_instalacio': JToDate(vm.FechaInstalacion),
                'fecha_suspension': JToDate(vm.FechaSuspencion),
                'fecha_baja': JToDate(vm.FechaBaja),
                'fecha_Fuera_Area': JToDate(vm.FechaFueraArea),
                'FECHA_ULT_PAGO': JToDate(vm.FechaUltimoPago),
                'PrimerMensualidad': (vm.PrimerMen == 'Y')? 1:0,
                'ultimo_mes': vm.UltimoMesServicio,
                'ultimo_anio': vm.UltimoAnioServicio,
                'primerMesAnt': vm.primerMesAntServicio,
                'statusAnt': vm.statusAntServicio,
                'facturaAnt': vm.facturaAntServicio,
                'GENERAOSINSTA': vm.GENERAOSINSTAServicio,
                'factura': vm.Factura,
                'Clv_Vendedor': (vm.Vendedor != undefined)? vm.Vendedor.Clv_Vendedor:0,
                'Clv_Promocion': vm.Clv_PromocionServicio,
                'Email': vm.EmailServicio,
                'Obs': vm.ObservacionesServicio,
                'CLV_MOTCAN': vm.CLV_MOTCANServicio,
                'Cortesia': (vm.Cortesia == 'Y')? 1:0,
                'Adic': vm.AdicServicio,
                'TVSINPAGO': vm.TVSINPAGOServicio,
                'TVCONPAGO': vm.TVCONPAGOServicio,
                'IdMedio': vm.IdMedioServicio,
                'Clv_usuarioCapturo': vm.Usuario.Clave
            };
            CatalogosFactory.UpdateClientesServicio(objClientesServicio).then(function(data){
                var ObjConcepto = {
                    'Clv_UnicaNet': vm.Clv_UnicaNet,
                    'Nombre': vm.NombreServicio,
                    'Detalle': vm.DetalleServicio,
                    'Tipo': 'S'
                };
                if(data.UpdateClientesServicioResult == -1){
                    ngNotify.set('CORRECTO, se guardó detalle del servicio.', 'success');
                    DetalleConcepto(ObjConcepto);
                }else{
                    ngNotify.set('ERROR, al guardar detalle del servicio.', 'warn');
                    DetalleConcepto(ObjConcepto);
                }
            });
        }

        function UpdateAparatoCliente(){
            var objClientesAparato = {
                'ContratoNet': vm.ContratoNet,
                'Status': vm.StatusAparato.Clv_StatusNet,
                'Clv_CableModem': vm.Clv_CableModem,
                'Clv_Usuario': vm.Clv_UsuarioAparato,
                'Fecha_Activacion': JToDate(vm.FechaActivacionAparato),
                'Fecha_Suspension': (vm.FechaSuspencionAparato != undefined)? JToDate(vm.FechaSuspencionAparato):'01/01/1900',
                'Fecha_Baja': (vm.FechaBajaAparato != undefined)? JToDate(vm.FechaBajaAparato):'01/01/1900',
                'Fecha_Traspaso': (vm.Fecha_Traspaso != undefined)? JToDate(vm.Fecha_Traspaso):'01/01/1900',
                'Obs': vm.ObservacionesAparatos,
                'SeRenta': (vm.SeRenta == 'Y')? 1:0,
                'no_extensiones': vm.no_extensionesAparato,
                'NoCaja': vm.NoCajaAparato,
                'ventacablemodem1': vm.ventacablemodem1Aparato,
                'ventacablemodem2': vm.ventacablemodem2Aparato,
                'Tipo_Cablemodem': vm.Tipo_CablemodemAparato
            };
            CatalogosFactory.UpdateClientesAparato(objClientesAparato).then(function(data){
                var ObjConcepto = {
                    'ContratoNet': vm.ContratoNet,
                    'Nombre': vm.NombreAparato,
                    'Detalle': vm.DetalleAparato,
                    'Tipo': 'A'
                };
                if(data.UpdateClientesAparatoResult == -1){
                    ngNotify.set('CORRECTO, se guardó detalle del aparato.', 'success');
                    DetalleConcepto(ObjConcepto);
                }else{
                    ngNotify.set('ERROR, al guardar detalle del aparato.', 'warn');
                    DetalleConcepto(ObjConcepto);
                }
            });
        }

        $rootScope.$on('LoadServicioCliente', function(e, IdContrato){
            GetServicios(IdContrato);
        });

        function OpenAddServicioCliente(){
            var IdContrato = vm.IdContrato;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body', 
                templateUrl: 'views/catalogos/ModalServicioClienteForm.html',
                controller: 'ModalServicioClienteAddCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                resolve: {
                    IdContrato: function () {
                        return IdContrato;
                    }
                }
            });
        }

        $rootScope.$on('LoadDescuentoServicio', function(e, Clv_TipSer){
            GetDescuentoServicio(Clv_TipSer);
        });

        function GetDescuentoServicio(Clv_TipSer){
            var ObjRelDescuento = {
                "Clv_UnicaNet": vm.Clv_UnicaNet,
                "Clv_TipSer": Clv_TipSer
            };
            CatalogosFactory.GetConRelCteDescuento(ObjRelDescuento).then(function(data){
                var DescuentoServicio = data.GetConRelCteDescuentoResult;
                if(DescuentoServicio.Clv_TipServ != null && DescuentoServicio.Clv_UnicaNet != null){
                    vm.DescuentoServicio = DescuentoServicio.Descuento;
                    vm.ConDescuento = true;
                    vm.SinDescuento = false;
                }else{
                    vm.SinDescuento = true;
                    vm.ConDescuento = false;
                }
            });
        }

        function AddDescuentoServicio(){
            var Clv_UnicaNet = vm.Clv_UnicaNet;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body', 
                templateUrl: 'views/catalogos/ModalDescuentoServicioForm.html',
                controller: 'ModalDescuentoServicioCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                resolve: {
                    Clv_UnicaNet: function () {
                        return Clv_UnicaNet;
                    }
                }
            });
        }

        function GetNumber(num){
            var res = [];
            for (var i = 0; i < num; i++) {
                res.push(i);
            }
            return res;
        }
        
        var vm = this;
        vm.IdContrato = $stateParams.id;
        vm.Title = 'Cliente editar - ' + vm.IdContrato;
        vm.SetForm = 1;
        vm.ShowAccord = true;
        vm.BlockInput = true;
        vm.DisableInput = false;
        vm.DivServicio = false;
        vm.DivAparato = false;
        vm.ShowServicios = false;
        vm.SinDescuento = true;
        vm.ConDescuento = false;
        vm.ValidateRFC = /^[A-Z]{4}\d{6}[a-zA-Z]{3}$|^[A-Z]{4}\d{6}\d{3}$|^[A-Z]{4}\d{6}[A-Z]{2}\d{1}$|^[A-Z]{4}\d{6}[A-Z]{1}\d{2}$|^[A-Z]{4}\d{6}\d{2}[a-zA-Z]{1}$|^[A-Z]{4}\d{6}\d{1}[a-zA-Z]{2}$|^[A-Z]{4}\d{6}\d{1}[A-Z]{1}\d{1}$|^[A-Z]{4}\d{6}[A-Z]{1}\d{1}[a-zA-Z]{1}$/;
        vm.AddDatosPersonales = AddDatosPersonales;
        vm.GetCiudadMunicipio = GetCiudadMunicipio;
        vm.GetLocalidad = GetLocalidad;
        vm.GetColonia = GetColonia;
        vm.GetCalle = GetCalle;
        vm.ValidateFechaVen = ValidateFechaVen;
        vm.AddDatosFiscales = AddDatosFiscales;
        vm.AddDatosBancarios = AddDatosBancarios;
        //vm.AddRefPersonales = AddRefPersonales;
        vm.OpenAddRefPersonal = OpenAddRefPersonal;
        vm.OpenEditRefPersonal = OpenEditRefPersonal;
        vm.OpenDeleteRefPersonal = OpenDeleteRefPersonal;
        vm.AddNotas = AddNotas;
        vm.DetalleConcepto = DetalleConcepto;
        vm.OpenAddServicioCliente = OpenAddServicioCliente;
        vm.UpdateServicioCliente = UpdateServicioCliente;
        vm.UpdateAparatoCliente = UpdateAparatoCliente;
        vm.AddDescuentoServicio = AddDescuentoServicio;
        vm.GetNumber = GetNumber;
        initData();

    });