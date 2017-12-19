'use strict';

angular
    .module('softvApp')
    .controller('descuentoComboCtrl', function($uibModal, CatalogosFactory, $localStorage){
        
        function initData(){
            CatalogosFactory.GetConDescuentoCombo('',0,488).then(function(result){
            vm.list=result.GetConDescuentoComboResult;           
            });
        }       
        var vm = this;
        initData();       
    });