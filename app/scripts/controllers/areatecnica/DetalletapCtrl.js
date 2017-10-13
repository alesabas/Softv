'use strict';
angular
  .module('softvApp')
  .controller('DetalletapCtrl', function (tapFactory, ngNotify, $state,$stateParams) {
     function Init() {
      var obj = {
        'IdTap': $stateParams.id,
        'Clavetecnica': '',
        'cluster': '',
        'sector': '',
        'poste': '',
        'colonia': '',
        'calle': '',
        'op': 6
      };
      tapFactory.GetCONSULTATap(obj).then(function (result) {       
        var detalle = result.GetCONSULTATapResult[0];
        vm.frente = detalle.FrenteANumero;
        vm.servicios = detalle.NoServicios;
        vm.lotes = detalle.NoLotes;
        vm.negocios = detalle.NoNegocios;
        vm.casas = detalle.NoCasas;
        vm.tap=detalle.Ingenieria;
        vm.salida=detalle.Salidas;
        vm.idcluster = detalle.clv_cluster;
        vm.idcolonia = detalle.clv_colonia;
        vm.idposte = detalle.clv_poste;
        vm.idsector = detalle.clv_sector;
        vm.idcalle = detalle.clv_calle;

        tapFactory.GetMuestraCluster(6, '', '', 0).then(function (result) {         
          vm.clusters = result.GetMuestraClusterResult;
          vm.clusters.forEach(function (item) {
            if (item.Clv_cluster === vm.idcluster) {
              vm.cluster = item;
            }
          });
          getsectores();
          getpostes();
        });
      });
    }

    function getcolonias() {
      tapFactory.GetMuestraColoniaSec(0, vm.sector.Clv_Sector, 1).then(function (data) {
        vm.colonias = data.GetMuestraColoniaSecResult;
        vm.colonias.forEach(function (item) {
          if (item.IdColonia === vm.idcolonia) {
            vm.colonia = item;
          }
        });
        getcalles();
      });
    }

    function getsectores() {
      tapFactory.GetConSector2(0, '', '', 4, vm.cluster.Clv_cluster).then(function (data) {       
        vm.sectores = data.GetConSector2Result;
        vm.sectores.forEach(function (item) {
          if (item.Clv_Sector === vm.idsector) {
            vm.sector = item;
          }
        });
        getcolonias();
      });
    }

    function getcalles() {     
      tapFactory.GetMuestraCalleSec(vm.sector.Clv_Sector, vm.colonia.IdColonia, 0, 0).then(function (data) {
        vm.calles = data.GetMuestraCalleSecResult;
        vm.calles.forEach(function (item) {
          if (item.IdCalle === vm.idcalle) {
            vm.calle = item;
          }
        });
      });
    }

    function getpostes() {
      tapFactory.GetMUESTRAPostes(0).then(function (data) {
        vm.postes = data.GetMUESTRAPostesResult;
        vm.postes.forEach(function (item) {
          if (item.id === vm.idposte) {
            vm.poste = item;
          }
        });
      });
    }
    
  var vm=this;
  vm.Titulo = 'Detalle Tap #'+$stateParams.id;
  Init();
  vm.blockForm=true;
  vm.blocksave=true;
  });