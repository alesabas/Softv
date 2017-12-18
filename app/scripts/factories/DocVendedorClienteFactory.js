'use strict';

angular
    .module('softvApp')
    .factory('DocVendedorClienteFactory', function($http, $q, globalService, $localStorage){
    
        var factory = {};
        var paths = {
            GetDameDocumentosVendedor: '/DocumentosVendedoresClientes/GetDameDocumentosVendedor',
            GetDameDocumentosVendedorGrid: '/DocumentosVendedoresClientes/GetDameDocumentosVendedorGrid'
        };

        factory.GetDameDocumentosVendedor = function(){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            $http.get(globalService.getUrl() + paths.GetDameDocumentosVendedor, config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetDameDocumentosVendedorGrid = function(clv_vendedor){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'clv_vendedor': clv_vendedor};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetDameDocumentosVendedorGrid, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        return factory;

    });