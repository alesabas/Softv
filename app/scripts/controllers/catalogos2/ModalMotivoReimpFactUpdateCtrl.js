
angular
.module('softvApp')
.controller('ModalMotivoReimpFactUpdateCtrl', function (CatalogosFactory, $uibModalInstance, ngNotify, $state,logFactory, Clv_motivo) {
 
 function initData(){
    var ObjMotivo = {
      'Clv_Motivo':  Clv_motivo,
      'Descripcion': '',
      'Bandera': 1,    
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
          'Bandera': 1 , 
          'Descripcion': vm.Descripcion
      };
      CatalogosFactory.GetMODMOTIVOSFACTURACANCELACION(ObjMotivo).then(function(data){
          if(data.GetMODMOTIVOSFACTURACANCELACIONResult == 1){ 
            var log={
                'Modulo':'home.catalogos',
                'Submodulo':'home.motivos.ReimpresionFactura',
                'Observaciones':'Se editó motivo de reimpresión de factura',
                'Comando':JSON.stringify(ObjMotivo),
                'Clv_afectada': vm.Clave
            };
    
            logFactory.AddMovSist(log).then(function(result){ console.log('add'); });          
              ngNotify.set('CORRECTO, se guardó un motivo de reimpresión de factura.', 'success');
              cancel();
          }else{
              ngNotify.set('ERROR, al guardar un motivo de reimpresión de factura.', 'warn');
          }
      });
  }

  function cancel() {
    $uibModalInstance.close();
  }

  var vm = this;
  vm.Titulo = ' Editar Motivo de Reimpresión';
  vm.Icono = 'fa fa-pencil-square-o';
  vm.SaveMotivo = SaveMotivo;
  vm.cancel = cancel;
  vm.blockForm = false;
  vm.blocksave = false;
  vm.blockdelete = true;
  initData();
});