'use strict';

angular
    .module('softvApp')
    .controller('RangosCtrl', function(SeriesFactory, ngNotify, $uibModal, $rootScope, $state, $localStorage){

        function initData(){
            SeriesFactory.GetMuestra_Compania_RelUsuarioList($localStorage.currentUser.idUsuario).then(function(data){
                vm.PlazaList = data.GetMuestra_Compania_RelUsuarioListResult;
                vm.Plaza = vm.PlazaList[0];
                GetRangoList();
            });
        }

        function GetRangoList(){
            var ObjRango = {
                'CveRango': 0,
                'idcompania': vm.Plaza.id_compania 
            };
            SeriesFactory.GetMuestraCatalogoDeRangos(ObjRango).then(function(data){
                vm.RangoList = data.GetMuestraCatalogoDeRangosResult;
                vm.ViewList = (vm.RangoList.length > 0)? true:false;
            });
        }

        function OpenRangoAdd(){ 
            var modalInstance = $uibModal.open({ 
                animation: true, 
                ariaLabelledBy: 'modal-title', 
                ariaDescribedBy: 'modal-body', 
                templateUrl: 'views/ventas/ModalRangoForm.html', 
                controller: 'ModalRangoAddCtrl', 
                controllerAs: 'ctrl', 
                backdrop: 'static', 
                keyboard: false, 
                class: 'modal-backdrop fade', 
                size: 'md'
            }); 
        } 

        function OpenRangoUpdate(CveRango){
            var CveRango = CveRango;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/ventas/ModalRangoForm.html',
                controller: 'ModalRangoUpdateCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    CveRango: function () {
                        return CveRango;
                    }
                }
            });
        }

        function OpenRangoView(CveRango){
            var CveRango = CveRango;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/ventas/ModalRangoForm.html',
                controller: 'ModalRangoViewCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    CveRango: function () {
                        return CveRango;
                    }
                }
            });
        }

        function OpenRangoDelete(CveRango){
            var CveRango = CveRango;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/ventas/ModalRangoDelete.html',
                controller: 'ModalRangoDeleteCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                resolve: {
                    CveRango: function () {
                        return CveRango;
                    }
                }
            });
        }

        $rootScope.$on('LoadRangoList', function(e, IdContrato){
            GetRangoList();
        });

        var vm = this;
        vm.GetRangoList = GetRangoList;
        vm.OpenRangoAdd = OpenRangoAdd;
        vm.OpenRangoUpdate = OpenRangoUpdate;
        vm.OpenRangoView = OpenRangoView;
        vm.OpenRangoDelete = OpenRangoDelete;
        initData();

    });