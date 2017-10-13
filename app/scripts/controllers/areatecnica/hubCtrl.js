'use strict';

angular
  .module('softvApp')
  .controller('hubCtrl', function (areaTecnicaFactory, $uibModal, $scope) {

    function init() {
      Gethub(0);
    }

    function Gethub(op) {
      var clv_Sector = 0;
      var Clv_Txt = (op === 1) ? vm.clave : '';
      var Descripcion = (op === 2) ? vm.descripcion : '';
      areaTecnicaFactory.GetConHub(clv_Sector, Clv_Txt, Descripcion, op).then(function (data) {
        vm.hubs = data.GetConHubResult;
      });
    }

    function Elimina(obj) {
      var opcion = {
        'op':0,
        'Descripcion': obj.Descripcion,
        'id': obj.Clv_Sector
      };
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/areatecnica/ModalEliminarCluster.html',
        controller: 'ModalDeleteClusterCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        class: 'modal-backdrop fade',
        size: 'sm',
        resolve: {
          opcion: function () {
            return opcion;
          }
        }
      });
    }

    function AddHub(op, id) {
      var opcion = {
        'opcion': op,
        'id': id
      };
      console.log(opcion);
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/areatecnica/ModalSector.html',
        controller: 'ModalAddhubCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        class: 'modal-backdrop fade',
        size: 'md',
        resolve: {
          opcion: function () {
            return opcion;
          }
        }
      });
    }

    $scope.$on("reloadlista", function (e) {
      Gethub(0);
    });


    var vm = this;
    init();
    vm.Gethub = Gethub;
    vm.AddHub = AddHub;
    vm.Elimina = Elimina;
  });
