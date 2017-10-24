'use strict';

angular
  .module('softvApp')
  .controller('agendaCtrl', function (CatalogosFactory, agendaFactory, $localStorage, $uibModal) {
   
    function init(){
      CatalogosFactory.GetPlazaList($localStorage.currentUser.idUsuario).then(function(data){
        vm.PlazaList = data.GetPlazaListResult;
        vm.Plaza = vm.PlazaList[0];
        GetAgendaList();
      });

      agendaFactory.GetSoftv_MuestraSectores().then(function(data){
        vm.SectorList = data.GetSoftv_MuestraSectoresResult;
        vm.Sector = vm.SectorList[0];
      });

      agendaFactory.GetMuestra_Tecnicos_Agenda($localStorage.currentUser.idUsuario).then(function(data){
        vm.TecnicoList = data.GetMuestra_Tecnicos_AgendaResult;
        vm.Tecnico = vm.TecnicoList[0];
      });

      agendaFactory.GetspConsultaTurnosList().then(function(data){
        vm.TurnoList = data.GetspConsultaTurnosListResult;
      });
    }
    
    function GetAgendaList(Opc){
      var ObjAgenda = {
        'idcompania': vm.Plaza.id_compania,
        'ClvUsuario': $localStorage.currentUser.idUsuario,
        'opSetupBoxTarjeta': 1,
        'CLV_TECNICO': (Opc == 1 && vm.Tecnico != undefined)? vm.Tecnico.clv_tecnico : 0,
        'CONTRATO': (Opc == 1 && (vm.Contrato != undefined || vm.Contrato))? CheckContrato(vm.Contrato):0,
        'Sector': (Opc > 0 && vm.Sector != undefined)? vm.Sector.Clv_Sector : 0,
        'NOMBRE': (Opc == 2 && vm.Nombre != undefined)? vm.Nombre : '',
        'ApellidoPaterno': (Opc == 2 && vm.Paterno != undefined)? vm.Paterno : '',
        'ApellidoMaterno': (Opc == 2 && vm.Materno != undefined)? vm.Materno : '',
        'SetUpBox': (Opc == 3 && vm.SetUpBox != undefined)? vm.SetUpBox : '',
        'FECHA': (Opc == 4 && vm.Dia != undefined)? ToDate(vm.Dia) : '',
        'Turno': (Opc == 5 && vm.Turno != undefined)? vm.Turno.TURNO : ''
      }
      agendaFactory.GetDesplegarAgenda(ObjAgenda).then(function(data){
        vm.AgendaList = data.GetDesplegarAgendaResult;
        if(vm.AgendaList.length > 0){
          vm.ConResultado = true;
          vm.SinResultado = false;
        }else{
          vm.ConResultado = false;
          vm.SinResultado = true;
        }
      });
    }

    function CheckContrato(Contrato){
      var g = new RegExp("-");
      if(g.test(Contrato)){
        var SubC = Contrato.split("-");
        return parseInt(SubC[0]);
      }else{
        return parseInt(Contrato);
      }
    }

    function ToDate(Fecha){
      var D = Fecha.getDate();
      var M = Fecha.getMonth() + 1;
      var FD = (String(D).length == 1)? '0'+D : D;
      var FM = (String(M).length == 1)? '0'+M : M;
      var FY = Fecha.getFullYear();
      var FDate =  String(FD) + '/' + String(FM) + '/' + String(FY);
      return FDate;
    }

    var vm = this;
    vm.GetAgendaList = GetAgendaList;
    init();    

  });