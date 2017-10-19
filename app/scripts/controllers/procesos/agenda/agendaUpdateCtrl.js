'use strict';

angular
  .module('softvApp')
  .controller('agendaUpdateCtrl', function (agendaFactory, ngNotify, $uibModal, $state, $stateParams, $rootScope, $localStorage) {
    
    function InitData(){
      var ObjContrato = {
        'ContratoCom': vm.Contrato,
        'Id': 0
      };
      agendaFactory.GetMuestraContratoReal(ObjContrato).then(function(data){
        console.log(data);
        vm.IdContrato = data.GetMuestraContratoRealResult.Contrato;
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
        agendaFactory.GetCONCITAS($stateParams.cita).then(function(data){
          console.log(data);
          var Cita = data.GetCONCITASResult;
          vm.ClvCita = Cita.Clv_Cita;
          vm.FechaCita = Cita.Fecha;
          var Clv_Tecnico = Cita.Clv_Tecnico;
          console.log(Clv_Tecnico);
          agendaFactory.GetCONSULTARREL_CITAS(vm.ClvCita).then(function(data){
            console.log(data);
            vm.Comentario = data.GetCONSULTARREL_CITASResult;
          });
          agendaFactory.GetMuestra_Tecnicos_Almacen(vm.IdContrato).then(function(data){
            console.log(data);
            vm.TecnicoList = data.GetMuestra_Tecnicos_AlmacenResult;
            console.log('C',Clv_Tecnico);
            for(var i = 0; vm.TecnicoList.length > i; i ++){
              console.log('C2',Clv_Tecnico);
              console.log('Li',vm.TecnicoList[i].clv_tecnico);
              if(vm.TecnicoList[i].clv_tecnico == Clv_Tecnico){
                console.log('yes');
                console.log(Clv_Tecnico);
                console.log('L',vm.TecnicoList[i].clv_tecnico);
                vm.Tecnico = vm.TecnicoList[i];
              }
            }
          });
          agendaFactory.GetVERORDENES_CITAS(vm.ClvCita).then(function(data){
            console.log(data);
            var OrdenCita = data.GetVERORDENES_CITASResult;
            vm.ClvOrden = OrdenCita.Clv_ORDEN;
            agendaFactory.GetDame_DetOrdSer(vm.ClvOrden).then(function(data){
              console.log(data);
              vm.DetalleServicio = data.GetDame_DetOrdSerResult;
            });
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
        });
        agendaFactory.GetMuestraArbolServicios_ClientesList(vm.IdContrato).then(function(data){
          console.log(data);
          vm.ServicioList = data.GetMuestraArbolServicios_ClientesListResult;
          vm.expandedNodes=[];
          angular.forEach(vm.ServicioList, function(value, key) {
              vm.expandedNodes.push(value);
          });
        });
      });
    }

    var vm = this;
    vm.Titulo = '  Agenda Detalle';
    vm.Contrato = $stateParams.id;
    console.log($stateParams.cita);
    InitData();

  });
