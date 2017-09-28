'use strict';

angular
    .module('softvApp')
    .factory('DevolucionAlmacenFactory', function ($http, $q, globalService, $localStorage) {

        var factory = {};
        var paths = {
            GetMUESTRADevolucionAparatosAlmacen: '/Procesos/GetMUESTRADevolucionAparatosAlmacen',
            GetPROCESODevolucionAparatosAlmacen: '/Procesos/GetPROCESODevolucionAparatosAlmacen'
        };
        
        factory.GetMUESTRADevolucionAparatosAlmacen = function (ObjDevolucion) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = ObjDevolucion;
            console.log(JSON.stringify(Parametros));
            $http.post(globalService.getUrl() + paths.GetMUESTRADevolucionAparatosAlmacen, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetPROCESODevolucionAparatosAlmacen = function (ObjDevolucion) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {
                'CLV_ORDEN': ObjDevolucion.CLV_ORDEN,
                'TIPOAPARATO': ObjDevolucion.TIPOAPARATO,
                'CLV_CABLEMODEM': ObjDevolucion.CLV_CABLEMODEM,
                'MACCABLEMODEM': ObjDevolucion.MACCABLEMODEM,
                'ESTADOAPARATO': ObjDevolucion.ESTADOAPARATO,
                'USUARIO': $localStorage.currentUser.usuario,                
                'PROVIENE': ObjDevolucion.PROVIENE,
                'MARCA': ObjDevolucion.MARCA
            };
            console.log(JSON.stringify(Parametros));
            $http.post(globalService.getUrl() + paths.GetPROCESODevolucionAparatosAlmacen, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        return factory;
    });