'use strict';
angular
  .module('softvApp')
  .factory('procesoFactory', function ($http, $q, globalService, $localStorage) {

    var paths = {
        GetMuestraServCteReset:'/Procesos/GetMuestraServCteReset',
        GetResetServCte:'/Procesos/GetResetServCte',
        GetMuestraServiciosPrueba:'/Procesos/GetMuestraServiciosPrueba',
        GetMUESTRACablemodesDelClientePrueba:'/Procesos/GetMUESTRACablemodesDelClientePrueba'
    };

    var factory = {};   

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



    factory.GetMuestraServiciosPrueba = function (Clv_TipSer,Clv_Servicio,Clv_Unicanet) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_TipSer': Clv_TipSer,
        'Clv_Servicio':Clv_Servicio,
        'Clv_Unicanet':Clv_Unicanet      
      };

      $http.post(globalService.getUrl() + paths.GetMuestraServiciosPrueba, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };




    factory.GetMuestraServCteReset = function (Contrato,Clv_TipSer,idcompania) {
        var deferred = $q.defer();
        var config = {
          headers: {
            'Authorization': $localStorage.currentUser.token
          }
        };
        var Parametros = {
          'Contrato': Contrato,
          'Clv_TipSer':Clv_TipSer,
          'idcompania':idcompania      
        };
  
        $http.post(globalService.getUrl() + paths.GetMuestraServCteReset, JSON.stringify(Parametros), config).then(function (response) {
          deferred.resolve(response.data);
        }).catch(function (response) {
          deferred.reject(response);
        });
        return deferred.promise;
      };


      factory.GetResetServCte = function (Contrato,Clv_CableModem,Clv_TipSer,clv_unicanet) {
        var deferred = $q.defer();
        var config = {
          headers: {
            'Authorization': $localStorage.currentUser.token
          }
        };
        var Parametros = {
          'Contrato': Contrato,
          'Clv_CableModem':Clv_CableModem,
          'Clv_TipSer':Clv_TipSer,
          'clv_unicanet':clv_unicanet      
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