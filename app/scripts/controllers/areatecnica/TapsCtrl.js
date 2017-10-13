'use strict';

angular
  .module('softvApp')
  .controller('TapsCtrl', function (tapFactory) {
   
   function init(){
     Obtenlista(0);
   }


    function Obtenlista(op) {
      var params = {
        'IdTap': 0,
        'Clavetecnica': (op === 1) ? vm.clave : '',
        'cluster': (op === 7) ? vm.cluster : '',
        'sector': (op === 2) ? vm.sector : '',
        'poste': (op === 3) ? vm.poste : '',
        'colonia': (op === 4) ? vm.colonia : '',
        'calle': (op === 5) ? vm.calle : '',
        'op': op
      };

      tapFactory.GetCONSULTATap(params).then(function (data) {
        console.log(data);
       vm.lista=data.GetCONSULTATapResult;
      });
    }

    var vm = this;
    init();
    vm.Obtenlista=Obtenlista;

  });
