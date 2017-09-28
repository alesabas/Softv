'use strict';

angular
    .module('softvApp')
    .controller('SucursalDetalleCtrl', function(CatalogosFactory, ngNotify, $rootScope, $state, $stateParams,atencionFactory){

        function initData(){
            CatalogosFactory.GetDeepSucursal(Clv_Sucursal).then(function(data){
              var DatosSucursal = data.GetDeepSUCURSALESResult;             
              vm.cp = DatosSucursal.CP;
              vm.calle = DatosSucursal.Calle;
              vm.ciudad = DatosSucursal.Ciudad;             
              vm.Clv_Sucursal = DatosSucursal.Clv_Sucursal;
              vm.colonia = DatosSucursal.Colonia;
              vm.contacto = DatosSucursal.Contacto;
              vm.email = DatosSucursal.Email;
              vm.atencion = DatosSucursal.Horario;
              vm.ip = DatosSucursal.IP;
              vm.impresoraff = DatosSucursal.Impresora;
              vm.tickets = DatosSucursal.Impresora_Tickets;
              vm.contratos = DatosSucursal.Impresora_contratos;
              vm.tarjetas = DatosSucursal.Impresora_tarjetas;
              vm.Matriz = (DatosSucursal.Matriz === 1) ? true : false;
              vm.municipio = DatosSucursal.Municipio;
              vm.descripcion = DatosSucursal.Nombre;
              vm.numero = DatosSucursal.Numero;
              vm.referencia = DatosSucursal.Referencia;
              vm.serie = DatosSucursal.Serie;
              vm.telefono = DatosSucursal.Telefono;
              vm.folio = DatosSucursal.UltimoFolioUsado;
              vm.idcompania = DatosSucursal.idcompania;
              vm.Titulo = 'Detalle Sucursal  - ' + vm.descripcion;
              console.log(vm.idcompania);
              atencionFactory.getPlazas().then(function (data) {                    
                  vm.plazas = data.GetMuestra_Compania_RelUsuarioListResult;
                  vm.plazas.forEach(function (item, index) {                        
                      console.log(item,index);
                      if (item.id_compania === vm.idcompania) {                           
                          vm.plaza = vm.plazas[index];
                      }
                  });
                  
              });
                
            });
           
        }     

        var vm = this;
        var Clv_Sucursal = $stateParams.id;
        vm.Titulo = 'Sucursal Detalle - ' + Clv_Sucursal;
        vm.blockForm = true;
        vm.blocksave = true;
        vm.blockcancel = true;
        initData();

    });
   
   
   
   
   
   
  