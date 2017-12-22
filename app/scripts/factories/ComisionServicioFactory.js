'use strict';

angular
    .module('softvApp')
    .factory('ComisionServicioFactory', function($http, $q, globalService, $localStorage){

        var factory = {};
        var paths = {
            GetMuestraTipServ: '/ComisionesPorServicio/GetMuestraTipServ',
            GetMuestraServicios: '/ComisionesPorServicio/GetMuestraServicios',
            GetCONRANGOS: '/ComisionesPorServicio/GetCONRANGOS',
            GetCONCOMISION: '/ComisionesPorServicio/GetCONCOMISION',
            GetNUECOMISION: '/ComisionesPorServicio/GetNUECOMISION',
            GetBORCOMISION: '/ComisionesPorServicio/GetBORCOMISION'
        };

        factory.GetMuestraTipServ = function(ObjTipoServicio){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjTipoServicio': ObjTipoServicio};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetMuestraTipServ, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetMuestraServicios = function(ObjServicio){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjServicio': ObjServicio};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetMuestraServicios, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetCONRANGOS = function(ObjRango){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjRango': ObjRango};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetCONRANGOS, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetCONCOMISION = function(ObjComision){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjComision': ObjComision};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetCONCOMISION, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetNUECOMISION = function(ObjComision){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjComision': ObjComision};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetNUECOMISION, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetBORCOMISION = function(ObjComision){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjComision': ObjComision};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetBORCOMISION, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        return factory;

    });