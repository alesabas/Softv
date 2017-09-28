angular
    .module('softvApp')
    .controller('ModalUpdateSectorCtrl', function (areaTecnicaFactory, $uibModalInstance, ngNotify, $state, Clv_Sector) {

        function initData() {
            GetSector();
            GetColon(0);
            GetRelaColSect();
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


        function NuevaRelacionSecColonia() {
            var Parametros = {
                'Clv_Sector': Clv_Sector,
                'Clv_Colonia': vm.Colonia.IdColonia

            }
            areaTecnicaFactory.GetNueRelSectorCol(Parametros).then(function (data) {
                var result = data.GetNueRelSectorColoniaResult;
                if (data.GetNueRelSectorColoniaResult == 0) {
                    ngNotify.set('Se agrego correctamente la relacion.', 'success');

                } else {
                    ngNotify.set('La colonia ya esta relacionada con este sector.', 'warn');
                }
                GetRelaColSect();
                console.log(data);
            });
        }

        function BorrarRelacionSecColonia() {
            var Parametros = {
                'Clv_Colonia': vm.Colonia.IdColonia
            }
            areaTecnicaFactory.GetBorRelSectorColonia(Parametros).then(function (data) {
                var result = data.GetBorRelSectorColoniaResult;
                console.log(data);
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

        function AddSector() {

            var Parametros = {
                'Clv_Sector': Clv_Sector,
                'Clv_Txt': vm.Clv_Txt,
                'Descripcion': vm.Descripcion

            };
            areaTecnicaFactory.ModificaSector(Parametros)
                .then(function (data) {
                    vm.NuevoSector = data.GetModSectorResult;
                    if (data.GetModSectorResult == 0) {
                        ngNotify.set('Se guardaron correctamente los cambios.', 'success');
                        $state.reload('home.areaTecnica.sectores');
                        cancel();
                    } else {
                        ngNotify.set('ERROR, al guardar los cambios.', 'warn');
                        $state.reload('home.areaTecnica.sectores');
                        cancel();
                    }
                });
        }








        var vm = this;
        initData();
        vm.Titulo = ' Editar  Sector';
        vm.Icono = 'fa fa-pencil-square-o';
        vm.cancel = cancel;
        vm.AddSector = AddSector;
        vm.NuevaRelacionSecColonia = NuevaRelacionSecColonia;
        vm.BorrarRelacionSecColonia = BorrarRelacionSecColonia;
        vm.blockForm = false;
        vm.blocksave = false;
        vm.blockdelete = false;
        vm.blockdelete1 = true;
    });