"use strict";
angular.module("softvApp").controller("dashboardCtrl", function(generalesSistemaFactory,globalService ) {
  function init() {
    generalesSistemaFactory.Getlogos().then(function(result) {
      vm.logo3 =
        globalService.getUrllogos() + "/" + result.GetlogosResult[2].Valor;
    });
  }
  var vm = this;
  init();
});
