'use strict';
angular
    .module('softvApp')
    .factory('RolesFactory', function($http, $q, globalService, $localStorage){

        var factory = {};
        var paths ={
            GetRolList: '/Role/GetRolList',
            GetAddRol: '/Role/GetAddRol',
            GetRoleById: '/Role/GetRoleById',
            GetUpdateRol: '/Role/GetUpdateRol'
        };

        factory.GetRolList = function(){
            var deferred = $q.defer();
            var config = {headers:{'Authorization':$localStorage.currentUser.token}};
            $http.get(globalService.getUrl() + paths.GetRolList, config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetAddRol = function (rol) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'rol': rol};
            $http.post(globalService.getUrl() + paths.GetAddRol, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetRoleById = function (IdRol) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'id': IdRol};
            $http.post(globalService.getUrl() + paths.GetRoleById, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetUpdateRol = function (rol) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'rol': rol};
            $http.post(globalService.getUrl() + paths.GetUpdateRol, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        return factory;

    });