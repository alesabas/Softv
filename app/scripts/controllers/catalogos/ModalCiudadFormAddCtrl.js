'use strict';

angular
    .module('softvApp')
    .controller('ModalCiudadFormAddCtrl', function(CatalogosFactory, $uibModalInstance, $uibModal, ngNotify, $state){

        function initData(){
            CatalogosFactory.GetEstados_NewList().then(function(data){
                vm.EstadoList = data.GetEstados_NewListResult;
            });
        }

        function SaveCiudad(){
            var ObjCiudad = {
                'Nombre': vm.Ciudad,
                'Id':0

            };
            CatalogosFactory.GetAddCiudades(ObjCiudad).then(function(data){
                if(data.GetAddCiudadesResult[0].mismoNombre == 0){
                    var IdMunicipio = data.GetAddCiudadesResult[0].Clv_Ciudad;
                    ngNotify.set('CORRECTO, se añadió una ciudad nueva.', 'success');
                    cancel();
                    $state.reload('home.catalogos.ciudades');
                    OpenUpdateCiudad(IdMunicipio);
                }else if(data.GetAddCiudadesResult[0].mismoNombre == 1){
                    ngNotify.set('ERROR, Ya existe una ciudad con el mismo nombre.', 'warn');
                }else{
                    ngNotify.set('ERROR, al añadir una ciudad nueva.', 'warn');
                    $state.reload('home.catalogos.ciudades');
                    cancel();
                }
            });
        }

        function OpenUpdateCiudad(IdMunicipio){
            var IdMunicipio = IdMunicipio;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalCiudadForm.html',
                controller: 'ModalCiudadFormUpdateCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    IdMunicipio: function () {
                        return IdMunicipio;
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
        vm.ShowEdit = false;
        vm.SaveCiudad = SaveCiudad;
        vm.cancel = cancel;
        initData();

    });