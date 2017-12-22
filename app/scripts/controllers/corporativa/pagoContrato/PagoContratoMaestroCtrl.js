'use strict';
angular.module('softvApp').controller('PagoContratoMaestroCtrl', PagoContratoMaestroCtrl)

function PagoContratoMaestroCtrl($uibModal, $state, $rootScope, cajasFactory, ngNotify, inMenu, pagosMaestrosFactory, ContratoMaestroFactory, $filter) {

    function initialData() {
        ContratoMaestroFactory.GetContratoList().then(function (data) {
            vm.Contratos = data.GetContratos_CSResult;
            ContratoMaestroFactory.GetDistribuidores().then(function (data) {
                vm.Distribuidores = data.GetDistribuidoresResult;
                ContratoMaestroFactory.GetCiudadList(vm.Distribuidores[0].Clv_Plaza).then(function (data) {
                    vm.Ciudades = data.GetListaCiudadesPorPlazaResult;
                });
            });
        });
        vm.displayCollection = [].concat(vm.Contratos);
    }

    function ObtenerCiudades(x) {
        ContratoMaestroFactory.GetCiudadList(x.Clv_Plaza).then(function (data) {
            vm.Ciudades = data.GetListaCiudadesPorPlazaResult;
        });

    }   

    function DetalleFactura(clv_session) {
        ContratoMaestroFactory.Sp_DameDetalleFacturaMaestra(clv_session).then(function (result) {

            vm.detalleFactura = result.GetSp_DameDetalleFacturaMaestraListResult;
        });
    }


    function Buscarporcontrato(preguntar) {
         if(vm.contratobusqueda){
            var obj = {
                'RazonSocial': '',
                'NombreComercial': '',
                'ClvCiudad': vm.contratobusqueda,
                'Op': 4
            };
            ContratoMaestroFactory.BuscarContratos(obj).then(function (data) {
                vm.Contratos = data.GetBusquedaContratoMaestroFacResult;
                vm.displayCollection = [].concat(vm.Contratos);
                resetBusquedas();
            });           
         }         
}


    function BuscarNombrec() {
        if (!vm.NombreComer) {
            ngNotify.set('Ingrese el nombre comercial', 'error');
        }
        $('.buscarContrato').collapse('hide');
        var obj = {
            'RazonSocial': '',
            'NombreComercial': vm.NombreComer,
            'ClvCiudad': 0,
            'Op': 2
        }

        ContratoMaestroFactory.BuscarContratos(obj).then(function (data) {
            vm.Contratos = data.GetBusquedaContratoMaestroFacResult;
            if (vm.Contratos == undefined) {
                ngNotify.set('No se encontro el contrato.', 'error');
                resetBusquedas();
              } else {      
                resetBusquedas();               
            }
        });
        vm.displayCollection = [].concat(vm.Contratos);
    }

    function BuscarRazonS() {
        if (!vm.RazonS) {
            ngNotify.set('Ingrese la razon social', 'error');
        }
        $('.buscarContrato').collapse('hide');
        var obj = {
            'RazonSocial': vm.RazonS,
            'NombreComercial': '',
            'ClvCiudad': 0,
            'Op': 1
        };
        ContratoMaestroFactory.BuscarContratos(obj).then(function (data) {
            vm.Contratos = data.GetBusquedaContratoMaestroFacResult;
            if (vm.Contratos == undefined) {
                ngNotify.set('No se encontro el contrato.', 'error');               
            } 
            resetBusquedas();
        });
        vm.displayCollection = [].concat(vm.Contratos);
    }

    function BuscarCiudad() {
        
        if (!vm.Ciudad) {
            ngNotify.set('Ingrese distribuidor y ciudad.', 'error');
        }
        $('.buscarContrato').collapse('hide');
        var obj = {
            'RazonSocial': '',
            'NombreComercial': '',
            'ClvCiudad': vm.Ciudades.Clv_Ciudad,
            'Op': 3
        };
        ContratoMaestroFactory.BuscarContratos(obj).then(function (data) {
            vm.Contratos = data.GetBusquedaContratoMaestroFacResult;  
            vm.displayCollection = [].concat(vm.Contratos);         
        });
       
    }

    function reset() {
        vm.Contratos = '';
        vm.showConceptos = false;
        vm.showDatosCliente = false;
        vm.muestraCliente = false;
        vm.muestraTablaCliente = false;
    }

    function resetBusquedas() {
        vm.contratobusqueda = '';
        vm.NombreComer = '';
        vm.RazonS = '';
        vm.Ciudad = '';
    }   

    function edocta() {

        ContratoMaestroFactory.ReporteEstadoCuentaNuevo(vm.saldo.Clv_SessionPadre, vm.Contratos.IdContratoMaestro, "").then(function (data) {

            var options = {};
            options.Id = data.GetReporteEdoCuenta_CMResult[0].lineaTR;
            options.IdEstadoCuenta = 0;
            options.Contrato = 0;
            options.Tipo = 3;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/facturacion/modalEdoCuenta.html',
                controller: 'ModalNuevoEdoctaCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                size: 'lg',
                resolve: {
                    options: function () {
                        return options;
                    }
                }
            });


        });
    }

    function enterContrato(event) {
        if (event.which === 13) {
            Buscarporcontrato(true);
        }
    }

    function enterNombre(event) {
        if (event.which === 13) {
            BuscarNombrec();
        }
    }

    function enterRazon(event) {
        if (event.which === 13) {
            BuscarRazonS();
        }
    }

  
   

    var vm = this;
    $('.buscarContrato').collapse();
    vm.BuscarNombrec = BuscarNombrec;
    vm.BuscarRazonS = BuscarRazonS;
    vm.BuscarCiudad = BuscarCiudad;
    vm.ObtenerCiudades = ObtenerCiudades;
    vm.Buscarporcontrato = Buscarporcontrato;   
    vm.edocta = edocta;
    vm.enterContrato = enterContrato;
    vm.enterNombre = enterNombre;
    vm.enterRazon = enterRazon;
    vm.color = 'white';   
    vm.fecha = new Date();   
    vm.modalInstanceLista = new Object();
    initialData();
}