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
      console.log(vm.responseparams);
       var obj={
        'Clv_TipSer':(vm.tiposervicio)?vm.tiposervicio.Clv_TipSerPrincipal:0,           
        'Clv_inicio':(vm.clvLlamadaInicio)?vm.clvLlamadaInicio:0,
        'Clv_fin':(vm.clvLlamadaFin)?vm.clvLlamadaFin:0,
        'fechasolInicial':(vm.fechasolInicial)?vm.fechasolInicial:'01/01/1900',
        'fechasolFinal':(vm.fechasolFinal)? vm.fechasolFinal:'01/01/1900',
        //'Clv_trabajo':(vm.servicio)?vm.servicio.CLV_TRABAJO:0,
        'clvQueja':(vm.reporte)?vm.reporte:0,
        'Op':vm.tiporeporteord,
        'OpOrdenar':vm.tiporeporte,
        'Clv_usuario':(vm.usuario)? vm.usuario.Clave:0,
        'estatus':(vm.tipoqueja)?vm.tipoqueja:'',
        'contrato':(vm.contrato)?vm.contrato:'',        
        'distribuidores':vm.responseparams.distribuidores,
        'plazas':vm.responseparams.plazas,
        'ciudades':vm.responseparams.ciudades,
        'localidades':vm.responseparams.localidades,
        'colonias':vm.responseparams.colonias
       };
       console.log(obj);
       reportesFactory.GetReporteAtencion(obj).then(function(result){
        vm.rptpanel=true;
        vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + result.GetReporteAtencionResult);
       });
      
    }


    var vm = this;
    vm.report = 'ATENCIONTELEFONICA';
    vm.GetReport = GetReport;
    vm.responseparams = {};
    vm.showfilters = false;
    vm.tiporeporteord="1";
   vm.tiporeporte="1";
    vm.rptpanel=false;
    getUsuarios();
    getTipoServicios();
    vm.order=[
      { 'step': 1, function: 'getplazas',   confirm: false  },
      { 'step': 2, function: 'getEstadosByPlaza',confirm: false },
      { 'step': 3, function: 'getCiudadesByEstado',confirm: false },
      { 'step': 4 ,  function :'getLocalidadesByCiudades',confirm: false },
      { 'step': 5 ,  function :'getColoniasByLocalidad',confirm: false },     
      { 'step': 6 ,  function :'getcoloniasAtencion',confirm: false },
      { 'step': 7 ,  function :'getfiltrosAtencion',confirm: true },
    
      ];
    vm.getTrabajosQuejas=getTrabajosQuejas;
  });
