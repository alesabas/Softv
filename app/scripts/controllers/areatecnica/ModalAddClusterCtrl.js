'use strict'
angular
  .module('softvApp')
  .controller('ModalAddClusterCtrl', function (clusterFactory, tapFactory, $uibModalInstance, ngNotify, $state) {

    function init() {
      clusterFactory.GetMuestraRelClusterSector(0, 2).then(function (result) {
        vm.sectores = result.GetMuestraRelClusterSectorResult;
      });
    }

    function validaRelacion(clv) {
      var count = 0;
      vm.relaciones.forEach(function (item) {
        count += (item.Clv_Sector === clv) ? 1 : 0;
      });
      return (count > 0) ? true : false;
    }


    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function addrelacion(op) {

      if (validaRelacion(vm.sector.Clv_Sector) === true) {
        ngNotify.set('La relación cluster-sector ya esta establecida', 'warn');
        return;
      }
      clusterFactory.GetQuitarEliminarRelClusterSector(op, vm.clv_cluster, vm.sector.Clv_Sector)
        .then(function (data) {
          muestrarelaciones();
          ngNotify.set('se agrego la relación correctamente', 'success');
        });

    }

    function muestrarelaciones() {
      clusterFactory.GetMuestraRelClusterSector(vm.clv_cluster, 1)
        .then(function (rel) {
          vm.relaciones = rel.GetMuestraRelClusterSectorResult;
        });
    }

    function deleterelacion(clv) {
      clusterFactory.GetQuitarEliminarRelClusterSector(2, vm.clv_cluster, clv).then(function (data) {
        ngNotify.set('Se eliminó la relación correctamente', 'success');
        muestrarelaciones();
      });
    }


    function save() {
      clusterFactory.GetInsertUpdateCluster(0, vm.clave, vm.descripcion, 0)
        .then(function (result) {
          if (result.GetInsertUpdateClusterResult > 0) {
            vm.clv_cluster = result.GetInsertUpdateClusterResult;
            vm.blockaddrelacion = false;
            vm.blockGuarda=true;
             ngNotify.set('Cluster guardado con exito, ahora puedes agregar las relaciones', 'success');
          } else {
            ngNotify.set('Existe un cluster registrado con la misma clave', 'error');
          }

        });
    }

    var vm = this;
    init();
    vm.Titulo = 'Nuevo Cluster';
    vm.cancel = cancel;
    vm.blockGuarda = false;
    vm.save = save;
    vm.clv_cluster = 0;
    vm.addrelacion = addrelacion;
    vm.deleterelacion=deleterelacion;
    vm.blockaddrelacion = true;
    vm.relaciones = [];

  });
