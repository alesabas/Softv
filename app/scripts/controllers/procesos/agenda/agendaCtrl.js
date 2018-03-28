'use strict';

angular
  .module('softvApp')
  .controller('agendaCtrl', function (CatalogosFactory, agendaFactory, $localStorage, $uibModal) {
   
    function init(){
      CatalogosFactory.GetPlazaList($localStorage.currentUser.idUsuario).then(function(data){
        vm.PlazaList = data.GetPlazaListResult;
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
        'idcompania': (vm.Plaza != undefined)? vm.Plaza.id_compania:0,        
        'ClvUsuario': $localStorage.currentUser.idUsuario,
        'opSetupBoxTarjeta': 1,
        'CLV_TECNICO': (vm.Tecnico != undefined)? vm.Tecnico.clv_tecnico : 0,
        'CONTRATO': (Opc == 1 && (vm.Contrato != undefined && vm.Contrato != ''))? CheckContrato(vm.Contrato,'C'):0,
        'Sector': (vm.Sector != undefined)? vm.Sector.Clv_Sector : 0,
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
          ClearInput();
        }else{
          vm.ConResultado = false;
          vm.SinResultado = true;
          ClearInput();
        }
      });
    }
    
    function ValidaPlaza(){
      return (vm.Plaza != undefined)? vm.Plaza.id_compania:0
    }

    function CheckContrato(Contrato, Set){
      var g = new RegExp("-");
      if(g.test(Contrato)){
        var SubC = Contrato.split("-");
        return (Set == 'C')? parseInt(SubC[0]):parseInt(SubC[1]);
      }else{
        return (Set == 'C')? parseInt(Contrato):0;
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

    function OpenDeleteCita(ObjCita){
      var ObjCita = ObjCita;
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body', 
        templateUrl: 'views/procesos/ModalDeleteCita.html',
        controller: 'ModalDeleteCitaCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        class: 'modal-backdrop fade',
        size: 'sm',
        resolve: {
          ObjCita: function () {
              return ObjCita;
          }
        }
      });
    }

    function ClearInput(){
      vm.Nombre = undefined;
      vm.Paterno = undefined;
      vm.Materno = undefined;
      vm.Contrato = undefined;
      vm.Dia = undefined;
      vm.SetUpBox = undefined;
      vm.Turno = undefined;
    };

    var vm = this;
    vm.GetAgendaList = GetAgendaList;
    vm.OpenDeleteCita = OpenDeleteCita;
    init();    

  });