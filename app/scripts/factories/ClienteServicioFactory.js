'use strict';

angular
    .module('softvApp')
    .factory('ClienteServicioFactory', function($http, $q, globalService, $localStorage){

        var factory = {};
        var paths = {
            GetValidaTVDigCliente: '/ClientesServicio/GetValidaTVDigCliente',
            GetListServicioAdicTvDig: '/ContratacionServicio/GetListServicioAdicTvDig',
            GetAddPqueteAdic: '/ClientesServicio/GetAddPqueteAdic'
        };

        factory.GetValidaTVDigCliente = function(Contrato){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'Contrato': Contrato};
            $http.post(globalService.getUrl() + paths.GetValidaTVDigCliente, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetListServicioAdicTvDig = function(){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            $http.get(globalService.getUrl() + paths.GetListServicioAdicTvDig, config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetAddPqueteAdic = function(ObjPqueteAdic){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjPqueteAdic':ObjPqueteAdic};
            $http.post(globalService.getUrl() + paths.GetAddPqueteAdic, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        return factory;

    });