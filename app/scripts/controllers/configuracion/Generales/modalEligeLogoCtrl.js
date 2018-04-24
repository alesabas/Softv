angular
.module('softvApp')
.controller('modalEligeLogoCtrl', function(generalesSistemaFactory, $uibModalInstance,tipo,ngNotify){

    function initData(){       
    }

    
    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

    function ok() {       
         var file = $('#uploadImage').get(0).files;      
        generalesSistemaFactory.GuardaLogos(file, tipo).then(function(result) {           
          ngNotify.set("Se guardo correctamente", "success");
          $uibModalInstance.close(true);          
        });
      }
    var vm = this;   
    vm.cancel = cancel;   
    vm.ok=ok;
    initData();
});