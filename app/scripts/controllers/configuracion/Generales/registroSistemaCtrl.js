angular
  .module('softvApp')
  .controller('registroSistemaCtrl', function (logFactory, $state, usuarioFactory) {

    function init(){
        Getfiltros(0);
    }

    function Getfiltros(op) {
      var obj = {
        'fecha': (vm.fecha) ? vm.fecha : '',
        'hora': (vm.hora) ? vm.hora : '',
        'Clv_usuario': (vm.usuario) ? vm.usuario.Clave : 0,
        'Clv_afectada': (vm.clave) ? vm.clave : 0,
        'op': 0
      }
      logFactory.GetFILTROS_LOGSISTEMA(obj).then(function (result) {
        vm.registros = result.GetFILTROS_LOGSISTEMAResult
      });

    }

    function getUsuarios() {
      var Parametros = {
        'ClvUsuario': '',
        'Nombre': '',
        'Op': 0,
        'idcompania': 0
      };
      usuarioFactory.GetUsuarioSoftvList(Parametros).then(function (result) {
        console.log(result);
        vm.usuarios = result.GetUsuarioSoftvListResult;
      });
    }

    var vm = this;
    vm.Getfiltros=Getfiltros;
    init();
    getUsuarios();
  });
