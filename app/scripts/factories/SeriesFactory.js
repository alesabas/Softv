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
            GetFolio_DisponibleList: '/Folio_Disponible/GetFolio_DisponibleList',
            UpdateCancela_Folios: '/Cancela_Folios/UpdateCancela_Folios',
            GetimageToByteArray: '/GuardaEvidenciaCancelacionFolio/GetimageToByteArray',
            UpdateGuardaEvidenciaCancelacionFolio: '/GuardaEvidenciaCancelacionFolio/UpdateGuardaEvidenciaCancelacionFolio',
            GetSP_SerieFolioList: '/SP_SerieFolio/GetSP_SerieFolioList',
            AddDameTipoSerie: '/DameTipoSerie/AddDameTipoSerie',
            AddValidaFoliosImprimir: '/ValidaFoliosImprimir/AddValidaFoliosImprimir',
            AddFolios: '/CatalogoSeries/AddFolios',
            AddSerieFolios: '/CatalogoSeries/AddSerieFolios'
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

        factory.UpdateCancela_Folios = function(objCancela_Folios){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'objCancela_Folios': objCancela_Folios};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.UpdateCancela_Folios, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetimageToByteArray = function(image){
            var EvidenciaFD = new FormData();
            //EvidenciaFD.append('file', image);
                
                EvidenciaFD.append('file', image); 
                /*
                EvidenciaFD.append('folio', JSON.stringify(folio));
                EvidenciaFD.append('serie', JSON.stringify(serie));
                EvidenciaFD.append('Clv_Vendedor', JSON.stringify(Clv_Vendedor));
                EvidenciaFD.append('tipo', JSON.stringify(tipo));
                */
                
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token, 'Content-Type': undefined}};
            $http.post(globalService.getUrl() + paths.GetimageToByteArray, EvidenciaFD, config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.UpdateGuardaEvidenciaCancelacionFolio = function(objGuardaEvidenciaCancelacionFolio){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'objGuardaEvidenciaCancelacionFolio': objGuardaEvidenciaCancelacionFolio};
            console.log(JSON.stringify(Parametros));
            /*
            $http.post(globalService.getUrl() + paths.UpdateGuardaEvidenciaCancelacionFolio, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            */
            return deferred.promise;
        };

        factory.GetSP_SerieFolioList = function(ClvUsuario){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ClvUsuario': ClvUsuario};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetSP_SerieFolioList, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.AddDameTipoSerie = function(objDameTipoSerie){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'objDameTipoSerie': objDameTipoSerie};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.AddDameTipoSerie, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.AddValidaFoliosImprimir = function(objValidaFoliosImprimir){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'objValidaFoliosImprimir': objValidaFoliosImprimir};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.AddValidaFoliosImprimir, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.AddFolios = function(objCatalogoSeries){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'objCatalogoSeries': objCatalogoSeries};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.AddFolios, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.AddSerieFolios = function(objCatalogoSeries){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'objCatalogoSeries': objCatalogoSeries};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.AddSerieFolios, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        return factory;

    });