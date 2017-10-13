'use strict';
angular
  .module('softvApp')
  .controller('ModalDeleteSectorCtrl', function (CatalogosFactory, $state, areaTecnicaFactory, $uibModalInstance, ngNotify, options) {
     function init(){
         console.log(options);
        vm.Sector=options.Descripcion;
     }

    function Delete(){
        areaTecnicaFactory.GetBorSector(options.Clv_Sector)
        .then(function(result){           
            $uibModalInstance.dismiss('cancel');
            ngNotify.set('El sector se ha eliminado correctamente' ,'success');
             $state.reload('home.areaTecnica.sectores');
        });
    }
    

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    var vm = this;
    init();
    vm.Titulo = 'Eliminar Sector';
    vm.Icono = 'fa fa-less';
    vm.cancel = cancel;
    vm.Delete=Delete;
    
  });
