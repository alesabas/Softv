'use strict'
angular
  .module('softvApp')
  .controller('ModalAddSectorCtrl', function (areaTecnicaFactory, $uibModalInstance, ngNotify, $state) {

    function initData() {
      GetColon(0);
    }
    function AddSector() {
      var Parametros = {
        'Descripcion': vm.Descripcion,
        'Clv_Txt': vm.Clv_Txt,
        'op': 0
      };
      areaTecnicaFactory.GetNueSector(Parametros)
        .then(function (data) {
          vm.Clv_Sector = data.GetNueSectorResult;

          vm.blockForm2 = false;
          vm.blocksave = true;
        });
    }
    function GetColon(op) {
      var Parametros = {
        'Clv_Colonia': (op === 0) ? vm.Colonia : 0,
        'Clv_Sector': (op === 0) ? vm.Clave_sector : 0,
        'op': op
      };
      areaTecnicaFactory.GetColonias(Parametros)
        .then(function (data) {
          vm.colonias = data.GetMuestraColoniaSecResult;
          vm.colonia = vm.colonias[0];
        });
    }

    function GetRelaColSect() {
      var Parametros = {
        'Clv_Sector': vm.Clv_Sector
      };
      areaTecnicaFactory.GetConRelSectorColonia(Parametros).then(function (data) {
        vm.RelColonias = data.GetConRelSectorColoniaResult;
      });

    }

    function NuevaRelacionSecColonia() {
      var Parametros = {
        'Clv_Sector': vm.Clv_Sector,
        'Clv_Colonia': vm.Colonia.IdColonia
      };
      areaTecnicaFactory.GetNueRelSectorCol(Parametros).then(function (data) {
        var result = data.GetNueRelSectorColoniaResult;
        if (data.GetNueRelSectorColoniaResult == 0) {
          ngNotify.set('Se agrego correctamente la relacion.', 'success');

        } else {
          ngNotify.set('La colonia ya esta relacionada con este sector.', 'warn');
        }
        GetRelaColSect();

      });
    }

    function BorrarRelacionSecColonia() {
      var Parametros = {
        'Clv_Colonia': vm.Colonia.IdColonia
      }
      areaTecnicaFactory.GetBorRelSectorColonia(Parametros).then(function (data) {
        var result = data.GetBorRelSectorColoniaResult;
        if (data.GetBorRelSectorColoniaResult == 0) {
          ngNotify.set('Se elimino correctamente la relacion.', 'success');

        } else {
          ngNotify.set('No se puede Eliminar. Hay una Relación de ésta Colonia con un Tap.', 'warn');
        }
        GetRelaColSect();
      });
    }


    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }



    var vm = this;
    initData();
    vm.Titulo = 'Nuevo Sector';
    vm.Icono = 'fa fa-plus';
    vm.cancel = cancel;
    vm.AddSector = AddSector;
    vm.NuevaRelacionSecColonia = NuevaRelacionSecColonia;
    vm.BorrarRelacionSecColonia = BorrarRelacionSecColonia;
    vm.blockdelete1 = true;
    vm.blockForm2 = true;

  });
