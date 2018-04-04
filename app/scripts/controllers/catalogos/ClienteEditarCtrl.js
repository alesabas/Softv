'use strict';

angular
    .module('softvApp')
    .controller('ClienteEditarCtrl', function(CatalogosFactory, DocVendedorClienteFactory, ngNotify, $uibModal, $state, $stateParams, $rootScope, $localStorage, $sce, globalService){

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
            CatalogosFactory.GetInfoTvs().then(function(data){
                vm.TvConPago = data.GetInfoTvsResult.TvConPago;
                vm.TvSinPago = data.GetInfoTvsResult.TvSinPago;
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
                                    GetDocumentos();
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
                vm.NombreCompleto = GetNombre(DatosCliente);
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
                    SaveMovimientoSistema('Se editó cliente', objCLIENTES_New);
                }else{
                    ngNotify.set('ERROR, al guardar datos personales.', 'warn');
                }
            });
        }

        function GetDateToday() {
            var F = new Date();
            var D = F.getDate();
            var M = F.getMonth();
            var Y = F.getFullYear();
            var ToDay = new Date(Y, M, D);
            return ToDay;
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
                if(DataObser.Obs != null){
                    vm.UpdateObs = true;
                    vm.Observaciones = DataObser.Obs;
                }else{
                    vm.UpdateObs = false;
                    vm.Observaciones = null;
                }
            });
            CatalogosFactory.GetDeepRoboDeSeñal_New(IdContrato).then(function(data){
                var DataNota = data.GetDeepRoboDeSeñal_NewResult;
                if(DataNota != null){
                    vm.Notas = DataNota.Descripcion;
                    vm.UpdateNota = true;
                }else{
                    vm.Notas = null;
                    vm.UpdateNota = false;
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
                        SaveMovimientoSistema('Se Agregó datos fiscales a cliente', objDatosFiscales);
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
                            SaveMovimientoSistema('Se agregó datos bancarios a cliente', objRELCLIBANCO);
                            GetDatosBancario(vm.IdContrato);
                        }else{
                            ngNotify.set('ERROR, al guardar datos bancarios.', 'warn');
                        }
                    });
                }else if(vm.UpdateDB == true){
                    CatalogosFactory.UpdateRELCLIBANCO(objRELCLIBANCO).then(function(data){
                        if(data.UpdateRELCLIBANCOResult == 1){
                            ngNotify.set('CORRECTO, se guardaron datos bancarios.', 'success');
                            SaveMovimientoSistema('Se agregó datos bancarios a cliente', objRELCLIBANCO);
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
                size: 'sm',
                resolve: {
                    IdContrato: function () {
                        return IdContrato;
                    }
                }
            });
            modalInstance.result.then(function () {
                GetReferenciasPersonales(vm.IdContrato);
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
                size: 'sm',
                resolve: {
                    ObjRefCliente: function () {
                        return ObjRefCliente;
                    }
                }
            });
            modalInstance.result.then(function () {
                GetReferenciasPersonales(vm.IdContrato);
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
            modalInstance.result.then(function () {
                GetReferenciasPersonales(vm.IdContrato);
            });
        }

        function AddObservaciones(){
            if(vm.UpdateObs == false){
                var objRELCLIENTEOBS = {
                    'Contrato': vm.IdContrato,
                    'Obs': vm.Observaciones
                };
                CatalogosFactory.AddRELCLIENTEOBS(objRELCLIENTEOBS).then(function(data){
                    ngNotify.set('CORRECTO, se guardó las observaciones.', 'success');
                    GetNotas(vm.IdContrato);
                });
            }else{
                var objRELCLIENTEOBS = {
                    'Contrato': vm.IdContrato,
                    'Obs': vm.Observaciones
                };
                CatalogosFactory.UpdateRELCLIENTEOBS(objRELCLIENTEOBS).then(function(data){
                    ngNotify.set('CORRECTO, se guardó las observaciones.', 'success');
                    GetNotas(vm.IdContrato);
                });
            }
        }

        function AddNotas(){
            if(vm.UpdateNota == false){
                var objRoboDeSeñal_New = {
                    'Contrato': vm.IdContrato,
                    'Descripcion': vm.Notas
                };
                CatalogosFactory.AddRoboDeSeñal_New(objRoboDeSeñal_New).then(function(data){
                    ngNotify.set('CORRECTO, se guardó las notas.', 'success');
                    GetNotas(vm.IdContrato);
                });
            }else{
                var objRoboDeSeñal_New = {
                    'Contrato': vm.IdContrato,
                    'Descripcion': vm.Notas
                };
                CatalogosFactory.UpdateRoboDeSeñal_New(objRoboDeSeñal_New).then(function(data){
                    ngNotify.set('CORRECTO, se guardó las notas.', 'success');
                    GetNotas(vm.IdContrato);
                });
            }
        }

        function GetServicios(IdContrato){
            CatalogosFactory.GetMuestraArbolServicios_ClientesList(IdContrato).then(function(data){
                vm.ServicioList = data.GetMuestraArbolServicios_ClientesListResult;
                vm.expandedNodes=[];
                angular.forEach(vm.ServicioList, function(value, key) {
                    vm.expandedNodes.push(value);
                });
                vm.ShowServicios = (vm.ServicioList.length > 0)? true : false;
                var CS = vm.ServicioList.length;
                var CA = 0;
                for(var i = 0; vm.ServicioList.length > i; i++){
                    CA = CA + vm.ServicioList[i].children.length;
                }
                vm.CT = CS + CA;
                vm.ShowServiciosE = (vm.CT >= 11)? 0 : 11 - vm.CT;
            });
        }

        function DetalleConcepto(ObjConcepto){
            if(ObjConcepto.Tipo == 'S' || ObjConcepto.Tipo == 'P'){
                vm.ConceptoTipo = ObjConcepto.Tipo;
                vm.DivServicio = true;
                vm.DivAparato = false;
                vm.ShowServiciosE = false;
                vm.TBtnSaveSP = (ObjConcepto.Tipo == 'S')? 'Guardar Detalle del Servicio':'Guardar Detalle del Paquete';
                vm.TBtnDeleteSP = (ObjConcepto.Tipo == 'S')? 'Eliminar Servicio':'Eliminar Paquete';
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
                    vm.FechaContratacion = (ServicioResult.fecha_solicitud != null)? toDate(ServicioResult.fecha_solicitud) : null;
                    vm.FechaContratacionP = (ServicioResult.fecha_solicitud != null)? toDate(ServicioResult.fecha_solicitud) : null;
                    vm.FechaInstalacion = (ServicioResult.fecha_instalacio != null)? toDate(ServicioResult.fecha_instalacio) : null;
                    vm.FechaSuspencion = (ServicioResult.fecha_suspension != null)? toDate(ServicioResult.fecha_suspension) : null;
                    vm.FechaBaja = (ServicioResult.fecha_baja != null)? toDate(ServicioResult.fecha_baja) : null;
                    vm.FechaFueraArea = (ServicioResult.fecha_Fuera_Area != null)? toDate(ServicioResult.fecha_Fuera_Area) : null;
                    vm.FechaUltimoPago = (ServicioResult.FECHA_ULT_PAGO != null)? toDate(ServicioResult.FECHA_ULT_PAGO) : null;
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
                    vm.ClvStatus = ServicioResult.status;
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
                        if(vm.StatusServicioList[i].Clv_StatusNet == vm.ClvStatus){
                            vm.StatusServicio = vm.StatusServicioList[i];
                        }
                    }
                    CatalogosFactory.GetDeepServicios_New(vm.Clv_Servicio).then(function(data){
                        var Clv_TipSer = data.GetDeepServicios_NewResult.Clv_TipSer;
                        vm.ShowTipServ1 = (data.GetDeepServicios_NewResult.Clv_TipSer == 1)? true : false;
                        vm.ShowBtnAddPaq = (Clv_TipSer == 3)? true : false;
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
                vm.ShowServiciosE = (vm.CT >= 11)? 0 : 11 - vm.CT;
                var ContratoNet = ObjConcepto.ContratoNet;
                vm.NombreAparato = ObjConcepto.Nombre;
                vm.DetalleAparato = ObjConcepto.Detalle;
                CatalogosFactory.GetClientesAparatoList(ContratoNet).then(function(data){
                    var AparatoResult = data.GetClientesAparatoListResult[0];
                    vm.ContratoNet = AparatoResult.ContratoNet;
                    vm.Clv_CableModem = AparatoResult.Clv_CableModem;
                    vm.ObservacionesAparatos = AparatoResult.Obs;
                    vm.FechaActivacionAparato = (AparatoResult.Fecha_Activacion != null)? toDate(AparatoResult.Fecha_Activacion) : null;
                    vm.FechaSuspencionAparato = (AparatoResult.Fecha_Suspension != null)? toDate(AparatoResult.Fecha_Suspension) : null;
                    vm.FechaBajaAparato = (AparatoResult.Fecha_Baja != null)? toDate(AparatoResult.Fecha_Baja) : null;
                    vm.Fecha_Traspaso = (AparatoResult.Fecha_Traspaso != null)? toDate(AparatoResult.Fecha_Traspaso) : null;
                    vm.SeRenta = (AparatoResult.SeRenta == true)? 'Y' : 'N';
                    vm.Clv_UsuarioAparato = AparatoResult.Clv_Usuario;
                    vm.NoCajaAparato = AparatoResult.NoCaja;
                    vm.Tipo_CablemodemAparato = AparatoResult.Tipo_Cablemodem;
                    vm.no_extensionesAparato = AparatoResult.no_extensiones;
                    vm.ventacablemodem1Aparato = AparatoResult.ventacablemodem1;
                    vm.ventacablemodem2Aparato = AparatoResult.ventacablemodem2;
                    vm.StatusA = AparatoResult.Status;
                    for(var i = 0; vm.StatusAparatoList.length > i; i ++){
                        if(vm.StatusAparatoList[i].Clv_StatusNet == vm.StatusA){
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
                'fecha_solicitud': (vm.FechaContratacion != null)? JToDate(vm.FechaContratacion) :'01/01/1900',
                'fecha_instalacio': (vm.FechaInstalacion != null)? JToDate(vm.FechaInstalacion) : '01/01/1900',
                'fecha_suspension': (vm.FechaSuspencion != null)? JToDate(vm.FechaSuspencion) : '01/01/1900',
                'fecha_baja': (vm.FechaBaja != null)? JToDate(vm.FechaBaja) : '01/01/1900',
                'fecha_Fuera_Area': (vm.FechaFueraArea != null)? JToDate(vm.FechaFueraArea) : '01/01/1900',
                'FECHA_ULT_PAGO': (vm.FechaUltimoPago != null)? JToDate(vm.FechaUltimoPago) : '01/01/1900',
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
                'TVCONPAGO':  vm.TVCONPAGOServicio,
                'IdMedio': vm.IdMedioServicio,
                'Clv_usuarioCapturo': (vm.Usuario != undefined)? vm.Usuario.Clave : vm.Clv_usuarioCapturo
            };
            CatalogosFactory.UpdateClientesServicio(objClientesServicio).then(function(data){
                var ObjConcepto = {
                    'Clv_UnicaNet': vm.Clv_UnicaNet,
                    'Nombre': vm.NombreServicio,
                    'Detalle': vm.DetalleServicio,
                    'Tipo': 'S',
                    'idMedio': vm.IdMedioServicio
                };
                if(data.UpdateClientesServicioResult == -1){
                    ngNotify.set('CORRECTO, se guardó detalle del servicio.', 'success');
                    DetalleConcepto(ObjConcepto);
                    GetServicios(vm.IdContrato);
                }else{
                    ngNotify.set('ERROR, al guardar detalle del servicio.', 'warn');
                    DetalleConcepto(ObjConcepto);
                    GetServicios(vm.IdContrato);
                }
            });
        }

        function UpdateAparatoCliente(){
            var objClientesAparato = {
                'ContratoNet': vm.ContratoNet,
                'Status': vm.StatusAparato.Clv_StatusNet,
                'Clv_CableModem': vm.Clv_CableModem,
                'Clv_Usuario': vm.Clv_UsuarioAparato,
                'Fecha_Activacion': (vm.FechaActivacionAparato != null)? JToDate(vm.FechaActivacionAparato) : '01/01/1900',
                'Fecha_Suspension': (vm.FechaSuspencionAparato != null)? JToDate(vm.FechaSuspencionAparato):'01/01/1900',
                'Fecha_Baja': (vm.FechaBajaAparato != null)? JToDate(vm.FechaBajaAparato):'01/01/1900',
                'Fecha_Traspaso': (vm.Fecha_Traspaso != null)? JToDate(vm.Fecha_Traspaso):'01/01/1900',
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
                    GetServicios(vm.IdContrato);
                }else{
                    ngNotify.set('ERROR, al guardar detalle del aparato.', 'warn');
                    DetalleConcepto(ObjConcepto);
                    GetServicios(vm.IdContrato);
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

        function DeleteServicioCliente(Clv_UnicaNet, ConceptoTipo){
            var Clv_UnicaNetD = (Clv_UnicaNet != null && Clv_UnicaNet != undefined)? Clv_UnicaNet:vm.Clv_UnicaNet;
            var ObjServDel = {
                'Clv_UnicaNetD': Clv_UnicaNetD,
                'ConceptoTipo': (ConceptoTipo != null && ConceptoTipo != undefined)? ConceptoTipo:vm.ConceptoTipo
            }
            CatalogosFactory.GetValidaPapoClienteServicio(Clv_UnicaNetD).then(function(data){
                var ToDay = GetDateToday();
                if(data.GetValidaPapoClienteServicioResult == 0 && vm.FechaContratacionP.getTime() == ToDay.getTime()){
                    OpenDeleteServicioCliente(ObjServDel);
                }else{
                    var MSJ = (vm.ConceptoTipo == 'S')? 'ERROR, solo se puede eliminar un servicio el mismo día que se contrató y/o que tenga ningún pago realizado.':'ERROR, solo se puede eliminar un paquete el mismo día que se contrató y/o que tenga ningún pago realizado.'
                    ngNotify.set(MSJ, 'warn');
                }
            });
        }

        function OpenDeleteServicioCliente(ObjServDel){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body', 
                templateUrl: 'views/catalogos/ModalServicioClienteDelete.html',
                controller: 'ModalServicioClienteDeleteCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                resolve: {
                    ObjServDel: function () {
                        return ObjServDel;
                    }
                }
            });
            modalInstance.result.then(function () {
                vm.DivServicio = false;
                vm.DivAparato = false;
                GetServicios(vm.IdContrato);
            });
        }

        function OpenAddPaqueteAdic(Clv_UnicaNet){
            var ObjPaqAdic = {
                'Clv_UnicaNet': (Clv_UnicaNet != null && Clv_UnicaNet != undefined)? Clv_UnicaNet:vm.Clv_UnicaNet,
                'IdContrato': vm.IdContrato
            };
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body', 
                templateUrl: 'views/catalogos/ModalPaqueteAdicForm.html',
                controller: 'ModalPaqueteAdicAddCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                resolve: {
                    ObjPaqAdic: function () {
                        return ObjPaqAdic;
                    }
                }
            });
            modalInstance.result.then(function (IdContrato) {
                GetServicios(IdContrato);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
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

        function GetDocumentos(){
            DocVendedorClienteFactory.GetValidaPerfilActivarChecksDocumentos(vm.tipoUsuario).then(function(data){
                vm.DisCbxDocumneto = (data.GetValidaPerfilActivarChecksDocumentosResult.desactivar == 1)? true:false;
                DocVendedorClienteFactory.GetDameDocumentos(vm.IdContrato).then(function(data){
                    vm.DocumentoList = data.GetDameDocumentosResult;
                    GetDocumentosCliente();
                });
            });
        }

        function GetDocumentosCliente(){
            DocVendedorClienteFactory.GetDameOpcionesDocumentos(vm.IdContrato).then(function(data){
                var OpcionDoc = data.GetDameOpcionesDocumentosResult;
                vm.Revisado = (OpcionDoc.cbRevisado == 1)? true:false;
                vm.Recibido = (OpcionDoc.cbRecibido == 1)? true:false;
                DocVendedorClienteFactory.GetDameDocumentosContrato(vm.IdContrato).then(function(data){
                    vm.DocumentoClienteList = data.GetDameDocumentosContratoResult;
                    vm.ViewDocClienteList = (vm.DocumentoClienteList.length > 0)? true:false;
                });
            });
        }

        function SaveDocumentoCliente(){
            vm.FileName = null;
            vm.TituloDoc = null;
            if(vm.Evidencia.type == "application/pdf"){
                if(vm.Evidencia.size <= 1000000){
                    var EvidenciaFD = new FormData();
                    EvidenciaFD.append('file', vm.Evidencia); 
                    EvidenciaFD.append('IdDocumento', vm.Documento.IdDocumento);
                    EvidenciaFD.append('contrato', vm.IdContrato);
                    DocVendedorClienteFactory.GetGuardaDocumentoPDF(EvidenciaFD).then(function(data){
                        ngNotify.set('CORRECTO, Correcto se guardó el documento para el cliente.', 'success');
                        GetDocumentosCliente();
                        ResetEvidencia();
                        SaveMovimientoSistema('Se agregó documento: ' + vm.Documento.Documento + ', a cliente', '');
                    });
                }else{
                    ngNotify.set('ERROR, el tamaño del archivo es invalido.', 'warn');
                }
            }else{
                ngNotify.set('ERROR, Formato invalido', 'warn');
            }
        }

        function GetDocumentoCliente(ObjDoc){
            var ObjDocumento = {
                'IdDocumento': ObjDoc.IdDocumento, 
                'contrato': vm.IdContrato
            };
            DocVendedorClienteFactory.GetDimeTipoDocumento(ObjDocumento).then(function(data){
                DocVendedorClienteFactory.GetDocumentoClienteWeb(ObjDocumento).then(function(data){
                    var Name = data.GetDocumentoClienteWebResult;
                    var FileName = globalService.getUrlReportes() + '/Images/' + Name;
                    vm.FileName = $sce.trustAsResourceUrl(FileName);
                    vm.TituloDoc = ObjDoc.Documento;
                });
            });
        }

        function SetRevisado(){
            var ObjRevisado = {
                'cbRevisado': (vm.Revisado == true)? 1:0,
                'contrato': vm.IdContrato,
                'idUsuario': $localStorage.currentUser.idUsuario
            };
            DocVendedorClienteFactory.GetModificaRevisado(ObjRevisado).then(function(data){
                GetDocumentosCliente();
            });
        }

        function SetRecibido(){
            var ObjRecibido = {
                'cbRecibido': (vm.Recibido == true)? 1:0,
                'contrato': vm.IdContrato,
                'idUsuario': $localStorage.currentUser.idUsuario
            };
            DocVendedorClienteFactory.GetModificaRecibido(ObjRecibido).then(function(data){
                GetDocumentosCliente();
            });
        }

        function GetNombre(Cli){
            var NC = '';
            if(Cli.SegundoNombre != null && Cli.Apellido_Materno != null){
                NC = Cli.Nombre + ' ' + Cli.SegundoNombre + ' ' + Cli.Apellido_Paterno + ' ' + Cli.Apellido_Materno;
            }else if(Cli.SegundoNombre == null && Cli.Apellido_Materno == null){
                NC = Cli.Nombre + ' ' + Cli.Apellido_Paterno;
            }else if(Cli.SegundoNombre != null && Cli.Apellido_Materno == null){
                NC = Cli.Nombre + ' ' + Cli.SegundoNombre + ' ' + Cli.Apellido_Paterno;
            }else if(Cli.SegundoNombre == null && Cli.Apellido_Materno != null){
                NC = Cli.Nombre + ' ' + Cli.Apellido_Paterno + ' ' + Cli.Apellido_Materno;
            }
            return NC;
        }

        function GetNumber(num){
            var res = [];
            for (var i = 0; i < num; i++) {
                res.push(i);
            }
            return res;
        }

        function ValidateStauts(){
            if(vm.StatusServicio.Clv_StatusNet != vm.ClvStatus){
                vm.DisFI = (vm.StatusServicio.Clv_StatusNet == 'I')? false : true;
                vm.DisFS = (vm.StatusServicio.Clv_StatusNet == 'S')? false : true;
                vm.DisFB = (vm.StatusServicio.Clv_StatusNet == 'B')? false : true;
                vm.DisFFA = (vm.StatusServicio.Clv_StatusNet == 'F')? false : true;
                
            }else{
                vm.DisFI = true;
                vm.DisFS = true;
                vm.DisFB = true;
                vm.DisFFA = true;
            }
        }

        function ValidateStautsAparato(){
            if(vm.StatusAparato.Clv_StatusNet != vm.StatusA){
                vm.DisFA_A = (vm.StatusAparato.Clv_StatusNet == 'I')? false : true;
                vm.DisFB_A = (vm.StatusAparato.Clv_StatusNet == 'B')? false : true;
            }else{
                vm.DisFA_A = true;
                vm.DisFB_A = true;
            }
        }

        function ResetEvidencia(){
            vm.Evidencia = null;
            vm.File = null;
            vm.TouchFile = false;
            angular.element("input[type='file']").val(null);
        }
        
        function SetTouch(){
            vm.TouchFile = true;
        }

        function SaveMovimientoSistema(Observaciones, Comando){
            var objMovSist = {
                'Clv_usuario': $localStorage.currentUser.idUsuario, 
                'Modulo': 'home.catalogos', 
                'Submodulo': 'home.catalogos.clientes', 
                'Observaciones': Observaciones, 
                'Usuario': $localStorage.currentUser.usuario, 
                'Comando': (Comando != '')? JSON.stringify(Comando):'', 
                'Clv_afectada': vm.IdContrato
            };
            CatalogosFactory.AddMovSist(objMovSist).then(function(data){
            });
        }
        
        var vm = this;
        vm.IdContrato = $stateParams.id;
        vm.Title = 'Editar Cliente - ';
        vm.SetForm = 1;
        vm.ShowAccord = true;
        vm.BlockInput = true;
        vm.DisableInput = false;
        vm.DivServicio = false;
        vm.DivAparato = false;
        vm.ShowServicios = false;
        vm.SinDescuento = true;
        vm.ConDescuento = false;
        vm.DisFC = true;
        vm.DisFI = true;
        vm.DisFS = true;
        vm.DisFB = true;
        vm.DisFFA = true;
        vm.DisFUP = true;
        vm.DisFA_A = true;
        vm.DisFB_A = true;
        vm.ShowTipServ1 = false;
        vm.View = false;
        vm.TouchFile = false;
        vm.TBtnSaveSP = '';
        vm.TBtnDeleteSP = '';
        vm.tipoUsuario = $localStorage.currentUser.tipoUsuario
        vm.clv_usuario = $localStorage.currentUser
        vm.ShowBtnAddPaq = false;
        vm.maskOptions = {
            maskDefinitions:{'A': /[a-zA-Z]/, '9': /[0-9]/, '*': /[a-zA-Z0-9]/},
            clearOnBlur: false,
            clearOnBlurPlaceholder: true,
            eventsToHandle:['input', 'keyup', 'click'],
            addDefaultPlaceholder: true,
            escChar: '\\',
            allowInvalidValue: false
        };
        vm.AddDatosPersonales = AddDatosPersonales;
        vm.GetCiudadMunicipio = GetCiudadMunicipio;
        vm.GetLocalidad = GetLocalidad;
        vm.GetColonia = GetColonia;
        vm.GetCalle = GetCalle;
        vm.ValidateFechaVen = ValidateFechaVen;
        vm.AddDatosFiscales = AddDatosFiscales;
        vm.AddDatosBancarios = AddDatosBancarios;
        vm.OpenAddRefPersonal = OpenAddRefPersonal;
        vm.OpenEditRefPersonal = OpenEditRefPersonal;
        vm.OpenDeleteRefPersonal = OpenDeleteRefPersonal;
        vm.AddObservaciones = AddObservaciones;
        vm.AddNotas = AddNotas;
        vm.DetalleConcepto = DetalleConcepto;
        vm.OpenAddServicioCliente = OpenAddServicioCliente;
        vm.UpdateServicioCliente = UpdateServicioCliente;
        vm.UpdateAparatoCliente = UpdateAparatoCliente;
        vm.AddDescuentoServicio = AddDescuentoServicio;
        vm.GetNumber = GetNumber;
        vm.ValidateStauts = ValidateStauts;
        vm.ValidateStautsAparato = ValidateStautsAparato;
        vm.ResetEvidencia = ResetEvidencia;
        vm.SetTouch = SetTouch;
        vm.SaveDocumentoCliente = SaveDocumentoCliente;
        vm.SetRevisado = SetRevisado;
        vm.SetRecibido = SetRecibido;
        vm.GetDocumentoCliente = GetDocumentoCliente;
        vm.DeleteServicioCliente = DeleteServicioCliente;
        vm.OpenAddPaqueteAdic = OpenAddPaqueteAdic;
        initData();
        
    });