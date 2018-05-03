'use strict';
angular
	.module('softvApp')
	.controller('reporteTicketsFacturacionCtrl', function($state, $localStorage, $rootScope, reportesFactory,ticketsFactory, ngNotify, $filter, globalService) {
 
     function getplazas(){
		ticketsFactory.getPlazas().then(function(result){
			vm.regiones=result.GetMuestra_Compania_RelUsuarioListResult;
         console.log(result);
		});
	 }

	 function getUsers(){
		reportesFactory.GetMuestraUsuariosQuecancelaronImprimieron().then(function(result){
		  vm.usuarios=result.GetMuestraUsuariosQuecancelaronImprimieronResult;
         console.log(result.GetMuestraUsuariosQuecancelaronImprimieronResult);
		});
	 }
		 

	 var vm=this;
	 getplazas();
	 getUsers();
	 vm.tiporeporte='C';
    });