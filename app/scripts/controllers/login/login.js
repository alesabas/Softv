'use strict';
angular
  .module('softvApp')
  .controller('LoginCtrl', function ($stateParams, authFactory, $location, $localStorage, $window, ngNotify) {
    function initData() {
      if ($localStorage.currentUser) {
        $location.path('/home/dashboard');
      }
    }

    function login() {
      authFactory.login(vm.user, vm.password).then(function (data) {
        if (data) {
          
          authFactory.obtenNombreComputadora().then(function (result) {
            $localStorage.currentUser.maquina = result;
            authFactory.obtensucursalIp($localStorage.currentUser.token, $localStorage.currentUser.maquina).then(function (response) {
              $localStorage.currentUser.sucursal = response;
              $window.location.reload();
            });

          })
          .catch(function(result){
            $window.location.reload();
          });
          console.log($localStorage.currentUser);


        } else {
          ngNotify.set('Datos de acceso erróneos', 'error');
        }

      });

    }

    var vm = this;
    initData();
    vm.login = login;
  });
