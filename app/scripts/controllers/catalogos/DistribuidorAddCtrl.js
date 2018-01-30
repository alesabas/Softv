'use strict';

angular
  .module('softvApp')
  .controller('DistribuidorAddCtrl', function (CatalogosFactory, distribuidorFactory, ngNotify, $state) {

    function SaveDistribuidor() {      
      var Parametros = {
        'Clv_Plaza': 0,
        'Nombre': vm.Nombre,
        'RFC': vm.RFC,
        'Calle': vm.Calle,
        'NumEx': vm.NumExt,
        'NumIn': vm.NumInt,
        'Colonia': vm.Colonia,
        'CP': vm.CP,
        'Localidad': vm.Localidad,
        'Estado': vm.Estado,
        'EntreCalles': vm.Calles,
        'Telefono': vm.Telefono,
        'Fax': '',
        'Email': vm.Email,
        'Municipio': vm.Municipio,
        'Pais': vm.Pais,
        'lada1': '',
        'lada2': '',
        'Telefono2': vm.Telefono2,
        'NombreContacto': vm.nombrecont,
        'TiposDistribuidor': 0,
        'TelefonoContacto': vm.telefonocont,
        'celularContacto': vm.celularcont,
        'emailContacto': vm.emailcont,
        'responsablecomercial': vm.respcomcont,
        'responsableOperaciones': vm.respopcont,
        'responsableAtencion': vm.resatencont,
        'Nombrecomercial': vm.NombreDC,
        'Callecomercial': vm.CalleDC,
        'NumIntComercial': vm.NumeroInDC,
        'NumExtcomercial': vm.NumeroEXDC,
        'CPcomercial': vm.CPDC,
        'ColoniaComercial': vm.ColoniaDC,
        'EntrecallesComercial': '',
        'LocalidadComercial': vm.LocalidadDC,
        'municipioComercial': vm.MunicipoDC,
        'estadoComercial': vm.EstadoDC
      };
      distribuidorFactory.AddPlaza_DistribuidoresNew(Parametros)
        .then(function (data) {
          ngNotify.set('Se ha guardado  el distribuidor correctamente', 'success');          
          $state.go('home.catalogos.distribuidores');
        });

    }

    function ValidateNum(Inp){
      var Num = (Inp == 0)? vm.telefonocont : vm.celularcont;
      if((vm.emailcont != null && vm.emailcont != '') ||
      (vm.nombrecont != null && vm.nombrecont != '') ||
      (vm.respcomcont != null && vm.respcomcont != '') ||
      (vm.respopcont != null && vm.respopcont != '') ||
      (vm.resatencont != null && vm.resatencont != '')){
        if (!/^\d{10}$/.test(Num)){
          return false;
        }else{
          return true;
        }
      }else{
        return true;
      }
    }

    var vm = this;
    vm.Titulo = 'Nuevo Distribuidor';
    vm.Icono = 'fa fa-plus';
    vm.block = false;
    vm.ValidateRFC = /^[A-Z]{4}\d{6}[A-Z]{3}$|^[A-Z]{4}\d{6}\d{3}$|^[A-Z]{4}\d{6}[A-Z]{2}\d{1}$|^[A-Z]{4}\d{6}[A-Z]{1}\d{2}$|^[A-Z]{4}\d{6}\d{2}[A-Z]{1}$|^[A-Z]{4}\d{6}\d{1}[A-Z]{2}$|^[A-Z]{4}\d{6}\d{1}[A-Z]{1}\d{1}$|^[A-Z]{4}\d{6}[A-Z]{1}\d{1}[A-Z]{1}$/;
    vm.SaveDistribuidor = SaveDistribuidor;
    vm.ValidateNum = ValidateNum

  });