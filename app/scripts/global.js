'use strict';
angular
  .module('softvApp')
  .service('globalService', function () {
    var svc = {};

     
    svc.getUrl = function () {
     return 'http://192.168.50.33:7000/SoftvWCFService.svc';
      // return 'http://localhost:64481/SoftvWCFService.svc';
    };

    svc.getUrlReportes = function () {
     return 'http://192.168.50.33:7000';
    // return 'http://localhost:64481/';
    };


    svc.getUrlinfoSistema = function () {
      return 'http://localhost:64481/AppWCFService.svc';
    };

    svc.getUrllogos = function () {
      return 'http://localhost:64481/logos';
    };

    svc.getUrlPrinters = function () {
      return 'http://localhost:50';
    };
    

  

    return svc;
  });