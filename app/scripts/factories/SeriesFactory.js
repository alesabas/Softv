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
            AddSerieFolios: '/CatalogoSeries/AddSerieFolios',
            GetReimpresionFoliosExistentesMin: '/ReimprimirFolios/GetReimpresionFoliosExistentesMin',
            GetReimpresionFoliosExistentes: '/ReimprimirFolios/GetReimpresionFoliosExistentes',
            GetReimpresionFolios: '/ReimprimirFolios/GetReimpresionFolios',
            Get_clv_session_Reportes: '/FoliosCancelados/Get_clv_session_Reportes',
            GetConVentasVendedoresPro: '/FoliosCancelados/GetConVentasVendedoresPro',
            GetConVentasVendedoresTmp: '/FoliosCancelados/GetConVentasVendedoresTmp',
            GetInsertarVendedorTmp: '/FoliosCancelados/GetInsertarVendedorTmp',
            GetBorrarVendedorTmp: '/FoliosCancelados/GetBorrarVendedorTmp',
            GetMuestraFoliosCancelados: '/EvidenciasDeCancelados/GetMuestraFoliosCancelados',
            GetDameTipoEvidencia: '/EvidenciasDeCancelados/GetDameTipoEvidencia',
            GetMuestra_Compania_RelUsuarioList: '/Muestra_Compania_RelUsuario/GetMuestra_Compania_RelUsuarioList',
            GetMuestraCatalogoDeRangos: '/Rangos/GetMuestraCatalogoDeRangos',
            GetuspChecaSiGuardaRango: '/Rangos/GetuspChecaSiGuardaRango',
            GetNueCatalogoDeRangos: '/Rangos/GetNueCatalogoDeRangos',
            GetConCatalogoDeRangos: '/Rangos/GetConCatalogoDeRangos',
            GetValidaRangosAEliminar: '/Rangos/GetValidaRangosAEliminar',
            GetModCatalogoDeRangos: '/Rangos/GetModCatalogoDeRangos',
            GetBorCatalogoDeRangos: '/Rangos/GetBorCatalogoDeRangos'
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
            EvidenciaFD.append('file', image); 
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
            var EvidenciaFD = new FormData();
            EvidenciaFD.append('file', objGuardaEvidenciaCancelacionFolio.archivo); 
            EvidenciaFD.append('folio', objGuardaEvidenciaCancelacionFolio.folio);
            EvidenciaFD.append('serie', objGuardaEvidenciaCancelacionFolio.serie);
            EvidenciaFD.append('Clv_Vendedor', objGuardaEvidenciaCancelacionFolio.clv_vendedor);
            EvidenciaFD.append('tipo', objGuardaEvidenciaCancelacionFolio.tipo);
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token, 'Content-Type': undefined}};
            console.log(EvidenciaFD);
            $http.post(globalService.getUrl() + paths.UpdateGuardaEvidenciaCancelacionFolio, EvidenciaFD, config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        }

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

        factory.GetReimpresionFoliosExistentesMin = function(objReimprimirFolios){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'objReimprimirFolios': objReimprimirFolios};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetReimpresionFoliosExistentesMin, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetReimpresionFoliosExistentes = function(objReimprimirFolios){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'objReimprimirFolios': objReimprimirFolios};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetReimpresionFoliosExistentes, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetReimpresionFolios = function(objReimprimirFolios){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'objReimprimirFolios': objReimprimirFolios};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetReimpresionFolios, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.Get_clv_session_Reportes = function(ObjClvSession){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjClvSession': ObjClvSession};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.Get_clv_session_Reportes, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetConVentasVendedoresPro = function(ObjVendedor){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjVendedor': ObjVendedor};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetConVentasVendedoresPro, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetConVentasVendedoresTmp = function(ObjVendedor){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjVendedor': ObjVendedor};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetConVentasVendedoresTmp, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetInsertarVendedorTmp = function(ObjVendedor){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjVendedor': ObjVendedor};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetInsertarVendedorTmp, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetBorrarVendedorTmp = function(ObjVendedor){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjVendedor': ObjVendedor};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetBorrarVendedorTmp, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetMuestraFoliosCancelados = function(ObjFoliosCancelados){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjFoliosCancelados': ObjFoliosCancelados};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetMuestraFoliosCancelados, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetDameTipoEvidencia = function(ObjTipoEvidencia){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjTipoEvidencia': ObjTipoEvidencia};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetDameTipoEvidencia, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetMuestra_Compania_RelUsuarioList = function(ClvUsuario){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ClvUsuario': ClvUsuario};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetMuestra_Compania_RelUsuarioList, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetMuestraCatalogoDeRangos = function(ObjRango){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjRango': ObjRango};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetMuestraCatalogoDeRangos, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetuspChecaSiGuardaRango = function(ObjRango){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjRango': ObjRango};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetuspChecaSiGuardaRango, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetNueCatalogoDeRangos = function(ObjRango){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjRango': ObjRango};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetNueCatalogoDeRangos, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetConCatalogoDeRangos = function(ObjRango){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjRango': ObjRango};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetConCatalogoDeRangos, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetValidaRangosAEliminar = function(ObjRango){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjRango': ObjRango};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetValidaRangosAEliminar, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetModCatalogoDeRangos = function(ObjRango){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjRango': ObjRango};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetModCatalogoDeRangos, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetBorCatalogoDeRangos = function(ObjRango){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjRango': ObjRango};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetBorCatalogoDeRangos, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        return factory;

    });