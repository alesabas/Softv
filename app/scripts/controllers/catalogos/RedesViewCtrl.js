'use strict';

angular
    .module('softvApp')
    .controller('RedesViewCtrl', function(CatalogosFactory, ngNotify, $uibModal, $state, $stateParams, $rootScope, $localStorage){
    
        function initData(){
            GetRed();
        }

        function SaveRedes(){
            
        }

        function GetRed(){
            CatalogosFactory.GetDeepCatalogo_Ips($stateParams.id).then(function(data){
                console.log(data);
                var Red = data.GetDeepCatalogo_IpsResult;
                if(Red != null){
                    vm.IdRed = Red.IdRed;
                    var IPRed = DivIP(Red.IPRed);
                    vm.IP1 = parseInt(IPRed[0]);
                    vm.IP2 = parseInt(IPRed[1]);
                    vm.IP3 = parseInt(IPRed[2]);
                    vm.IP4 = parseInt(IPRed[3]);
                    vm.Mask = Red.mask;
                    vm.Mod = 1;
                }else{
                    ngNotify.set('ERROR, No se encontró la Red seleccionada.', 'warn');
                    $state.go('home.catalogos.redes');
                }
            });
        }

        function DivIP(IP) {
            var PartIP = IP.split(".");
            console.log(PartIP);
            return PartIP;
        }

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
            },
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
        vm.SaveRedes = SaveRedes;
        vm.transfer = transfer;
        console.log($stateParams.id);
        initData();
    
    });