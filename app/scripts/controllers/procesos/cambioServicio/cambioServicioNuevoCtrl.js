'use strict';

angular
    .module('softvApp')
    .controller('cambioServicioNuevoCtrl', function ( CatalogosFactory,ngNotify, atencionFactory, $uibModal, $localStorage) {
        
        function initData(){  

        }

        function ModalClientes() {            
            var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'views/procesos/ModalClientesActivos.html',
              controller: 'ModalClientesActivosCtrl',
              controllerAs: 'ctrl',
              backdrop: 'static',
              keyboard: false,
              size: "lg",
             /*  resolve: {
                options: function () {
                  return options;
                }
              } */
            });
          }

        var vm = this;
        initData();
        vm.ModalClientes=ModalClientes;
        
    });