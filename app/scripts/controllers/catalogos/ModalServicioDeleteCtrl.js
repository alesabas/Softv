'use strict';

angular
    .module('softvApp')
    .controller('ModalServicioDeleteCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state, ObjServicio){

        function initData(){
             vm.Clv_Servicio = ObjServicio.Clv_Servicio;
             vm.clv_txt = ObjServicio.clv_txt;
        }

        function DeleteServicio(){
            var ObjValidaDelete = {
                'clv_txt': vm.Clv_Servicio,
                'Id': 0
            };
            /*CatalogosFactory.GetDeepValida_borra_servicio_New(ObjValidaDelete).then(function(data){
                console.log(data);
                vm.ObjMSJ = data.GetDeepValida_borra_servicio_NewResult;*/
                var objValidaAplicaSoloInternet = {
                    'Clv_Servicio': vm.Clv_Servicio
                };
                CatalogosFactory.AddValidaAplicaSoloInternet(objValidaAplicaSoloInternet).then(function(data){
                    var ValildaInternetResult = data.AddValidaAplicaSoloInternetResult;
                    if(ValildaInternetResult == 0){
                        DeleteServicioTrue();
                    }else if(ValildaInternetResult == 1){
                        DeleteAplicaSoloInternet();
                    }
                });
            /*});*/
        }

        function DeleteServicioTrue(){
            CatalogosFactory.DeleteServicios_New(vm.Clv_Servicio).then(function(data){
                if(data.DeleteServicios_NewResult == -1){
                    /*if(vm.ObjMSJ.error == 0){
                        var MSJ = 'NOTA: ' + vm.ObjMSJ.mensaje + 'CORRECTO, se eliminó el servicio.';
                    }else if(vm.ObjMSJ.error == 1){
                        var MSJ = 'CORRECTO, se eliminó el servicio.';
                    }*/
                    ngNotify.set('CORRECTO, se eliminó el servicio.', 'success');
                    $state.reload('home.catalogos.servicios');
				    cancel();
                }else{
                    /*if(vm.ObjMSJ.error == 0){
                        var MSJ = 'NOTA: ' + vm.ObjMSJ.mensaje + 'ERROR, al eliminar el servicio.';
                    }else if(vm.ObjMSJ.error == 1){
                        var MSJ = 'ERROR, al eliminar el servicio.';
                    }*/
                    ngNotify.set('ERROR, al eliminar el servicio.', 'warn');
                    $state.reload('home.catalogos.servicios');
				    cancel();
                }
            });
        }

        function DeleteAplicaSoloInternet(){
            CatalogosFactory.DeleteBorAplicaSoloInternet(vm.Clv_Servicio).then(function(data){
                    if(data.DeleteBorAplicaSoloInternetResult == -1){
                        DeleteServicioTrue();
                    }else{
                        ngNotify.set('ERROR, al eliminar solo aplica internet.', 'warn');
                        $state.go('home.catalogos.servicios');
                    }
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.DeleteServicio = DeleteServicio;
        vm.cancel = cancel;
        initData();
    });