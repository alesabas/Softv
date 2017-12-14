'use strict';

angular
    .module('softvApp')
    .controller('Comisiones_ServicioCtrl', function(SeriesFactory, ComisionServicioFactory, ngNotify, $uibModal, $rootScope, $state, $localStorage){
    
        function initData(){
            SeriesFactory.GetMuestra_Compania_RelUsuarioList($localStorage.currentUser.idUsuario).then(function(data){
                console.log(data);
                vm.PlazaList = data.GetMuestra_Compania_RelUsuarioListResult;
                vm.Plaza = vm.PlazaList[0];
                GetTipoServicioList();
            });
        }

        function SaveComision(ObjCom){
            var ObjComision = {
                'CLV_GRUPO': ObjCom.CLV_GRUPO,
                'CLV_SERVICIO': ObjCom.CLV_SERVICIO, 
                'CLV_RANGO': ObjCom.CLV_RANGO, 
                'COMISION': ObjCom.COMISION
            };
            console.log(ObjComision);
            ComisionServicioFactory.GetNUECOMISION(ObjComision).then(function(data){
                console.log(data);
                ngNotify.set('CORRECTO, Se guardo la comisión.', 'success');
                GetComisionList();
            });
        }

        function DeleteComision(){
            var ObjComision = {
                'CLV_SERVICIO': vm.Servicio.CLV_SERVICIO, 
                'CLV_RANGO': vm.Rango.CLV_RANGO
            };
            ComisionServicioFactory.GetBORCOMISION(ObjComision).then(function(data){
                console.log(data);
                ngNotify.set('CORRECTO, Se elimino la comisión.', 'success');
                GetComisionList();
            });
        }

        function GetTipoServicioList(){
            var ObjTipoServicio = {
                'Clv_TipServ': 0,
                'OP': 0
            };
            ComisionServicioFactory.GetMuestraTipServ(ObjTipoServicio).then(function(data){
                console.log(data);
                vm.TipoServicioList = data.GetMuestraTipServResult;
                vm.TipoServicio = vm.TipoServicioList[0];
                GetServicoList();
            });
        }

        function GetServicoList(){
            var ObjServicio = {
                'Clv_TipServ': vm.TipoServicio.Clv_TipServ,
                'CLV_SERVICIO': 0,
                'OP': 2,
                'idcompania': vm.Plaza.id_compania
            };
            ComisionServicioFactory.GetMuestraServicios(ObjServicio).then(function(data){
                console.log(data);
                vm.ServicioList = data.GetMuestraServiciosResult;
                vm.Servicio = vm.ServicioList[0];
                GetRangoList();
            });
        }

        function GetRangoList(){
            var ObjRango = {
                'CLV_RANGO': 0,
                'OP': 0,
                'idcompania': vm.Plaza.id_compania
            };
            ComisionServicioFactory.GetCONRANGOS(ObjRango).then(function(data){
                console.log(data);
                vm.RangoList = data.GetCONRANGOSResult;
                vm.Rango = vm.RangoList[0];
                GetComisionList();
            });
        }

        function GetComisionList(){
            if(vm.PlazaList.length > 0 &&
               vm.ServicioList.length > 0 &&
               vm.RangoList.length > 0){
                var ObjComision = {
                    'CLV_SERVICIO': vm.Servicio.CLV_SERVICIO,
                    'CLV_RANGO': vm.Rango.CLV_RANGO,
                    'idcompania': vm.Plaza.id_compania
                };
                ComisionServicioFactory.GetCONCOMISION(ObjComision).then(function(data){
                    console.log(data);
                    vm.ComisionList = data.GetCONCOMISIONResult;
                    vm.ViewList = (vm.ComisionList.length > 0)? true:false;
                });
            }
        }

        var vm = this;
        vm.GetTipoServicioList = GetTipoServicioList;
        vm.GetServicoList = GetServicoList;
        vm.GetRangoList = GetRangoList;
        vm.GetComisionList = GetComisionList;
        vm.SaveComision = SaveComision;
        vm.DeleteComision = DeleteComision;
        initData();

    });