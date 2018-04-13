"use strict";

angular
  .module("softvApp")
  .controller("ModalBancoFormUpdateCtrl", function(
    CatalogosFactory,
    $uibModal,
    $uibModalInstance,
    ngNotify,
    $state,
    IdBanco
  ) {
    function initData() {
      CatalogosFactory.GetDeepBanco(IdBanco).then(function(data) {
        var Banco = data.GetDeepBancoResult;
        vm.IdBanco = Banco.IdBanco;
        vm.Banco = Banco.Nombre;
        vm.Clave = Banco.ClaveTxt;
        vm.Titulo = "Editar Banco - " + Banco.Nombre;
      });
    }

    function SaveBanco() {
      var objBanco = {
        IdBanco: vm.IdBanco,
        Nombre: vm.Banco,
        ClaveRel: "",
        ClaveTxt: vm.Clave
      };
      CatalogosFactory.UpdateBanco(objBanco).then(function(data) {
        if (data.UpdateBancoResult == -1) {
          ngNotify.set("CORRECTO, se guardó el banco.", "success");
          cancel();
        } else {
          ngNotify.set("ERROR, al guardar el banco nuevo.", "warn");
        }
      });
    }

    function cancel() {
      $uibModalInstance.close();
    }

    var vm = this;

    vm.Icono = "fa fa-pencil-squad-o";
    vm.InpDes = false;
    vm.SaveBanco = SaveBanco;
    vm.cancel = cancel;
    initData();
  });
