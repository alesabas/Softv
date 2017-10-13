'use strict';

angular
  .module('softvApp')
  .controller('napCtrl', function (areaTecnicaFactory, trabajosFactory, ngNotify) {

    function init() {
      getnaps(0);
    }

    function getnaps(op) {
      var Parametros = {
        'Op': op,
        'IdTap': 0,
        'Clave': (op === 1) ? vm.clave : '',
        'Sector': (op === 2) ? vm.hub : '',
        'Poste': (op === 3) ? vm.olt : '',
        'Colonia': (op === 4) ? vm.colonia : '',
        'Calle': (op === 5) ? vm.calle : ''
      };
      areaTecnicaFactory.GetCONSULTAnap(Parametros)
        .then(function (data) {
          vm.naps=data.GetCONSULTAnapResult;
          console.log(data.GetCONSULTAnapResult);
        });
    }


    var vm = this;
    init();

  });
