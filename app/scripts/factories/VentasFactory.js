'use strict';

angular
    .module('softvApp')
    .factory('VentasFactory', function($http, $q, globalService, $localStorage){

        var factory = {};
        var paths = {
            GetBUSCAVENDEDORESList: '/BUSCAVENDEDORES/GetBUSCAVENDEDORESList',
            AddVendedores: '/Vendedores/AddVendedores',
            GetDeepVendedores: '/Vendedores/GetDeepVendedores',
            UpdateVendedores: '/Vendedores/UpdateVendedores',
            DeleteVendedores: '/Vendedores/DeleteVendedores',
            GetMuestra_PlazasPorUsuarioList: '/Muestra_PlazasPorUsuario/GetMuestra_PlazasPorUsuarioList'
        };

        factory.GetMuestra_PlazasPorUsuarioList = function(Clv_Usuario){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'Clv_Usuario': Clv_Usuario};
            $http.post(globalService.getUrl() + paths.GetMuestra_PlazasPorUsuarioList, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetBUSCAVENDEDORESList = function(ObjVendedorList){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = ObjVendedorList;
            $http.post(globalService.getUrl() + paths.GetBUSCAVENDEDORESList, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        }; 

        factory.AddVendedores = function(objVendedores){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'objVendedores': objVendedores};
            $http.post(globalService.getUrl() + paths.AddVendedores, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetDeepVendedores = function(Clv_Vendedor){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {Clv_Vendedor: Clv_Vendedor};
            $http.post(globalService.getUrl() + paths.GetDeepVendedores, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.UpdateVendedores = function(objVendedores){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {objVendedores: objVendedores};
            $http.post(globalService.getUrl() + paths.UpdateVendedores, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.DeleteVendedores = function(Clv_Vendedor){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {Clv_Vendedor: Clv_Vendedor};
            $http.post(globalService.getUrl() + paths.DeleteVendedores, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        return factory;

    });