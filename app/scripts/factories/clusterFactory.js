'use strict';
angular.module('softvApp')
  .factory('clusterFactory', function ($http, $q, globalService, $localStorage) {
    var factory = {};
    var paths = {
      GetMuestraCluster: '/AreaTecnica/GetMuestraCluster',
      GetMuestraRelClusterSector: '/AreaTecnica/GetMuestraRelClusterSector',
      GetInsertUpdateCluster: '/AreaTecnica/GetInsertUpdateCluster',
      GetQuitarEliminarRelClusterSector:'/AreaTecnica/GetQuitarEliminarRelClusterSector'
    };


    factory.GetQuitarEliminarRelClusterSector = function (opcion, clv_cluster, clv_sector) {
      var deferred = $q.defer();
      var Parametros = {
        'opcion': opcion,
        'clv_cluster': clv_cluster,
        'clv_sector': clv_sector,
       
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetQuitarEliminarRelClusterSector, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    


    factory.GetInsertUpdateCluster = function (opcion, clave, descripcion, clv_cluster) {
      var deferred = $q.defer();
      var Parametros = {
        'opcion': opcion,
        'clave': clave,
        'descripcion': descripcion,
        'clv_cluster': clv_cluster
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetInsertUpdateCluster, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMuestraRelClusterSector = function (clv_cluster, opcion) {
      var deferred = $q.defer();
      var Parametros = {
        'clv_cluster': clv_cluster,
        'opcion': opcion,

      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetMuestraRelClusterSector, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };



    factory.GetMuestraCluster = function (obj) {
      var deferred = $q.defer();
      var Parametros = {
        'opcion': obj.opcion,
        'clave': obj.clave,
        'descripcion': obj.descripcion,
        'clv_cluster': obj.clv_cluster
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
     console.log(JSON.stringify(Parametros));
      $http.post(globalService.getUrl() + paths.GetMuestraCluster, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };




    return factory;
  });
