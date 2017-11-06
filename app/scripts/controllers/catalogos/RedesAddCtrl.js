'use strict';

angular
    .module('softvApp')
    .controller('RedesAddCtrl', function(CatalogosFactory, ngNotify, $uibModal, $state, $stateParams, $rootScope, $localStorage){

        function transfer(from, to, index) {
            if (index >= 0) {
                to.push(from[index]);
                from.splice(index, 1);
            } else {
                for (var i = 0; i < from.length; i++) {
                    to.push(from[i]);
                }
                from.length = 0;
            }
        }

        var vm = this;
        vm.SelctItems = [];
        vm.Items = [
            {
                Name: 'ABC',
                Desc: 'abc'
            },
            {
                Name: 'DEF',
                Desc: 'def'
            },
            {   
                Name: 'GHI',
                Desc: 'ghi'
            },
            {
                Name: 'JKllL',
                Desc: 'jkl'
            }
        ];
        vm.transfer = transfer;

    });