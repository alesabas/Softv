'use strict';

angular
  .module('softvApp')
  .controller('SucursalUpdateCtrl', function (CatalogosFactory, ngNotify, $rootScope, $state, $stateParams, atencionFactory) {

    function initData() {
      CatalogosFactory.GetDeepSucursal(Clv_Sucursal).then(function (data) {
        var DatosSucursal = data.GetDeepSUCURSALESResult;
        vm.cp = DatosSucursal.CP;
        vm.calle = DatosSucursal.Calle;
        vm.ciudad = DatosSucursal.Ciudad;
        vm.Clv_Sucursal = DatosSucursal.Clv_Sucursal;
        vm.colonia = DatosSucursal.Colonia;
        vm.contacto = DatosSucursal.Contacto;
        vm.email = DatosSucursal.Email;
        vm.atencion = DatosSucursal.Horario;
        vm.ip = DatosSucursal.IP;
        vm.impresoraff = DatosSucursal.Impresora;
        vm.tickets = DatosSucursal.Impresora_Tickets;
        vm.contratos = DatosSucursal.Impresora_contratos;
        vm.tarjetas = DatosSucursal.Impresora_tarjetas;
        vm.Matriz = (DatosSucursal.Matriz === 1) ? true : false;
        vm.municipio = DatosSucursal.Municipio;
        vm.descripcion = DatosSucursal.Nombre;
        vm.numero = DatosSucursal.Numero;
        vm.referencia = DatosSucursal.Referencia;
        vm.serie = DatosSucursal.Serie;
        vm.telefono = DatosSucursal.Telefono;
        vm.folio = DatosSucursal.UltimoFolioUsado;
        vm.idcompania = DatosSucursal.idcompania;

        vm.Titulo = 'Editar Sucursal  - ' + vm.descripcion;
        console.log(vm.idcompania);
        atencionFactory.getPlazas().then(function (data) {
          vm.plazas = data.GetMuestra_Compania_RelUsuarioListResult;
          vm.plazas.forEach(function (item, index) {
            console.log(item, index);
            if (item.id_compania === vm.idcompania) {
              vm.plaza = vm.plazas[index];
            }
          });

        });

      });

    }


    function SaveSucursal() {

      var SUCURSALESobj = {};
      SUCURSALESobj.Clv_Sucursal = vm.Clv_Sucursal;
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
      CatalogosFactory.UpdateSucursal(SUCURSALESobj).then(function (data) {
        console.log(data);
        if (data.UpdateSUCURSALESResult > 0) {
          ngNotify.set('CORRECTO, se actualizo la sucursal correctamente.', 'success');
          $state.go('home.catalogos.sucursales');
        } else {
          ngNotify.set('ERROR, al actualizar la sucursal .', 'warn');
          $state.go('home.catalogos.sucursales');
        }
      });
    }



    var vm = this;
    var Clv_Sucursal = $stateParams.id;

    vm.blocksave = false;
    vm.blockcancel = false;
    vm.blockreturn = true;
    vm.SaveSucursal = SaveSucursal;
    initData();

  });