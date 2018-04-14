'use strict';

angular
    .module('softvApp')
    .factory('GrupoVentaFactory', function($http, $q, globalService, $localStorage){

        var factory = {};
        var paths = {
            GetGrupoVentaIdCompaniaList: '/GrupoVentas/GetGrupoVentaIdCompaniaList',
            GetNueGrupoVentas: '/GrupoVentas/GetNueGrupoVentas',
            GetModGrupoVentas:'/GrupoVentas/GetModGrupoVentas',
            GetRelGrupoVentaPlazaList: '/GrupoVentas/GetRelGrupoVentaPlazaList',
            GetAddRelGrupoVentaPlaza: '/GrupoVentas/GetAddRelGrupoVentaPlaza'
        };

        factory.GetGrupoVentaIdCompaniaList = function(Obj){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = Obj;
            $http.post(globalService.getUrl() + paths.GetGrupoVentaIdCompaniaList, JSON.stringify(Parametros), config).then(function(response){
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
        
        factory.GetRelGrupoVentaPlazaList = function(ClvGrupo){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ClvGrupo': ClvGrupo};
            $http.post(globalService.getUrl() + paths.GetRelGrupoVentaPlazaList, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetAddRelGrupoVentaPlaza = function(ObjGrupoRel){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = ObjGrupoRel;
            $http.post(globalService.getUrl() + paths.GetAddRelGrupoVentaPlaza, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        return factory;

    });