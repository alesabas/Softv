'use strict';
angular
	.module('softvApp')
	.controller('reporteReportesCtrl', function($state,reportesFactory,reportesVariosFactory,globalService,$sce,$localStorage,atencionFactory ) {	
	
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
     console.log(vm.responseparams);
	}

	var vm=this;
	vm.report='REPORTEAREATECNICA';
	vm.url='';
	vm.reportesorder=[
		{ 'step': 1, function: 'getplazas',   confirm: false  },
		{ 'step': 2, function: 'getEstadosByPlaza',confirm: false },
		{ 'step': 3, function: 'getCiudadesByEstado',confirm: false },
		{ 'step': 4 ,  function :'getLocalidadesByCiudades',confirm: false },
		{ 'step': 5 ,  function :'getColoniasByLocalidad',confirm: false },
		{ 'step': 6 ,  function :'getCallesByColonia',confirm: false },
		{ 'step': 7 ,  function :'getfiltrosQuejas',confirm: true },
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
	  vm.GetReport=GetReport;
	  getTipoServicios();
	  getProblemas();
	  getTrabajosQuejas();
});