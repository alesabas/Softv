'use strict';

angular
    .module('softvApp')
    .controller('RedesAddCtrl', function(CatalogosFactory, ngNotify, $uibModal, $state, $stateParams, $rootScope, $localStorage){

        function SaveRedes(){
            var ObjRedIP = {
                'a': vm.IP1, 
                'b': vm.IP2, 
                'c': vm.IP3, 
                'd': vm.IP4, 
                'mask': vm.Mask, 
                'status': 'D'
            };
            console.log(ObjRedIP);
            CatalogosFactory.GetCatalogo_IpsList(ObjRedIP).then(function(data){
                console.log(data);
                if(data.GetCatalogo_IpsListResult.length > 0){
                    ngNotify.set('CORRECTO, se añadió una red nueva', 'success');
                }else{
                    ngNotify.set('ERROR, al añadir una red nueva', 'warn');
                }
            });
        }

        var vm = this;
        vm.SaveRedes = SaveRedes;

    });