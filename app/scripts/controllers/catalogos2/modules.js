'use strict';

angular
    .module('softvApp')
    .config(function ($stateProvider) {
        var states = [{
            name: 'home.motivos',
            abstract: true,
            template: '<div ui-view></div>'
          },
          {
            name: 'home.motivos.MotivosDeCancelacion',
            data: {
              pageTitle: 'SOFTV | MOTIVOS DE CANCELACION',
            },
                url: '/MotivosDeCancelacion',
                templateUrl: 'views/catalogos/MotivosDeCancelacion.html',
                controller: 'MotivosDeCancelacionCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.motivos.CancelacionFactura',
                data: {
                  pageTitle: 'SOFTV | MOTIVOS DE CANCELACION DE FACTURAS',
                },
                    url: '/MotivosDeCancelacionFactura',
                    templateUrl: 'views/catalogos/MotivosCancelacionFactura.html',
                    controller: 'MotivosDeCancelacionFacturaCtrl',
                    controllerAs: '$ctrl'
                },
                {
                    name: 'home.motivos.ReimpresionFactura',
                    data: {
                      pageTitle: 'SOFTV | MOTIVOS DE REIMPRESION DE FACTURAS',
                    },
                        url: '/MotivosDeReimpresionFactura',
                        templateUrl: 'views/catalogos/MotivosReimpresionFactura.html',
                        controller: 'MotivosReImpresionFacturaCtrl',
                        controllerAs: '$ctrl'
                    },
        ];
        states.forEach(function (state) {
            $stateProvider.state(state);
        });
    });