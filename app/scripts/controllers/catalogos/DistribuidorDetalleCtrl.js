'use strict';

angular
  .module('softvApp')
  .controller('DistribuidorDetalleCtrl', function (distribuidorFactory, $stateParams, ngNotify, $state) {


    function initData() {

      distribuidorFactory.Getplaza($stateParams.id, '')
        .then(function (result) {
          console.log(result.GetPlaza_DistribuidoresNewResult);
          var Distribuidor = result.GetPlaza_DistribuidoresNewResult[0];
          vm.Titulo = 'Detalle  Distribuidor - ' + Distribuidor.Nombre;
          vm.Nombre = Distribuidor.Nombre;
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
              console.log(data);
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


      /*CatalogosFactory.GetDeepDistribuidor(IdDistribuidor).then(function(data){
          
      });*/
    }

    var vm = this;
    vm.IdDistribuidor = $stateParams.id;
    initData();
    vm.block=true;

  });
