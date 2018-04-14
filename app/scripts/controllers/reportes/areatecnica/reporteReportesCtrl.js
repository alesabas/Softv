'use strict';
angular
	.module('softvApp')
	.controller('reporteReportesCtrl', function($state,reportesFactory,atencionFactory,$filter ,reportesVariosFactory,globalService,$sce,$localStorage ) {	
	
	function getTipoServicios() {
	atencionFactory.getServicios().then(function (result) {
		
		vm.Tiposervicios = result.GetMuestraTipSerPrincipalListResult;
	});
	}
	  
	function getProblemas(){
	atencionFactory.GetClasificacionProblemas().then(function (data) {
		vm.Problemas = data.GetuspConsultaTblClasificacionProblemasListResult;
			})
	}
	  
	function getTrabajosQuejas(){
	atencionFactory.MuestraTrabajos(0).then(function(result){
		vm.trabajosQuejas=result.GetMUESTRATRABAJOSQUEJASListResult;
		console.log(result);
	});
	}

	function GetReport(){	

   //OP1 POR RANGO DE CONTRATO
   //OP2 POR FECHA DE SOLICITUD
   //OP3 POR FECHA DE EJECUCION
   //OP4 POR SERVICIO
   //OP6 POR DEPARTAMENTO
   //OP7 POR CONTRATO
	var obj={	
		'Clv_inicio':(vm.clvOrdenInicio)?vm.clvOrdenInicio:0,
		'Clv_fin':(vm.clvOrdenFin)?vm.clvOrdenFin:0,
		'contrato':(vm.clvOrden)?vm.clvOrden:'',
		'fechasolInicial':(vm.fechasolInicial)? $filter('date')(vm.fechasolInicial, 'yyyy/MM/dd') :'1900/01/01',
		'fechasolFinal':(vm.fechasolFinal)? $filter('date')(vm.fechasolFinal, 'yyyy/MM/dd'):'1900/01/01',
		'fechaejeInicial':(vm.fechaejeInicial)? vm.fechaejeInicial:'1900/01/01',
		'fechaejeFinal':(vm.fechaejeFinal)? vm.fechaejeFinal:'1900/01/01',
		'Clv_trabajo':(vm.trabajo)?vm.trabajo.CLV_TRABAJO:0,
		'op1':vm.checkrangoOrden,
		'op2':vm.checkFechaSol,
		'op3':vm.checkFechaEje,
		'op4':vm.checkServicio,
		'op5':false,
		'op6':vm.checkDepartamento,
		'op7':vm.checknumeroOrden,
		'ejecutados':vm.ejecutada,
		'pendientes':vm.pendiente,
		'visitados':vm.visita,
		'enproceso':vm.proceso,
		'OpOrdenar':parseInt(vm.ordenrepOrdenes),
		'Op':parseInt(vm.tiporeporteord),
		'clvProblema':(vm.problema)?vm.problema.clvProblema:0,
		'clv_Depto':(vm.departamento)?vm.departamento.tipo:0,
		'distribuidores':vm.responseparams.distribuidores,
		'plazas':vm.responseparams.plazas,
		'ciudades':vm.responseparams.ciudades,
		'localidades':vm.responseparams.localidades,
		'colonias':vm.responseparams.colonias
	};

	 console.log(obj);
	
	 reportesFactory.GetReporteQuejas(obj).then(function(result){
		vm.rptpanel=true;
		vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + result.GetReporteQuejasResult);
	 });

	}

	var vm=this;
	vm.report='REPORTEAREATECNICA';
	vm.url='';
	vm.order=[
		{ 'step': 1, function: 'getplazas',   confirm: false  },
		{ 'step': 2, function: 'getEstadosByPlaza',confirm: false },
		{ 'step': 3, function: 'getCiudadesByEstado',confirm: false },
		{ 'step': 4 ,  function :'getLocalidadesByCiudades',confirm: false },
		{ 'step': 5 ,  function :'getColoniasByLocalidad',confirm: false },
		{ 'step': 6 ,  function :'getCallesByColonia',confirm: false },
		{ 'step': 7 ,  function :'getfiltrosQuejas',confirm: true }
	  ];
	  vm.departamentosList=[
		{'tipo':1,'nombre':'Mantenimiento'},
		{'tipo':2,'nombre':'Técnico'}	  
	  ];

	  
	  vm.plazas = [];
	  vm.distribuidores = [];
	  vm.tecnicos = [];
	  vm.estados = [];
	  vm.localidades=[];
	  vm.ciudades=[];
	  vm.colonias=[];
	  vm.calles=[];
	  vm.responseparams={};
	  vm.showfilters=false;
	  vm.rptpanel=false;
	  vm.GetReport=GetReport;
	  getTipoServicios();
	  getProblemas();
	  getTrabajosQuejas();
	  vm.tiporeporteord='0';
	  vm.ordenrepOrdenes='0';
});