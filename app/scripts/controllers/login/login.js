"use strict";
angular
  .module("softvApp")
  .controller("LoginCtrl", function(
    $stateParams,
    generalesSistemaFactory,
    authFactory,
    $location,
    $localStorage,
    $window,
    ngNotify,
    globalService
  ) {
    function initData() {
      if ($localStorage.currentUser) {
        $location.path("/home/dashboard");
      }
      generalesSistemaFactory.Getlogos().then(function(result) {
        vm.logo2 = globalService.getUrllogos() + "/" + result.GetlogosResult[1].Valor;
      });
    }

    function login() {
      authFactory.login(vm.user, vm.password).then(function(data) {
        if (data) {
          authFactory
            .obtenNombreComputadora()
            .then(function(result) {
              console.log(result);
              var maquina=result.split('|')[0];
              $localStorage.currentUser.maquina = maquina;
              authFactory
                .obtensucursalIp(
                  $localStorage.currentUser.token,
                  $localStorage.currentUser.maquina
                )
                .then(function(response) {
                  console.log(response);
                  $localStorage.currentUser.sucursal = response.IdSucursal;
                  $localStorage.currentUser.IdCaja = response.IdCaja;
                  $localStorage.currentUser.CajaNombre = response.Caja;
                  $localStorage.currentUser.SucursalNombre = response.Sucursal;
                  $window.location.reload();
                });
            })
            .catch(function(result) {
              $window.location.reload();
            });
        } else {
          ngNotify.set("Datos de acceso erróneos", "error");
        }
      });
    }

    var vm = this;
    initData();
    vm.login = login;
  });
