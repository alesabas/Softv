'use strict';

angular
  .module('softvApp')
  .controller('PostesCtrl', function (areaTecnicaFactory, atencionFactory, $uibModal) {

    function initData() {
      GetPost(0);
    }

    function GetPost(op) {
      var Parametros = {
        'op': op
      };
      areaTecnicaFactory.GetPostes(Parametros)
        .then(function (data) {
          vm.postes = data.GetMuestraDescPosteResult;
          console.log(data);
        });

    }

    function Add() {

      var Parametros = {
        'clave': -1,
        'descripcion': vm.descripcion
      };
      areaTecnicaFactory.GetNuePoste(Parametros)
        .then(function (data) {
          GetPost(0);
        });
    }



    function Update(id, descripcion) {
      var CLAVE = id;
      var DESCRIPCION = descripcion;
      var OP = 1;
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/areatecnica/ModalPoste.html',
        controller: 'ModalUpdatePosteCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        class: 'modal-backdrop fade',
        size: 'md',
        resolve: {
          CLAVE: function () {
            return CLAVE;
          },
          DESCRIPCION: function () {
            return DESCRIPCION;
          },
          OP: function () {
            return OP;
          }
        }
      });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    var vm = this;
    initData();
    vm.cancel = cancel;
    vm.Add = Add;
    vm.Update = Update;
    vm.titulo = 'Catálogo de Postes';

  });
