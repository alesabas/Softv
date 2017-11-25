'use strict';

angular
    .module('softvApp')
    .factory('SeriesFactory', function($http, $q, globalService, $localStorage){

        var factory = {};
        var paths = {
            GetCatalogoSeriesList: '/CatalogoSeries/GetCatalogoSeriesList'
        };

        factory.GetCatalogoSeriesList = function(ObjSeriesList){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = ObjSeriesList;
            console.log(Parametros);
            console.log(JSON.stringify(Parametros));
            $http.post(globalService.getUrl() + paths.GetCatalogoSeriesList, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        return factory;

    });