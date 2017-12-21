'use strict';
angular
  .module('softvApp')
  .factory('procesoFactory', function ($http, $q, globalService, $localStorage) {

    var paths = {
        GetMuestraServCteReset:'/Procesos/GetMuestraServCteReset',
        GetResetServCte:'/Procesos/GetResetServCte'
    };

    var factory = {};   

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