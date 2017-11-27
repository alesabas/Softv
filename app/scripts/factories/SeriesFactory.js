'use strict';

angular
    .module('softvApp')
    .factory('SeriesFactory', function($http, $q, globalService, $localStorage){

        var factory = {};
        var paths = {
            GetCatalogoSeriesList: '/CatalogoSeries/GetCatalogoSeriesList',
            GetVendedoresList: '/Vendedores/GetVendedoresList',
            GetVALIDACatalogoSeries: '/VALIDACatalogoSeries/GetVALIDACatalogoSeries',
            AddCatalogoSeries: '/CatalogoSeries/AddCatalogoSeries',
            GetDeepCatalogoSeries: '/CatalogoSeries/GetDeepCatalogoSeries',
            UpdateCatalogoSeries: '/CatalogoSeries/UpdateCatalogoSeries',
            DeleteCatalogoSeries: '/CatalogoSeries/DeleteCatalogoSeries',
            GetVendedores_dosList: '/Vendedores/GetVendedores_dosList',
            GetUltimo_SERIEYFOLIOList:'/Ultimo_SERIEYFOLIO/GetUltimo_SERIEYFOLIOList',
            GetFolio_DisponibleList: '/Folio_Disponible/GetFolio_DisponibleList'
        };

        factory.GetCatalogoSeriesList = function(ObjSeriesList){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = ObjSeriesList;
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetCatalogoSeriesList, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetVendedoresList = function(ObjVendedorList){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = ObjVendedorList;
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetVendedoresList, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetVALIDACatalogoSeries = function(ObjValidaSerie){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = ObjValidaSerie;
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetVALIDACatalogoSeries, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.AddCatalogoSeries = function(objCatalogoSeries){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'objCatalogoSeries': objCatalogoSeries};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.AddCatalogoSeries, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetDeepCatalogoSeries = function(Clave){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'Clave': Clave};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetDeepCatalogoSeries, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.UpdateCatalogoSeries = function(objCatalogoSeries){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'objCatalogoSeries': objCatalogoSeries};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.UpdateCatalogoSeries, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.DeleteCatalogoSeries = function(Clave){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'Clave': Clave};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.DeleteCatalogoSeries, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetVendedores_dosList = function(ObjVendedorList){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = ObjVendedorList;
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetVendedores_dosList, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetUltimo_SERIEYFOLIOList = function(ObjSerieList){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = ObjSerieList;
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetUltimo_SERIEYFOLIOList, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetFolio_DisponibleList = function(ObjFolioDisponibleList){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = ObjFolioDisponibleList;
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetFolio_DisponibleList, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        return factory;

    });