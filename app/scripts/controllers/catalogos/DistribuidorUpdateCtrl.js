'use strict';

angular
  .module('softvApp')
  .controller('DistribuidorUpdateCtrl', function (CatalogosFactory, distribuidorFactory, ngNotify, $state, $stateParams) {

    function initData() {

      distribuidorFactory.Getplaza($stateParams.id, '')
        .then(function (result) {
          
          var Distribuidor = result.GetPlaza_DistribuidoresNewResult[0];
          vm.Nombre = Distribuidor.Nombre;
          vm.Titulo = 'Editar Distribuidor - '+ Distribuidor.Nombre;
          vm.RFC = Distribuidor.RFC;
          vm.NumExt = Distribuidor.NumEx;
          vm.NumInt = Distribuidor.NumIn;
          vm.CP = Distribuidor.CP;
          vm.Calles = Distribuidor.EntreCalles;
          vm.Calle = Distribuidor.Calle;
          vm.Colonia = Distribuidor.Colonia;
          vm.Localidad = Distribuidor.Localidad;
          vm.Municipio = Distribuidor.Municipio;
          vm.Estado = Distribuidor.Estado;
          vm.Pais = Distribuidor.Pais;
          vm.Telefono = Distribuidor.Telefono;
          vm.Email = Distribuidor.Email;
          vm.Telefono2 = Distribuidor.Telefono2;
          vm.Pagare = Distribuidor.ImportePagare;

          distribuidorFactory.Getdatoscomerciales($stateParams.id)
            .then(function (data) {
              
              var Distribuidor = data.GetdatoscomercialesResult[0];
              vm.NombreDC = Distribuidor.Nombre;
              vm.EstadoDC = Distribuidor.Estado;
              vm.MunicipoDC = Distribuidor.Municipio;
              vm.LocalidadDC = Distribuidor.Localidad;
              vm.ColoniaDC = Distribuidor.Colonia;
              vm.CalleDC = Distribuidor.Calle;
              vm.NumeroInDC = Distribuidor.NumIn;
              vm.NumeroEXDC = Distribuidor.NumEx;
              vm.CPDC = Distribuidor.CP;
              vm.nombrecont = Distribuidor.NombreContacto;
              vm.telefonocont = Distribuidor.TelefonoContacto;
              vm.celularcont = Distribuidor.celularContacto;
              vm.emailcont = Distribuidor.emailContacto;
              vm.respcomcont = Distribuidor.responsablecomercial;
              vm.respopcont = Distribuidor.responsableOperaciones;
              vm.resatencont = Distribuidor.responsableAtencion;
            });




        });
    }

    function SaveDistribuidor() {

      var Parametros = {
        'Clv_Plaza': $stateParams.id,
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



      distribuidorFactory.UpdatePlaza_DistribuidoresNew(Parametros)
        .then(function (data) {
          ngNotify.set('Se ha editado el distribuidor correctamente', 'success');
          console.log(data);
          $state.go('home.catalogos.distribuidores');
        });

    }

    var vm = this;
    vm.IdDistribuidor = $stateParams.id;    
    vm.Icono = 'fa fa-pencil-square-o';
    vm.ValidateRFC = /^[A-Z]{4}\d{6}[A-Z]{3}$|^[A-Z]{4}\d{6}\d{3}$|^[A-Z]{4}\d{6}[A-Z]{2}\d{1}$|^[A-Z]{4}\d{6}[A-Z]{1}\d{2}$|^[A-Z]{4}\d{6}\d{2}[A-Z]{1}$|^[A-Z]{4}\d{6}\d{1}[A-Z]{2}$|^[A-Z]{4}\d{6}\d{1}[A-Z]{1}\d{1}$|^[A-Z]{4}\d{6}[A-Z]{1}\d{1}[A-Z]{1}$/;
    vm.SaveDistribuidor = SaveDistribuidor;
    initData();
    vm.block = false;
  });
