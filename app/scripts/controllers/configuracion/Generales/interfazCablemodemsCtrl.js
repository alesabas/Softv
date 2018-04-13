'use strict';
angular
  .module('softvApp')
  .controller('interfazCablemodemsCtrl', function ($state,$localStorage,encuestasFactory , $filter, rolFactory, atencionFactory, generalesSistemaFactory, globalService, $uibModal, ngNotify,ServiciosFactory) {

    function init() {
      encuestasFactory.GetMuestra_DistribuidoresEncList().then(function (data) {
        console.log(data);
        vm.Distribuidores = data.GetMuestra_DistribuidoresEncListResult;   
          
          encuestasFactory.GetTipSerEncList().then(function (data) {
            console.log(data);
            vm.Servicios = data.GetTipSerEncListResult;

            ServiciosFactory.GetMedioList().then(function(result){
              vm.tecnologias=result.GetMedioListResult;
               console.log( vm.tecnologias);
            });
          });
      });
    }

    function cambioDistribuidor() {     
      var id = vm.distribuidor.Clv_Plaza;
      encuestasFactory.Muestra_PlazaEnc(id).then(function (data) {
        console.log(data);
        vm.Plazas = data.GetMuestra_PlazaEncListResult;
      });
    }

    function filtrar (op){

      var data = {
        'CLVDISTRIBUIDOR':(vm.distribuidor)?vm.distribuidor.Clv_Plaza:0,
        'CLVPLAZA':(vm.Plazas)? vm.Plazas.id_compania:0,
        'CLVTIPSER':(vm.servicio)?vm.servicio.Clv_TipSer:0,
        'Clv_Orden':(vm.clvorden)? vm.clvorden:0,
        'MacAddress':(vm.mac)? vm.mac:0,
        'fecha_habilitar':(vm.fechasolicitud)? $filter('date')(vm.fechasolicitud, 'yyyy/MM/dd'):'9999/09/09',
        'contratocompuesto': (vm.contrato)?vm.contrato:'',
        'IdMedio':(vm.tecnologia)?vm.tecnologia.IdMedio:0,
        'Op':op
       
      };
      generalesSistemaFactory.GetFILTROSINTERFAZ_CABLEMODEMS(data)
      .then(function(result){
        vm.datos=result.GetFILTROSINTERFAZ_CABLEMODEMSResult
        console.log(result);
      });
    }

    var vm = this;
    vm.cambioDistribuidor=cambioDistribuidor;
    vm.filtrar=filtrar;
    init();   
    filtrar(1);
  });
