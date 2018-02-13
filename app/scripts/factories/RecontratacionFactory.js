'use strict';

angular
    .module('softvApp')
    .factory('RecontratacionFactory', function($http, $q, globalService, $localStorage){

        var factory = {};
        var paths = {
            Get_uspBusCliPorContratoSeparadoEnBaja: '/Recontratacion/Get_uspBusCliPorContratoSeparadoEnBaja'
        };

        factory.Get_uspBusCliPorContratoSeparadoEnBaja = function(ObjCliente){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjCliente': ObjCliente};
            $http.post(globalService.getUrl() + paths.Get_uspBusCliPorContratoSeparadoEnBaja, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        return factory;

     });