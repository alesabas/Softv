'use strict';
angular
    .module('softvApp')
    .factory('ServiciosFactory', function ($http, $q, globalService, $localStorage) {

        var factory = {};
        var paths = {
            GetMedioList: '/MuestraMedios_New/GetMedioList',
            GetServicioClvEqMedioList: '/TblNet/GetServicioClvEqMedioList',
            GetAddServicioClvEqMedio: '/TblNet/GetAddServicioClvEqMedio'
        };

        factory.GetMedioList = function() { 
            var deferred = $q.defer(); 
            var config = {headers:{'Authorization': $localStorage.currentUser.token}};
            $http.get(globalService.getUrl() + paths.GetMedioList, config).then(function(response) { 
                deferred.resolve(response.data); 
            }).catch(function(response) { 
                deferred.reject(response.data); 
            });
            return deferred.promise; 
        };

        factory.GetServicioClvEqMedioList = function(ClvServicio) { 
            var deferred = $q.defer();
            var Parametros = {'ClvServicio': ClvServicio};
            var config = {headers:{'Authorization': $localStorage.currentUser.token}};
            $http.post(globalService.getUrl() + paths.GetServicioClvEqMedioList, JSON.stringify(Parametros), config).then(function(response) { 
                deferred.resolve(response.data); 
            }).catch(function(response) { 
                deferred.reject(response.data); 
            });
            return deferred.promise; 
        };

        factory.GetAddServicioClvEqMedio = function(ObjClvEquivalente) { 
            var deferred = $q.defer();
            var Parametros = {'ObjClvEquivalente': ObjClvEquivalente};
            var config = {headers:{'Authorization': $localStorage.currentUser.token}};
            $http.post(globalService.getUrl() + paths.GetAddServicioClvEqMedio, JSON.stringify(Parametros), config).then(function(response) { 
                deferred.resolve(response.data); 
            }).catch(function(response) { 
                deferred.reject(response.data); 
            });
            return deferred.promise; 
        };

        return factory;

    });