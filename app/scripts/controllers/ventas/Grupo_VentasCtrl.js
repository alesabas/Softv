'use strict';

angular
    .module('softvApp')
    .controller('Grupo_VentasCtrl', function(SeriesFactory, VentasFactory, GrupoVentaFactory, ngNotify, $uibModal, $rootScope, $state, $localStorage, $scope){
        
        function initData(){
            SeriesFactory.GetMuestra_Compania_RelUsuarioList($localStorage.currentUser.idUsuario).then(function(data){
                vm.PlazaList = data.GetMuestra_Compania_RelUsuarioListResult;
                vm.Plaza = vm.PlazaList[0];
                GetGrupoList();
            });
        }

        function GetGrupoList(){
            GrupoVentaFactory.GetConGrupoVentas1(vm.Plaza.id_compania).then(function(data){
                vm.GrupoList = data.GetConGrupoVentas1Result;
                vm.ViewList = (vm.GrupoList.length > 0)? true:false;
            });
        }

        function OpenFormGrupo(Op, ObjGrupo){
            vm.Clave = (Op != 2)? null:ObjGrupo.Clv_Grupo;
            vm.Grupo = (Op != 2)? null:ObjGrupo.Grupo; 
            vm.GrupoP = (Op != 2)? null:ObjGrupo.Grupo;
            vm.ReqGrupo = (Op == 0)? false:true;
            vm.DisGrupo = (Op == 0)? true:false;
            vm.DisBtnGuardar = (Op == 0)? false:true;
            vm.DisBtnNuevo = (Op == 0)? true:false;
            vm.DisBtnCancelar = (Op == 0)? false:true;
            vm.DisPlaza = (Op == 2)? true:false;
            vm.DisBtnEditar = (Op == 0)? false:true;
            vm.Op = Op;
        }

        function SaveGrupo(){
            if(vm.Op == 1){
                var ObjGrupo = {
                    'Grupo': vm.Grupo,
                    'idcompania': vm.Plaza.id_compania
                };
                GrupoVentaFactory.GetNueGrupoVentas(ObjGrupo).then(function(data){
                    var Result = data.GetNueGrupoVentasResult;
                    if(Result.Res == 0){
                        var ObjMovimientoSistema = {
                            'usuario': $localStorage.currentUser.usuario,
                            'contrato': 0,
                            'Sistema': 'Softv',
                            'Pantalla': 'Grupo de Ventas',
                            'control': 'Nuevo Grupo Ventas',
                            'valorant': '',
                            'valornuevo': vm.Grupo,
                            'clv_ciudad': 'AG'
                        };
                        VentasFactory.GetInserta_MovSist(ObjMovimientoSistema).then(function(data){
                            ngNotify.set('CORRECTO, Se guardo el Grupo de Ventas.', 'success');
                            GetGrupoList();
                            OpenFormGrupo(0);
                        });
                    }else{
                        ngNotify.set('ERROR, ' + Result.Msj, 'warn');
                        GetGrupoList();
                    }
                });
            }else if(vm.Op == 2){
                var ObjGrupo = {
                    'Clv_Grupo': vm.Clave,
                    'Grupo': vm.Grupo
                };
                GrupoVentaFactory.GetModGrupoVentas(ObjGrupo).then(function(data){
                    var Result = data.GetModGrupoVentasResult;
                    if(Result.Res == 0){
                        var ObjMovimientoSistema = {
                            'usuario': $localStorage.currentUser.usuario,
                            'contrato': 0,
                            'Sistema': 'Softv',
                            'Pantalla': 'Grupo de Ventas',
                            'control': 'Grupo Ventas',
                            'valorant': vm.GrupoP,
                            'valornuevo': vm.Grupo,
                            'clv_ciudad': 'AG'
                        };
                        VentasFactory.GetInserta_MovSist(ObjMovimientoSistema).then(function(data){
                            ngNotify.set('CORRECTO, Se guardo el Grupo de Ventas.', 'success');
                            GetGrupoList();
                            OpenFormGrupo(0);
                        });
                    }else{
                        ngNotify.set('ERROR, ' + Result.Msj, 'warn');
                        GetGrupoList();
                        OpenFormGrupo(0);
                    }
                });
            }
        }

        var vm = this;
        vm.Op = 0;
        vm.DisGrupo = true;
        vm.DisPlaza = false;
        vm.DisBtnGuardar = false;
        vm.DisBtnNuevo = true;
        vm.DisBtnCancelar = false;
        vm.DisBtnEditar = false;
        var OriginForm = angular.copy(vm.Grupo);
        vm.OpenFormGrupo = OpenFormGrupo;
        vm.GetGrupoList = GetGrupoList;
        vm.SaveGrupo = SaveGrupo;
        initData();
 
    });