'use strict';

angular
  .module('softvApp')
  .controller('PlazasCtrl', function (plazaFactory, ngNotify, $rootScope, $state, $localStorage, distribuidorFactory) {

    function initData() {

      distribuidorFactory.Getplaza(0,'')
        .then(function (data) {
          console.log(data);
          vm.distribuidores=data.GetPlaza_DistribuidoresNewResult;
          obtenPlazas(0);
        });

    }

    function obtenPlazas(op) {

      plazaFactory.GetBrwMuestraCompanias(0, '', 0)
        .then(function (result) {
          vm.plazas=  result.GetBrwMuestraCompaniasResult;
          console.log(result);
        });
    }



    var vm = this;

    initData();

  });
