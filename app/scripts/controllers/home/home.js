'use strict';
angular
	.module('softvApp')
	.controller('HomeCtrl', function($localStorage, $location, $window, $state,generalesSistemaFactory,globalService) {
		function initialData() {
			if ($localStorage.currentUser) {
				vm.menus = $localStorage.currentUser.Menu;
				vm.usuario = $localStorage.currentUser.usuario;
			    vm.caja=	$localStorage.currentUser.CajaNombre;
				vm.sucursal=$localStorage.currentUser.SucursalNombre;	
				generalesSistemaFactory.Getlogos().then(function(result) {
					vm.logo1 = globalService.getUrllogos() + "/" + result.GetlogosResult[0].Valor;
				
				  });	
				  vm.colordefinido='#305b8c';	
			} else {
				location.href === '/auth/';
			}
			
		}

		function logout() {
			delete $localStorage.currentUser;
			$window.location.reload();
		}

		function changepassword(){

			$state.go('home.configuracion.changepassword');
		}



		var vm = this;
		vm.logout = logout;
		vm.changepassword=changepassword;
		initialData();
	});
