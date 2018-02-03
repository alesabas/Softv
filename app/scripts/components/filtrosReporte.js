'use strict';
var filtrosReporte = {
  bindings: {
    report: '=',
    order: '=',  
    meses: '=',  
    url: '=',
    responseparams:'=',
    showfilters:'='
  },
  controller: ['reportesVariosFactory','$localStorage','reportesFactory','trabajosFactory','$filter','globalService','$sce','atencionFactory','CatalogosFactory',
  function (reportesVariosFactory,$localStorage,reportesFactory,trabajosFactory,$filter, globalService,$sce,atencionFactory,CatalogosFactory) {

    function getTipoServicios() { 
      atencionFactory.getServicios().then(function (result) { 
        vm.Tiposervicios = result.GetMuestraTipSerPrincipalListResult; 
      }); 
    } 


    function getServicios(tiposer) {
      var obj = {
        'Clv_TipSer': tiposer,
        'Clv_Servicio': 0,
        'Descripcion': '',
        'Clv_Txt': '',
        'Op': 2,
        'idcompania': 1
      };
      CatalogosFactory.GetServicios_NewList(obj).then(function (result) {
        var servicios = [];
        result.GetServicios_NewListResult.forEach(function (item) {
          if (item.Es_Principal === true) {
            servicios.push(item);
          }
        });
        vm.options = {
          filterPlaceHolder: 'filtrar servicios',
          labelAll: 'Todos los servicios',
          labelSelected: 'servicios seleccionados',
          labelShow: 'Descripcion',
          orderProperty: 'Descripcion',
          items: servicios,
          selectedItems: []
        };
      });
    }

    function getDistribuidores() {
      reportesVariosFactory.mostrarDistribuidorByUsuario($localStorage.currentUser.idUsuario)
        .then(function (data) {
          vm.options = {
            filterPlaceHolder: 'filtrar distribuidor',
            labelAll: 'Todos los distribuidores',
            labelSelected: 'Distribuidores seleccionados',
            labelShow: 'Nombre',
            orderProperty: 'Nombre',
            items: data.GetDistribuidorByUsuarioResult,
            selectedItems: []
          };
        });
    }

    function getplazas() {
      reportesVariosFactory.mostrarPlazaByDistribuidor($localStorage.currentUser.idUsuario, vm.options.selectedItems)
        .then(function (result) {
          vm.options = {
            filterPlaceHolder: 'filtrar plazas',
            labelAll: 'Todos las plazas',
            labelSelected: 'Plazas seleccionadas',
            labelShow: 'razon_social',
            orderProperty: 'razon_social',
            items: result.GetPlazasByDistribuidorResult,
            selectedItems: []
          };
        });
    }

    function getTecnicosByPlaza(plazas, op) {
      if (op === 1) {
        reportesFactory.GetTecnicosCompania(plazas)
          .then(function (result) {
            vm.tecnicosAgenda = result.GetTecnicosCompaniaResult;
            vm.responseparams.tecnicosAgenda=vm.tecnicosAgenda;
          });
      } else {
        reportesFactory.GetTecnicosCompania(plazas)
          .then(function (result) {
            vm.options = {
              filterPlaceHolder: 'filtrar técnicos',
              labelAll: 'Todos las técnicos',
              labelSelected: 'técnicos seleccionadas',
              labelShow: 'tecnico',
              orderProperty: 'tecnico',
              items: result.GetTecnicosCompaniaResult,
              selectedItems: []
            };
          });
      }


    }

    function muestraServicios(){
      vm.muestraservicios=true;
    }

    function getEstadosByPlaza() {
      reportesVariosFactory.mostrarEstadoByPlaza(vm.plazas)
        .then(function (result) {
          vm.options = {
            filterPlaceHolder: 'filtrar estados',
            labelAll: 'Todos los estados',
            labelSelected: 'estados seleccionadas',
            labelShow: 'Nombre',
            orderProperty: 'Nombre',
            items: result.GetEstadosByplazaResult,
            selectedItems: []
          };
        });
    }

    function getTrabajos(tipser, tipord) {
      trabajosFactory.GetSoftv_GetTrabajoByClv_TipSer(tipser)
        .then(function (result) {
          vm.options = {
            filterPlaceHolder: 'filtrar trabajos',
            labelAll: 'Todos los trabajos',
            labelSelected: 'trabajos seleccionadas',
            labelShow: 'descripcion',
            orderProperty: 'descripcion',
            items: result.GetSoftv_GetTrabajoByClv_TipSerResult,
            selectedItems: []
          };
        });
    }

    function getCiudadesByEstado(plazas, estados) {

      reportesVariosFactory.mostrarCiudad(plazas, estados).then(function (result) {
        vm.options = {
          filterPlaceHolder: 'filtrar ciudades',
          labelAll: 'Todos las ciudades',
          labelSelected: 'ciudades seleccionadas',
          labelShow: 'nombre',
          orderProperty: 'nombre',
          items: result.GetCiudadesBy_PlazasEstadoResult,
          selectedItems: []
        };
      });
    }


    function getLocalidadesByCiudades(clv_usuario, Companias, Ciudades, Estados) {

      reportesVariosFactory.mostrarLocalidadByCiudad(clv_usuario, Companias, Ciudades, Estados).then(function (result) {
        console.log(result);
        vm.options = {
          filterPlaceHolder: 'filtrar localidades',
          labelAll: 'Todos las localidades',
          labelSelected: 'localidades seleccionadas',
          labelShow: 'Nombre',
          orderProperty: 'Nombre',
          items: result.GetLocalidadesbyCiudadResult,
          selectedItems: []
        };
      });
    }

    function getColoniasByLocalidad(clv_usuario, Companias, Estados, Ciudades, Localidades) {

      reportesVariosFactory.mostrarColonia(clv_usuario, 0, Companias, Estados, Ciudades, Localidades).then(function (result) {
        console.log(result);
        vm.options = {
          filterPlaceHolder: 'filtrar colonias',
          labelAll: 'Todos las colonias',
          labelSelected: 'colonias seleccionadas',
          labelShow: 'Nombre',
          orderProperty: 'Nombre',
          items: result.GetColoniasBy_Ciudad_LocalidadResult,
          selectedItems: []
        };

      });
    }

    function getCallesByColonia(clv_usuario, banderaLocalidad, banderaColonia, Distribuidores, Ciudades, Localidades, Colonias, Companias, Estados) {

      reportesVariosFactory.mostrarCalle(clv_usuario, 0, 0, Distribuidores, Ciudades, Localidades, Colonias, Companias, Estados)
        .then(function (result) {
          console.log(result);
          vm.options = {
            filterPlaceHolder: 'filtrar calles',
            labelAll: 'Todos las calles',
            labelSelected: 'calles seleccionadas',
            labelShow: 'Nombre',
            orderProperty: 'Nombre',
            items: result.GetCallesBy_Ciudad_Localidad_ColoniaResult,
            selectedItems: []
          };
        });
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

    function next(report){
      vm.step = vm.step + 1;
      vm.order.forEach(function (item) {      
        if (item.function === 'getplazas'  && item.step===vm.step) {
          vm.distribuidores = vm.options.selectedItems;
          getplazas();        
        }
        if (item.function=== 'getRangosFechas' && item.step===vm.step){
              
          vm.showfilters=true;
        }
        if(item.function==='getEstadosByPlaza' && item.step===vm.step){
          vm.plazas = vm.options.selectedItems;
          getEstadosByPlaza();
        }
        if(item.function==='getReporBtn' && item.step===vm.step){ 
          vm.showfilters=true;
        }
        if(item.function==='getfiltroPeriodo' && item.step===vm.step){ 
          vm.showfilters=true;
        }
        if(item.function==='getServicios' && item.step===vm.step){          
          vm.muestraservicios=false;    
          getServicios(vm.servicioPerm.Clv_TipSerPrincipal);        
        }
        if(item.function==='muestraServicios' && item.step===vm.step){
          vm.plazas = vm.options.selectedItems;
          muestraServicios();
        }
        
        if(item.function==='getfiltroPermanencia' && item.step===vm.step){
          vm.servicios=vm.options.selectedItems;          
           vm.showfilters=true;
        }
        if(item.function==='muestrafiltroAgenda' && item.step===vm.step){        
          vm.plazas = vm.options.selectedItems;
          if(report==='AGENDATECNICO'){
            getTecnicosByPlaza(vm.plazas, 1);          
            vm.showfilters=true;
          }else{
            
            getTecnicosByPlaza(vm.plazas,0); 
          }
         
        }
        if(item.function==='muestrafiltrotrabajos' && item.step===vm.step){
          vm.tecnicosAgenda = vm.options.selectedItems;
          vm.muestrafiltrotrabajos = true;
          vm.tipserTrabajo = vm.Tiposervicios[1];
          vm.tipoOrden = vm.tipoOrdenList[1];
          getTrabajos(vm.Tiposervicios[1].Clv_TipSerPrincipal);
        }
        if(item.function==='muestraRangosFecha' && item.step===vm.step){
          if(report==='DEVOLUCIONALMACEN'){
            vm.plazas = vm.options.selectedItems;
          }
          vm.showfilters=true;
        }
        if(item.function==='getCiudadesByEstado' && item.step===vm.step){
          vm.estados = vm.options.selectedItems;
          getCiudadesByEstado(vm.plazas, vm.estados);
        }
        if(item.function==='getLocalidadesByCiudades' && item.step===vm.step){
          vm.ciudades = vm.options.selectedItems;
          getLocalidadesByCiudades($localStorage.currentUser.idUsuario, vm.plazas, vm.ciudades, vm.estados);
        }
        if (item.function === 'getColoniasByLocalidad' && item.step===vm.step) {        
          vm.localidades = vm.options.selectedItems;
          getColoniasByLocalidad($localStorage.currentUser.idUsuario, vm.plazas, vm.estados, vm.ciudades, vm.localidades);
        }
        if (item.function === 'getCallesByColonia' && item.step===vm.step) {
          vm.colonias = vm.options.selectedItems;
          getCallesByColonia($localStorage.currentUser.idUsuario, 0, 0, vm.distribuidores, vm.ciudades, vm.localidades, vm.colonias, vm.plazas, vm.estados);
        }
        if (item.function === 'getfiltrosOrden' && item.step==vm.step) {
          vm.calles = vm.options.selectedItems;
          vm.showfilters=true;
        }
        if (item.function === 'getfiltrosQuejas' && item.step===vm.step) {
          vm.calles = vm.options.selectedItems;            
          vm.showfilters=true;
        }
        if (item.function === 'getfiltrosAtencion' && item.step===vm.step) {
          vm.colonias = vm.options.selectedItems;            
          vm.showfilters=true;
        }
        else{
          var par= {
            'distribuidores': vm.distribuidores,
            'plazas': vm.plazas,
            'ciudades': vm.ciudades,
            'localidades': vm.localidades,
            'colonias': vm.colonias,
            'calles': vm.calles,
            'estados': vm.estados,
            'servicios':vm.servicios,
            'tiposervicio':(vm.servicioPerm)?vm.servicioPerm.Clv_TipSerPrincipal:0,
            'tecnicosAgenda':vm.tecnicosAgenda
          };            
          vm.responseparams=par;
        }   
      });

    }

    var vm = this;
    vm.next = next;
    vm.transfer = transfer;
    vm.options = {};
    vm.step = 0;
    vm.muestraservicios=false;
    vm.muestrafiltrotrabajos=false;
    vm.getTrabajos=getTrabajos;
    //globales
    vm.plazas = [];
    vm.distribuidores = [];
    vm.tecnicos = [];
    vm.estados = [];
    vm.localidades = [];
    vm.ciudades = [];
    vm.colonias = [];
    vm.calles = [];
    vm.servicios=[];
    vm.tecnicosAgenda=[];
    vm.tipoOrdenList = [{
        'tipo': 'O',
        'nombre': 'Ordenes'
      },
      {
        'tipo': 'Q',
        'nombre': 'Reporte'
      },
      {
        'tipo': 'A',
        'nombre': 'Ambas'
      }
    ];

    getDistribuidores();
    getTipoServicios();

  }],
  templateUrl: 'views/components/filtrosReporte.html',
  controllerAs: '$ctrl'
};
angular.module('softvApp').component('filtrosReporte', filtrosReporte);

   /*  function next(report) {
      console.log(report);
      vm.step = vm.step + 1;
      if (report === 'PROSPECTOS') {
        vm.prospectosorder.forEach(function (item) {
          if (item.step == vm.step) {
            vm.confirm = item.confirm;
            if (item.function === 'getplazas') {
              vm.distribuidores = vm.options.selectedItems;
              getplazas();
            } else if (item.function === 'getRangosFechas') {
              vm.muestraFiltrosDist = false;
              vm.muestraRangosFecha = true;
            }
          }
        })
      }
      if (report === 'HOTELES') {
        vm.hotelesorder.forEach(function (item) {
          if (item.step == vm.step) {
            vm.confirm = item.confirm;
            if (item.function === 'getplazas') {
              vm.distribuidores = vm.options.selectedItems;
              getplazas();
            }
          }
        })
      }
      if (report === 'SUSCRIPTORES') {
        vm.suscriptoresorder.forEach(function (item) {
          if (item.step == vm.step) {
            vm.confirm = item.confirm;
            if (item.function === 'getplazas') {
              vm.distribuidores = vm.options.selectedItems;
              getplazas();
            }
            if (item.function === 'getEstadosByPlaza') {
              vm.plazas = vm.options.selectedItems;
              getEstadosByPlaza();
            }
            if (item.function === 'getfiltroPeriodo') {
              vm.muestraFiltrosDist = false;
              vm.muestrafiltroPeriodo = true;
            }
          }
        })
      }
      if (report == 'PERMANENCIA') {
        vm.permanenciaorder.forEach(function (item) {
          if (item.step == vm.step) {
            vm.confirm = item.confirm;
            if (item.function === 'getplazas') {
              vm.distribuidores = vm.options.selectedItems;
              getplazas();
            }
            if (item.function === 'getfiltroPermanencia') {
              vm.muestraFiltrosDist = false;
              vm.muestrafiltroPermanencia = true;
            }
            if (item.function === 'getServicios') {
              vm.plazas = vm.options.selectedItems;
              vm.muestraFiltrosDist = true;
              vm.muestrafiltroPermanencia = false;
              getServicios(vm.servicioPerm.Clv_TipSerPrincipal);
            }
          }
        })
      }
      if (report === 'AGENDATECNICO') {

        vm.agendaorder.forEach(function (item) {
          if (item.step == vm.step) {
            vm.confirm = item.confirm;
            if (item.function === 'getplazas') {
              vm.distribuidores = vm.options.selectedItems;
              getplazas();
            }
            if (item.function === 'muestrafiltroAgenda') {
              vm.plazas = vm.options.selectedItems;
              getTecnicosByPlaza(vm.plazas, 1);
              vm.muestraFiltrosDist = false;
              vm.muestrafiltroAgenda = true;
            }
          }
        })
      }
      if (report === 'ACTIVIDADESTECNICO') {
        vm.actividadestecnicoorder.forEach(function (item) {
          if (item.step == vm.step) {
            vm.confirm = item.confirm;
            if (item.function === 'getplazas') {
              vm.distribuidores = vm.options.selectedItems;
              getplazas();
            }
            if (item.function === 'getTecnicosByPlaza') {
              vm.plazas = vm.options.selectedItems;
              getTecnicosByPlaza(vm.plazas, 2);
            }
            if (item.function === 'muestrafiltrotrabajos') {
              vm.tecnicos = vm.options.selectedItems;
              vm.muestrafiltrotrabajos = true;
              vm.tipserTrabajo = vm.Tiposervicios[1];
              vm.tipoOrden = vm.tipoOrdenList[1];
              getTrabajos(vm.Tiposervicios[1].Clv_TipSerPrincipal);
            }
            if (item.function === 'muestraRangosFecha') {
              vm.muestraRangosFecha = true;
              vm.muestraFiltrosDist = false;
              vm.muestrafiltrotrabajos = false;
            }
          }
        })
      }

      if (report === 'DEVOLUCIONALMACEN') {
        vm.devalmorder.forEach(function (item) {
          if (item.step == vm.step) {
            vm.confirm = item.confirm;
            if (item.function === 'getplazas') {
              vm.distribuidores = vm.options.selectedItems;
              getplazas();
            }
            if (item.function === 'muestraRangosFecha') {
              vm.plazas = vm.options.selectedItems;
              vm.muestraRangosFecha = true;
              vm.muestraFiltrosDist = false;
            }
          }
        });

      }
      if (report === 'PENDIENTESREALIZAR') {

        vm.pendientesorder.forEach(function (item) {
          if (item.step == vm.step) {
            vm.confirm = item.confirm;

            if (item.function === 'getplazas') {
              vm.distribuidores = vm.options.selectedItems;
              getplazas();
            }
            if (item.function === 'getEstadosByPlaza') {
              vm.plazas = vm.options.selectedItems;
              getEstadosByPlaza();
            }
            if (item.function === 'getCiudadesByEstado') {
              vm.estados = vm.options.selectedItems;
              getCiudadesByEstado(vm.plazas, vm.estados);
            }
            if (item.function === 'getLocalidadesByCiudades') {
              vm.ciudades = vm.options.selectedItems;
              getLocalidadesByCiudades($localStorage.currentUser.idUsuario, vm.plazas, vm.ciudades, vm.estados);
            }
          }

        });

      }

      if (report === 'ORDENESDESERVICIO') {

        vm.ordenesorder.forEach(function (item) {
          if (item.step == vm.step) {
            vm.confirm = item.confirm;
            console.log(item.function);
            console.log(vm.step);
            if (item.function === 'getplazas') {
              vm.distribuidores = vm.options.selectedItems;
              getplazas();
            }
            if (item.function === 'getEstadosByPlaza') {
              vm.plazas = vm.options.selectedItems;
              getEstadosByPlaza();
            }
            if (item.function === 'getCiudadesByEstado') {
              vm.estados = vm.options.selectedItems;
              getCiudadesByEstado(vm.plazas, vm.estados);
            }
            if (item.function === 'getLocalidadesByCiudades') {
              vm.ciudades = vm.options.selectedItems;
              getLocalidadesByCiudades($localStorage.currentUser.idUsuario, vm.plazas, vm.ciudades, vm.estados);
            }
            if (item.function === 'getColoniasByLocalidad') {
              console.log(vm.options.selectedItems);
              vm.localidades = vm.options.selectedItems;

              getColoniasByLocalidad($localStorage.currentUser.idUsuario, vm.plazas, vm.estados, vm.ciudades, vm.localidades);
            }
            if (item.function === 'getCallesByColonia') {
              vm.colonias = vm.options.selectedItems;
              getCallesByColonia($localStorage.currentUser.idUsuario, 0, 0, vm.distribuidores, vm.ciudades, vm.localidades, vm.colonias, vm.plazas, vm.estados);
            }
            if (item.function === 'getfiltrosOrden') {
              vm.calles = vm.options.selectedItems;
              vm.muestrafiltroOrdenes = true;
              vm.muestraFiltrosDist = false;
            }
          }

        });

      }
      if (report === 'REPORTEAREATECNICA') {

        vm.reportesorder.forEach(function (item) {
          if (item.step == vm.step) {
            vm.confirm = item.confirm;

            if (item.function === 'getplazas') {
              console.log(vm.options.selectedItems);
              vm.distribuidores = vm.options.selectedItems;
              getplazas();
            }
            if (item.function === 'getEstadosByPlaza') {
              vm.plazas = vm.options.selectedItems;
              getEstadosByPlaza();
            }
            if (item.function === 'getCiudadesByEstado') {
              vm.estados = vm.options.selectedItems;
              getCiudadesByEstado(vm.plazas, vm.estados);
            }
            if (item.function === 'getLocalidadesByCiudades') {
              vm.ciudades = vm.options.selectedItems;
              getLocalidadesByCiudades($localStorage.currentUser.idUsuario, vm.plazas, vm.ciudades, vm.estados);
            }
            if (item.function === 'getColoniasByLocalidad') {
              console.log(vm.options.selectedItems);
              vm.localidades = vm.options.selectedItems;

              getColoniasByLocalidad($localStorage.currentUser.idUsuario, vm.plazas, vm.estados, vm.ciudades, vm.localidades);
            }
            if (item.function === 'getCallesByColonia') {
              vm.colonias = vm.options.selectedItems;
              getCallesByColonia($localStorage.currentUser.idUsuario, 0, 0, vm.distribuidores, vm.ciudades, vm.localidades, vm.colonias, vm.plazas, vm.estados);
            }
            if (item.function === 'getfiltrosQuejas') {
              vm.calles = vm.options.selectedItems;            
              vm.showfilters=true;
             var par= {
                'distribuidores': vm.distribuidores,
                'plazas': vm.plazas,
                'ciudades': vm.ciudades,
                'localidades': vm.localidades,
                'colonias': vm.colonias,
                'calles': vm.calles,
                'estados': vm.estados,
              }            
              vm.responseparams=par;
            }
          }

        });

      }
    } */

  /*   function generarReporte() {
      if (vm.report === 'PROSPECTOS') {
        reportesFactory.GetReporteProspectos(vm.distribuidores, vm.options.selectedItems, $filter('date')(vm.fechainicio, 'yyyy/MM/dd'), $filter('date')(vm.fechafin, 'yyyy/MM/dd'))
          .then(function (data) {
            vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + data.GetReporteProspectosResult);
          });
      }
      if (vm.report === 'HOTELES') {
        reportesFactory.GetReporteHoteles(vm.distribuidores, vm.options.selectedItems)
          .then(function (data) {
            vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + data.GetReporteHotelesResult);
          });
      }
      if (vm.report === 'SUSCRIPTORES') {
        var Parametros = {
          'distribuidores': vm.distribuidores,
          'plazas': vm.plazas,
          'estados': vm.options.selectedItems,
          'mes': vm.Mes,
          'anio': vm.anio,
          'clv_reporte': (vm.tiporepsusc === 'D') ? 1 : 2
        };
        reportesFactory.GetReporteSuscriptores(Parametros).then(function (data) {
          vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + data.GetReporteSuscriptoresResult);
        });
      }
      if (vm.report === 'PERMANENCIA') {
        var Parametros = {
          'distribuidores': vm.distribuidores,
          'plazas': vm.plazas,
          'servicios': vm.options.selectedItems,
          'mesInicio': vm.permInicioMes.id,
          'anioInicio': vm.permInicioAnio,
          'mesFin': vm.permFinMes.id,
          'anioFin': vm.permFinAnio,
          'StrmesInicio': vm.permInicioMes.nombre,
          'StrmesFin': vm.permInicioMes.nombre,
          'Clv_tipser': vm.servicioPerm.Clv_TipSerPrincipal
        };

        reportesFactory.GetReportePermanencia(Parametros)
          .then(function (data) {
            vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + data.GetReportePermanenciaResult);
          });
      }
      if (vm.report === 'AGENDATECNICO') {
        reportesFactory.GetReporteAgendaTecnico(vm.tecnicoAgenda.clv_tecnico, $filter('date')(vm.fechainicio, 'yyyy/MM/dd'), $filter('date')(vm.fechafin, 'yyyy/MM/dd'))
          .then(function (data) {
            console.log(data);
            vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + data.GetReporteAgendaTecnicoResult);
          });
      }
      if (vm.report === 'ACTIVIDADESTECNICO') {
        var Parametros = {
          'plazas': vm.plazas,
          'tecnicos': vm.tecnicos,
          'fechainicio': $filter('date')(vm.fechainicio, 'yyyy/MM/dd'),
          'fechafin': $filter('date')(vm.fechafin, 'yyyy/MM/dd'),
          'resumen': (vm.tiporeporte == 2) ? 1 : 0
        };
        reportesFactory.GetReporteListadoActividadesTecnico(Parametros).then(function (result) {
          vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + result.GetReporteListadoActividadesTecnicoResult);

        });
      }

      if (vm.report === 'DEVOLUCIONALMACEN') {
        var Parametros = {
          'distribuidores': vm.distribuidores,
          'plazas': vm.plazas,
          'fechainicio': $filter('date')(vm.fechainicio, 'yyyy/MM/dd'),
          'fechafin': $filter('date')(vm.fechafin, 'yyyy/MM/dd')
        };
        reportesFactory.GetReporteDevolucionAlmacen(Parametros).then(function (result) {
          vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + result.GetReporteDevolucionAlmacenResult);
        });
      }
      if (vm.report === 'PENDIENTESREALIZAR') {
        var Parametros = {
          'distribuidores': vm.distribuidores,
          'plazas': vm.plazas,
          'ciudades': vm.ciudades,
          'localidades': vm.options.selectedItems
        };
        reportesFactory.GetReportePendientesAreaTecnica(Parametros).then(function (result) {
          vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + result.GetReportePendientesAreaTecnicaResult);
        });
      }
      if (vm.report === 'ORDENESDESERVICIO') {
        var params = {
          'distribuidores': vm.distribuidores,
          'plazas': vm.plazas,
          'ciudades': vm.ciudades,
          'localidades': vm.localidades,
          'colonias': vm.colonias,
          'calles': vm.calles,
          'estados': vm.estados,
          'estatus': vm.estatusOrden,
          'Clv_inicio': vm.clvOrdenInicio,
          'Clv_fin': vm.clvOrdenFin,
          'fechasolInicial': $filter('date')(vm.fechasolInicial, 'dd/MM/yyyy'),
          'fechasolFinal': $filter('date')(vm.fechasolFinal, 'dd/MM/yyyy'),
          'fechaejeInicial': $filter('date')(vm.fechaejeInicial, 'dd/MM/yyyy'),
          'fechaejeFinal': $filter('date')(vm.fechaejeFinal, 'dd/MM/yyyy'),
          'Op': parseInt(vm.tiporeporteord),
          'Clv_trabajo': 0,
          'OpOrdenar': parseInt(vm.ordenrepOrdenes),
          'Clv_usuario': $localStorage.currentUser.idUsuario
        }
        reportesFactory.GetReporteOrdenes(params).then(function (result) {
          vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + result.GetReporteOrdenesResult);
        });
      }
      if(vm.report==='REPORTEAREATECNICA'){
        vm.responseparams={
          'distribuidores': vm.distribuidores,
          'plazas': vm.plazas,
          'ciudades': vm.ciudades,
          'localidades': vm.localidades,
          'colonias': vm.colonias,
          'calles': vm.calles,
          'estados': vm.estados,
        }
      }

    } */

    
