'use strict';
angular
  .module('softvApp')
  .controller('AddTapsCtrl', function (tapFactory, ngNotify, $state) {

    function Init() {
      postes();
      tapFactory.GetMuestraCluster(6, '', '', 0).then(function (result) {
        console.log(result.GetMuestraClusterResult);
        vm.clusters = result.GetMuestraClusterResult;
        sectores(vm.clusters[0].Clv_cluster);

      });
    }

    function sectores() {
      tapFactory.GetConSector2(0, '', '', 4, vm.cluster.Clv_cluster).then(function (data) {
        console.log(data);
        vm.sectores = data.GetConSector2Result;
      });
    }

    function colonias() {
      tapFactory.GetMuestraColoniaSec(0, vm.sector.Clv_Sector,1).then(function (data) {
       vm.colonias=data.GetMuestraColoniaSecResult;
      });
    }

    function postes() {
      tapFactory.GetMUESTRAPostes(0).then(function (data) {
        
        vm.postes = data.GetMUESTRAPostesResult;
      });
    }

    function calles(){
       tapFactory.GetMuestraCalleSec(vm.sector.Clv_Sector,vm.colonia.IdColonia,0,0).then(function (data) {
        console.log(data);
        
      });
    }


    function Guardar(){
      var obj= {
          'clv_sector': vm.sector.Clv_Sector,
          'clv_colonia': vm.colonia.IdColonia,
          'clv_calle': obj.clv_calle,
          'Ingenieria': vm.tap,
          'Salidas': vm.salida,
          'NoCasas': vm.casas,
          'NoNegocios': vm.negocios,
          'NoLotes': vm.lotes,
          'NoServicios': vm.servicios,
          'FrenteANumero':vm.numero,
          'clv_cluster': vm.cluster.Clv_cluster
        };
        console.log(obj);
        return;

         tapFactory.GetINSERTATap(obj).then(function (data) {
        console.log(data);
     
      });

    }

    var vm = this;
    Init();
    vm.Titulo = 'Nuevo Tap';
    vm.Icono = 'fa fa-plus';
    vm.blockdelete1 = true;
    vm.sectores = sectores;
    vm.colonias=colonias;
    vm.Guardar=Guardar;

  });
