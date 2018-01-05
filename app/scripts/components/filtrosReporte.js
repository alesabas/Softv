'use strict';
var filtrosReporte = {
	bindings: {      
        report: '='
	},
	controller: function(reportesVariosFactory,$localStorage) {

       function getDistribuidores (){
                   
            reportesVariosFactory.mostrarDistribuidorByUsuario($localStorage.currentUser.idUsuario)
            .then(function (data) {
               
                vm.options = {
                    filterPlaceHolder: 'filtrar distribuidor',
                    labelAll: 'Todos los distribuidores',
                    labelSelected: 'Distribuidores seleccionados',
                    labelShow: 'Nombre',
                    orderProperty: 'Nombre',
                    items: data.GetDistribuidorByUsuarioResult,
                    selectedItems: []
                  };              
                 console.log(vm.options);
                 console.log(data);
            });
        };

        function getplazas (){
           
            reportesVariosFactory.mostrarPlazaByDistribuidor($localStorage.currentUser.idUsuario,vm.options.selectedItems)
            .then(function(result){
                console.log(result);
                vm.options={};
                vm.options = {
                    filterPlaceHolder: 'filtrar plazas',
                    labelAll: 'Todos las plazas',
                    labelSelected: 'Plazas seleccionadas',
                    labelShow: 'razon_social',
                    orderProperty: 'razon_social',
                    items: result.GetPlazasByDistribuidorResult,
                    selectedItems: []
                  };      
            });
        }
            


       function transfer(from, to, index) {
			if (index >= 0) {
				to.push(from[index]);
				from.splice(index, 1);
			} else {
				for (var i = 0; i < from.length; i++) {
					to.push(from[i]);
				}
				from.length = 0;
			}
        };
        
    function next(report) {
         console.log(report);

         if(report==='PROSPECTOS'){
            getplazas();
         }
    }

        var vm=this;
        vm.next=next;
        vm.transfer=transfer;
        vm.options={};
        vm.muestraFiltros=true;
        getDistribuidores();
        

	},
    templateUrl: 'views/components/filtrosReporte.html',
    controllerAs: '$ctrl'
};

angular.module('softvApp').component('filtrosReporte', filtrosReporte);