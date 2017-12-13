'use strict';

angular
    .module('softvApp')
    .controller('Grupo_VentasCtrl', function(SeriesFactory, GrupoVentaFactory, ngNotify, $uibModal, $rootScope, $state, $localStorage){
        
        function initData(){
            SeriesFactory.GetMuestra_Compania_RelUsuarioList($localStorage.currentUser.idUsuario).then(function(data){
                console.log(data);
                vm.PlazaList = data.GetMuestra_Compania_RelUsuarioListResult;
                vm.Plaza = vm.PlazaList[0];
                GetGrupoList();
            });
        }

        function GetGrupoList(){
            GrupoVentaFactory.GetConGrupoVentas1(vm.Plaza.id_compania).then(function(data){
                console.log(data);
                vm.GrupoList = data.GetConGrupoVentas1Result;
                vm.ViewList = (vm.GrupoList.length > 0)? true:false;
            });
        }

        function OpenFormGrupo(Op){
            vm.DisGrupo = (Op == 0)? true:false;
            vm.DisBtnGuardar = (Op == 0)? false:true;
            vm.DisBtnNuevo = (Op == 0)? true:false;
            vm.DisBtnCancelar = (Op == 0)? false:true;
            vm.DisPlaza = (Op == 2)? true:false;
            vm.DisBtnEditar = (Op == 0)? false:true;
            vm.Op = Op;
        }

        /*function OpenUpdate(){

        }*/

        function SaveGrupo(){
            
        }

        var vm = this;
        vm.Op = 0;
        vm.DisGrupo = true;
        vm.DisPlaza = false;
        vm.DisBtnGuardar = false;
        vm.DisBtnNuevo = true;
        vm.DisBtnCancelar = false;
        vm.DisBtnEditar = false;
        vm.OpenFormGrupo = OpenFormGrupo;
        vm.GetGrupoList = GetGrupoList;
        vm.SaveGrupo = SaveGrupo;
        initData();
 
    });