'use strict';

angular
    .module('softvApp')
    .controller('DevolucionAlmacenCtrl', function (DevolucionAlmacenFactory, CatalogosFactory,ngNotify, atencionFactory, $uibModal, $localStorage) {
        
        function initData(){
            console.log($localStorage.currentUser.idUsuario);
            var ObjDevolucion = {
                'OP': 0,
                'CLV_ORDEN': 0,
                'SERIE': '',
                'FOLIO': 0,
                'TIPOAPARATO': '',
                'MACCABLEMODEM': '',
                'CLV_USUARIO': '',
                'CLV_UsuarioLogin': $localStorage.currentUser.idUsuario
            };
            GetDevolucionList(ObjDevolucion);
        }

        function buscar(N){
           var ObjDevolucion = {
                'OP': 0,
                'CLV_ORDEN': (N == 0) ? vm.clave : 0,
                'SERIE': '',
                'FOLIO': 0,
                'TIPOAPARATO': '',
                'MACCABLEMODEM': (N == 1) ? vm.Caja : '',
                'CLV_USUARIO': (N == 2) ? 'user' : '',
                'CLV_UsuarioLogin': $localStorage.currentUser.idUsuario
            };
            GetDevolucionList(ObjDevolucion);
        }

        function RegresaAlmacen(Obj){
            var ObjDevolucion = {
                'CLV_ORDEN': Obj.CLV_ORDEN,
                'TIPOAPARATO': Obj.TIPOAPARATO,
                'CLV_CABLEMODEM': Obj.CLV_CABLEMODEM,
                'MACCABLEMODEM': Obj.MACCABLEMODEM,
                'ESTADOAPARATO': Obj.ESTADOAPARATO,                              
                'PROVIENE': Obj.PROVIENE,
                'MARCA': Obj.MARCA
            };
            DevolucionAlmacenFactory.GetPROCESODevolucionAparatosAlmacen(ObjDevolucion).then(function(data){
                console.log(data);
                var DevolucionResult = data.GetPROCESODevolucionAparatosAlmacenResult;
                if(DevolucionResult > 0){
                    ngNotify.set('El aparato  se regresó correctamente al almacén.', 'success');
                    GetDevolucionList(ObjDevolucion);
                }else{
                    ngNotify.set('Ocurrió un error  al regresar el apratato al almacén.', 'warn');
                    GetDevolucionList(ObjDevolucion);
                }
            });
        }

        function GetDevolucionList(ObjDevolucion){
            DevolucionAlmacenFactory.GetMUESTRADevolucionAparatosAlmacen(ObjDevolucion).then(function(data){
                console.log(data);
                vm.DevolucionList = data.GetMUESTRADevolucionAparatosAlmacenResult;
            });
        }

        var vm = this;
        initData();
        vm.buscar = buscar;
        vm.RegresaAlmacen = RegresaAlmacen;
    });