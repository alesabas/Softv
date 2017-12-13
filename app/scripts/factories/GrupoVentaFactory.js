'use strict';

angular
    .module('softvApp')
    .factory('GrupoVentaFactory', function($http, $q, globalService, $localStorage){

        var factory = {};
        var paths = {
            GetConGrupoVentas1: '/GrupoVentas/GetConGrupoVentas1',
        };

        factory.GetConGrupoVentas1 = function(idcompania){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'idcompania': idcompania};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetConGrupoVentas1, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        return factory;

    });