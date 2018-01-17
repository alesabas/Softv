'use strict';
angular
  .module('softvApp')
  .controller('reporteAtencionTelefonicaCtrl', function ($state,atencionFactory,reportesFactory,usuarioFactory , $filter, reportesVariosFactory, globalService, $sce, $localStorage) {
    
    function getUsuarios(){
      var Parametros = {
        'ClvUsuario':'',
        'Nombre':'',
        'Op':0,
        'idcompania':0
      };
      usuarioFactory.GetUsuarioSoftvList(Parametros).then(function (result) {
        console.log(result);
        vm.usuarios = result.GetUsuarioSoftvListResult;
      });
    }

    function getTrabajosQuejas(){
      atencionFactory.MuestraTrabajos(vm.tiposervicio.Clv_TipSerPrincipal).then(function(result){
        vm.trabajosQuejas=result.GetMUESTRATRABAJOSQUEJASListResult;
        console.log(result);
      });
      }

    function getTipoServicios() {
      atencionFactory.getServicios().then(function (result) {
        console.log(result);
        vm.Tiposervicios = result.GetMuestraTipSerPrincipalListResult;
      });
      }

    function GetReport() {

       var obj={
        'Clv_TipSer':(vm.tiposervicio)?vm.tiposervicio.Clv_TipSerPrincipal:0,   
        'op0':(vm.checkrangoLlamada)?vm.checkrangoLlamada:false,   
        'op1':(vm.checkFechaSol)?vm.checkFechaSol:false,
        'op2':(vm.checkServ)?vm.checkServ:false,
        'op3':(vm.checkReporte)?vm.checkReporte:false,
        'op4':(vm.checkusuario)?vm.checkusuario:false,
        'op5':false,
        'op6': (vm.checkContrato)?vm.checkContrato:false,
        'sinqueja':(vm.tiporeporteord==='0')? true:false,
        'conQueja':(vm.tiporeporteord==='1')?true:false,
        'ambas':(vm.tiporeporteord==='2')?true:false,
        'Clv_inicio':(vm.clvLlamadaInicio)?vm.clvLlamadaInicio:0,
        'Clv_fin':(vm.clvLlamadaFin)?vm.clvLlamadaFin:0,
        'fechasolInicial':(vm.fechasolInicial)?vm.fechasolInicial:'01/01/1900',
        'fechasolFinal':(vm.fechasolFinal)? vm.fechasolFinal:'01/01/1900',
        'Clv_trabajo':(vm.servicio)?vm.servicio.CLV_TRABAJO:0,
        'clvQueja':(vm.reporte)?vm.reporte:0,
        'Op':0,
        'Clv_usuario':(vm.usuario)? vm.usuario.Clave:0,
        'estatus':(vm.tipoqueja)?vm.tipoqueja:'T',
        'contrato':(vm.contrato)?vm.contrato:'',        
        'distribuidores':vm.responseparams.distribuidores,
        'plazas':vm.responseparams.plazas,
        'ciudades':vm.responseparams.ciudades,
        'localidades':vm.responseparams.localidades,
        'colonias':vm.responseparams.colonias
       };
       console.log(obj);
       reportesFactory.GetReporteAtencion(obj).then(function(result){
        vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + result.GetReporteAtencionResult);
       });
      
    }


    var vm = this;
    vm.report = 'ATENCIONTELEFONICA';
    vm.GetReport = GetReport;
    vm.responseparams = {};
    vm.showfilters = false;
    vm.tiporeporteord="0";
    getUsuarios();
    getTipoServicios();
    vm.order=[
      { 'step': 1, function: 'getplazas',   confirm: false  },
      { 'step': 2, function: 'getEstadosByPlaza',confirm: false },
      { 'step': 3, function: 'getCiudadesByEstado',confirm: false },
      { 'step': 4 ,  function :'getLocalidadesByCiudades',confirm: false },
      { 'step': 5 ,  function :'getColoniasByLocalidad',confirm: false },     
      { 'step': 6 ,  function :'getfiltrosAtencion',confirm: true }
      ];
    vm.getTrabajosQuejas=getTrabajosQuejas;
  });
