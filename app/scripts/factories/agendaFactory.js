'use strict';
angular
  .module('softvApp')
  .factory('agendaFactory', function ($http, $q, globalService, $localStorage) {
    var paths = {
      GetSectores: '/AreaTecnica/GetConSector',
      GetColoniasSec: '/AreaTecnica/GetMuestraColoniaSec',
      GetConRelSectorColonia: '/AreaTecnica/GetConRelSectorColonia',
      GetNueSector: '/AreaTecnica/GetNueSector',
      GetNueRelSectorColonia: '/AreaTecnica/GetNueRelSectorColonia',
      GetBorRelSectorColonia: '/AreaTecnica/GetBorRelSectorColonia ',
      GetModSector: '/AreaTecnica/GetModSector',
      GetMuestraPostes:'/ColoniaCAMDO/GetMuestraDescPoste',
      GetNuePoste:'/ColoniaCAMDO/AddInsertaNueDescPoste',
      GetBorSector: '/AreaTecnica/GetBorSector',
      GetDesplegarAgenda: '/CatalogoAgenda/GetDesplegarAgenda',
      GetSoftv_MuestraSectores: '/CatalogoAgenda/GetSoftv_MuestraSectores',
      GetMuestra_Tecnicos_Agenda: '/CatalogoAgenda/GetMuestra_Tecnicos_Agenda',
      GetspConsultaTurnosList: '/spConsultaTurnos/GetspConsultaTurnosList',
      GetMuestraContratoReal: '/MuestraContratoReal/GetMuestraContratoReal',
      GetBUSCLIPORCONTRATO2: '/CatalogoAgenda/GetBUSCLIPORCONTRATO2',
      GetMuestra_Tecnicos_Almacen: '/CatalogoAgenda/GetMuestra_Tecnicos_Almacen',
      GetCONCITAS:'/CatalogoAgenda/GetCONCITAS',
      GetCONSULTARREL_CITAS:'/CatalogoAgenda/GetCONSULTARREL_CITAS',
      GetVERORDENES_CITAS: '/CatalogoAgenda/GetVERORDENES_CITAS',
      GetMuestraArbolServicios_ClientesList: '/MuestraArbolServicios_Clientes/GetMuestraArbolServicios_ClientesList',
      GetDame_DetOrdSer: '/CatalogoAgenda/GetDame_DetOrdSer',
      GetBUSCADetCitas: '/CatalogoAgenda/GetBUSCADetCitas',
      GetMODIFICA_REL_CITAS: '/CatalogoAgenda/GetMODIFICA_REL_CITAS',
      GetBOR_CITAS: '/CatalogoAgenda/GetBOR_CITAS'
    };

    var factory = {};   

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
      console.log(Parametros);
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
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.GetNuePoste, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDesplegarAgenda = function (ObjAgenda) {
      var deferred = $q.defer();
      var config = {headers: {'Authorization': $localStorage.currentUser.token}};
      var Parametros = {'ObjAgenda':ObjAgenda};
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.GetDesplegarAgenda, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetSoftv_MuestraSectores = function (ObjAgenda) {
      var deferred = $q.defer();
      var config = {headers: {'Authorization': $localStorage.currentUser.token}};
      var Parametros = {'ObjAgenda':ObjAgenda};
      $http.post(globalService.getUrl() + paths.GetSoftv_MuestraSectores, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMuestra_Tecnicos_Agenda = function (clv_usuario) {
      var deferred = $q.defer();
      var config = {headers: {'Authorization': $localStorage.currentUser.token}};
      var Parametros = {'clv_usuario':clv_usuario};
      $http.post(globalService.getUrl() + paths.GetMuestra_Tecnicos_Agenda, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetspConsultaTurnosList = function () {
      var deferred = $q.defer();
      var config = {headers: {'Authorization': $localStorage.currentUser.token}};
      $http.get(globalService.getUrl() + paths.GetspConsultaTurnosList, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMuestraContratoReal = function (ObjContrato) {
      var deferred = $q.defer();
      var config = {headers: {'Authorization': $localStorage.currentUser.token}};
      var Parametros = ObjContrato;
      $http.post(globalService.getUrl() + paths.GetMuestraContratoReal, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetBUSCLIPORCONTRATO2 = function (ObjCliente) {
      var deferred = $q.defer();
      var config = {headers: {'Authorization': $localStorage.currentUser.token}};
      var Parametros = ObjCliente;
      $http.post(globalService.getUrl() + paths.GetBUSCLIPORCONTRATO2, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMuestra_Tecnicos_Almacen = function (op) {
      var deferred = $q.defer();
      var config = {headers: {'Authorization': $localStorage.currentUser.token}};
      var Parametros = {'op': op};
      $http.post(globalService.getUrl() + paths.GetMuestra_Tecnicos_Almacen, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetCONCITAS = function (Clv_Cita) {
      var deferred = $q.defer();
      var config = {headers: {'Authorization': $localStorage.currentUser.token}};
      var Parametros = {'Clv_Cita': Clv_Cita};
      $http.post(globalService.getUrl() + paths.GetCONCITAS, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetCONSULTARREL_CITAS = function (Clv_Cita) {
      var deferred = $q.defer();
      var config = {headers: {'Authorization': $localStorage.currentUser.token}};
      var Parametros = {'Clv_Cita': Clv_Cita};
      $http.post(globalService.getUrl() + paths.GetCONSULTARREL_CITAS, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetVERORDENES_CITAS = function (CLV_CITA) {
      var deferred = $q.defer();
      var config = {headers: {'Authorization': $localStorage.currentUser.token}};
      var Parametros = {'CLV_CITA': CLV_CITA};
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.GetVERORDENES_CITAS, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMuestraArbolServicios_ClientesList = function (Contrato) {
      var deferred = $q.defer();
      var config = {headers: {'Authorization': $localStorage.currentUser.token}};
      var Parametros = {'Contrato': Contrato};
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.GetMuestraArbolServicios_ClientesList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDame_DetOrdSer = function (Clv_Orden) {
      var deferred = $q.defer();
      var config = {headers: {'Authorization': $localStorage.currentUser.token}};
      var Parametros = {'Clv_Orden': Clv_Orden};
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.GetDame_DetOrdSer, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetBUSCADetCitas = function (CLV_CITA) {
      var deferred = $q.defer();
      var config = {headers: {'Authorization': $localStorage.currentUser.token}};
      var Parametros = {'CLV_CITA': CLV_CITA};
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.GetBUSCADetCitas, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetMODIFICA_REL_CITAS = function (ObjCita) {
      var deferred = $q.defer();
      var config = {headers: {'Authorization': $localStorage.currentUser.token}};
      var Parametros = {'ObjCita': ObjCita};
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.GetMODIFICA_REL_CITAS, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetBOR_CITAS = function (CLV_CITA) {
      var deferred = $q.defer();
      var config = {headers: {'Authorization': $localStorage.currentUser.token}};
      var Parametros = {'CLV_CITA': CLV_CITA};
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.GetBOR_CITAS, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    return factory;
  });
