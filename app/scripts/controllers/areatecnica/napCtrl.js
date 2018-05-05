'use strict';
angular
  .module('softvApp')
  .controller('napCtrl', function (areaTecnicaFactory, trabajosFactory, ngNotify, $uibModal) {

    function init() {
      GetNAPList(0);
    }

    function GetNAPList(op) {
      var Parametros = {
        'Op': op,
        'IdTap': 0,
        'Clave': (op == 1) ? vm.clave : '',
        'Sector': (op == 2) ? vm.hub : '',
        'Poste': (op == 3) ? vm.olt : '',
        'Colonia': (op == 4) ? vm.colonia : '',
        'Calle': (op == 5) ? vm.calle : ''
      };
      areaTecnicaFactory.GetCONSULTAnap(Parametros).then(function (data) {
        vm.NAPList = data.GetCONSULTAnapResult;
        console.log(data);
      });
    }

    function OpenNAPAdd(){
      var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/areatecnica/nuevoNap.html',
          controller: 'nuevoNapCtrl',
          controllerAs: 'ctrl',
          backdrop: 'static',
          keyboard: false,
          class: 'modal-backdrop fade',
          size: 'md'
      });
      modalInstance.result.then(function () {
          GetNAPList(0);
      });
    }

    var vm = this;
    vm.GetNAPList = GetNAPList;
    vm.OpenNAPAdd = OpenNAPAdd;
    init();

  });
