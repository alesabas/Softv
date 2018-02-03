angular
  .module('softvApp')
  .controller('ModalMotivoCancelFactDetalleCtrl', function (CatalogosFactory, $uibModalInstance, ngNotify, $state, Clv_motivo) {
   
    function initData(){
      var ObjMotivo = {
        'Clv_Motivo':  Clv_motivo,
        'Descripcion': '',
        'Bandera': 0,    
        'op': 0
      };
      CatalogosFactory.GetBuscaMotivosFacturaCancelada(ObjMotivo).then(function(data){
        var Motivo = data.GetBuscaMotivosFacturaCanceladaResult[0];
        vm.Descripcion = Motivo.Descripcion;
        vm.Clave = Motivo.Clv_motivo;
      });
    }

    function SaveMotivo(){
        var ObjMotivo = {
            'Clv_Motivo': vm.Clave,
            'Bandera': 0 , 
            'Descripcion': vm.Descripcion
        };
        CatalogosFactory.GetMODMOTIVOSFACTURACANCELACION(ObjMotivo).then(function(data){
            if(data.GetMODMOTIVOSFACTURACANCELACIONResult == 1){    
                ngNotify.set('CORRECTO, se guardó un motivo de cancelación de factura.', 'success');
                cancel();
            }else{
                ngNotify.set('ERROR, al guardar un motivo de cancelación de factura.', 'warn');
            }
        });
    }

    function cancel() {
      $uibModalInstance.close();
    }

    var vm = this;
    vm.Titulo = ' Editar Motivo de Cancelación';
    vm.Icono = 'fa fa-pencil-square-o';
    vm.cancel = cancel;
    vm.SaveMotivo = SaveMotivo;
    vm.blockForm = true;
    vm.blocksave = true;
    vm.blockdelete = true;
    initData();

  });