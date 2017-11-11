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
            GetListCombo: '/catalogoIps_dos/GetListCombo',
            GetGeneral_Sistema_II: '/General_Sistema_II/GetGeneral_Sistema_II',
            GetRelRedPlazaList: '/RelRedPlaza/GetRelRedPlazaList',
            GetRelRedPlaza_Inc: '/RelRedPlaza/GetRelRedPlaza_Inc',
            UpdateRelRedPlaza: '/RelRedPlaza/UpdateRelRedPlaza',
            GetRelRedCompaniaList: '/RelRedCompania/GetRelRedCompaniaList',
            GetRelRedCompania_Inc: '/RelRedCompania/GetRelRedCompania_Inc',
            UpdateRelRedCompania: '/RelRedCompania/UpdateRelRedCompania',
            GetRelRedEstado_Dis: '/RelRedEstado/GetRelRedEstado_Dis',
            GetRelRedEstadoList: '/RelRedEstado/GetRelRedEstadoList',
            UpdateRelRedEstado: '/RelRedEstado/UpdateRelRedEstado',
            GetRelRedCiudad_Dis: '/RelRedCiudad/GetRelRedCiudad_Dis',
            GetRelRedCiudadList: '/RelRedCiudad/GetRelRedCiudadList',
            UpdateRelRedCiudad: '/RelRedCiudad/UpdateRelRedCiudad',
            GetRelRedLocalidadList: '/RelRedLocalidad/GetRelRedLocalidadList',
            GetRelRedLocalidad_inc: '/RelRedLocalidad/GetRelRedLocalidad_inc',
            UpdateRelRedLocalidad: '/RelRedLocalidad/UpdateRelRedLocalidad',
            GetRelRedMedioList: '/RelRedMedio/GetRelRedMedioList',
            GetRelRedMedio_Inc: '/RelRedMedio/GetRelRedMedio_Inc',
            UpdateRelRedMedio: '/RelRedMedio/UpdateRelRedMedio'
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

        factory.GetGeneral_Sistema_II = function () {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            $http.get(globalService.getUrl() + paths.GetGeneral_Sistema_II, config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetRelRedPlazaList = function (IdRed) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'IdRed': IdRed};
            $http.post(globalService.getUrl() + paths.GetRelRedPlazaList, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetRelRedPlaza_Inc = function (IdRed) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'IdRed': IdRed};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetRelRedPlaza_Inc, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.UpdateRelRedPlaza = function (objRelRedPlaza) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'objRelRedPlaza': objRelRedPlaza};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.UpdateRelRedPlaza, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetRelRedCompaniaList = function (IdRed) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'IdRed': IdRed};
            $http.post(globalService.getUrl() + paths.GetRelRedCompaniaList, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetRelRedCompania_Inc = function (IdRed) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'IdRed': IdRed};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetRelRedCompania_Inc, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.UpdateRelRedCompania = function (objRelRedCompania) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'objRelRedCompania': objRelRedCompania};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.UpdateRelRedCompania, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetRelRedEstado_Dis = function (IdRed) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'IdRed': IdRed};
            $http.post(globalService.getUrl() + paths.GetRelRedEstado_Dis, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetRelRedEstadoList = function (IdRed) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'IdRed': IdRed};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetRelRedEstadoList, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.UpdateRelRedEstado = function (objRelRedEstado) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'objRelRedEstado': objRelRedEstado};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.UpdateRelRedEstado, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetRelRedCiudad_Dis = function (IdRed) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'IdRed': IdRed};
            $http.post(globalService.getUrl() + paths.GetRelRedCiudad_Dis, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetRelRedCiudadList = function (IdRed) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'IdRed': IdRed};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetRelRedCiudadList, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.UpdateRelRedCiudad = function (objRelRedCiudad) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'objRelRedCiudad': objRelRedCiudad};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.UpdateRelRedCiudad, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetRelRedLocalidadList = function (IdRed) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'IdRed': IdRed};
            $http.post(globalService.getUrl() + paths.GetRelRedLocalidadList, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetRelRedLocalidad_inc = function (IdRed) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'IdRed': IdRed};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetRelRedLocalidad_inc, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.UpdateRelRedLocalidad = function (objRelRedLocalidad) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'objRelRedLocalidad': objRelRedLocalidad};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.UpdateRelRedLocalidad, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetRelRedMedioList = function (IdRed) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'IdRed': IdRed};
            $http.post(globalService.getUrl() + paths.GetRelRedMedioList, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.GetRelRedMedio_Inc = function (IdRed) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'IdRed': IdRed};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.GetRelRedMedio_Inc, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        factory.UpdateRelRedMedio = function (objRelRedMedio) {
            var deferred = $q.defer();
            var config = {headers: {'Authorization': $localStorage.currentUser.token}};
            var Parametros = {'objRelRedMedio': objRelRedMedio};
            console.log(Parametros);
            $http.post(globalService.getUrl() + paths.UpdateRelRedMedio, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        return factory;

    });