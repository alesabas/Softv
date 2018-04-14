'use strict';

angular
    .module('softvApp')
    .controller('Grupo_VentasCtrl', function(SeriesFactory, VentasFactory, GrupoVentaFactory, CatalogosFactory, ngNotify, $uibModal, $rootScope, $state, $localStorage, $scope){
        
        function initData(){
            SeriesFactory.GetMuestra_Compania_RelUsuarioList($localStorage.currentUser.idUsuario).then(function(data){
                vm.PlazaList = data.GetMuestra_Compania_RelUsuarioListResult;
                OpenFormGrupo(vm.Op);
                GetGrupoList();
            });
        }

        function GetGrupoList(){
            var Obj = {
                'IdCompania': (vm.PlazaB != undefined)? vm.PlazaB.id_compania:null,
                'Clv_Usuario': $localStorage.currentUser.idUsuario,
                'Op': (vm.PlazaB != undefined)? 1:0
            };
            GrupoVentaFactory.GetGrupoVentaIdCompaniaList(Obj).then(function(data){
                vm.GrupoList = data.GetGrupoVentaIdCompaniaListResult;
                vm.ViewList = (vm.GrupoList.length > 0)? true:false;
            });
        }

        function SaveGrupo(){
            if(vm.Op == 1){
                var ObjGrupo = {
                    'Grupo': vm.Grupo,
                    'idcompania': 0
                };
                GrupoVentaFactory.GetNueGrupoVentas(ObjGrupo).then(function(data){
                    var Result = data.GetNueGrupoVentasResult;
                    if(Result.Res == 0){
                        vm.Clave = Result.Clv_Grupo;
                        SaveMovimientoSistema(ObjGrupo);
                        GetGrupoList();
                        ngNotify.set('CORRECTO, Se guardo el Grupo de Ventas.', 'success');
                    }else{
                        ngNotify.set('ERROR, ' + Result.Msj, 'warn');
                        GetGrupoList();
                    }
                });
            }else if(vm.Op == 3){
                var ObjGrupo = {
                    'Clv_Grupo': vm.Clave,
                    'Grupo': vm.Grupo
                };
                GrupoVentaFactory.GetModGrupoVentas(ObjGrupo).then(function(data){
                    var Result = data.GetModGrupoVentasResult;
                    if(Result.Res == 0){
                        ngNotify.set('CORRECTO, Se guardo el Grupo de Ventas.', 'success');
                        GetGrupoList();
                        SaveMovimientoSistema(ObjGrupo);
                    }else{
                        ngNotify.set('ERROR, ' + Result.Msj, 'warn');
                        GetGrupoList();
                        OpenFormGrupo(0);
                    }
                });
            }
        }

        function RelPlaza(Op, IdCompania){
            var ObjGrupoRel = {
                'ClvGrupo': vm.Clave,
                'IdCompania': (Op == 1)? vm.Plaza.id_compania:IdCompania,
                'Op': Op
            };
            GrupoVentaFactory.GetAddRelGrupoVentaPlaza(ObjGrupoRel).then(function(data){
                var Result = data.GetAddRelGrupoVentaPlazaResult.Res;
                if(Result == 1){
                    var Msj = (Op == 1)?  'Se guardó la relación con la Región':'Se eliminó la relación con la Región.';
                    ngNotify.set('CORRECTO, ' + Msj, 'success');
                }else{
                    ngNotify.set('ERROR, La relación con la Región ya existe', 'warn');
                }
                var Obj = {
                    'Clv_Grupo': vm.Clave,
                    'Grupo': vm.Grupo
                };
                GetGrupoList();
                OpenFormGrupo(vm.Op, Obj);
            });
        }

        function GetRelPlazaList(){
            GrupoVentaFactory.GetRelGrupoVentaPlazaList(vm.Clave).then(function(data){
                vm.RelPlazaList = data.GetRelGrupoVentaPlazaListResult;
                vm.ViewPList = (vm.RelPlazaList.length > 0)? true:false;
            });
        }

        function SaveMovimientoSistema(Comando){
            var objMovSist = {
                'Clv_usuario': $localStorage.currentUser.idUsuario, 
                'Modulo': 'home.ventas', 
                'Submodulo': 'home.ventas.grupo_ventas', 
                'Observaciones': (vm.Op == 1)? 'Se agregó grupo de ventas':'Se editó grupo de ventas', 
                'Usuario': $localStorage.currentUser.usuario, 
                'Comando': JSON.stringify(Comando), 
                'Clv_afectada': (vm.Op == 1)? 0:vm.Clave
            };
            CatalogosFactory.AddMovSist(objMovSist).then(function(data){
                var Obj = {
                    'Clv_Grupo': vm.Clave,
                    'Grupo': vm.Grupo
                };
                var Op = (vm.Op == 1)? 2:vm.Op;
                OpenFormGrupo(Op, Obj);
            });
        }

        function OpenFormGrupo(Op, ObjGrupo){
            vm.DisPlaza = (Op == 1)? true:false;
            vm.DisGrupo = (Op == 2)? true:false;
            vm.Clave = (Op != 1)? ObjGrupo.Clv_Grupo:null; 
            vm.Grupo = (Op != 1)? ObjGrupo.Grupo:null;
            vm.DisBtnEditar = (Op == 3)? true:false;
            vm.DisBtnCancelar = (Op == 3)? true:false;
            vm.Op = Op;
            if(vm.Op == 2 || vm.Op == 3){
                GetRelPlazaList();
            }else{
                vm.RelPlazaList = [];
                vm.ViewPList = (vm.RelPlazaList.length > 0)? true:false;
            }
        }

        var vm = this;
        vm.Op = 1;
        vm.OpenFormGrupo = OpenFormGrupo;
        vm.GetGrupoList = GetGrupoList;
        vm.SaveGrupo = SaveGrupo;
        vm.RelPlaza = RelPlaza;
        initData();
 
    });