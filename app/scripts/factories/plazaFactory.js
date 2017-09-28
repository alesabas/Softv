'use strict';
angular
  .module('softvApp')
  .factory('plazaFactory', function ($http, $q, globalService, $localStorage) {

    var paths = {

      GetBrwMuestraCompanias: '/Plaza/GetBrwMuestraCompanias',
      GetMuestraEstadosFrmCompania: '/Plaza/GetMuestraEstadosFrmCompania',
      GetMuestra_Ciudad_RelCompania: '/Plaza/GetMuestra_Ciudad_RelCompania',
      GetAgregaEliminaRelCompaniaCiudad2: '/Plaza/GetAgregaEliminaRelCompaniaCiudad2',
      GetObtendatosPlaza: '/Plaza/GetObtendatosPlaza',
      AddPlaza: '/Plaza/AddPlaza',
       EditPlaza: '/Plaza/UpdatePlaza'
    };

    var factory = {};
  

  factory.EditPlaza = function (obj) {
      var deferred = $q.defer();
      var Parametros = {
        'objPlaza': obj
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.EditPlaza, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.AddPlaza = function (obj) {
      var deferred = $q.defer();
      var Parametros = {
        'objPlaza': obj
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.AddPlaza, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.GetObtendatosPlaza = function (idcompania) {
      var deferred = $q.defer();
      var Parametros = {
        'idcompania': idcompania
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetObtendatosPlaza, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };




    factory.GetAgregaEliminaRelCompaniaCiudad2 = function (opcion, idcompania, clv_ciudad, clv_estado) {
      var deferred = $q.defer();
      var Parametros = {
        'opcion': opcion,
        'idcompania': idcompania,
        'clv_ciudad': clv_ciudad,
        'clv_estado': clv_estado
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetAgregaEliminaRelCompaniaCiudad2, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };



    factory.GetBrwMuestraCompanias = function (opcion, razon, idcompania) {
      var deferred = $q.defer();

      var Parametros = {
        'opcion': opcion,
        'razon': razon,
        'idcompania': idcompania
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetBrwMuestraCompanias, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };




    factory.GetMuestraEstadosFrmCompania = function (idcompania) {
      var deferred = $q.defer();
      var Parametros = {
        'idcompania': idcompania
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetMuestraEstadosFrmCompania, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };



    factory.GetMuestra_Ciudad_RelCompania = function (idcompania, clvestado) {
      var deferred = $q.defer();
      var Parametros = {
        'idcompania': idcompania,
        'clvestado': clvestado
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetMuestra_Ciudad_RelCompania, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };







    return factory;


  });
