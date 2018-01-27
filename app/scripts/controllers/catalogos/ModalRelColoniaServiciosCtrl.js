'use strict';

angular
    .module('softvApp')
    .controller('ModalRelColoniaServiciosCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state, ObjRelColonia){
        
        function initData(){
            CatalogosFactory.GetTipServ_NewList().then(function(data){
                vm.TipoServicioList = data.GetTipServ_NewListResult;
            });
            CatalogosFactory.GetMuestraMedios_NewList().then(function(data){
                vm.MedioList = data.GetMuestraMedios_NewListResult;
            });
            SetRelCol();
        }

        function SetRelCol(){
            vm.ObjRelColSer = {
                'Clv_Colonia': vm.ObjRelCol.Clv_Colonia,
                'Clv_Localidad': vm.ObjRelCol.Clv_Localidad,
                'Clv_Ciudad': vm.ObjRelCol.Clv_Ciudad
            };
            GetRelColSerList();
            GetRelColMedList();
        }

        function GetRelColSerList(){
            CatalogosFactory.GetRelColoniasSerList(vm.ObjRelColSer).then(function(data){
                vm.RelColSerList = data.GetRelColoniasSerListResult;
                vm.ShowRel = true;
            });
        }
        
        function AddRelColSer(){
            console.log('A');
            var objRelColoniasSer = {
                'Clv_Localidad': vm.ObjRelCol.Clv_Localidad,
                'Clv_Ciudad': vm.ObjRelCol.Clv_Ciudad,
                'Clv_Colonia': vm.ObjRelCol.Clv_Colonia,
                'Clv_TipSer': vm.TipoServicio.Clv_TipSer
            };
            console.log(objRelColoniasSer);
            CatalogosFactory.AddRelColoniasSer(objRelColoniasSer).then(function(data){
                if(data.AddRelColoniasSerResult == -1){
                    ngNotify.set('CORRECTO, se agregó la relación con el Tipo de Servicio.', 'success');
                    GetRelColSerList();
                }else{
                    ngNotify.set('ERROR, al agregar la relación con el Tipo de Servicio.', 'warn');
                    GetRelColSerList();
                }
            });
        }

        function DeleteRelColSer(ObjRelColSer){
            var ObjRelColSerD = {
                'Clv_Localidad': vm.ObjRelColSer.Clv_Localidad,
                'Clv_Ciudad': vm.ObjRelColSer.Clv_Ciudad,
                'Clv_Colonia': vm.ObjRelColSer.Clv_Colonia,
                'Clv_TipSer': ObjRelColSer.Clv_TipSer
            };
            CatalogosFactory.DeleteRelColoniasSer(ObjRelColSerD).then(function(data){
                if(data.DeleteRelColoniasSerResult == -1){
                    ngNotify.set('CORRECTO, se eliminoó la relación con el Tipo de Servicio.', 'success');
                    GetRelColSerList();
                }else{
                    ngNotify.set('ERROR, al eliminarar la relación con el Tipo de Servicio.', 'warn');
                    GetRelColSerList();
                }
            });
        }

        function GetRelColMedList(){
            CatalogosFactory.GetRelColoniaMedioList(vm.ObjRelColSer).then(function(data){
                vm.RelColMesList = data.GetRelColoniaMedioListResult;
            });
        }

        function AddRelColMed(){
            var objRelColoniaMedio = {
                'Clv_Localidad': vm.ObjRelCol.Clv_Localidad,
                'Clv_Ciudad': vm.ObjRelCol.Clv_Ciudad,
                'Clv_Colonia': vm.ObjRelCol.Clv_Colonia,
                'IdMedio': vm.Medio.IdMedio
            };
            CatalogosFactory.AddRelColoniaMedio(objRelColoniaMedio).then(function(data){
                if(data.AddRelColoniaMedioResult == -1){
                    ngNotify.set('CORRECTO, se agregó la relación con el Medio.', 'success');
                    GetRelColMedList();
                }else{
                    ngNotify.set('ERROR, al agregar la relación con el Medio.', 'warn');
                    GetRelColMedList();
                }
            });
        }

        function DeleteRelColMed(ObjRelColMed){
            var ObjRelColMedD = {
                'Clv_Localidad': vm.ObjRelColSer.Clv_Localidad,
                'Clv_Ciudad': vm.ObjRelColSer.Clv_Ciudad,
                'Clv_Colonia': vm.ObjRelColSer.Clv_Colonia,
                'IdMedio': ObjRelColMed.IdMedio
            };
            CatalogosFactory.DeleteRelColoniaMedio(ObjRelColMedD).then(function(data){
                if(data.DeleteRelColoniaMedioResult == -1){
                    ngNotify.set('CORRECTO, se eliminoó la relación con el Medio.', 'success');
                    GetRelColMedList();
                }else{
                    ngNotify.set('ERROR, al eliminarar la relación con el Medio.', 'warn');
                    GetRelColMedList();
                }
            });
        }
        
        function cancel(){
            $uibModalInstance.close();
        }

        var vm = this;
        vm.ObjRelCol = ObjRelColonia;
        vm.AddRelColSer = AddRelColSer;
        vm.DeleteRelColSer = DeleteRelColSer;
        vm.AddRelColMed = AddRelColMed;
        vm.DeleteRelColMed = DeleteRelColMed;
        vm.cancel = cancel;
        console.log(vm.ObjRelCol);
        initData();

    });