'use strict';

angular
    .module('softvApp').
    service('fileUpload', ['$http', '$q', 'globalService', '$localStorage', function ($http, $q, globalService, $localStorage) {
    
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
            GetFolio_DisponibleList: '/Folio_Disponible/GetFolio_DisponibleList',
            UpdateCancela_Folios: '/Cancela_Folios/UpdateCancela_Folios',
            UpdateGuardaEvidenciaCancelacionFolio: '/GuardaEvidenciaCancelacionFolio/UpdateGuardaEvidenciaCancelacionFolio',
            imageToByteArray: '/GuardaEvidenciaCancelacionFolio/imageToByteArray',
            GetSP_SerieFolioList: '/SP_SerieFolio/GetSP_SerieFolioList',
            AddDameTipoSerie: '/DameTipoSerie/AddDameTipoSerie',
            AddValidaFoliosImprimir: '/ValidaFoliosImprimir/AddValidaFoliosImprimir',
            AddFolios: '/CatalogoSeries/AddFolios',
            AddSerieFolios: '/CatalogoSeries/AddSerieFolios'
        };
    
    this.uploadFileToUrl = function(file){
        var fd = new FormData();
        fd.append('file', file);
        var Parametros = {'image': fd};
        $http.post(globalService.getUrl() + paths.imageToByteArray, fd, {
            transformRequest: angular.identity,
            headers: {'Authorization': $localStorage.currentUser.token,'Content-Type': undefined}
        });
    }

    function getRequestParams() {
            	var params = {
                    'name': name,
                    'locationType': "none",
                    'layerInfo': {fields:[{
                        "name" : "street",
                        "type" : "esriFieldTypeString",
                        "alias" : "Street",
                        "nullable" : false,
                        "editable" : true,
                        "domain" : null
                    }]}
                };
                
                return JSON.stringify(params);
            }

    /*
    factory.imageToByteArray = function(image){
            
            var EvidenciaFD = new FormData();
            EvidenciaFD.append('file', image);

            var deferred = $q.defer();
            var config = {
                            transformRequest: angular.identity,
                            headers: {'Authorization': $localStorage.currentUser.token, 'Content-Type': 'multipart/form-data'}};
            var Parametros = {'image': image};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.imageToByteArray, EvidenciaFD, 
            {
                transformRequest: angular.identity,
                headers: {'Authorization': $localStorage.currentUser.token, 'Content-Type': 'multipart/form-data'}
            }
            ).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };
    */
}]);