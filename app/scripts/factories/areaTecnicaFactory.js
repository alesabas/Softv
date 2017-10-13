'use strict';
angular
  .module('softvApp')
  .factory('areaTecnicaFactory', function ($http, $q, globalService, $localStorage) {
    var paths = {
      GetSectores: '/AreaTecnica/GetConSector',
      GetColoniasSec: '/AreaTecnica/GetMuestraColoniaSec',
      GetConRelSectorColonia: '/AreaTecnica/GetConRelSectorColonia',
      GetNueSector: '/AreaTecnica/GetNueSector',
      GetNueRelSectorColonia: '/AreaTecnica/GetNueRelSectorColonia',
      GetBorRelSectorColonia: '/AreaTecnica/GetBorRelSectorColonia ',
      GetModSector: '/AreaTecnica/GetModSector',
      GetMuestraPostes: '/ColoniaCAMDO/GetMuestraDescPoste',
      GetNuePoste: '/ColoniaCAMDO/AddInsertaNueDescPoste',
      GetBorSector: '/AreaTecnica/GetBorSector',
      GetConHub: '/AreaTecnica/GetConHub',
      GetNueHub: '/AreaTecnica/GetNueHub',
      GetMuestraColoniaHub: '/AreaTecnica/GetMuestraColoniaHub',
      GetConRelHubColonia: '/AreaTecnica/GetConRelHubColonia',
      GetNueRelHubColonia: '/AreaTecnica/GetNueRelHubColonia',
      GetModHub: '/AreaTecnica/GetModHub',
      GetBorHub: '/AreaTecnica/GetBorHub',
      GetMuestraDescOlt: '/AreaTecnica/GetMuestraDescOlt',
      GetInsertaNueDescOlt: '/AreaTecnica/GetInsertaNueDescOlt',
      GetCONSULTAnap:'/AreaTecnica/GetCONSULTAnap'
    };
    var factory = {};
    
  factory.GetCONSULTAnap = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Op': obj.Op,
        'IdTap': obj.IdTap,
        'Clave':obj.Clave,
        'Sector':obj.Sector,
        'Poste':obj.Poste,
        'Colonia':obj.Colonia,
        'Calle':obj.Calle
      };
      $http.post(globalService.getUrl() + paths.GetCONSULTAnap, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };




    factory.GetInsertaNueDescOlt = function (Clave, Descripcion) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clave': Clave,
        'Descripcion': Descripcion
      };
      $http.post(globalService.getUrl() + paths.GetInsertaNueDescOlt, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMuestraDescOlt = function (op) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'op': op

      };
      $http.post(globalService.getUrl() + paths.GetMuestraDescOlt, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetBorHub = function (Clv_Sector) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Sector': Clv_Sector

      };
      $http.post(globalService.getUrl() + paths.GetBorHub, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetModHub = function (Clv_Sector, Clv_Txt, Descripcion) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Sector': Clv_Sector,
        'Clv_Txt': Clv_Txt,
        'Descripcion': Descripcion
      };
      $http.post(globalService.getUrl() + paths.GetModHub, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };




    factory.GetNueRelHubColonia = function (Clv_Sector, Clv_Colonia) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Sector': Clv_Sector,
        'Clv_Colonia': Clv_Colonia
      };
      $http.post(globalService.getUrl() + paths.GetNueRelHubColonia, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };



    factory.GetConRelHubColonia = function (Clv_Sector) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Sector': Clv_Sector
      };
      $http.post(globalService.getUrl() + paths.GetConRelHubColonia, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMuestraColoniaHub = function (Clv_Colonia, Clv_Sector, Op) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Colonia': Clv_Colonia,
        'Clv_Sector': Clv_Sector,
        'Op': Op,

      };
      $http.post(globalService.getUrl() + paths.GetMuestraColoniaHub, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GetNueHub = function (op, Clv_Txt, Descripcion) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'op': op,
        'Clv_Txt': Clv_Txt,
        'Descripcion': Descripcion,

      };
      $http.post(globalService.getUrl() + paths.GetNueHub, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetConHub = function (Clv_Sector, Clv_Txt, Descripcion, Op) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Sector': Clv_Sector,
        'Clv_Txt': Clv_Txt,
        'Descripcion': Descripcion,
        'Op': Op
      };
      $http.post(globalService.getUrl() + paths.GetConHub, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };



    factory.GetBorSector = function (Clv_Sector) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Sector': Clv_Sector
      };

      $http.post(globalService.getUrl() + paths.GetBorSector, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };



    factory.GetBorSector = function (Clv_Sector) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Sector': Clv_Sector
      };

      $http.post(globalService.getUrl() + paths.GetBorSector, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetSectores = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'clvsector': obj.clvsector,
        'descripcion': obj.descripcion,
        'clv_txt': obj.clv_txt,
        'op': obj.op,
        'clv_usuario': $localStorage.currentUser.idUsuario

      };

      $http.post(globalService.getUrl() + paths.GetSectores, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GetColonias = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Colonia': obj.clvcolonia,
        'Clv_Sector': obj.clvsector,
        'op': 0,
        'clv_usuario': $localStorage.currentUser.idUsuario

      };

      $http.post(globalService.getUrl() + paths.GetColoniasSec, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetConRelSectorColonia = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Sector': obj.Clv_Sector
      };

      $http.post(globalService.getUrl() + paths.GetConRelSectorColonia, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GetBorRelSectorColonia = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Colonia': obj.Clv_Colonia,

      };

      $http.post(globalService.getUrl() + paths.GetBorRelSectorColonia, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GetNueSector = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Descripcion': obj.Descripcion,
        'Clv_Txt': obj.Clv_Txt,
        'op': 0

      };

      $http.post(globalService.getUrl() + paths.GetNueSector, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.ModificaSector = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Sector': obj.Clv_Sector,
        'Descripcion': obj.Descripcion,
        'Clv_Txt': obj.Clv_Txt


      };

      $http.post(globalService.getUrl() + paths.GetModSector, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetNueRelSectorCol = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Sector': obj.Clv_Sector,
        'Clv_Colonia': obj.Clv_Colonia
      };

      $http.post(globalService.getUrl() + paths.GetNueRelSectorColonia, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetPostes = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'op': obj.op,
        'clv_usuario': $localStorage.currentUser.idUsuario
      };

      $http.post(globalService.getUrl() + paths.GetMuestraPostes, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetNuePoste = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'clave': obj.clave,
        'descripcion': obj.descripcion

      };
      $http.post(globalService.getUrl() + paths.GetNuePoste, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };




    return factory;
  });
