'use strict';

angular
    .module('softvApp')
    .factory('GrupoVentaFactory', function($http, $q, globalService, $localStorage){

        var factory = {};
        var paths = {
            GetConGrupoVentas1: '/GrupoVentas/GetConGrupoVentas1',
            GetNueGrupoVentas: '/GrupoVentas/GetNueGrupoVentas',
            GetModGrupoVentas:'/GrupoVentas/GetModGrupoVentas'
        };

        factory.GetConGrupoVentas1 = function(idcompania){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'idcompania': idcompania};
            $http.post(globalService.getUrl() + paths.GetConGrupoVentas1, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetNueGrupoVentas = function(ObjGrupo){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjGrupo': ObjGrupo};
            $http.post(globalService.getUrl() + paths.GetNueGrupoVentas, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetModGrupoVentas = function(ObjGrupo){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjGrupo': ObjGrupo};
            $http.post(globalService.getUrl() + paths.GetModGrupoVentas, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        return factory;

    });