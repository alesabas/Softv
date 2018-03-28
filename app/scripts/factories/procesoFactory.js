'use strict';
angular
  .module('softvApp')
  .factory('procesoFactory', function ($http, $q, globalService, $localStorage) {

    var paths = {
      GetMuestraServCteReset: '/Procesos/GetMuestraServCteReset',
      GetResetServCte: '/Procesos/GetResetServCte',
      GetMuestraServiciosPrueba: '/Procesos/GetMuestraServiciosPrueba',
      GetMUESTRACablemodesDelClientePrueba: '/Procesos/GetMUESTRACablemodesDelClientePrueba',
      GetNUEtblPruebaInternet: '/Procesos/GetNUEtblPruebaInternet',
      GetConCambioServCliente: '/Procesos/GetConCambioServCliente',
      GetuspDameClientesActivos: '/Procesos/GetuspDameClientesActivos',
      GetServiciosClienteActuales: '/Procesos/GetServiciosClienteActuales',
      GetServiciosClientePosibles: '/Procesos/GetServiciosClientePosibles',
      GetDameClv_SessionProceso: '/DameClv_Session/GetDameClv_SessionProceso',
      GetCambiaServCliente:'/Procesos/GetCambiaServCliente',
      GetBorCambioServCliente:'/Procesos/GetBorCambioServCliente'
    };

    var factory = {};


    factory.GetBorCambioServCliente = function (Clave) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {        
          'Clave':Clave,
          'Op': 0         
        };
      $http.post(globalService.getUrl() + paths.GetBorCambioServCliente, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };



    factory.GetCambiaServCliente = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {        
          'contrato': obj.contrato,
          'contratoNet': obj.contratoNet,
          'clvtipser': obj.clvtipser,
          'Clv_ServOld': obj.Clv_ServOld,
          'Clv_ServNew': obj.Clv_ServNew,
          'Monto': obj.Monto,
          'Clv_Session': obj.Clv_Session,
          'Id':obj.Id
        };
      $http.post(globalService.getUrl() + paths.GetCambiaServCliente, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GetDameClv_SessionProceso = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      $http.get(globalService.getUrl() + paths.GetDameClv_SessionProceso, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetServiciosClientePosibles = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'parametros': {
          'contrato': obj.contrato,
          'clv_tipservicio': obj.clv_tipservicio,
          'clv_servicio': obj.clv_servicio,
          'ultimomes': obj.ultimomes,
          'ultimoanio': obj.ultimoanio,
          'idcompania': obj.idcompania,
          'Clv_Session': obj.Clv_Session
        }


      };
      $http.post(globalService.getUrl() + paths.GetServiciosClientePosibles, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };



    factory.GetServiciosClienteActuales = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'contrato': obj.contrato,
        'clv_servicio': obj.clv_servicio
      };
      $http.post(globalService.getUrl() + paths.GetServiciosClienteActuales, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };



    factory.GetuspDameClientesActivos = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'contrato': obj.contrato,
        'nombre': obj.nombre,
        'calle': obj.calle,
        'numero': obj.numero,
        'ciudad': obj.ciudad,
        'op': obj.op,
        'clvColonia': obj.clvColonia,
        'idcompania': obj.idcompania,
        'SETUPBOX': obj.SETUPBOX,
        'TARJETA': obj.TARJETA,
        'ClvUsuario': $localStorage.currentUser.idUsuario
      };

      $http.post(globalService.getUrl() + paths.GetuspDameClientesActivos, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };



    factory.GetConCambioServCliente = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'clave': obj.clave,
        'Contrato': obj.Contrato,
        'Nombre': obj.Nombre,
        'Clv_TipSer': obj.Clv_TipSer,
        'Op': obj.Op,
        'idcompania': obj.idcompania,
        'ClvUsuario': $localStorage.currentUser.idUsuario
      };

      $http.post(globalService.getUrl() + paths.GetConCambioServCliente, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GetNUEtblPruebaInternet = function (clv_unicanet, clv_servicioant, clv_servicionue, fechaInicio, fechafin) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'clv_unicanet': clv_unicanet,
        'clv_servicioant': clv_servicioant,
        'clv_servicionue': clv_servicionue,
        'fechaInicio': fechaInicio,
        'fechafin': fechafin
      };

      $http.post(globalService.getUrl() + paths.GetNUEtblPruebaInternet, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMUESTRACablemodesDelClientePrueba = function (contrato) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'contrato': contrato

      };

      $http.post(globalService.getUrl() + paths.GetMUESTRACablemodesDelClientePrueba, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };



    factory.GetMuestraServiciosPrueba = function (Clv_TipSer, Clv_Servicio, Clv_Unicanet) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_TipSer': Clv_TipSer,
        'Clv_Servicio': Clv_Servicio,
        'Clv_Unicanet': Clv_Unicanet
      };

      $http.post(globalService.getUrl() + paths.GetMuestraServiciosPrueba, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };




    factory.GetMuestraServCteReset = function (Contrato, Clv_TipSer, idcompania) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Contrato': Contrato,
        'Clv_TipSer': Clv_TipSer,
        'idcompania': idcompania
      };

      $http.post(globalService.getUrl() + paths.GetMuestraServCteReset, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GetResetServCte = function (Contrato, Clv_CableModem, Clv_TipSer, clv_unicanet) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Contrato': Contrato,
        'Clv_CableModem': Clv_CableModem,
        'Clv_TipSer': Clv_TipSer,
        'clv_unicanet': clv_unicanet
      };

      $http.post(globalService.getUrl() + paths.GetResetServCte, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    return factory;
  });
