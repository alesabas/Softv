'use strict';

angular
    .module('softvApp')
    .factory('RecontratacionFactory', function($http, $q, globalService, $localStorage){

        var factory = {};
        var paths = {
            Get_uspConsultaColoniasPorUsuario: '/Recontratacion/Get_uspConsultaColoniasPorUsuario',
            Get_uspBusCliPorContratoSeparadoEnBaja: '/Recontratacion/Get_uspBusCliPorContratoSeparadoEnBaja',
            GetInfoContratoEnBaja: '/Recontratacion/GetInfoContratoEnBaja',
            GetDameClv_Session: '/Recontratacion/GetDameClv_Session',
            GetServiciosEnBaja: '/Recontratacion/GetServiciosEnBaja',
            GetAddServiciosEnBaja: '/Recontratacion/GetAddServiciosEnBaja',
            GetListaAparatosEnBaja: '/Recontratacion/GetListaAparatosEnBaja',
            GetAddApararoEnBaja: '/Recontratacion/GetAddApararoEnBaja',
            GetAddPaqueteAdicionalEnBaja: '/Recontratacion/GetAddPaqueteAdicionalEnBaja',
            GetArbolRecontratacion: '/Recontratacion/GetArbolRecontratacion',
            GetGrabaReContratacion: '/Recontratacion/GetGrabaReContratacion',
            GetBorReconSession: '/Recontratacion/GetBorReconSession',
            GetuspCobraAdeudo_CuandoRecontrata_Msj: '/Recontratacion/GetuspCobraAdeudo_CuandoRecontrata_Msj',
        };

        factory.Get_uspConsultaColoniasPorUsuario = function(){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ClvUsuario': $localStorage.currentUser.idUsuario};
            $http.post(globalService.getUrl() + paths.Get_uspConsultaColoniasPorUsuario, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.Get_uspBusCliPorContratoSeparadoEnBaja = function(ObjCliente){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjCliente': ObjCliente};
            $http.post(globalService.getUrl() + paths.Get_uspBusCliPorContratoSeparadoEnBaja, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetInfoContratoEnBaja = function(ObjCliente){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = ObjCliente;
            $http.post(globalService.getUrl() + paths.GetInfoContratoEnBaja, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetDameClv_Session = function(){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            $http.get(globalService.getUrl() + paths.GetDameClv_Session, config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetServiciosEnBaja = function(Obj){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = Obj;
            $http.post(globalService.getUrl() + paths.GetServiciosEnBaja, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };
        
        factory.GetAddServiciosEnBaja = function(ObjRecontracion){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjRecontracion': ObjRecontracion};
            $http.post(globalService.getUrl() + paths.GetAddServiciosEnBaja, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetListaAparatosEnBaja = function(ObjDet){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = ObjDet;
            $http.post(globalService.getUrl() + paths.GetListaAparatosEnBaja, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetAddApararoEnBaja = function(ObjRecontratacion){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjRecontratacion': ObjRecontratacion};
            $http.post(globalService.getUrl() + paths.GetAddApararoEnBaja, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetAddPaqueteAdicionalEnBaja = function(ObjRecontracion){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjRecontracion': ObjRecontracion};
            $http.post(globalService.getUrl() + paths.GetAddPaqueteAdicionalEnBaja, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetArbolRecontratacion = function(ClvSession){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ClvSession': ClvSession};
            $http.post(globalService.getUrl() + paths.GetArbolRecontratacion, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetGrabaReContratacion = function(ObjRecontratacion){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = ObjRecontratacion;
            $http.post(globalService.getUrl() + paths.GetGrabaReContratacion, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetBorReconSession = function(CLVSESSION){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'CLVSESSION': CLVSESSION};
            $http.post(globalService.getUrl() + paths.GetBorReconSession, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetuspCobraAdeudo_CuandoRecontrata_Msj = function(IdContrato){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'IdContrato': IdContrato};
            $http.post(globalService.getUrl() + paths.GetuspCobraAdeudo_CuandoRecontrata_Msj, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        return factory;

     });