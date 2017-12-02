'use strict';
angular
  .module('softvApp')
  .service('globalService', function () {
    var svc = {};

  /*  
    svc.getUrl = function () {
      return 'http://192.168.50.33:4000/SoftvWCFService.svc';
    };

    svc.getUrlReportes = function () {
      return 'http://192.168.50.33:4000';
    };
    */
    /*
    svc.getUrl = function() {
      return 'http://localhost:64481/SoftvWCFService.svc';
    };

    svc.getUrlReportes = function() {
      return 'http://localhost:64481';
    };
    */

    svc.getUrl = function () {
      return 'http://192.168.50.33:7000/SoftvWCFService.svc';
    };

    svc.getUrlReportes = function () {
      return 'http:192.168.50.33:7000';
    };

    svc.getUrlPrinters = function () {
      return 'http://localhost:50';
    };


    return svc;
  });
