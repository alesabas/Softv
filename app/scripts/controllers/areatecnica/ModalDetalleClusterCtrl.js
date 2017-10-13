'use strict'
angular
  .module('softvApp')
  .controller('ModalDetalleClusterCtrl', function (clusterFactory, $uibModalInstance, ngNotify, $state, options) {

    function init() {
      console.log(options);
      var params = {
        'opcion': 4,
        'clave': '',
        'descripcion': '',
        'clv_cluster': options.Clv_cluster
      };
      clusterFactory.GetMuestraCluster(params)
        .then(function (data) {
          vm.clave = data.GetMuestraClusterResult[0].Clv_txt;
          vm.descripcion =data. GetMuestraClusterResult[0].Descripcion;
          console.log(data);

          clusterFactory.GetMuestraRelClusterSector(options.Clv_cluster, 1)
            .then(function (rel) {
              console.log(rel);
              vm.relaciones = rel.GetMuestraRelClusterSectorResult;
            });
        });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    var vm = this;
    init();
    vm.Titulo = 'Consulta Cluster';
    vm.Icono = 'fa fa-eye';
    vm.cancel = cancel;
    vm.blockForm = true;
    vm.blocksave = true;    
     vm.blockaddrelacion=true;
  });
