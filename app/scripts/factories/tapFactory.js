'use strict';
angular.module('softvApp')
  .factory('tapFactory', function ($http, $q, globalService, $localStorage) {
    var factory = {};
    var paths = {
      GetCONSULTATap: '/AreaTecnica/GetCONSULTATap',
      GetMuestraCluster: '/AreaTecnica/GetMuestraCluster',
      GetConSector2: '/AreaTecnica/GetConSector2',
      GetMuestraColoniaSec: '/AreaTecnica/GetMuestraColoniaSec',
      GetMUESTRAPostes: '/AreaTecnica/GetMUESTRAPostes',
      GetINSERTATap: '/AreaTecnica/GetINSERTATap',
      GetMuestraCalleSec:'/AreaTecnica/GetMuestraCalleSec'

    };


      factory.GetMuestraCalleSec = function (Clv_Sector,Clv_Colonia,Clv_Calle,Op) {
      var deferred = $q.defer();
      var params = {
        'Clv_SectorId': Clv_Sector,
        'Clv_Colonia':Clv_Colonia,
        'Clv_Calle':Clv_Calle,
        'Op':Op
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetMuestraCalleSec, params, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GetINSERTATap = function (obj) {
      var deferred = $q.defer();
      var params = {
        'TapEntity': {
          'clv_sector': obj.clv_sector,
          'clv_colonia': obj.clv_colonia,
          'clv_calle': obj.clv_calle,
          'Ingenieria': obj.Ingenieria,
          'Salidas': obj.Salidas,
          'NoCasas': obj.NoCasas,
          'NoNegocios': obj.NoNegocios,
          'NoLotes': obj.NoLotes,
          'NoServicios': obj.NoServicios,
          'FrenteANumero': obj.FrenteANumero,
          'clv_cluster': obj.clv_cluster
        }


      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetINSERTATap, params, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };



    factory.GetMUESTRAPostes = function (id) {
      var deferred = $q.defer();
      var params = {
        'Id': id,
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetMUESTRAPostes, params, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };



    factory.GetMuestraColoniaSec = function (Clv_Colonia, Clv_Sector, op) {
      var deferred = $q.defer();
      var params = {
        'Clv_Colonia': Clv_Colonia,
        'Clv_Sector': Clv_Sector,
        'op': op
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetMuestraColoniaSec, params, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };



    factory.GetCONSULTATap = function (obj) {
      var deferred = $q.defer();
      var params = {
        'TapEntity': {
          'IdTap': obj.IdTap,
          'Clavetecnica': obj.Clavetecnica,
          'cluster': obj.cluster,
          'sector': obj.sector,
          'poste': obj.poste,
          'colonia': obj.colonia,
          'calle': obj.calle,
          'op': obj.op
        }
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetCONSULTATap, params, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetConSector2 = function (Clv_Sector, Clv_Txt, Descripcion, Op, clv_cluster) {
      var deferred = $q.defer();
      var params = {
        'Clv_Sector': Clv_Sector,
        'Clv_Txt': Clv_Txt,
        'Descripcion': Descripcion,
        'Op': Op,
        'clv_cluster': clv_cluster
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetConSector2, params, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMuestraCluster = function (opcion, clave, descripcion, clv_cluster) {
      var deferred = $q.defer();
      var params = {
        'opcion': opcion,
        'clave': clave,
        'descripcion': descripcion,
        'clv_cluster': clv_cluster,
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetMuestraCluster, params, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    return factory;
  });
