'use strict';

angular
    .module('softvApp')
    .controller('ClienteEditarCtrl', function(CatalogosFactory, ngNotify, $uibModal, $state, $stateParams, $rootScope, $localStorage){

        function initData(){
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
                    "Contrato": vm.IdContrato,
                    "RAZON_SOCIAL" : vm.RazonSoc,
                    "RFC" : vm.RFC,
                    "CURP" : vm.CURP,
                    "PAIS" : vm.Pais,
                    "ESTADO_RS" : vm.EstadoDF,
                    "CIUDAD_RS" : vm.CiuMunDF,
                    "COLONIA_RS" : vm.ColoniaDF,
                    "CP_RS" : vm.CodigoPosDF,
                    "CALLE_RS" : vm.CalleDF,
                    "NUMERO_RS" : vm.NumExtDF,
                    "ENTRECALLES" : vm.EntCallesDF,
                    "TELEFONO_RS" : vm.TelefonoDF,
                    "FAX_RS" : vm.Fax,
                    "Email" : vm.EmailDF
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

        $rootScope.$on('LoadRefPersonal', function(e, IdContrato){
            GetReferenciasPersonales(IdContrato);
        });

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

        var vm = this;
        vm.IdContrato = $stateParams.id;
        vm.Title = 'Cliente editar - ' + vm.IdContrato;
        vm.ShowAccord = true;
        vm.BlockInput = true;
        vm.DisableInput = false;
        vm.ValidateRFC = /^[A-Z]{4}\d{6}[A-Z]{3}$|^[A-Z]{4}\d{6}\d{3}$|^[A-Z]{4}\d{6}[A-Z]{2}\d{1}$|^[A-Z]{4}\d{6}[A-Z]{1}\d{2}$|^[A-Z]{4}\d{6}\d{2}[A-Z]{1}$|^[A-Z]{4}\d{6}\d{1}[A-Z]{2}$|^[A-Z]{4}\d{6}\d{1}[A-Z]{1}\d{1}$|^[A-Z]{4}\d{6}[A-Z]{1}\d{1}[A-Z]{1}$/;
        vm.AddDatosPersonales = AddDatosPersonales;
        vm.GetCiudadMunicipio = GetCiudadMunicipio;
        vm.GetLocalidad = GetLocalidad;
        vm.GetColonia = GetColonia;
        vm.GetCalle = GetCalle;
        vm.ValidateFechaVen = ValidateFechaVen;
        vm.AddDatosFiscales = AddDatosFiscales;
        vm.AddDatosBancarios = AddDatosBancarios;
        vm.AddRefPersonales = AddRefPersonales;
        vm.OpenEditRefPersonal = OpenEditRefPersonal;
        vm.OpenDeleteRefPersonal = OpenDeleteRefPersonal;
        vm.AddNotas = AddNotas;
        initData();

    });