'use strict';

angular
    .module('softvApp')
    .controller('ModalLocalidadFormAddCtrl', function(CatalogosFactory, $uibModalInstance, $uibModal, ngNotify, $state){

        function initData(){
            var ObjCiudad = {
                'Clv_Ciudad': 0,
                'Nombre': '',
                'Op': 2
            };
            CatalogosFactory.GetBuscaCiudades(ObjCiudad).then(function(data){
                vm.CiudadLista = data.GetBuscaCiudadesResult;
            });
        }

        function SaveLocalidad(){
            var objValidaNombreLocalidad = {
                'nombre': vm.Localidad,
                'mismoNombre': 0,
                'clv_localidad': 0
            };
            CatalogosFactory.AddValidaNombreLocalidad(objValidaNombreLocalidad).then(function(data){
                if(data.AddValidaNombreLocalidadResult == 0){
                    var objLocalidades_New = {
                        'Nombre': vm.Localidad,
                        'opcion': 0
                    };
                    CatalogosFactory.AddLocalidades_New(objLocalidades_New).then(function(data){
                        var IdLocalidad = data.AddLocalidades_NewResult;
                        if(IdLocalidad > 0){
                            ngNotify.set('CORRECTO, se añadió una localidad nueva.', 'success');
                            $state.reload('home.catalogos.localidades');
                            cancel();
                            OpenUpdateLocalidad(IdLocalidad);
                        }else{
                            ngNotify.set('ERROR, al añadir una localidad nueva.', 'warn');
                            $state.reload('home.catalogos.localidades');
                            cancel();
                        }
                    });
                }else if(data.AddValidaNombreLocalidadResult == 1){
                    ngNotify.set('ERROR, ya existe una Localidad con el mis nombre.', 'warn');
                }
            });

        }

        function OpenUpdateLocalidad(IdLocalidad){
            var IdLocalidad = IdLocalidad;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalLocalidadForm.html',
                controller: 'ModalLocalidadFormUpdateCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    IdLocalidad: function () {
                        return IdLocalidad;
                    }
                }
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Nuevo Registro';
        vm.Icono = 'fa fa-plus';
        vm.ShowUpdate = false;
        vm.SaveLocalidad = SaveLocalidad;
        vm.cancel = cancel;
        initData();
        
    });