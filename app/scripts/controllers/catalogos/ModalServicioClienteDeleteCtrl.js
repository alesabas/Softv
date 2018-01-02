'use strict';

angular
    .module('softvApp')
    .controller('ModalServicioClienteDeleteCtrl', function(CatalogosFactory, $uibModal, $uibModalInstance, ngNotify, $state, Clv_UnicaNet){

        function initData(){
            GetServicio();
        }

        function GetServicio(){
            console.log(Clv_UnicaNet);
            CatalogosFactory.GetClientesServicioList(Clv_UnicaNet).then(function(data){
                console.log(data);
                var ClienteServicio = data.GetClientesServicioListResult[0];
                vm.Clv_UnicaNet = ClienteServicio.Clv_UnicaNet;
                vm.Clv_Servicio = ClienteServicio.Clv_Servicio;
                CatalogosFactory.GetDeepServicios_New(vm.Clv_Servicio).then(function(data){
                    console.log(data);
                    var Servicio = data.GetDeepServicios_NewResult;
                    vm.Descripcion = Servicio.Descripcion;
                });
            });
        }

        function DeleteServicioCliente(){
            CatalogosFactory.GetEliminaClienteServicio(vm.Clv_UnicaNet).then(function(data){
                var MSJ = (vm.ConceptoTipo = 'S')? 'CORRECTO, se eliminó el servicio.':'CORRECTO, se eliminó el paquete.'
                ngNotify.set(MSJ, 'success');
                ok();
            });
        }

        function ok(){
            $uibModalInstance.close();
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Nueva Calle';
        vm.Icono = 'fa fa-plus';
        vm.DeleteServicioCliente = DeleteServicioCliente;
        vm.cancel = cancel;
        initData();

    });