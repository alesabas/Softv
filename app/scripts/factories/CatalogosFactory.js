'use strict';

angular

  .module('softvApp')
  .factory('CatalogosFactory', function ($http, $q, globalService, $localStorage) {

    var factory = {};
    var paths = {
      GetTipoClienteList_WebSoftvnew: '/TipoCliente/GetTipoClienteList_WebSoftvnew',
      GetClientesFiltosNew: '/CLIENTES_New/GetClientesFiltosNew',
      GetCLIENTES_NewList: '/CLIENTES_New/GetCLIENTES_NewList',
      GetConsultaClientesList: '/CLIENTES_New/GetConsultaClientesList',
      GetMuestraCiudadesEstadoList: '/MuestraCiudadesEstado/GetMuestraCiudadesEstadoList',
      GetMuestraLocalidadCiudadList: '/MuestraLocalidadCiudad/GetMuestraLocalidadCiudadList',
      GetMuestraColoniaLocalidadList: '/MuestraColoniaLocalidad/GetMuestraColoniaLocalidadList',
      GetMuestraCalleColoniaList: '/MuestraCalleColonia/GetMuestraCalleColoniaList',
      UpdateClienteDPos: '/Cliente/UpdateClienteDPos',
      AddDatoFiscalCliente: '/Cliente/AddDatoFiscalCliente',
      GetDeepDatoFiscal: '/DatoFiscal/GetDeepDatoFiscal',
      AddDatosFiscales: '/DatosFiscales/AddDatosFiscales',
      GetDatosFiscalesList: '/DatosFiscales/GetDatosFiscalesList',
      GetBancoList: '/Banco/GetBancoList',
      GetMUESTRATIPOSDECUENTAList: '/MUESTRATIPOSDECUENTA/GetMUESTRATIPOSDECUENTAList',
      AddRELCLIBANCO: '/RELCLIBANCO/AddRELCLIBANCO',
      UpdateRELCLIBANCO: '/RELCLIBANCO/UpdateRELCLIBANCO',
      GetRELCLIBANCOList: '/RELCLIBANCO/GetRELCLIBANCOList',
      AddtblReferenciasClietes: '/tblReferenciasClietes/AddtblReferenciasClietes',
      UpdatetblReferenciasClietes: '/tblReferenciasClietes/UpdatetblReferenciasClietes',
      DeletetblReferenciasClietes: '/tblReferenciasClietes/DeletetblReferenciasClietes',
      GettblReferenciasClietesList: '/tblReferenciasClietes/GettblReferenciasClietesList',
      AddRELCLIENTEOBS: '/RELCLIENTEOBS/AddRELCLIENTEOBS',
      UpdateRELCLIENTEOBS: '/RELCLIENTEOBS/UpdateRELCLIENTEOBS',
      GetDeepRELCLIENTEOBS: '/RELCLIENTEOBS/GetDeepRELCLIENTEOBS',
      AddRoboDeSeñal_New: '/RoboDeSeñal_New/AddRoboDeSeñal_New',
      GetDeepRoboDeSeñal_New: '/RoboDeSeñal_New/GetDeepRoboDeSeñal_New',
      UpdateRoboDeSeñal_New: '/RoboDeSeñal_New/UpdateRoboDeSeñal_New',
      UpdateCLIENTES_New: '/CLIENTES_New/UpdateCLIENTES_New',
      GetEstados_NewList: '/Estados_New/GetEstados_NewList',
      GetMuestraEstadosCompaniaList: '/MuestraEstadosCompania/GetMuestraEstadosCompaniaList',
      GetValidaNomEdo: '/Estados_New/GetValidaNomEdo',
      AddEstados_New: '/Estados_New/AddEstados_New',
      GetDeepEstados_New: '/Estados_New/GetDeepEstados_New',
      UpdateEstados_New: '/Estados_New/UpdateEstados_New',
      DeleteEstados_New: '/Estados_New/DeleteEstados_New',
      GetBuscaCiudades: '/RelEstadoCiudad_New/GetBuscaCiudades',
      GetMuestraCiudadById: '/Ciudades_New/GetMuestraCiudadById',
      GetRelEstadoCiudad_NewList: '/RelEstadoCiudad_New/GetRelEstadoCiudad_NewList',
      DeleteRelEstadoCiudad_New: '/RelEstadoCiudad_New/DeleteRelEstadoCiudad_New',
      GetAddCiudades: '/Ciudades_New/GetAddCiudades',
      UpdateCiudades_New: '/Ciudades_New/UpdateCiudades_New',
      DeleteCiudades_New: '/Ciudades_New/DeleteCiudades_New',
      GetLocalidadList: '/Localidad/GetLocalidadList',
      AddRelLocalidadL: '/localidad/AddRelLocalidadL',
      GetDeepLocalidad: '/localidad/GetDeepLocalidad',
      UpdateRellocalidadL: '/localidad/UpdateRellocalidadL',
      DeleteLocalidad: '/Localidad/DeleteLocalidad',
      GetTipo_Colonias1_NewList: '/Tipo_Colonias1_New/GetTipo_Colonias1_NewList',
      AddTipo_Colonias1_New: '/Tipo_Colonias1_New/AddTipo_Colonias1_New',
      GetDeepTipo_Colonias1_New: '/Tipo_Colonias1_New/GetDeepTipo_Colonias1_New',
      UpdateTipo_Colonias1_New: '/Tipo_Colonias1_New/UpdateTipo_Colonias1_New',
      DeleteTipo_Colonias1_New: '/Tipo_Colonias1_New/DeleteTipo_Colonias1_New',
      GetCalleList: '/Calle/GetCalleList',
      AddCalleL: '/Calle/AddCalleL',
      GetDeepCalle: '/Calle/GetDeepCalle',
      UpdateCalleL: '/Calle/UpdateCalleL',
      DeleteCalle: '/Calle/DeleteCalle',
      GetDistribuidorList: '/Distribuidor/GetDistribuidorList',
      AddDistribuidor: '/Distribuidor/AddDistribuidor',
      GetDeepDistribuidor: '/Distribuidor/GetDeepDistribuidor',
      UpdateDistribuidor: '/Distribuidor/UpdateDistribuidor',
      DeleteDistribuidor: '/Distribuidor/DeleteDistribuidor',
      GetPlazaList: '/Plaza/GetPlazaList',
      AddPlazaL: '/Plaza/AddPlazaL',
      GetDeepPlaza: '/Plaza/GetDeepPlaza',
      UpdatePlazaL: '/Plaza/UpdatePlazaL',
      GetColoniaList: '/Colonia/GetColoniaList',
      AddColoniaL: '/Colonia/AddColoniaL',
      GetmuestraCP_ColoniaLocalidadList: '/muestraCP_ColoniaLocalidad/GetmuestraCP_ColoniaLocalidadList',
      GetTipServ_NewList: '/TipServ_New/GetTipServ_NewList',
      AddTipServ_New: '/TipServ_New/AddTipServ_New',
      GetDeepTipServ_New: '/TipServ_New/GetDeepTipServ_New',
      UpdateTipServ_New: '/TipServ_New/UpdateTipServ_New',
      DeleteTipServ_New: '/TipServ_New/DeleteTipServ_New',
      GetSucursalList: '/Sucursales/GetSUCURSALESList',
      GetSUCURSALES: '/SUCURSALES/GetSUCURSALES',
      AddSucursal: '/SUCURSALES/AddSUCURSALES',
      GetMUESTRASUCURSALES2: '/SUCURSALES/GetMUESTRASUCURSALES2',
      GetDeepSucursal: '/SUCURSALES/GetDeepSUCURSALES',
      UpdateSucursal: '/SUCURSALES/UpdateSUCURSALES',
      GetMuestraRelEdoCd: '/RelEstadoCiudad_New/GetMuestraRelEdoCd',
      AddRelEstadoCiudad_New: '/RelEstadoCiudad_New/AddRelEstadoCiudad_New',
      GetCatalogoCajasList: '/CatalogoCajas/GetCatalogoCajasList',
      AddCatalogoCajas: '/CatalogoCajas/AddCatalogoCajas',
      UpdateCatalogoCajas: '/CatalogoCajas/UpdateCatalogoCajas',
      GetDeepCatalogoCajas: '/CatalogoCajas/GetDeepCatalogoCajas',
      GetMuestraTipSerPrincipal_SERList: '/MuestraTipSerPrincipal_SER/GetMuestraTipSerPrincipal_SERList',
      AddServicios_New: '/Servicios_New/AddServicios_New',
      DeleteBORRel_Trabajos_NoCobroMensual: '/BORRel_Trabajos_NoCobroMensual/DeleteBORRel_Trabajos_NoCobroMensual',
      AddValidaAplicaSoloInternet: '/ValidaAplicaSoloInternet/AddValidaAplicaSoloInternet',
      AddNueAplicaSoloInternet: '/NueAplicaSoloInternet/AddNueAplicaSoloInternet',
      DeleteBorAplicaSoloInternet: '/BorAplicaSoloInternet/DeleteBorAplicaSoloInternet',
      UpdateServicios_New: '/Servicios_New/UpdateServicios_New',
      GetMUESTRATRABAJOS_NewList: '/MUESTRATRABAJOS_New/GetMUESTRATRABAJOS_NewList',
      UpdateGUARDARel_Trabajos_NoCobroMensual: '/GUARDARel_Trabajos_NoCobroMensual/UpdateGUARDARel_Trabajos_NoCobroMensual',
      GetDeepValidaCambioDClvtxtServ: '/ValidaCambioDClvtxtServ/GetDeepValidaCambioDClvtxtServ',
      GetDeepValida_borra_servicio_New: '/Valida_borra_servicio_New/GetDeepValida_borra_servicio_New',
      DeleteServicios_New: '/Servicios_New/DeleteServicios_New',
      UpdateNUEVOClv_Equi: '/NUEVOClv_Equi/UpdateNUEVOClv_Equi',
      GetMUESTRASOLOTARIFADOSList: '/MUESTRASOLOTARIFADOS/GetMUESTRASOLOTARIFADOSList',
      GetDeepServicios_New: '/Servicios_New/GetDeepServicios_New',
      GetMuestra_Plazas_ConfiguracionServiciosList: '/Muestra_Plazas_ConfiguracionServicios/GetMuestra_Plazas_ConfiguracionServiciosList',
      GetDameRelCompaniaEstadoCiudadList: '/DameRelCompaniaEstadoCiudad/GetDameRelCompaniaEstadoCiudadList',
      GetDameServiciosRelComEdoCd_PorServicio1_NewList: '/DameServiciosRelComEdoCd_PorServicio1_New/GetDameServiciosRelComEdoCd_PorServicio1_NewList',
      GetDameServiciosRelComEdoCd_PorServicio2_NewList: '/DameServiciosRelComEdoCd_PorServicio1_New/GetDameServiciosRelComEdoCd_PorServicio2_NewList',
      AddinsertaServiciosRelCompaniaEstadoCiudad: '/insertaServiciosRelCompaniaEstadoCiudad/AddinsertaServiciosRelCompaniaEstadoCiudad',
      DeleteinsertaServiciosRelCompaniaEstadoCiudad: '/insertaServiciosRelCompaniaEstadoCiudad/DeleteinsertaServiciosRelCompaniaEstadoCiudad',
      AddinsertaServiciosRelCompaniaEstadoCiudadATodos: '/insertaServiciosRelCompaniaEstadoCiudadATodos/AddinsertaServiciosRelCompaniaEstadoCiudadATodos',
      DeleteinsertaServiciosRelCompaniaEstadoCiudadATodos: '/insertaServiciosRelCompaniaEstadoCiudadATodos/DeleteinsertaServiciosRelCompaniaEstadoCiudadATodos',
      GetREL_TARIFADOS_SERVICIOS_NewList: '/REL_TARIFADOS_SERVICIOS_New/GetREL_TARIFADOS_SERVICIOS_NewList',
      GetMuestraTipoPromocionList: '/MuestraTipoPromocion/GetMuestraTipoPromocionList',
      AddValidaPeriodos: '/ValidaPeriodos/AddValidaPeriodos',
      AddREL_TARIFADOS_SERVICIOS_New: '/REL_TARIFADOS_SERVICIOS_New/AddREL_TARIFADOS_SERVICIOS_New',
      AddREL_TARIFADOS_SERVICIOSAll_New: '/REL_TARIFADOS_SERVICIOS_New/AddREL_TARIFADOS_SERVICIOSAll_New',
      AddRelTarifadosServiciosCostoPorCaja_New: '/RelTarifadosServiciosCostoPorCaja_New/AddRelTarifadosServiciosCostoPorCaja_New',
      GetDeepValidaEliminaClvLlave: '/ValidaEliminaClvLlave/GetDeepValidaEliminaClvLlave',
      DeleteREL_TARIFADOS_SERVICIOS_New: '/REL_TARIFADOS_SERVICIOS_New/DeleteREL_TARIFADOS_SERVICIOS_New',
      GetServicios_NewList: '/Servicios_New/GetServicios_NewList',
      UpdateREL_TARIFADOS_SERVICIOS_New: '/REL_TARIFADOS_SERVICIOS_New/UpdateREL_TARIFADOS_SERVICIOS_New',
      GetDeepREL_TARIFADOS_SERVICIOS_New: '/REL_TARIFADOS_SERVICIOS_New/GetDeepREL_TARIFADOS_SERVICIOS_New',
      GetDeepRelTarifadosServiciosCostoPorCaja_New: '/RelTarifadosServiciosCostoPorCaja_New/GetDeepRelTarifadosServiciosCostoPorCaja_New',
      UpdateREL_TARIFADOS_SERVICIOSAll_New: '/REL_TARIFADOS_SERVICIOS_New/UpdateREL_TARIFADOS_SERVICIOSAll_New',
      AddNUEPuntos_Pago_Adelantado: '/NUEPuntos_Pago_Adelantado/AddNUEPuntos_Pago_Adelantado',
      GetBUSCAPuntos_Pago_Adelantado: '/NUEPuntos_Pago_Adelantado/GetBUSCAPuntos_Pago_Adelantado',
      GetLocalidades_NewList: '/Localidades_New/GetLocalidades_NewList',
      UpdateModRentaAparato: '/ModRentaAparato/UpdateModRentaAparato',
      GetActualiza_InstalacionList: '/Actualiza_Instalacion/GetActualiza_InstalacionList',
      AddValidaNombreLocalidad: '/ValidaNombreLocalidad/AddValidaNombreLocalidad',
      AddLocalidades_New: '/Localidades_New/AddLocalidades_New',
      GetDeepLocalidades_New: '/Localidades_New/GetDeepLocalidades_New',
      UpdateLocalidades_New: '/Localidades_New/UpdateLocalidades_New',
      DeleteLocalidades_New: '/Localidades_New/DeleteLocalidades_New',
      AddSPRelCiudadLocalidad: '/SPRelCiudadLocalidad/AddSPRelCiudadLocalidad',
      GetRelCiudadLocalidadList: '/SPRelCiudadLocalidad/GetRelCiudadLocalidadList',
      DeleteSPRelCiudadLocalidad: '/SPRelCiudadLocalidad/DeleteSPRelCiudadLocalidad',
      GetDeepValidaEliminaRelLocalidadCiudad: '/ValidaEliminaRelLocalidadCiudad/GetDeepValidaEliminaRelLocalidadCiudad',
      GetColonias_NewList: '/Colonias_New/GetColonias_NewList',
      AddValidaNombreColonia: '/ValidaNombreColonia/AddValidaNombreColonia',
      AddColonias_New: '/Colonias_New/AddColonias_New',
      GetMuestraEstados_RelColList: '/MuestraEstados_RelCol/GetMuestraEstados_RelColList',
      GetMuestraCdsEdo_RelColoniaList: '/MuestraCdsEdo_RelColonia/GetMuestraCdsEdo_RelColoniaList',
      GetMuestraLoc_RelColoniaList: '/MuestraLoc_RelColonia/GetMuestraLoc_RelColoniaList',
      AddInsertaRelColoniaLocalidad: '/InsertaRelColoniaLocalidad/AddInsertaRelColoniaLocalidad'
    };

    factory.AddSucursal = function (SUCURSALESobj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objSUCURSALES': SUCURSALESobj
      };
      $http.post(globalService.getUrl() + paths.AddSucursal, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDeepSucursal = function (Clv_Sucursal) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'clv_sucursal': Clv_Sucursal
      };
      $http.post(globalService.getUrl() + paths.GetDeepSucursal, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.UpdateSucursal = function (objSUCURSALES) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objSUCURSALES': objSUCURSALES
      };
      $http.post(globalService.getUrl() + paths.UpdateSucursal, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GetSUCURSALES = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Sucursal': obj.Clv_Sucursal,
        'Nombre': obj.Nombre,
        'OP': obj.OP,
        'idcompania': obj.idcompania,
        'clv_usuario': $localStorage.currentUser.idUsuario
      };
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.GetSUCURSALES, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };



    factory.GetCatalogoCajasList = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clave': obj.Clave,
        'Descripcion': obj.Descripcion,
        'OP': obj.OP,
        'idcompania': obj.idcompania,
        'clv_usuario': $localStorage.currentUser.idUsuario
      };
      $http.post(globalService.getUrl() + paths.GetCatalogoCajasList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDeepCatalogoCajas = function (Clave) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clave': Clave
      };
      $http.post(globalService.getUrl() + paths.GetDeepCatalogoCajas, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };




    factory.UpdateCatalogoCajas = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objCatalogoCajas': {
          'Clave': obj.Clave,
          'Clv_sucursal': obj.Clv_sucursal,
          'IpMaquina': obj.IpMaquina,
          'Descripcion': obj.Descripcion,
          'ImprimeTickets': obj.ImprimeTickets,
          'facnormal': obj.facnormal,
          'facticket': obj.facticket,
          'impresoratermica': obj.impresoratermica
        }
      };
      $http.post(globalService.getUrl() + paths.UpdateCatalogoCajas, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddCatalogoCajas = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objCatalogoCajas': {
          'Clave': 0,
          'Clv_sucursal': obj.Clv_sucursal,
          'IpMaquina': obj.IpMaquina,
          'Descripcion': obj.Descripcion,
          'ImprimeTickets': obj.ImprimeTickets,
          'facnormal': obj.facnormal,
          'facticket': obj.facticket,
          'impresoratermica': obj.impresoratermica
        }
      };
      $http.post(globalService.getUrl() + paths.AddCatalogoCajas, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetPlazaList = function (IdUsuario) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'IdUsuario': IdUsuario
      };
      $http.post(globalService.getUrl() + paths.GetPlazaList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetTipoClienteList_WebSoftvnew = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetTipoClienteList_WebSoftvnew, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetCLIENTES_NewList = function (ObjCliente) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = ObjCliente;
      $http.post(globalService.getUrl() + paths.GetCLIENTES_NewList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetConsultaClientesList = function (CONTRATO) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'CONTRATO': CONTRATO
      };
      $http.post(globalService.getUrl() + paths.GetConsultaClientesList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetEstados_NewList = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'opcion': 0,
        'Nombre': ''
      };
      $http.post(globalService.getUrl() + paths.GetEstados_NewList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMuestraCiudadesEstadoList = function (RelEstMun) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = RelEstMun;
      $http.post(globalService.getUrl() + paths.GetMuestraCiudadesEstadoList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMuestraLocalidadCiudadList = function (clv_ciudad) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'clv_ciudad': clv_ciudad
      };
      $http.post(globalService.getUrl() + paths.GetMuestraLocalidadCiudadList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMuestraColoniaLocalidadList = function (clv_localidad) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'clv_localidad': clv_localidad
      };
      $http.post(globalService.getUrl() + paths.GetMuestraColoniaLocalidadList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetmuestraCP_ColoniaLocalidadList = function (Clv_Colonia) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Colonia': Clv_Colonia
      };
      $http.post(globalService.getUrl() + paths.GetmuestraCP_ColoniaLocalidadList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMuestraCalleColoniaList = function (clv_colonia) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'clv_colonia': clv_colonia
      };
      $http.post(globalService.getUrl() + paths.GetMuestraCalleColoniaList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddDatosFiscales = function (objDatosFiscales) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objDatosFiscales': objDatosFiscales
      };
      $http.post(globalService.getUrl() + paths.AddDatosFiscales, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDatosFiscalesList = function (Contrato) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Contrato': Contrato
      };
      $http.post(globalService.getUrl() + paths.GetDatosFiscalesList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetBancoList = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetBancoList, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMUESTRATIPOSDECUENTAList = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetMUESTRATIPOSDECUENTAList, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddRELCLIBANCO = function (objRELCLIBANCO) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objRELCLIBANCO': objRELCLIBANCO
      };
      $http.post(globalService.getUrl() + paths.AddRELCLIBANCO, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.UpdateRELCLIBANCO = function (objRELCLIBANCO) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objRELCLIBANCO': objRELCLIBANCO
      };
      $http.post(globalService.getUrl() + paths.UpdateRELCLIBANCO, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetRELCLIBANCOList = function (Contrato) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Contrato': Contrato
      };
      $http.post(globalService.getUrl() + paths.GetRELCLIBANCOList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddtblReferenciasClietes = function (objtblReferenciasClietes) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objtblReferenciasClietes': objtblReferenciasClietes
      };
      $http.post(globalService.getUrl() + paths.AddtblReferenciasClietes, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.UpdatetblReferenciasClietes = function (objtblReferenciasClietes) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objtblReferenciasClietes': objtblReferenciasClietes
      };
      $http.post(globalService.getUrl() + paths.UpdatetblReferenciasClietes, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GettblReferenciasClietesList = function (ObjRef) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = ObjRef;
      $http.post(globalService.getUrl() + paths.GettblReferenciasClietesList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.DeletetblReferenciasClietes = function (id_referencia) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'id_referencia': id_referencia
      };
      $http.post(globalService.getUrl() + paths.DeletetblReferenciasClietes, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddRELCLIENTEOBS = function (objRELCLIENTEOBS) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        objRELCLIENTEOBS: objRELCLIENTEOBS
      };
      $http.post(globalService.getUrl() + paths.AddRELCLIENTEOBS, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.UpdateRELCLIENTEOBS = function (objRELCLIENTEOBS) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        objRELCLIENTEOBS: objRELCLIENTEOBS
      };
      $http.post(globalService.getUrl() + paths.UpdateRELCLIENTEOBS, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddRoboDeSeñal_New = function (objRoboDeSeñal_New) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        objRoboDeSeñal_New: objRoboDeSeñal_New
      };
      $http.post(globalService.getUrl() + paths.AddRoboDeSeñal_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.UpdateRoboDeSeñal_New = function (objRoboDeSeñal_New) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        objRoboDeSeñal_New: objRoboDeSeñal_New
      };
      $http.post(globalService.getUrl() + paths.UpdateRoboDeSeñal_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDeepRELCLIENTEOBS = function (Contrato) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Contrato': Contrato
      };
      $http.post(globalService.getUrl() + paths.GetDeepRELCLIENTEOBS, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDeepRoboDeSeñal_New = function (Contrato) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Contrato': Contrato
      };
      $http.post(globalService.getUrl() + paths.GetDeepRoboDeSeñal_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetClientesFiltosNew = function (lstCliente) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'lstCliente': lstCliente
      };
      $http.post(globalService.getUrl() + paths.GetClientesFiltosNew, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.UpdateCLIENTES_New = function (objCLIENTES_New) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objCLIENTES_New': objCLIENTES_New
      };
      $http.post(globalService.getUrl() + paths.UpdateCLIENTES_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMuestraEstadosCompaniaList = function (idcompania) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'idcompania': idcompania
      };
      $http.post(globalService.getUrl() + paths.GetMuestraEstadosCompaniaList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddEstados_New = function (objEstados_New) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objEstados_New': objEstados_New
      };
      $http.post(globalService.getUrl() + paths.AddEstados_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetValidaNomEdo = function (ObjEstado) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = ObjEstado;
      $http.post(globalService.getUrl() + paths.GetValidaNomEdo, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDeepEstados_New = function (Clv_Estado) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Estado': Clv_Estado
      };
      $http.post(globalService.getUrl() + paths.GetDeepEstados_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.UpdateEstados_New = function (objEstados_New) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objEstados_New': objEstados_New
      };
      $http.post(globalService.getUrl() + paths.UpdateEstados_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.DeleteEstados_New = function (objEstado) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = objEstado;
      $http.post(globalService.getUrl() + paths.DeleteEstados_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GetBuscaCiudades = function (ObjCiudad) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = ObjCiudad;
      $http.post(globalService.getUrl() + paths.GetBuscaCiudades, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMuestraCiudadById = function (Clv_Ciudad) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Ciudad': Clv_Ciudad
      };
      $http.post(globalService.getUrl() + paths.GetMuestraCiudadById, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetRelEstadoCiudad_NewList = function (Clv_Ciudad) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Ciudad': Clv_Ciudad
      };
      $http.post(globalService.getUrl() + paths.GetRelEstadoCiudad_NewList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMuestraRelEdoCd = function (ObjMunicipio) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = ObjMunicipio;
      $http.post(globalService.getUrl() + paths.GetMuestraRelEdoCd, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddRelEstadoCiudad_New = function (objRelEstadoCiudad_New) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objRelEstadoCiudad_New': objRelEstadoCiudad_New
      };
      $http.post(globalService.getUrl() + paths.AddRelEstadoCiudad_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.DeleteRelEstadoCiudad_New = function (ObjMunicipio) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = ObjMunicipio;
      $http.post(globalService.getUrl() + paths.DeleteRelEstadoCiudad_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetAddCiudades = function (ObjCiudad) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = ObjCiudad;
      $http.post(globalService.getUrl() + paths.GetAddCiudades, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.UpdateCiudades_New = function (objCiudades_New) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objCiudades_New': objCiudades_New
      };
      $http.post(globalService.getUrl() + paths.UpdateCiudades_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.DeleteCiudades_New = function (Clv_Ciudad) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Ciudad': Clv_Ciudad
      };
      $http.post(globalService.getUrl() + paths.DeleteCiudades_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetLocalidadList = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetLocalidadList, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddRelLocalidadL = function (lstRelLocalidad, RelLocalidadMunEstAdd) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'lstRelLocalidad': lstRelLocalidad,
        'RelLocalidadMunEstAdd': RelLocalidadMunEstAdd
      };
      $http.post(globalService.getUrl() + paths.AddRelLocalidadL, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDeepLocalidad = function (IdLocalidad) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'IdLocalidad': IdLocalidad
      };
      $http.post(globalService.getUrl() + paths.GetDeepLocalidad, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.UpdateRellocalidadL = function (lstRelLocalidad, RelLocalidadMunEstAdd) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'lstRelLocalidad': lstRelLocalidad,
        'RelLocalidadMunEstAdd': RelLocalidadMunEstAdd
      };
      $http.post(globalService.getUrl() + paths.UpdateRellocalidadL, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.DeleteLocalidad = function (IdLocalidad) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        IdLocalidad: IdLocalidad
      };
      $http.post(globalService.getUrl() + paths.DeleteLocalidad, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetTipo_Colonias1_NewList = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetTipo_Colonias1_NewList, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddTipo_Colonias1_New = function (objTipo_Colonias1_New) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objTipo_Colonias1_New': objTipo_Colonias1_New
      };
      $http.post(globalService.getUrl() + paths.AddTipo_Colonias1_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDeepTipo_Colonias1_New = function (Clave) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        Clave: Clave
      };
      $http.post(globalService.getUrl() + paths.GetDeepTipo_Colonias1_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.UpdateTipo_Colonias1_New = function (objTipo_Colonias1_New) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objTipo_Colonias1_New': objTipo_Colonias1_New
      };
      $http.post(globalService.getUrl() + paths.UpdateTipo_Colonias1_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.DeleteTipo_Colonias1_New = function (Clave) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        Clave: Clave
      };
      $http.post(globalService.getUrl() + paths.DeleteTipo_Colonias1_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetCalleList = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetCalleList, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddCalleL = function (lstRelCalle, RelCalleAdd) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'lstRelCalle': lstRelCalle,
        'RelCalleAdd': RelCalleAdd
      };
      $http.post(globalService.getUrl() + paths.AddCalleL, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDeepCalle = function (IdCalle) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'IdCalle': IdCalle
      };
      $http.post(globalService.getUrl() + paths.GetDeepCalle, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.UpdateCalleL = function (lstRelCalle, RelCalleAdd) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'lstRelCalle': lstRelCalle,
        'RelCalleAdd': RelCalleAdd
      };
      $http.post(globalService.getUrl() + paths.UpdateCalleL, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.DeleteCalle = function (IdCalle) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        IdCalle: IdCalle
      };
      $http.post(globalService.getUrl() + paths.DeleteCalle, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDistribuidorList = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetDistribuidorList, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddDistribuidor = function (DistribuidorObj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objDistribuidor': DistribuidorObj
      };
      $http.post(globalService.getUrl() + paths.AddDistribuidor, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDeepDistribuidor = function (IdDistribuidor) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'IdDistribuidor': IdDistribuidor
      };
      $http.post(globalService.getUrl() + paths.GetDeepDistribuidor, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.UpdateDistribuidor = function (DistribuidorObj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objDistribuidor': DistribuidorObj
      };
      $http.post(globalService.getUrl() + paths.UpdateDistribuidor, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.DeleteDistribuidor = function (IdDistribuidor) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'IdDistribuidor': IdDistribuidor
      };
      $http.post(globalService.getUrl() + paths.DeleteDistribuidor, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddPlazaL = function (lstRelPlazaMunEst, RelPlazaEstMunAdd) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'lstRelPlazaMunEst': lstRelPlazaMunEst,
        'RelPlazaEstMunAdd': RelPlazaEstMunAdd
      };
      $http.post(globalService.getUrl() + paths.AddPlazaL, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDeepPlaza = function (IdPlaza) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'IdPlaza': IdPlaza
      };
      $http.post(globalService.getUrl() + paths.GetDeepPlaza, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.UpdatePlazaL = function (lstRelPlazaMunEst, RelPlazaEstMunAdd) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'lstRelPlazaMunEst': lstRelPlazaMunEst,
        'RelPlazaEstMunAdd': RelPlazaEstMunAdd
      };
      $http.post(globalService.getUrl() + paths.UpdatePlazaL, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetColoniaList = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetColoniaList, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GetTipServ_NewList = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetTipServ_NewList, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddTipServ_New = function (objTipServ_New) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objTipServ_New': objTipServ_New
      };
      $http.post(globalService.getUrl() + paths.AddTipServ_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDeepTipServ_New = function (Clv_TipSer) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_TipSer': Clv_TipSer
      };
      $http.post(globalService.getUrl() + paths.GetDeepTipServ_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.UpdateTipServ_New = function (objTipServ_New) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objTipServ_New': objTipServ_New
      };
      $http.post(globalService.getUrl() + paths.UpdateTipServ_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.DeleteTipServ_New = function (Clv_TipSer) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_TipSer': Clv_TipSer
      };
      $http.post(globalService.getUrl() + paths.DeleteTipServ_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddColoniaL = function (lstRelColonia, RelColoniaLocMunEstAdd, RelColoniaServicioAdd) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'lstRelColonia': lstRelColonia,
        'RelColoniaLocMunEstAdd': RelColoniaLocMunEstAdd,
        'RelColoniaServicioAdd': RelColoniaServicioAdd
      };
      $http.post(globalService.getUrl() + paths.AddColoniaL, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

     factory.AddSucursal = function (SUCURSALESobj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objSUCURSALES': SUCURSALESobj
      };
      $http.post(globalService.getUrl() + paths.AddSucursal, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDeepSucursal = function (Clv_Sucursal) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'clv_sucursal': Clv_Sucursal
      };
      $http.post(globalService.getUrl() + paths.GetDeepSucursal, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.UpdateSucursal = function (objSUCURSALES) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objSUCURSALES': objSUCURSALES
      };
      $http.post(globalService.getUrl() + paths.UpdateSucursal, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMuestraTipSerPrincipal_SERList = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetMuestraTipSerPrincipal_SERList, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddServicios_New = function (objServicios_New) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objServicios_New': objServicios_New
      };
      $http.post(globalService.getUrl() + paths.AddServicios_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.DeleteBORRel_Trabajos_NoCobroMensual = function (Clv_Servicio) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Servicio': Clv_Servicio
      };
      $http.post(globalService.getUrl() + paths.DeleteBORRel_Trabajos_NoCobroMensual, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddValidaAplicaSoloInternet = function (objValidaAplicaSoloInternet) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objValidaAplicaSoloInternet': objValidaAplicaSoloInternet
      };
      $http.post(globalService.getUrl() + paths.AddValidaAplicaSoloInternet, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddNueAplicaSoloInternet = function (objNueAplicaSoloInternet) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objNueAplicaSoloInternet': objNueAplicaSoloInternet
      };
      $http.post(globalService.getUrl() + paths.AddNueAplicaSoloInternet, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.DeleteBorAplicaSoloInternet = function (Clv_Servicio) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Servicio': Clv_Servicio
      };
      $http.post(globalService.getUrl() + paths.DeleteBorAplicaSoloInternet, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.UpdateServicios_New = function (objServicios_New) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objServicios_New': objServicios_New
      };
      $http.post(globalService.getUrl() + paths.UpdateServicios_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMUESTRATRABAJOS_NewList = function (clv_TipSer) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'clv_TipSer': clv_TipSer
      };
      $http.post(globalService.getUrl() + paths.GetMUESTRATRABAJOS_NewList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.UpdateGUARDARel_Trabajos_NoCobroMensual = function (objGUARDARel_Trabajos_NoCobroMensual) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objGUARDARel_Trabajos_NoCobroMensual': objGUARDARel_Trabajos_NoCobroMensual
      };
      $http.post(globalService.getUrl() + paths.UpdateGUARDARel_Trabajos_NoCobroMensual, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDeepValidaCambioDClvtxtServ = function (ObjValidaCambio) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = ObjValidaCambio;
      $http.post(globalService.getUrl() + paths.GetDeepValidaCambioDClvtxtServ, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDeepValida_borra_servicio_New = function (ObjValidaDelete) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = ObjValidaDelete;
      $http.post(globalService.getUrl() + paths.GetDeepValida_borra_servicio_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.DeleteServicios_New = function (Clv_Servicio) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Servicio': Clv_Servicio
      };
      $http.post(globalService.getUrl() + paths.DeleteServicios_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.UpdateNUEVOClv_Equi = function (objNUEVOClv_Equi) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objNUEVOClv_Equi': objNUEVOClv_Equi
      };
      $http.post(globalService.getUrl() + paths.UpdateNUEVOClv_Equi, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMUESTRASOLOTARIFADOSList = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetMUESTRASOLOTARIFADOSList, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDeepServicios_New = function (Clv_Servicio) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Servicio': Clv_Servicio
      };
      $http.post(globalService.getUrl() + paths.GetDeepServicios_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMuestra_Plazas_ConfiguracionServiciosList = function (clv_plaza) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'clv_plaza': clv_plaza
      };
      $http.post(globalService.getUrl() + paths.GetMuestra_Plazas_ConfiguracionServiciosList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDameRelCompaniaEstadoCiudadList = function (clv_plaza) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'clv_plaza': clv_plaza
      };
      $http.post(globalService.getUrl() + paths.GetDameRelCompaniaEstadoCiudadList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDameServiciosRelComEdoCd_PorServicio1_NewList = function (ObjSerRelComEstCiu) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = ObjSerRelComEstCiu;
      $http.post(globalService.getUrl() + paths.GetDameServiciosRelComEdoCd_PorServicio1_NewList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDameServiciosRelComEdoCd_PorServicio2_NewList = function (ObjSerRelComEstCiu) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = ObjSerRelComEstCiu;
      $http.post(globalService.getUrl() + paths.GetDameServiciosRelComEdoCd_PorServicio2_NewList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddinsertaServiciosRelCompaniaEstadoCiudad = function (objinsertaServiciosRelCompaniaEstadoCiudad) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objinsertaServiciosRelCompaniaEstadoCiudad': objinsertaServiciosRelCompaniaEstadoCiudad
      };
      $http.post(globalService.getUrl() + paths.AddinsertaServiciosRelCompaniaEstadoCiudad, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.DeleteinsertaServiciosRelCompaniaEstadoCiudad = function (ObjDeletRelSer) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = ObjDeletRelSer;
      $http.post(globalService.getUrl() + paths.DeleteinsertaServiciosRelCompaniaEstadoCiudad, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddinsertaServiciosRelCompaniaEstadoCiudadATodos = function (objinsertaServiciosRelCompaniaEstadoCiudadATodos) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objinsertaServiciosRelCompaniaEstadoCiudadATodos': objinsertaServiciosRelCompaniaEstadoCiudadATodos
      };
      $http.post(globalService.getUrl() + paths.AddinsertaServiciosRelCompaniaEstadoCiudadATodos, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.DeleteinsertaServiciosRelCompaniaEstadoCiudadATodos = function (ObjDeletRelSer) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = ObjDeletRelSer;
      $http.post(globalService.getUrl() + paths.DeleteinsertaServiciosRelCompaniaEstadoCiudadATodos, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetREL_TARIFADOS_SERVICIOS_NewList = function (ObjTarifa) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = ObjTarifa;
      $http.post(globalService.getUrl() + paths.GetREL_TARIFADOS_SERVICIOS_NewList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMuestraTipoPromocionList = function (clv_TipSer) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'clv_TipSer': clv_TipSer
      };
      $http.post(globalService.getUrl() + paths.GetMuestraTipoPromocionList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddValidaPeriodos = function (objValidaPeriodos) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objValidaPeriodos': objValidaPeriodos
      };
      $http.post(globalService.getUrl() + paths.AddValidaPeriodos, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddREL_TARIFADOS_SERVICIOS_New = function (objREL_TARIFADOS_SERVICIOS_New) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objREL_TARIFADOS_SERVICIOS_New': objREL_TARIFADOS_SERVICIOS_New
      };
      $http.post(globalService.getUrl() + paths.AddREL_TARIFADOS_SERVICIOS_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddREL_TARIFADOS_SERVICIOSAll_New = function (objREL_TARIFADOS_SERVICIOS_New) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objREL_TARIFADOS_SERVICIOS_New': objREL_TARIFADOS_SERVICIOS_New
      };
      $http.post(globalService.getUrl() + paths.AddREL_TARIFADOS_SERVICIOSAll_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddRelTarifadosServiciosCostoPorCaja_New = function (objRelTarifadosServiciosCostoPorCaja_New) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objRelTarifadosServiciosCostoPorCaja_New': objRelTarifadosServiciosCostoPorCaja_New
      };
      $http.post(globalService.getUrl() + paths.AddRelTarifadosServiciosCostoPorCaja_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDeepValidaEliminaClvLlave = function (Clv_Llave) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Llave': Clv_Llave
      };
      $http.post(globalService.getUrl() + paths.GetDeepValidaEliminaClvLlave, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.DeleteREL_TARIFADOS_SERVICIOS_New = function (ObjConcepto) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = ObjConcepto;
      $http.post(globalService.getUrl() + paths.DeleteREL_TARIFADOS_SERVICIOS_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetServicios_NewList = function (ObjBusqueda) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = ObjBusqueda;
      $http.post(globalService.getUrl() + paths.GetServicios_NewList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.UpdateREL_TARIFADOS_SERVICIOS_New = function (objREL_TARIFADOS_SERVICIOS_New) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objREL_TARIFADOS_SERVICIOS_New': objREL_TARIFADOS_SERVICIOS_New
      };
      $http.post(globalService.getUrl() + paths.UpdateREL_TARIFADOS_SERVICIOS_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDeepREL_TARIFADOS_SERVICIOS_New = function (ObjConcepto) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = ObjConcepto;
      $http.post(globalService.getUrl() + paths.GetDeepREL_TARIFADOS_SERVICIOS_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDeepRelTarifadosServiciosCostoPorCaja_New = function (Clv_Llave) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Llave': Clv_Llave
      };
      $http.post(globalService.getUrl() + paths.GetDeepRelTarifadosServiciosCostoPorCaja_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.UpdateREL_TARIFADOS_SERVICIOSAll_New = function (objREL_TARIFADOS_SERVICIOS_New) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objREL_TARIFADOS_SERVICIOS_New': objREL_TARIFADOS_SERVICIOS_New
      };
      $http.post(globalService.getUrl() + paths.UpdateREL_TARIFADOS_SERVICIOSAll_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddNUEPuntos_Pago_Adelantado = function (objNUEPuntos_Pago_Adelantado) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objNUEPuntos_Pago_Adelantado': objNUEPuntos_Pago_Adelantado
      };
      $http.post(globalService.getUrl() + paths.AddNUEPuntos_Pago_Adelantado, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetBUSCAPuntos_Pago_Adelantado = function (ObjPuntos) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = ObjPuntos;
      $http.post(globalService.getUrl() + paths.GetBUSCAPuntos_Pago_Adelantado, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.UpdateModRentaAparato = function (objModRentaAparato) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objModRentaAparato': objModRentaAparato
      };
      $http.post(globalService.getUrl() + paths.UpdateModRentaAparato, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetActualiza_InstalacionList = function (ObjInstalacion) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = ObjInstalacion;
      $http.post(globalService.getUrl() + paths.GetActualiza_InstalacionList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetLocalidades_NewList = function (ObjLocalidad) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = ObjLocalidad;
      $http.post(globalService.getUrl() + paths.GetLocalidades_NewList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddValidaNombreLocalidad = function (objValidaNombreLocalidad) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objValidaNombreLocalidad': objValidaNombreLocalidad
      };
      $http.post(globalService.getUrl() + paths.AddValidaNombreLocalidad, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddLocalidades_New = function (objLocalidades_New) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objLocalidades_New': objLocalidades_New
      };
      $http.post(globalService.getUrl() + paths.AddLocalidades_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDeepLocalidades_New = function (Clv_Localidad) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Localidad': Clv_Localidad
      };
      $http.post(globalService.getUrl() + paths.GetDeepLocalidades_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.UpdateLocalidades_New = function (objLocalidades_New) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objLocalidades_New': objLocalidades_New
      };
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.UpdateLocalidades_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.DeleteLocalidades_New = function (ObjLocalidad) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = ObjLocalidad;
      $http.post(globalService.getUrl() + paths.DeleteLocalidades_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetRelCiudadLocalidadList = function (objRel) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = objRel;
      $http.post(globalService.getUrl() + paths.GetRelCiudadLocalidadList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddSPRelCiudadLocalidad = function (objSPRelCiudadLocalidad) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objSPRelCiudadLocalidad': objSPRelCiudadLocalidad
      };
      $http.post(globalService.getUrl() + paths.AddSPRelCiudadLocalidad, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDeepValidaEliminaRelLocalidadCiudad = function (ObjValidate) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = ObjValidate;
      $http.post(globalService.getUrl() + paths.GetDeepValidaEliminaRelLocalidadCiudad, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.DeleteSPRelCiudadLocalidad = function (ObjRel) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = ObjRel;
      $http.post(globalService.getUrl() + paths.DeleteSPRelCiudadLocalidad, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetColonias_NewList = function (ObjColoniaList) {
      var deferred = $q.defer();
      var config = {headers: {'Authorization': $localStorage.currentUser.token}};
      var Parametros = {'ObjColoniaList': ObjColoniaList};
      $http.post(globalService.getUrl() + paths.GetColonias_NewList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddValidaNombreColonia = function (objValidaNombreColonia) {
      var deferred = $q.defer();
      var config = {headers: {'Authorization': $localStorage.currentUser.token}};
      var Parametros = {'objValidaNombreColonia': objValidaNombreColonia};
      $http.post(globalService.getUrl() + paths.AddValidaNombreColonia, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddColonias_New = function (objColonias_New) {
      var deferred = $q.defer();
      var config = {headers: {'Authorization': $localStorage.currentUser.token}};
      var Parametros = {'objColonias_New': objColonias_New};
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.AddColonias_New, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMuestraEstados_RelColList = function () {
      var deferred = $q.defer();
      var config = {headers: {'Authorization': $localStorage.currentUser.token}};
      $http.get(globalService.getUrl() + paths.GetMuestraEstados_RelColList, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMuestraCdsEdo_RelColoniaList = function (clv_estado) {
      var deferred = $q.defer();
      var config = {headers: {'Authorization': $localStorage.currentUser.token}};
      var Parametros = {'clv_estado': clv_estado};
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.GetMuestraCdsEdo_RelColoniaList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMuestraLoc_RelColoniaList = function (ObjLocalidadList) {
      var deferred = $q.defer();
      var config = {headers: {'Authorization': $localStorage.currentUser.token}};
      var Parametros = ObjLocalidadList;
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.GetMuestraLoc_RelColoniaList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddInsertaRelColoniaLocalidad = function (objInsertaRelColoniaLocalidad) {
      var deferred = $q.defer();
      var config = {headers: {'Authorization': $localStorage.currentUser.token}};
      var Parametros = {'objInsertaRelColoniaLocalidad': objInsertaRelColoniaLocalidad};
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.AddInsertaRelColoniaLocalidad, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    return factory;

  });