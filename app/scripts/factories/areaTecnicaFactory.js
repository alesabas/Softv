'use strict';
angular
  .module('softvApp')
  .factory('areaTecnicaFactory', function ($http, $q, globalService, $localStorage) {
    var paths = {
      GetSectores: '/AreaTecnica/GetConSector',
      GetColoniasSec: '/AreaTecnica/GetMuestraColoniaSec',
      GetConRelSectorColonia: '/AreaTecnica/GetConRelSectorColonia',
      GetNueSector: '/AreaTecnica/GetNueSector',
      GetNueRelSectorColonia: '/AreaTecnica/GetNueRelSectorColonia',
      GetBorRelSectorColonia: '/AreaTecnica/GetBorRelSectorColonia ',
      GetModSector: '/AreaTecnica/GetModSector'

    };
    var factory = {};
    var usuarioAtencion = $localStorage.currentUser.idUsuario;



    factory.GetSectores = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'clvsector': obj.clvsector,
        'descripcion': obj.descripcion,
        'clv_txt': obj.clv_txt,
        'op': obj.op,
        'clv_usuario': $localStorage.currentUser.idUsuario
       
      };
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.GetSectores, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GetColonias = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Colonia': obj.clvcolonia,
        'Clv_Sector': obj.clvsector,
        'op': 0,
        'clv_usuario': $localStorage.currentUser.idUsuario

      };
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.GetColoniasSec, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetConRelSectorColonia = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Sector': obj.Clv_Sector
      };
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.GetConRelSectorColonia, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GetBorRelSectorColonia = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Colonia': obj.Clv_Colonia,

      };
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.GetBorRelSectorColonia, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GetNueSector = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Descripcion': obj.Descripcion,
        'Clv_Txt': obj.Clv_Txt,
        'op': 0

      };
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.GetNueSector, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.ModificaSector = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Sector': obj.Clv_Sector,
        'Descripcion': obj.Descripcion,
        'Clv_Txt': obj.Clv_Txt


      };
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.GetModSector, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetNueRelSectorCol = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Sector': obj.Clv_Sector,
        'Clv_Colonia': obj.Clv_Colonia
      };
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.GetNueRelSectorColonia, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };





    return factory;
  });
