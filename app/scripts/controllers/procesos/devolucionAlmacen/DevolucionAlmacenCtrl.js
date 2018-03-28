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
            if(vm.clave){
                var ObjDevolucion = {
                    'OP': N,
                    'CLV_ORDEN': (N == 1) ? vm.clave : 0,
                    'SERIE': '',
                    'FOLIO': 0,
                    'TIPOAPARATO': '',
                    'MACCABLEMODEM': (N == 4) ? vm.Mac : '',
                    'CLV_USUARIO':  '',
                    'CLV_UsuarioLogin': $localStorage.currentUser.idUsuario
                };
                GetDevolucionList(ObjDevolucion);
            }else{
                var Obj = {
                    'OP': 0,
                    'CLV_ORDEN': 0,
                    'SERIE': '',
                    'FOLIO': 0,
                    'TIPOAPARATO': '',
                    'MACCABLEMODEM': '',
                    'CLV_USUARIO': '',
                    'CLV_UsuarioLogin': $localStorage.currentUser.idUsuario
                };                
                   
                    GetDevolucionList(Obj);
            }
           
           
        }

        function RegresaAlmacen(Obj){
            var ObjDevolucion = {
                'CLV_ORDEN': Obj.CLV_ORDEN,
                'TIPOAPARATO': Obj.TIPOAPARATO,
                'CLV_CABLEMODEM': Obj.CLV_CABLEMODEM,
                'MACCABLEMODEM': Obj.MACCABLEMODEM,
                'ESTADOAPARATO': Obj.ESTADOAPARATO,                              
                'PROVIENE': Obj.PROVIENEDE,
                'MARCA': Obj.MARCA
            };
            DevolucionAlmacenFactory.GetPROCESODevolucionAparatosAlmacen(ObjDevolucion).then(function(data){
                var Obj = {
                    'OP': 0,
                    'CLV_ORDEN': 0,
                    'SERIE': '',
                    'FOLIO': 0,
                    'TIPOAPARATO': '',
                    'MACCABLEMODEM': '',
                    'CLV_USUARIO': '',
                    'CLV_UsuarioLogin': $localStorage.currentUser.idUsuario
                };                
                    ngNotify.set('El aparato  se regresó correctamente al almacén.', 'success');
                    GetDevolucionList(Obj);
                
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