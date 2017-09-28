'use strict';
angular
  .module('softvApp')
  .controller('editaUsuarioCtrl', 

  function ($state, usuarioFactory,ngNotify ,$filter,globalService, $uibModal, rolFactory, encuestasFactory, $stateParams) {

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
              vm.pass2 = '';
              vm.pass1 = '';
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

    function muestraplazas() {
      encuestasFactory.Muestra_PlazaEnc(vm.distribuidor.Clv_Plaza).then(function (data) {
        console.log(data.GetMuestra_PlazaEncListResult);
        vm.plazas = data.GetMuestra_PlazaEncListResult;
      });

    }

    function agregaRelacion() {

      usuarioFactory.GetAgregaEliminaRelCompaniaUsuario(vm.IdUser, vm.plaza.id_compania, 1)
        .then(function (response) {
          ngNotify.set('Relación agregada','success');
          usuarioFactory.GetAgregaEliminaRelCompaniaUsuario(vm.IdUser, 0, 3)
            .then(function (result) {
              vm.relaciones = result.GetAgregaEliminaRelCompaniaUsuarioResult;
            });
        });
    }

    function eliminarelacion(x) {
      usuarioFactory.GetAgregaEliminaRelCompaniaUsuario(vm.IdUser, x.id_compania, 2)
        .then(function (response) {
           ngNotify.set('Se eliminó la relación','warn');
          usuarioFactory.GetAgregaEliminaRelCompaniaUsuario(vm.IdUser, 0, 3)
            .then(function (result) {
              vm.relaciones = result.GetAgregaEliminaRelCompaniaUsuarioResult;
            });
        });
    }


    function Guardar() {
      var Parametros = {
        'Clave': vm.IdUser,
        'Clv_Usuario': vm.Clave,
        'Domicilio': '',
        'Colonia': '',
        'FechaIngreso': $filter('date')(vm.fechaingreso, 'dd/MM/yyyy'),
        'FechaSalida': $filter('date')(vm.fechabaja, 'dd/MM/yyyy'),
        'Activo': vm.activo,
        'Pasaporte': vm.pass2,
        'Clv_TipoUsuario': vm.rol.IdRol,
        'CATV': false,
        'Facturacion': true,
        'Boletos': false,
        'Mizar_AN': 0,
        'RecibeMensaje': vm.recibemensaje,
        'NotaDeCredito': 0,
        'Clv_IdentificacionUsuario': vm.identificacion.Clave,
        'RecibeMensajeDocumentos': 0,
        'Nombre': vm.Nombre
      };

      usuarioFactory.GetEditUsuarioSoftv(Parametros).then(function (data) {       
        vm.blockForm = true;
        vm.blockrelaciones = false;
        vm.blocksave = true;
        ngNotify.set('El usuario se ha editado correctamente','success');
      });
    }


    var vm = this;
    vm.IdUser = $stateParams.id;
    vm.titulo = 'Edita usuario';
    vm.agregaRelacion = agregaRelacion;
    vm.eliminarelacion = eliminarelacion;
    vm.muestraplazas = muestraplazas;
    vm.Guardar=Guardar;
    vm.oculta=false;
  });
