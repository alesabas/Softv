'use strict';

angular
    .module('softvApp')
    .factory('DocVendedorClienteFactory', function($http, $q, globalService, $localStorage){
    
        var factory = {};
        var paths = {
            GetDameDocumentosVendedor: '/DocumentosVendedoresClientes/GetDameDocumentosVendedor',
            GetDameDocumentosVendedorGrid: '/DocumentosVendedoresClientes/GetDameDocumentosVendedorGrid',
            GetGuardaDocumentoPDFVendedor: '/DocumentosVendedoresClientes/GetGuardaDocumentoPDFVendedor',
            GetDimeTipoDocumentoVendedor: '/DocumentosVendedoresClientes/GetDimeTipoDocumentoVendedor',
            GetValidaPerfilActivarChecksDocumentos: '/DocumentosVendedoresClientes/GetValidaPerfilActivarChecksDocumentos',
            GetDameDocumentos: '/DocumentosVendedoresClientes/GetDameDocumentos',
            GetDameOpcionesDocumentos: '/DocumentosVendedoresClientes/GetDameOpcionesDocumentos',
            GetDameDocumentosContrato: '/DocumentosVendedoresClientes/GetDameDocumentosContrato',
            GetGuardaDocumentoPDF: '/DocumentosVendedoresClientes/GetGuardaDocumentoPDF',
            GetModificaRevisado: '/DocumentosVendedoresClientes/GetModificaRevisado',
            GetModificaRecibido: '/DocumentosVendedoresClientes/GetModificaRecibido',
            GetDimeTipoDocumento: '/DocumentosVendedoresClientes/GetDimeTipoDocumento',
            GetDocumentoVendedorWeb: '/DocumentosVendedoresClientes/GetDocumentoVendedorWeb',
            GetDocumentoClienteWeb: '/DocumentosVendedoresClientes/GetDocumentoClienteWeb'
        };

        factory.GetDameDocumentosVendedor = function(){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            $http.get(globalService.getUrl() + paths.GetDameDocumentosVendedor, config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetDameDocumentosVendedorGrid = function(clv_vendedor){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'clv_vendedor': clv_vendedor};
            $http.post(globalService.getUrl() + paths.GetDameDocumentosVendedorGrid, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetGuardaDocumentoPDFVendedor = function(EvidenciaFD){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token, 'Content-Type': undefined}};
            $http.post(globalService.getUrl() + paths.GetGuardaDocumentoPDFVendedor, EvidenciaFD, config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetDimeTipoDocumentoVendedor = function(ObjTipoDocumento){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjTipoDocumento': ObjTipoDocumento};
            $http.post(globalService.getUrl() + paths.GetDimeTipoDocumentoVendedor, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetDocumentoVendedorWeb = function(ObjDocumentoVendedor){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjDocumentoVendedor': ObjDocumentoVendedor};
            $http.post(globalService.getUrl() + paths.GetDocumentoVendedorWeb, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetValidaPerfilActivarChecksDocumentos = function(clv_tipousuario){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'clv_tipousuario': clv_tipousuario};
            $http.post(globalService.getUrl() + paths.GetValidaPerfilActivarChecksDocumentos, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetDameDocumentos = function(contrato){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'contrato': contrato};
            $http.post(globalService.getUrl() + paths.GetDameDocumentos, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetDameOpcionesDocumentos = function(contrato){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'contrato': contrato};
            $http.post(globalService.getUrl() + paths.GetDameOpcionesDocumentos, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetDameDocumentosContrato = function(contrato){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'contrato': contrato};
            $http.post(globalService.getUrl() + paths.GetDameDocumentosContrato, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetGuardaDocumentoPDF = function(EvidenciaFD){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token, 'Content-Type': undefined}};
            $http.post(globalService.getUrl() + paths.GetGuardaDocumentoPDF, EvidenciaFD, config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetDimeTipoDocumento = function(ObjDocumento){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjDocumento': ObjDocumento};
            $http.post(globalService.getUrl() + paths.GetDimeTipoDocumento, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetDocumentoClienteWeb = function(ObjDocumentoCliente){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjDocumentoCliente': ObjDocumentoCliente};
            $http.post(globalService.getUrl() + paths.GetDocumentoClienteWeb, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetModificaRevisado = function(ObjRevisado){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjRevisado': ObjRevisado};
            $http.post(globalService.getUrl() + paths.GetModificaRevisado, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetModificaRecibido = function(ObjRecibido){
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'ObjRecibido': ObjRecibido};
            $http.post(globalService.getUrl() + paths.GetModificaRecibido, JSON.stringify(Parametros), config).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };

        return factory;

    });