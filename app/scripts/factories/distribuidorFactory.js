'use strict';
angular
  .module('softvApp')
  .factory('distribuidorFactory', function ($http, $q, globalService, $localStorage) {

    var paths = {
      Getplaza: '/Plaza_DistribuidoresNew/GetPlaza_DistribuidoresNew',
      Getdatoscomerciales: '/Plaza_DistribuidoresNew/Getdatoscomerciales',
      GetMuestra_TipoDistribuidor: '/Plaza_DistribuidoresNew/GetMuestra_TipoDistribuidor',
      UpdatePlaza_DistribuidoresNew: '/Plaza_DistribuidoresNew/UpdatePlaza_DistribuidoresNew',
      AddPlaza_DistribuidoresNew:'/Plaza_DistribuidoresNew/AddPlaza_DistribuidoresNew'
    };

    var factory = {};


   factory.AddPlaza_DistribuidoresNew = function (obj) {
      var deferred = $q.defer();
      var Parametros = {
        'objPlaza_DistribuidoresNew': {
          'Clv_Plaza': 0,
          'Nombre': obj.Nombre,
          'RFC': obj.RFC,
          'Calle': obj.Calle,
          'NumEx': obj.NumEx,
          'NumIn': obj.NumIn,
          'Colonia': obj.Colonia,
          'CP': obj.CP,
          'Localidad': obj.Localidad,
          'Estado': obj.Estado,
          'EntreCalles': obj.EntreCalles,
          'Telefono': obj.Telefono,
          'Fax': obj.Fax,
          'Email': obj.Email,
          'Municipio': obj.Municipio,
          'Pais': obj.Pais,
          'lada1': obj.lada1,
          'lada2': obj.lada2,
          'Telefono2': obj.Telefono2,
          'NombreContacto': obj.NombreContacto,
          'TiposDistribuidor': 0,
          'TelefonoContacto': obj.TelefonoContacto,
          'celularContacto': obj.celularContacto,
          'emailContacto': obj.emailContacto,
          'responsablecomercial': obj.responsablecomercial,
          'responsableOperaciones': obj.responsableOperaciones,
          'responsableAtencion': obj.responsableAtencion,
          'Nombrecomercial': obj.Nombrecomercial,
          'Callecomercial': obj.Callecomercial,
          'NumIntComercial': obj.NumIntComercial,
          'NumExtcomercial': obj.NumExtcomercial,
          'CPcomercial': obj.CPcomercial,
          'ColoniaComercial': obj.ColoniaComercial,
          'EntrecallesComercial': obj.EntrecallesComercial,
          'LocalidadComercial': obj.LocalidadComercial,
          'municipioComercial': obj.municipioComercial,
          'estadoComercial': obj.estadoComercial
                }
      };

     console.log( Parametros);
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.AddPlaza_DistribuidoresNew, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };





    factory.UpdatePlaza_DistribuidoresNew = function (obj) {
      var deferred = $q.defer();

      var Parametros = {

        'objPlaza_DistribuidoresNew': {
          'Clv_Plaza': obj.Clv_Plaza,
          'Nombre': obj.Nombre,
          'RFC': obj.RFC,
          'Calle': obj.Calle,
          'NumEx': obj.NumEx,
          'NumIn': obj.NumIn,
          'Colonia': obj.Colonia,
          'CP': obj.CP,
          'Localidad': obj.Localidad,
          'Estado': obj.Estado,
          'EntreCalles': obj.EntreCalles,
          'Telefono': obj.Telefono,
          'Fax': obj.Fax,
          'Email': obj.Email,
          'Municipio': obj.Municipio,
          'Pais': obj.Pais,
          'lada1': obj.lada1,
          'lada2': obj.lada2,
          'Telefono2': obj.Telefono2,
          'NombreContacto': obj.NombreContacto,
          'TiposDistribuidor': 0,
          'TelefonoContacto': obj.TelefonoContacto,
          'celularContacto': obj.celularContacto,
          'emailContacto': obj.emailContacto,
          'responsablecomercial': obj.responsablecomercial,
          'responsableOperaciones': obj.responsableOperaciones,
          'responsableAtencion': obj.responsableAtencion,
          'Nombrecomercial': obj.Nombrecomercial,
          'Callecomercial': obj.Callecomercial,
          'NumIntComercial': obj.NumIntComercial,
          'NumExtcomercial': obj.NumExtcomercial,
          'CPcomercial': obj.CPcomercial,
          'ColoniaComercial': obj.ColoniaComercial,
          'EntrecallesComercial': obj.EntrecallesComercial,
          'LocalidadComercial': obj.LocalidadComercial,
          'municipioComercial': obj.municipioComercial,
          'estadoComercial': obj.estadoComercial


        }
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.UpdatePlaza_DistribuidoresNew, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };




    factory.GetMuestra_TipoDistribuidor = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetMuestra_TipoDistribuidor, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };


    factory.Getdatoscomerciales = function (Clv_plaza) {
      var deferred = $q.defer();

      var Parametros = {
        'Clv_plaza': Clv_plaza,

      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.Getdatoscomerciales, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.Getplaza = function (Clv_plaza, Nombre) {
      var deferred = $q.defer();

      var Parametros = {
        'Clv_plaza': Clv_plaza,
        'Nombre': Nombre
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.Getplaza, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    return factory;


  });
