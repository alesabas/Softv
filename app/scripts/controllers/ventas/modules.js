'use strict';

angular
    .module('softvApp')
    .config(function($stateProvider){
        
        var states = [
            {
                name: 'home.ventas',
                abstract: true,
                template: '<div ui-view></div>'  
            },
            {
                name: 'home.ventas.vendedores',
                data: {
                    pageTitle: 'SOFTV | VENDEDORES',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/ventas/vendedores',
                templateUrl: 'views/ventas/Vendedores.html',
                controller: 'VendedoresCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.ventas.series',
                data: {
                    pageTitle: 'SOFTV | SERIES',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/ventas/series',
                templateUrl: 'views/ventas/Series.html',
                controller: 'SeriesCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.ventas.rangos',
                data: {
                    pageTitle: 'SOFTV | RANGOS',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/ventas/rango',
                templateUrl: 'views/ventas/Rangos.html',
                controller: 'RangosCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.ventas.comisiones_servicio',
                data: {
                    pageTitle: 'SOFTV | ESTABLECER COMISIONES POR SERVICIO',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/ventas/comisiones_servicio',
                templateUrl: 'views/ventas/Comisiones_Servicio.html',
                controller: 'Comisiones_ServicioCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.ventas.grupo_ventas',
                data: {
                    pageTitle: 'SOFTV | GRUPO DE VENTAS',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/ventas/grupo_ventas',
                templateUrl: 'views/ventas/Grupo_Ventas.html',
                controller: 'Grupo_VentasCtrl',
                controllerAs: '$ctrl'
            }
        ];

        states.forEach(function(state){
            $stateProvider.state(state);
        });

    });