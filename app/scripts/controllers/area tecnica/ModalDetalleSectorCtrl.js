angular
.module('softvApp')
.controller('ModalDetalleSectorCtrl', function(areaTecnicaFactory, $uibModalInstance, ngNotify, $state,Clv_Sector){



    function initData() {
        GetRelaColSect();
        GetSector();
      }

      function GetSector() {
        var Parametros = {
            'clvsector': Clv_Sector,
            'descripcion': (vm.Descripcion === undefined) ? 0 : vm.Descripcion,
            'clv_txt': (vm.Clv_Txt === undefined) ? 0 : vm.Clv_Txt,
            'op': 3

        };
        areaTecnicaFactory.GetSectores(Parametros).then(function (data) {
            var DatosSectores = data.GetConSectorResult[0];
            vm.IdSector = DatosSectores.Clv_Sector;
            vm.Clv_Txt = DatosSectores.Clv_txt;
            vm.Descripcion = DatosSectores.Descripcion;

            console.log(data);
        });
    }

    function GetRelaColSect() {
        var Parametros = {
            'Clv_Sector': Clv_Sector,
        };
        areaTecnicaFactory.GetConRelSectorColonia(Parametros).then(function (data) {
            vm.RelColonias = data.GetConRelSectorColoniaResult;
            console.log(data);
        });

    }

    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

var vm = this;
initData();
vm.Titulo = 'Consulta Sector';
vm.Icono = 'fa fa-eye';
vm.cancel = cancel;
vm.blockForm = true;
vm.blocksave = true;
vm.blockdelete = true;
vm.blockdelete1 = true;
});