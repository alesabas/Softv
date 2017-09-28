'use strict';
angular
  .module('softvApp')
  .controller('detalleUsuarioCtrl', function ($state, usuarioFactory, encuestasFactory, globalService, $uibModal, $stateParams, rolFactory) {

    this.$onInit = function () {
      rolFactory.GetRolList().then(function (data) {
        vm.Roles = data.GetRolListResult;
        usuarioFactory.GetConsultaIdentificacionUsuario(0, '').then(function (result) {
          vm.Indentificaciones = result.GetConsultaIdentificacionUsuarioResult;
          encuestasFactory.GetMuestra_DistribuidoresEncList().then(function (data) {
            vm.distribuidores = data.GetMuestra_DistribuidoresEncListResult;

            usuarioFactory.GetSoftvweb_GetUsuarioSoftvbyId($stateParams.id).then(function (data) {
              var user = data.GetSoftvweb_GetUsuarioSoftvbyIdResult;
              vm.Clave = user.Clv_Usuario;
              vm.Nombre = user.Nombre;
              vm.pass2 = '****';
              vm.pass1 = '****';
              vm.fechaingreso = user.FechaIngreso;
              vm.fechabaja = user.FechaSalida;
              vm.activo = user.Activo;
              vm.recibemensaje = user.RecibeMensaje;
 
              vm.Roles.forEach(function (item) {
                if (item.IdRol === user.Clv_TipoUsuario) {
                  vm.rol = item;
                }
              });
              vm.Indentificaciones.forEach(function (item) {
                if (item.Clave === user.Clv_IdentificacionUsuario) {
                  vm.identificacion = item;
                }
              });


              usuarioFactory.GetAgregaEliminaRelCompaniaUsuario(vm.IdUser, 0, 3)
                .then(function (result) {
                  console.log(result);
                  vm.relaciones = result.GetAgregaEliminaRelCompaniaUsuarioResult;
                });
            });

          });
        });
      });



    };

    var vm = this;

    vm.IdUser = $stateParams.id;
    vm.blockForm = true;
    vm.blockrelaciones = true;
    vm.titulo = 'Detalle de usuario';
    vm.blocksave = true;
    vm.oculta=false;
  });
