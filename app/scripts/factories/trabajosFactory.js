'use strict';
angular.module('softvApp')
  .factory('trabajosFactory', function ($http, $q, globalService, $localStorage) {
    var factory = {};
    var paths = {
      GetSoftv_GetTrabajoByClv_TipSer: '/AreaTecnica/GetSoftv_GetTrabajoByClv_TipSer',
      GetMuestra_Imputables: '/AreaTecnica/GetMuestra_Imputables',
      GetMuestra_Articulos_Acometida: '/AreaTecnica/GetMuestra_Articulos_Acometida',
      GetMuestra_Articulos_Clasificacion: '/AreaTecnica/GetMuestra_Articulos_Clasificacion',
      GetConsultaRelMaterialTrabajos: '/AreaTecnica/GetConsultaRelMaterialTrabajos',
      GetSoftv_AddRelMaterialTrabajo: '/AreaTecnica/GetSoftv_AddRelMaterialTrabajo',
      GetSoftv_DeleteRelMaterialTrabajo: '/AreaTecnica/GetSoftv_DeleteRelMaterialTrabajo',
      GetSoftv_AddTrabajo: '/AreaTecnica/GetSoftv_AddTrabajo',
      GetSoftv_GetTrabajoById: '/AreaTecnica/GetSoftv_GetTrabajoById',
      GetSoftv_EditTrabajo: '/AreaTecnica/GetSoftv_EditTrabajo',
      GetGuarda_imputablePorTrabajo:'/AreaTecnica/GetGuarda_imputablePorTrabajo'
    };
     
    factory.GetGuarda_imputablePorTrabajo = function (Clv_Trabajo,imputable) {
      var deferred = $q.defer();
      var params = {
        'Clv_Trabajo': Clv_Trabajo,
        'imputable':imputable
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetGuarda_imputablePorTrabajo, params, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetSoftv_EditTrabajo = function (obj) {
      var deferred = $q.defer();
      var params = {
        'trabajo': {
          'Clv_Trabajo': obj.Clv_Trabajo,
          'clv_tipser': obj.clv_tipser,
          'trabajo': obj.trabajo,
          'descripcion': obj.descripcion,
          'puntos': obj.puntos,
          'cobranza': obj.cobranza,
          'tipo': obj.tipo,
          'prospectos': obj.prospectos,
          'sica': obj.sica,
          'secobramaterial': obj.secobramaterial
        }
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetSoftv_EditTrabajo, params, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GetSoftv_GetTrabajoById = function (clvtrabajo) {
      var deferred = $q.defer();
      var params = {
        'clvtrabajo': clvtrabajo
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetSoftv_GetTrabajoById, params, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GetSoftv_AddTrabajo = function (obj) {
      var deferred = $q.defer();
      var params = {
        'trabajo': {

          'clv_tipser': obj.clv_tipser,
          'trabajo': obj.trabajo,
          'descripcion': obj.descripcion,
          'puntos': obj.puntos,
          'cobranza': obj.cobranza,
          'tipo': obj.tipo,
          'prospectos': obj.prospectos,
          'sica': obj.sica,
          'secobramaterial': obj.secobramaterial

        }

      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetSoftv_AddTrabajo, params, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GetSoftv_DeleteRelMaterialTrabajo = function (Clv_Material) {
      var deferred = $q.defer();
      var params = {
        'Clv_Material': Clv_Material
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetSoftv_DeleteRelMaterialTrabajo, params, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GetSoftv_AddRelMaterialTrabajo = function (Clv_TipoArticulo, Clv_Articulo, Cantidad, Clv_Trabajo, Clv_TipSer) {
      var deferred = $q.defer();
      var params = {
        'Clv_TipoArticulo': Clv_TipoArticulo,
        'Clv_Articulo': Clv_Articulo,
        'Cantidad': Cantidad,
        'Clv_Trabajo': Clv_Trabajo,
        'Clv_TipSer': Clv_TipSer
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetSoftv_AddRelMaterialTrabajo, params, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GetMuestra_Articulos_Acometida = function () {
      var deferred = $q.defer();

      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetMuestra_Articulos_Acometida, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };



    factory.GetMuestra_Imputables = function () {
      var deferred = $q.defer();

      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetMuestra_Imputables, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GetSoftv_GetTrabajoByClv_TipSer = function (Clv_TipSer) {
      var deferred = $q.defer();
      var params = {
        'Clv_TipSer': Clv_TipSer
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetSoftv_GetTrabajoByClv_TipSer, params, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GetMuestra_Articulos_Clasificacion = function (clvtipo) {
      var deferred = $q.defer();
      var params = {
        'clvtipo': clvtipo
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetMuestra_Articulos_Clasificacion, params, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetConsultaRelMaterialTrabajos = function (clvtrabajo) {
      var deferred = $q.defer();
      var params = {
        'clvtrabajo': clvtrabajo
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetConsultaRelMaterialTrabajos, params, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    return factory;
  });
