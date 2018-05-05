'use strict';
angular
  .module('softvApp')
  .controller('nuevoNapCtrl', function (areaTecnicaFactory, $uibModalInstance, ngNotify) {

    function init(){
      GetHUBList(4);
      GetOLTList();
    }

    function GetHUBList(op){
      console.log(op);
      areaTecnicaFactory.GetConHub(vm.clv_sector, vm.clv_sector,  vm.clv_sector, op).then(function(data){
        console.log(data);
        vm.HUBList = data.GetConHubResult;
        vm.HUB = vm.HUBList[0];
      });
    }

    function GetOLTList(){
      areaTecnicaFactory.GetMUESTRAOlt(vm.clv_poste).then(function(data){
        console.log(data);
        vm.OLTList = data.GetMUESTRAOltResult;
      });
    }

    function GetColoniaList(Clv_Colonia, Op){
      areaTecnicaFactory.GetMuestraColoniaHub(Clv_Colonia, vm.clv_sector, Op).then(function(data){
        console.log(data);
        vm.ColoniaList = data.GetMuestraColoniaHubResult;
        vm.Colonia = vm.ColoniaList[0];
        GetCalleList(0);
      });
    }

    function GetCalleList(op){
      var ObjCalle = {
        'Clv_Sector': vm.clv_sector,
        'Clv_Colonia': (vm.Colonia.IdColonia != undefined && vm.Colonia.IdColonia != null)? vm.Colonia.IdColonia:0,
        'Clv_Calle': 0,
        'Op': op
      };
      console.log(ObjCalle);
      areaTecnicaFactory.GetMuestraCalleHub(ObjCalle).then(function(data){
        console.log(data);
        vm.CalleList = data.GetMuestraCalleHubResult;
        vm.Calle = vm.CalleList[0];
      });
    }

    function SaveNAP(){
      if(vm.Clavetecnica == null){
        AddNap();
      }else{
        UpdateNap();
      }
    }

    function AddNap(){
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

    function UpdateNap(){
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
      areaTecnicaFactory.GetMODIFICAnap(ObjNAP).then(function(data){
        console.log(data);
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
        vm.clv_poste = NAP.clv_poste;
        GetHUBList(3);/* here */
        GetOLTList();
        GetColoniaList(0, 1);
        GetCalleList(0);
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
    vm.Clavetecnica = null;
    vm.clv_sector = 0;
    vm.clv_poste = 0;
    vm.AfterSave = false;
    vm.SaveNAP = SaveNAP;
    vm.GetCalleList = GetCalleList;
    vm.Close = Close;
    init();

  });