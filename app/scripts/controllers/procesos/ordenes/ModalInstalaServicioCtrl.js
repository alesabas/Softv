(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('ModalInstalaServicioCtrl', ModalInstalaServicioCtrl);

  ModalInstalaServicioCtrl.inject = ['$uibModal', '$uibModalInstance', 'ordenesFactory', 'items', '$rootScope', 'ngNotify'];

  function ModalInstalaServicioCtrl($uibModal, $uibModalInstance, ordenesFactory, items, $rootScope, ngNotify, $localStorage) {
    var vm = this;
    vm.cancel = cancel;
    vm.guardar = guardar;
    vm.Detalle=items.Detalle;
    vm.seleccionaMedio=seleccionaMedio;
    vm.SeleccionaTipoAparato=SeleccionaTipoAparato;
    vm.Servicios=[];
    vm.Eliminar=Eliminar;
    vm.SelecionaNodo=SelecionaNodo;
    vm.AgregaAparato=AgregaAparato;




    this.$onInit = function () {
        var Parametros = {
        'clv_orden': items.clv_orden
        };
        console.log('Parametros');
        console.log(Parametros);
        ordenesFactory.MuestraArbolServiciosAparatosPorinstalar(Parametros).then(function (resp) {
          console.log(resp);
          vm.treedata = resp.GetMuestraArbolServiciosAparatosPorinstalarListResult;


          //Para tener todas las ramas abiertas
          vm.expandedNodes=[];
          angular.forEach(vm.treedata, function(value, key) {
            vm.expandedNodes.push(value);
          });

          llenaTipoAparatos();


        });        
    }
      
    
    function seleccionaMedio(node){
      vm.NOM = '';
        var items_ = {
          'Clv_UnicaNet': node.Clv_UnicaNet
        };
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/procesos/ModalAsignaMedio.html',
          controller: 'ModalAsignaMedioCtrl',
          controllerAs: 'ctrl',
          backdrop: 'static',
          keyboard: false,
          size: 'sm',
          resolve: {
            items: function () {
              return items_;
            }
          }
        });

        modalInstance.result.then(function(submitVar) {
            node.IdMedio=submitVar.IdMedio;
            node.Detalle=submitVar.Descripcion;
            llenaTipoAparatos();
        });




    }

    function llenaTipoAparatos(){
      //Llena el objeto con los servicios por instalar
      var todosTienenMedio=1;
      vm.Servicios={};
      vm.Servicios.obj={};
      vm.Servicios.obj.Id=0;
      vm.Servicios.Lst=[];

      angular.forEach(vm.treedata, function(value, key) {
        var aux={};

        if (value.Clv_UnicaNet>0){
          aux.Clv_UnicaNet=value.Clv_UnicaNet;
          aux.idMedio=value.IdMedio;
          console.log(aux);
          vm.Servicios.Lst.push(aux);
          if (aux.idMedio==0){
            todosTienenMedio=0;
          }

        }
      });

      console.log('vm.Servicios');
      console.log(vm.Servicios);

      if (todosTienenMedio==1){
        ordenesFactory.MuestraTipoAparato(vm.Servicios).then(function (resp) {
          console.log(resp);
          vm.TipoAparatos = resp.GetMuestraTipoAparatoListResult;
        });
      }

    }

    function SeleccionaTipoAparato(){
      //llena servicios posibles
      var Parametros= vm.Servicios;
      Parametros.obj.Id=vm.TipoAparato.IdArticulo;
      console.log('Parametros');
      console.log(Parametros);

      ordenesFactory.MuestraServiciosRelTipoAparato(Parametros).then(function (resp) {
          console.log(resp);
          vm.ServiciosPosibles = resp.GetMuestraServiciosRelTipoAparatoListResult;
        });

      //Llena los aparatos disponibles
      var Parametros2 = {
        'clv_orden': items.clv_orden,
        'Clv_Tecnico': items.Clv_Tecnico,
        'idArticulo':vm.TipoAparato.IdArticulo
        };

      console.log('Parametros2');
      console.log(Parametros2);

      ordenesFactory.MuestraAparatosDisponibles(Parametros2).then(function (resp) {
          console.log(resp);
          vm.AparatosDisponibles = resp.GetMuestraAparatosDisponiblesListResult;
        });

    }

    function Eliminar(){
      if (vm.selectednode.Clv_UnicaNet>0 && vm.selectednode.IdMedio>0){
        vm.selectednode.IdMedio=0;
        vm.selectednode.Detalle='';
        vm.selectednode.children=[];
        vm.AparatosDisponibles={};
        vm.ServiciosPosibles={};
        vm.TipoAparatos={};
        vm.selectedListServicios=[];
      }
      else{
        if (vm.selectednode.ContratoNet===0){
          angular.forEach(vm.parentNode.children, function(value, key) {
            if (value.Clv_Aparato===vm.selectednode.Clv_Aparato){
              vm.parentNode.children.splice(key,1);
            }
          });

        }          
        
      }


     
    }

    function SelecionaNodo(node, $parentNode){
      console.log('ok',node, $parentNode);
      vm.selectednode=node;
      vm.parentNode=$parentNode;

    }

    function AgregaAparato(){
      console.log(vm.selectedListServicios);


      angular.forEach(vm.selectedListServicios, function(value, key) {
        var aux={
          'Nombre':vm.AparatoDisponible.Descripcion,
          'ContratoNet':0,
          'Detalle':vm.TipoAparato.Categoria,
          'Type':'file',
          'Tipo':'A',
          'Clv_Aparato':vm.AparatoDisponible.Clv_Aparato
        }

        angular.forEach(vm.treedata, function(value2, key2) {
          if (value.Clv_UnicaNet===value2.Clv_UnicaNet){
            var flag=0;
            angular.forEach(vm.treedata[key2].children, function(value3, key3) {
              if(value3.Clv_Aparato===vm.AparatoDisponible.Clv_Aparato){
                flag=1;
              }

            });

            if(flag===0){
              vm.treedata[key2].children.push(aux);
              vm.expandedNodes.push(value);  
            }
                    
          }
        });
      });

      vm.ServiciosPosibles={};
      vm.selectedListServicios=[];

      vm.TipoAparato=null;
      vm.AparatoDisponible=null;
      vm.AparatosDisponibles=null;
      


    }




    function guardar() {
      var flag=0;
      angular.forEach(vm.treedata, function(value2, key2) {

          if (value2.IdMedio===0){
            flag=1
          }
                                      
      });

      if (flag===1){
        ngNotify.set('Faltan medios del servicio por registrar.','warn');
      }else{
        var Parametros={};

        Parametros.obj={};
        Parametros.obj.id=0;

        Parametros.Lst=[];
        Parametros.Lst=vm.treedata;
        console.log(Parametros);

        ordenesFactory.AsignaAparatosAlServicio(Parametros).then(function (resp) {
            console.log(resp);
          });

        $uibModalInstance.close();
      }

      
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
