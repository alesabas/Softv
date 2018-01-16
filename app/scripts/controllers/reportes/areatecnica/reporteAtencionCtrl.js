'use strict';
angular
  .module('softvApp')
  .controller('reporteAtencionCtrl', function ($state, reportesFactory, $filter, reportesVariosFactory, globalService, $sce, $localStorage) {

    function GetReport() {}


    var vm = this;
    vm.report = 'AGENDATECNICO';
    vm.GetReport = GetReport;
    vm.responseparams = {};
    vm.showfilters = false;

  });
