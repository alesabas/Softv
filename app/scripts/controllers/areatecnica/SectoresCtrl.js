'use strict';

angular
  .module('softvApp')
  .controller('SectoresCtrl', function (areaTecnicaFactory,$uibModal) {

    function initData() {
      buscar(0);
    }

    function buscar(op) {

      var Parametros = {
        'clvsector': (op === 3) ? ((vm.clave === null|| vm.clave === undefined || vm.clave === '')? op = 0 : vm.clave ) : 0,
        'descripcion': (op === 2) ? ((vm.descripcion === undefined || vm.descripcion === null||vm.descripcion === '')? op = 0 : vm.descripcion) :'',
        'clv_txt': (op === 1) ? ((vm.clv_txt === undefined ||vm.clv_txt === null ||vm.clv_txt === '' )? op = 0 : vm.clv_txt) : '',
        'op': op       

      };
      areaTecnicaFactory.GetSectores(Parametros)
        .then(function (data) {
          vm.sectores = data.GetConSectorResult;
         
        });

    }

    function AddSector() {
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/areatecnica/ModalSector.html',
        controller: 'ModalAddSectorCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        class: 'modal-backdrop fade',
        size: 'md'
      });
    }
  

    function DetalleSector(Clv_Sector) {
      var Clv_Sector = Clv_Sector;
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/areatecnica/ModalSector.html',
        controller: 'ModalDetalleSectorCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        class: 'modal-backdrop fade',
        size: 'md',
        resolve: {
          Clv_Sector: function () {
                return Clv_Sector;
            }
        }
    });
}

    function UpdateSector(Clv_Sector) {
      var Clv_Sector = Clv_Sector;
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/areatecnica/ModalSector.html',
        controller: 'ModalUpdateSectorCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        class: 'modal-backdrop fade',
        size: 'md',
        resolve: {
          Clv_Sector: function () {
                return Clv_Sector;
            }
        }
    });
}

    function EliminaSector(obj) {
      console.log(obj);
      var options=obj;
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/areatecnica/ModalEliminarSector.html',
        controller: 'ModalDeleteSectorCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        class: 'modal-backdrop fade',
        size: 'sm',
        resolve: {
          options: function () {
                return options;
            }
        }
      });
    }






    var vm = this;
    initData();
    vm.buscar = buscar;
    vm.AddSector = AddSector;
    vm.UpdateSector = UpdateSector;
    vm.EliminaSector = EliminaSector;
    vm.DetalleSector = DetalleSector;

  });
