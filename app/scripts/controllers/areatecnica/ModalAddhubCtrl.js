'use strict'
angular
  .module('softvApp')
  .controller('ModalAddhubCtrl', function (clusterFactory, tapFactory, $rootScope, areaTecnicaFactory, $uibModalInstance, opcion, ngNotify, $state) {

    function init() {
      if (opcion.opcion === 1) {
        vm.blockForm2 = true;
        muestraColonias();
        muestrarelaciones();
        vm.Titulo = 'Nuevo HUB';
      } else if (opcion.opcion === 2) {
        areaTecnicaFactory.GetConHub(opcion.id, '', '', 3).then(function (data) {
            console.log();
          vm.blockForm2 = false;
          
          var hub = data.GetConHubResult[0];
          vm.Clv_Txt = hub.Clv_txt;
          vm.Titulo = 'Editar HUB - '+hub.Clv_txt;
          vm.Descripcion = hub.Descripcion;
          vm.clv_hub = hub.Clv_Sector;
          muestraColonias();
          muestrarelaciones();
        });
      }
      else if (opcion.opcion === 3) {
        areaTecnicaFactory.GetConHub(opcion.id, '', '', 3).then(function (data) {
         
          vm.blockForm2 = true;
          vm.blocksave = true;
          var hub = data.GetConHubResult[0];
          vm.Clv_Txt = hub.Clv_txt;
          vm.Titulo = 'Consultar HUB - '+hub.Clv_txt;
          vm.Descripcion = hub.Descripcion;
          vm.clv_hub = hub.Clv_Sector;
          muestraColonias();
          muestrarelaciones();
        });
      }

    }

    function muestraColonias() {
      areaTecnicaFactory.GetMuestraColoniaHub(0, 0, 0)
        .then(function (data) {
          vm.colonias = data.GetMuestraColoniaHubResult;
        });
    }

    function AddSector() {
      if (opcion.opcion === 1) {
        areaTecnicaFactory.GetNueHub(0, vm.Clv_Txt, vm.Descripcion).then(function (data) {
          if (data.GetNueHubResult > 0) {
            vm.clv_hub = data.GetNueHubResult;
            ngNotify.set('El HUB se ha registrado correctamente ,ahora puedes agregar la relación con las colonias', 'success');
            $rootScope.$broadcast('reloadlista');
            vm.blockForm2 = false;
            vm.blocksave = true;
          } else {
            ngNotify.set('La clave del HUB ya existe', 'error');
          }

        });
      } else if (opcion.opcion === 2) {
        areaTecnicaFactory.GetModHub(vm.clv_hub, vm.Clv_Txt, vm.Descripcion).then(function (data) {
          console.log(data);
          ngNotify.set('El HUB se ha editado correctamente', 'success');
          $rootScope.$broadcast('reloadlista');
          $uibModalInstance.dismiss('cancel');
        });

      }
    }



    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function validaRelacion(clv) {
      var count = 0;
      vm.RelColonias.forEach(function (item) {
        count += (item.IdColonia === clv) ? 1 : 0;
      });
      return (count > 0) ? true : false;
    }

    function NuevaRelacionSecColonia() {

      if (validaRelacion(vm.Colonia.IdColonia) === true) {
        ngNotify.set('La relación HUB-COLONIA ya esta establecida', 'warn');
        return;
      }
      areaTecnicaFactory.GetNueRelHubColonia(vm.clv_hub, vm.Colonia.IdColonia)
        .then(function (data) {
          muestrarelaciones();
          ngNotify.set('se agrego la relación correctamente', 'success');
        });

    }

    function muestrarelaciones() {
      areaTecnicaFactory.GetConRelHubColonia(vm.clv_hub)
        .then(function (rel) {
          console.log(rel);
          vm.RelColonias = rel.GetConRelHubColoniaResult;
        });
    }

    function deleterelacion(clv) {
      clusterFactory.GetQuitarEliminarRelClusterSector(2, vm.clv_cluster, clv).then(function (data) {
        ngNotify.set('Se eliminó la relación correctamente', 'success');
        muestrarelaciones();
      });
    }




    var vm = this;
    init();
    
    vm.cancel = cancel;
    vm.clv_hub = 0;
    vm.RelColonias = [];
    vm.AddSector = AddSector;
    vm.NuevaRelacionSecColonia = NuevaRelacionSecColonia;

  });
