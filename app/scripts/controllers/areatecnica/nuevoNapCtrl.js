'use strict';
angular
  .module('softvApp')
  .controller('nuevoNapCtrl', function (areaTecnicaFactory, $uibModalInstance, ngNotify) {

    function init(){
      GetHUBList(4, 0, 0, 0);
      GetOLTList(0);
    }

    function GetHUBList(op, Clv_Txt, Descripcion, Clv_Sector){
      console.log(op, Clv_Txt, Descripcion, Clv_Sector);
      areaTecnicaFactory.GetConHub(Clv_Sector, Clv_Txt,  Descripcion, op).then(function(data){
        console.log(data);
        vm.HUBList = data.GetConHubResult;
      });
    }

    function GetOLTList(Id){
      areaTecnicaFactory.GetMUESTRAOlt(Id).then(function(data){
        console.log(data);
        vm.OLTList = data.GetMUESTRAOltResult;
      });
    }

    function GetColoniaList(Clv_Colonia, Clv_Sector, Op){
      areaTecnicaFactory.GetMuestraColoniaHub(Clv_Colonia, Clv_Sector, Op).then(function(data){
        console.log(data);
      });
    }

    function GetCalleList(){
      var ObjCalle = {
        'Clv_Sector': 0,
        'Clv_Colonia': 0,
        'Clv_Calle': 0,
        'Op': 0
      };
      areaTecnicaFactory.GetMuestraCalleHub().then(function(data){
        console.log(data);
      });
    }

    function SaveNAP(){
      var ObjNAP = {
        'clv_sector': vm.HUB.Clv_Sector,
        'clv_colonia': 0,
        'clv_calle': 0,
        'clv_poste': vm.OLT.id,
        'Ingenieria': (vm.Ingenieria > 0)? vm.Ingenieria:0,
        'Salidas': (vm.Salidas)? vm.Salidas:0,
        'Clavetecnica': '',
        'NoCasas': 0,
        'NoNegocios': 0,
        'NoLotes': 0,
        'NoServicios': 0,
        'FrenteANumero': ''
      };
      areaTecnicaFactory.GetINSERTAnap(ObjNAP).then(function(data){
        console.log(data);
        vm.IdTap = data.GetINSERTAnapResult.IdTap;
        vm.MSJ = data.GetINSERTAnapResult.MSJ;
        if(vm.IdTap > 0){
          ngNotify.set('CORRECTO, se guardó el NAP.', 'success');
          vm.AfterSave = true;
          GetNAP();
        }else{
          ngNotify.set('ERROR, ' + vm.MSJ, 'warn');
        }
      });
    }

    function GetNAP(){
      var Parametros = {
        'Op': 6,
        'IdTap': vm.IdTap,
        'Clave': '',
        'Sector': '',
        'Poste': '',
        'Colonia': '',
        'Calle': ''
      };
      areaTecnicaFactory.GetCONSULTAnap(Parametros).then(function(data){
        console.log(data);
        var NAP = data.GetCONSULTAnapResult[0];
        vm.Clavetecnica = NAP.Clavetecnica;
        vm.Ingenieria = NAP.Ingenieria;
        vm.SaveNAP = NAP.Salidas;
        vm.clv_sector = NAP.clv_sector;
        var clv_poste = NAP.clv_poste;
        GetHUBList(3, clv_sector, clv_sector, clv_sector);/* here */
        GetOLTList(clv_poste);
        GetColoniaList(0, clv_sector, 1);
        /*vm.NAPList = data.GetCONSULTAnapResult;*/
      });
    }

    function Close(){
      $uibModalInstance.close();
    }

    var vm = this;
    vm.Titulo = 'Nuevo NAP';
    vm.Icono = 'fa fa-plus';
    vm.BtnClose = 'Cancelar';
    vm.AfterSave = false;
    vm.SaveNAP = SaveNAP;
    vm.Close = Close;
    init();

  });