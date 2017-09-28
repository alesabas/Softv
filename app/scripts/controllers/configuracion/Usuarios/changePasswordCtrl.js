'use strict';
angular
  .module('softvApp')
  .controller('changePasswordCtrl', function ($state, generalesSistemaFactory, ngNotify, $uibModal, $stateParams) {

    this.$onInit = function () {};

    function Cambiar() {
      generalesSistemaFactory.GetChangePassword(vm.passwordant, vm.passwordnue)
        .then(function (data) {
          if (data.GetChangePasswordResult === 1) {
            $state.go('home');
            ngNotify.set('La contraseña se ha cambiado correectamente', 'success');
          } else {
            ngNotify.set('La contraseña anterior no es la correcta, intente de nuevo', 'warn');
          }
        });
    }

    var vm = this;
    vm.Cambiar = Cambiar;


  });
