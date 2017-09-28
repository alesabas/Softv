'use strict';

angular
  .module('softvApp')
  .controller('SucursalAddCtrl', function (CatalogosFactory, ngNotify, $rootScope, $state, atencionFactory) {


    function initData() {
      atencionFactory.getPlazas()
        .then(function (data) {
          console.log(data.GetMuestra_Compania_RelUsuarioListResult);
          vm.plazas = data.GetMuestra_Compania_RelUsuarioListResult;
        });
    }




    function SaveSucursal() {

      var SUCURSALESobj = {};
      SUCURSALESobj.Clv_Sucursal = 0;
      SUCURSALESobj.Nombre = vm.descripcion;
      SUCURSALESobj.IP = vm.ip;
      SUCURSALESobj.Impresora = vm.impresoraff;
      SUCURSALESobj.Clv_Equivalente = '';
      SUCURSALESobj.Serie = vm.serie;
      SUCURSALESobj.UltimoFolioUsado = vm.folio;
      SUCURSALESobj.idcompania = (vm.plazas === undefined) ? 0 : vm.plaza.id_compania;
      SUCURSALESobj.Matriz = (vm.Matriz === true) ? 1 : 0;
      SUCURSALESobj.Impresora_contratos = vm.contratos;
      SUCURSALESobj.Impresora_tarjetas = vm.tarjetas;
      SUCURSALESobj.Impresora_Tickets = vm.tickets;
      SUCURSALESobj.Calle = vm.calle;
      SUCURSALESobj.Numero = vm.numero;
      SUCURSALESobj.Colonia = vm.colonia;
      SUCURSALESobj.CP = vm.cp;
      SUCURSALESobj.Municipio = vm.municipio;
      SUCURSALESobj.Ciudad = vm.ciudad;
      SUCURSALESobj.Telefono = vm.telefono;
      SUCURSALESobj.Horario = vm.atencion;
      SUCURSALESobj.Referencia = vm.referencia;
      SUCURSALESobj.Contacto = vm.contacto;
      SUCURSALESobj.Email = vm.email;
      CatalogosFactory.AddSucursal(SUCURSALESobj).then(function (data) {
        console.log(data);
        if (data.AddSUCURSALESResult > 0) {
          ngNotify.set('Se añadió una sucursal correctamente.', 'success');
          $state.go('home.catalogos.sucursales');
        } else {
          ngNotify.set('sucedió  un error  al añadir una neva sucursal.', 'warn');

        }
      });
    }

    var vm = this;
    vm.Titulo = 'Sucursal Nueva';
    vm.SaveSucursal = SaveSucursal;
    vm.blockreturn = true;
    initData();

  });