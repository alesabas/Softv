'use strict';

angular
    .module('softvApp')
    .controller('ModalServicioClienteDeleteCtrl', function(CatalogosFactory, $uibModal, $uibModalInstance, ngNotify, $state, ObjServDel, $localStorage){

        function initData(){
            GetServicio();
        }

        function GetServicio(){
            CatalogosFactory.GetClientesServicioList(ObjServDel.Clv_UnicaNetD).then(function(data){
                console.log(data);
                var ClienteServicio = data.GetClientesServicioListResult[0];
                vm.Clv_UnicaNet = ClienteServicio.Clv_UnicaNet;
                vm.Clv_Servicio = ClienteServicio.Clv_Servicio;
                vm.IdContrato = ClienteServicio.Contrato;
                CatalogosFactory.GetDeepServicios_New(vm.Clv_Servicio).then(function(data){
                    var Servicio = data.GetDeepServicios_NewResult;
                    vm.Descripcion = Servicio.Descripcion;
                });
            });
        }

        function DeleteServicioCliente(){
            CatalogosFactory.GetEliminaClienteServicio(vm.Clv_UnicaNet).then(function(data){
                console.log(data);
                var MSJ = (vm.ConceptoTipo = 'S')? 'CORRECTO, se eliminó el servicio.':'CORRECTO, se eliminó el paquete.'
                ngNotify.set(MSJ, 'success');
                SaveMovimientoSistema();
                ok();
            });
        }

        function SaveMovimientoSistema(){
            var objMovSist = {
                'Clv_usuario': $localStorage.currentUser.idUsuario, 
                'Modulo': 'home.catalogos', 
                'Submodulo': 'home.catalogos.clientes', 
                'Observaciones': 'Se eliminó servicio a cliente', 
                'Usuario': $localStorage.currentUser.usuario, 
                'Comando': '', 
                'Clv_afectada': vm.IdContrato
            };
            CatalogosFactory.AddMovSist(objMovSist).then(function(data){
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
        vm.ConceptoTipo = ObjServDel.ConceptoTipo;
        vm.DeleteServicioCliente = DeleteServicioCliente;
        vm.cancel = cancel;
        console.log(ObjServDel);
        initData();

    });