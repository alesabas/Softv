    'use strict'
    angular
      .module('softvApp')
      .controller('ModalUpdateClusterCtrl', function (clusterFactory, tapFactory, $uibModalInstance, ngNotify, $state, options) {

        function init() {
          var params = {
            'opcion': 4,
            'clave': '',
            'descripcion': '',
            'clv_cluster': options.Clv_cluster
          };
          clusterFactory.GetMuestraCluster(params)
            .then(function (data) {
              vm.clave = data.GetMuestraClusterResult[0].Clv_txt;
              vm.descripcion = data.GetMuestraClusterResult[0].Descripcion;

              clusterFactory.GetMuestraRelClusterSector(options.Clv_cluster, 1)
                .then(function (rel) {
                  vm.relaciones = rel.GetMuestraRelClusterSectorResult;
                  clusterFactory.GetMuestraRelClusterSector(options.Clv_cluster, 2).then(function (result) {
                    vm.sectores = result.GetMuestraRelClusterSectorResult;
                  });
                });
            });
        }

        function cancel() {
          $uibModalInstance.dismiss('cancel');
        }

        function validaRelacion(clv) {
          var count = 0;
          vm.relaciones.forEach(function (item) {
            count += (item.Clv_Sector === clv) ? 1 : 0
          });
          return (count > 0) ? true : false;
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
          clusterFactory.GetInsertUpdateCluster(1, vm.clave, vm.descripcion, vm.clv_cluster)
            .then(function (result) {
              if (result.GetInsertUpdateClusterResult > 0) {
                ngNotify.set('El cluster se ha actualizado correctamente', 'success');
                $uibModalInstance.dismiss('cancel');
              } else {
                ngNotify.set('Existe un cluster registrado con la misma clave', 'error');
              }
            });
        }

        var vm = this;
        vm.clv_cluster = options.Clv_cluster;
        init();
        vm.save = save;
        vm.Titulo = ' Editar  Cluster';
        vm.Icono = 'fa fa-pencil-square-o';
        vm.cancel = cancel;
        vm.blockForm = false;
        vm.blocksave = false;
        vm.blockaddrelacion = false;
        vm.addrelacion = addrelacion;
        vm.deleterelacion = deleterelacion;
        vm.blockGuarda = false;
      });
