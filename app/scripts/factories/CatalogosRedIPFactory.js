'use strict'

angular

    .module('softvApp')
    .factory('CatalogosRedIPFactory', function($http, $q, globalService, $localStorage){
        
        var factory = {};
        var paths = {
            GetCatalogo_IpsList: '/Catalogo_Ips/GetCatalogo_IpsList',
            GetListCatalogo_Ips: '/Catalogo_Ips/GetListCatalogo_Ips',
            GetDeepCatalogo_Ips: '/Catalogo_Ips/GetDeepCatalogo_Ips',
            GetcatalogoIps_dosList: '/catalogoIps_dos/GetcatalogoIps_dosList',
            UpdatecatalogoIps_dos: '/catalogoIps_dos/UpdatecatalogoIps_dos',
            GetDeepcatalogoIps_dos: '/catalogoIps_dos/GetDeepcatalogoIps_dos',
            GetListCombo: '/catalogoIps_dos/GetListCombo'
        };

        factory.GetCatalogo_IpsList = function (ObjRedIP) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = ObjRedIP;
            $http.post(globalService.getUrl() + paths.GetCatalogo_IpsList, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetListCatalogo_Ips = function (ObjRedList) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = ObjRedList;
            $http.post(globalService.getUrl() + paths.GetListCatalogo_Ips, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetDeepCatalogo_Ips = function (IdRed) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'IdRed': IdRed};
            $http.post(globalService.getUrl() + paths.GetDeepCatalogo_Ips, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetcatalogoIps_dosList = function (ObjIPList) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = ObjIPList;
            $http.post(globalService.getUrl() + paths.GetcatalogoIps_dosList, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.UpdatecatalogoIps_dos = function (objcatalogoIps_dos) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros =  {'objcatalogoIps_dos':objcatalogoIps_dos };
            $http.post(globalService.getUrl() + paths.UpdatecatalogoIps_dos, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetDeepcatalogoIps_dos = function (IdIp) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'IdIP': IdIp};
            $http.post(globalService.getUrl() + paths.GetDeepcatalogoIps_dos, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetListCombo = function () {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            $http.get(globalService.getUrl() + paths.GetListCombo, config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        return factory;

    });