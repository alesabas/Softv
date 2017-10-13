'use strict';
angular
  .module('softvApp')
  .controller('UpdateTapCtrl', function (tapFactory, ngNotify, $state, $stateParams) {

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
        vm.tap = detalle.Ingenieria;
        vm.salida = detalle.Salidas;

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

    function SaveTap() {
      var obj = {
        'IdTap':$stateParams.id,
        'clv_sector': vm.sector.Clv_Sector,
        'clv_colonia': vm.colonia.IdColonia,
        'clv_calle': vm.calle.IdCalle,
        'Ingenieria': vm.tap,
        'Salidas': vm.salida,
        'NoCasas': vm.casas,
        'NoNegocios': vm.negocios,
        'NoLotes': vm.lotes,
        'NoServicios': vm.servicios,
        'FrenteANumero': vm.frente,
        'clv_cluster': vm.cluster.Clv_cluster,
        'clv_poste': vm.poste.id
      };

      tapFactory.GetMODIFICATap(obj).then(function (data) {
        ngNotify.set('El tap se editó correctamente', 'success');
        $state.go('home.areatecnica.taps');
      });

    }

    var vm = this;
    Init();
    vm.Titulo = 'Editar Tap';
    vm.SaveTap = SaveTap;
    vm.blocksave = false;
    vm.blockForm = false;
    vm.getcolonias = getcolonias;
    vm.getpostes = getpostes;
    vm.getcalles = getcalles;
    vm.getsectores = getsectores;
  });
