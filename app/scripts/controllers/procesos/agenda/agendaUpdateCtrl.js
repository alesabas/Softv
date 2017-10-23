'use strict';

angular
  .module('softvApp')
  .controller('agendaUpdateCtrl', function (agendaFactory, ngNotify, $uibModal, $state, $stateParams, $rootScope, $localStorage) {
    
    function InitData(){
      GetCita();
    }

    function GetCita(){
      agendaFactory.GetCONCITAS($stateParams.id).then(function(data){
        console.log(data);
        var Cita = data.GetCONCITASResult;
        vm.ClvCita = Cita.Clv_Cita;
        vm.IdContrato = Cita.Contrato;
        vm.FechaCita = toDate(Cita.Fecha);
        console.log(Cita.Fecha);
        console.log('Fecha: ',vm.FechaCita);
        vm.Clv_Tecnico = Cita.Clv_Tecnico;
        var QuejaOrden = Cita.QuejaOrden;
        console.log(vm.Clv_Tecnico);
        var ObjCliente = {
          'CONTRATO': vm.IdContrato,
          'NOMBRE': '',
          'CALLE': '',
          'NUMERO': '',
          'CIUDAD': '',
          'Telefono': '',
          'OP': 0
        };
        agendaFactory.GetBUSCLIPORCONTRATO2(ObjCliente).then(function(data){
          console.log(data);
          var DatosCliente =  data.GetBUSCLIPORCONTRATO2Result;
          vm.NombreCliente = DatosCliente.NomCompleto;
          vm.Calle = DatosCliente.Calle_;
          vm.Numero = DatosCliente.NumExt;
          vm.Colonia = DatosCliente.Colonia_;
          vm.Ciudad = DatosCliente.Ciudad_;
          vm.tipoAtencion = (DatosCliente.SoloInternet == true)? 'T' : 'S';
        });
        agendaFactory.GetCONSULTARREL_CITAS(vm.ClvCita).then(function(data){
          console.log(data);
          vm.Comentario = data.GetCONSULTARREL_CITASResult;
        });
        agendaFactory.GetMuestra_Tecnicos_Almacen(vm.IdContrato).then(function(data){
          console.log(data);
          vm.TecnicoList = data.GetMuestra_Tecnicos_AlmacenResult;
          console.log('C',vm.Clv_Tecnico);
          for(var i = 0; vm.TecnicoList.length > i; i ++){
            console.log('C2',vm.Clv_Tecnico);
            console.log('Li',vm.TecnicoList[i].clv_tecnico);
            if(vm.TecnicoList[i].clv_tecnico == vm.Clv_Tecnico){
              console.log('yes');
              console.log(vm.Clv_Tecnico);
              console.log('L',vm.TecnicoList[i].clv_tecnico);
              vm.Tecnico = vm.TecnicoList[i];
            }
          }
        });
        agendaFactory.GetBUSCADetCitas(vm.ClvCita).then(function(data){
          console.log(data);
          var DetalleCita = data.GetBUSCADetCitasResult;
          var Clv_Hora = DetalleCita.Clv_Hora;
          agendaFactory.GetspConsultaTurnosList().then(function(data){
            console.log(data);
            vm.TurnoList = data.GetspConsultaTurnosListResult;
            for(var i = 0; vm.TurnoList.length > i; i ++){
              if(vm.TurnoList[i].ID == Clv_Hora){
                vm.Turno = vm.TurnoList[i];
              }
            }
          });
        });
        agendaFactory.GetMuestraArbolServicios_ClientesList(vm.IdContrato).then(function(data){
          console.log(data);
          vm.ServicioList = data.GetMuestraArbolServicios_ClientesListResult;
          vm.expandedNodes=[];
          angular.forEach(vm.ServicioList, function(value, key) {
              vm.expandedNodes.push(value);
          });
        });
        console.log(QuejaOrden);
        if(QuejaOrden == 'O'){
          vm.ShowOrden = true;
          vm.ShowQueja = false;
          agendaFactory.GetVERORDENES_CITAS(vm.ClvCita).then(function(data){
            console.log(data);
            var OrdenCita = data.GetVERORDENES_CITASResult;
            vm.ClvOrden = OrdenCita.Clv_ORDEN;
            agendaFactory.GetDame_DetOrdSer(vm.ClvOrden).then(function(data){
              console.log(data);
              vm.DetalleServicio = data.GetDame_DetOrdSerResult;
            });
          });
        }else if(QuejaOrden = 'Q'){
          vm.ShowOrden = false;
          vm.ShowQueja = true;
          agendaFactory.GetVERQUEJAS_CITAS(vm.ClvCita).then(function(data){
            console.log(data);
            var QuejaCita = data.GetVERQUEJAS_CITASResult;
            vm.ClvReporte = QuejaCita.Clv_Queja;
            vm.ProblemaReporte = QuejaCita.Problema;
            vm.ObservacionesReporte = QuejaCita.Observaciones;
          });
        }
      });
    }

    function SaveCita(){
      var ObjCita = {
        'Clv_Cita': vm.ClvCita,
        'ClaveTecnico': (vm.Tecnico != undefined)? vm.Tecnico.clv_tecnico : vm.Clv_Tecnico,
        'Comentario': vm.Comentario,
        'Fecha':JToDate(vm.FechaCita),
        'ClaveHora': vm.Turno.ID,
        'TURNO': vm.Turno.TURNO
      }
      agendaFactory.GetMODIFICA_REL_CITAS(ObjCita).then(function(data){
        console.log(data);
        if(data.GetMODIFICA_REL_CITASResult == -1){
          ngNotify.set('CORRECTO, se guardó la cita.', 'success');
          $state.go('home.procesos.agenda');
        }else{
          ngNotify.set('ERROR, al guardar la cita.', 'warn');
          $state.go('home.procesos.agenda');
        }
      });
    }

    function DeleteCita(){
      agendaFactory.GetBOR_CITAS(vm.ClvCita).then(function(data){
        console.log(data);
        if(data.GetBOR_CITASResult == -1){
          ngNotify.set('CORRECTO, se eliminó la cita.', 'success');
          $state.go('home.procesos.agenda');
        }else{
          ngNotify.set('ERROR, al eliminar la cita.', 'warn');
          $state.go('home.procesos.agenda');
        }
      });
    }

    function OpenTecnicoTrabajo(){
      if(vm.Tecnico != undefined){
        var ObjTecnicoTrabajo = {
          'Clvtecnico': vm.Tecnico.clv_tecnico,
          'NombreTecnico': vm.Tecnico.tecnico,
          'Fecha': JToDate(vm.FechaCita)
        };
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body', 
            templateUrl: 'views/procesos/ModalTecnicoTrabajo.html',
            controller: 'ModalTecnicoTrabajoCtrl',
            controllerAs: 'ctrl',
            backdrop: 'static',
            keyboard: false,
            class: 'modal-backdrop fade',
            size: 'lg',
            resolve: {
              ObjTecnicoTrabajo: function () {
                  return ObjTecnicoTrabajo;
              }
            }
        }); 
      }
    }

    function toDate(dateStr) {
      var parts = dateStr.split("/");
      var subparts = parts[2].split(" ");
      console.log(parts);
      console.log(subparts);
      console.log(parts[1] + '/' + parts[0] + '/' + subparts[0]);
      console.log(new Date(parts[1] + '/' + parts[0] + '/' + subparts[0]));
      return new Date(parts[1] + '/' + parts[0] + '/' + subparts[0])
    }

    function JToDate(Fecha){
        var D = Fecha.getDate();
        var M = Fecha.getMonth() + 1;
        var FD = (String(D).length == 1)? '0'+D : D;
        var FM = (String(M).length == 1)? '0'+M : M;
        var FY = Fecha.getFullYear();
        var FDate =  String(FD) + '/' + String(FM) + '/' + String(FY);
        return FDate;
    }

    function ValidateFecha(){
      console.log('Valida Fecha');
      console.log(vm.FechaCita);
      var FechaCita = new Date(vm.FechaCita);
      var FechaHoy = new Date();
      vm.HoyD = FechaHoy.getDate();
      vm.HoyM = FechaHoy.getMonth() + 1;
      vm.HoyY = FechaHoy.getFullYear();
      vm.FechaHoy = new Date(vm.HoyY + '/' + vm.HoyM + '/' + vm.HoyD)
      console.log(FechaCita, vm.FechaHoy);
      if(FechaCita >= vm.FechaHoy){
        return true;
      }else{
        return false;
      }
    }

    var vm = this;
    vm.Titulo = '  Agenda Detalle';
    vm.SaveCita = SaveCita;
    vm.DeleteCita = DeleteCita;
    vm.OpenTecnicoTrabajo = OpenTecnicoTrabajo;
    vm.ValidateFecha = ValidateFecha;
    console.log($stateParams.cita);
    InitData();

  });