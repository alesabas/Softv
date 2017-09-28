'use strict';

angular
  .module('softvApp')
  .controller('ClusterCtrl', function (clusterFactory, $uibModal) {

    function init() {
      buscar(1);
    }

    function buscar(op) {
      var params = {
        'opcion': op,
        'clave': (op === 2) ? vm.clave : '',
        'descripcion': (op === 4) ? vm.descripcion : '',
        'clv_cluster': 0
      };
      clusterFactory.GetMuestraCluster(params)
        .then(function (data) {
          vm.clusters=data.GetMuestraClusterResult;

        });
    }


    function AddCluster() {
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/area tecnica/ModalCluster.html',
        controller: 'ModalAddClusterCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        class: 'modal-backdrop fade',
        size: 'md'
      });
    }

    function DetalleCluster(x) {
      var options=x;
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/area tecnica/ModalCluster.html',
        controller: 'ModalDetalleClusterCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        class: 'modal-backdrop fade',
        size: 'md',
        resolve: {
					options: function () {
						return options;
					}
				}
      });
    }


    function UpdateCluster(x) {
     var options=x;
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/area tecnica/ModalCluster.html',
        controller: 'ModalUpdateClusterCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        class: 'modal-backdrop fade',
        size: 'md',
        resolve: {
					options: function () {
						return options;
					}
				}
      });
    }

    function EliminaCluster() {
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/area tecnica/ModalEliminarCluster.html',
        controller: 'ModalDeleteClusterCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        class: 'modal-backdrop fade',
        size: 'sm'
      });
    }






    var vm = this;
    init();
    vm.AddCluster = AddCluster;
    vm.UpdateCluster = UpdateCluster;
    vm.EliminaCluster = EliminaCluster;
    vm.DetalleCluster = DetalleCluster;
    vm.buscar = buscar;

  });
