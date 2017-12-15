'use strict';
angular
  .module('softvApp')
  .controller('LoginCtrl', function ($stateParams, generalesSistemaFactory, authFactory, $location, $localStorage, $window, ngNotify) {
    function initData() {
      if ($localStorage.currentUser) {
        $location.path('/home/dashboard');
      }
    }

    function login() {
/* 
      generalesSistemaFactory.Getlogos().then(function (result) {
        console.log(result);
      }); */

      authFactory.login(vm.user, vm.password).then(function (data) {
        if (data) {
          authFactory.obtenNombreComputadora().then(function (result) {
              $localStorage.currentUser.maquina = result;
              authFactory.obtensucursalIp($localStorage.currentUser.token, $localStorage.currentUser.maquina).then(function (response) {
                console.log(response);
                $localStorage.currentUser.sucursal = response.IdSucursal;
                $localStorage.currentUser.IdCaja = response.IdCaja;
                $localStorage.currentUser.CajaNombre = response.Caja;
                $localStorage.currentUser.SucursalNombre = response.Sucursal;
                $window.location.reload();
              });

            })
            .catch(function (result) {
              $window.location.reload();
            });
        } else {
          ngNotify.set('Datos de acceso erróneos', 'error');
        }
      });
    }

    var vm = this;
    initData();
    vm.login = login;
  });
