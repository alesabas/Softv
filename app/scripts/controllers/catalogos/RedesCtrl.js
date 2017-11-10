'use strict';

angular
    .module('softvApp')
    .controller('RedesCtrl', function(CatalogosRedIPFactory, ngNotify, $uibModal, $state, $stateParams, $rootScope, $localStorage){

        function initData(){
            var ObjRedList = {
                'IdRed': 0, 
                'Op': 0
            };
            CatalogosRedIPFactory.GetListCatalogo_Ips(ObjRedList).then(function(data){
                vm.RedList = data.GetListCatalogo_IpsResult;
                vm.ViewList = (vm.RedList.length > 0)? true:false;
            });
        }

        var vm = this;
        initData();
    
    });