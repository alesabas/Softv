'use strict'
angular
  .module('softvApp')
  .controller('ModalAddClusterCtrl', function (clusterFactory, tapFactory, $uibModalInstance, ngNotify, $state) {

    function init() {
      tapFactory.GetConSector2(0, '', '', 4, 0).then(function (data) {
        vm.sectores = data.GetConSector2Result;
        console.log(data);
      });
    }


    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function adddeleterelacion(op) {
      clusterFactory.GetQuitarEliminarRelClusterSector(op, vm.clv_cluster, vm.sector.Clv_Sector)
        .then(function (data) {
          ngNotify.set('se agrego la relación correctamente', 'success');
          clusterFactory.GetMuestraRelClusterSector(vm.clv_cluster,1)
          .then(function(rel){
              console.log(rel);
           vm.relaciones=rel.GetMuestraRelClusterSectorResult;
          });
        });
    }

  

    function save() {
      clusterFactory.GetInsertUpdateCluster(0, vm.clave, vm.descripcion, 0)
        .then(function (result) {
          if (result.GetInsertUpdateClusterResult > 0) {
            vm.clv_cluster = result.GetInsertUpdateClusterResult;
          } else {
            ngNotify.set('Existe un cluster registrado con la misma clave', 'error');
          }

        });
    }

    var vm = this;
    init();
    vm.Titulo = 'Nuevo Cluster';
    vm.cancel = cancel;
    vm.blockdelete1 = true;
    vm.save = save;
    vm.clv_cluster = 0;
    vm.adddeleterelacion=adddeleterelacion;

  });
