'use strict';
angular
  .module('softvApp')
  .controller('oltCtrl', function (areaTecnicaFactory, trabajosFactory, ngNotify,$uibModal,$scope) {
    function initData() {
      getolt();
    }

    function getolt() {
      areaTecnicaFactory.GetMuestraDescOlt(0).then(function (data) {
        vm.postes = data.GetMuestraDescOltResult;
      });
    }

    function Add() {
      areaTecnicaFactory.GetValidaNueDescOLT(0, vm.descripcion).then(function(data){
        if(data.GetValidaNueDescOLTResult == 0){
          areaTecnicaFactory.GetInsertaNueDescOlt(0, vm.descripcion).then(function (result) {
            ngNotify.set('Correcto, Se guardo OLT', 'success');
            getolt();
          });
        }else{
          ngNotify.set('Error, La Descripción que ingresó ya existe', 'warn');
          getolt();
        }
      });
    }

    function Update(CLAVE,DESCRIPCION) {
      var CLAVE = CLAVE;
      var DESCRIPCION = DESCRIPCION;
      var OP=2;
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/areatecnica/ModalPoste.html',
        controller: 'ModalUpdatePosteCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        class: 'modal-backdrop fade',
        size: 'sm',
        resolve: {          
          CLAVE: function () {
            return CLAVE;
          },
          DESCRIPCION: function() {
              return DESCRIPCION;
          }
          ,
          OP: function() {
              return OP;
          }                
        }
      });
      modalInstance.result.then(function () {
        getolt();
      });
    }

    var vm = this;
    initData();    
    vm.Add = Add;
    vm.Update = Update;
    vm.titulo = 'Catálogo de OLT';

  });