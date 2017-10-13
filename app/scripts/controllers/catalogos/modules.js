'use strict';

angular
    .module('softvApp')
    .config(function ($stateProvider) {
        var states = [
            {
                name: 'home.catalogos',
                abstract: true,
                template: '<div ui-view></div>'  
            },
            {
                name: 'home.catalogos.estados',
                data: {
                    pageTitle: 'SOFTV | CATÁLOGO ESTADOS',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/estados',
                templateUrl: 'views/catalogos/Estados.html',
                controller: 'EstadosCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.ciudades',
                data: {
                    pageTitle: 'SOFTV | CATÁLOGO CIUDADES',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/ciudades',
                templateUrl: 'views/catalogos/Ciudades.html',
                controller: 'CiudadesCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.cajas',
                data: {
                    pageTitle: 'SOFTV | CATÁLOGO CAJAS',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/cajas',
                templateUrl: 'views/catalogos/Cajas.html',
                controller: 'CajasCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.nuevacaja',
                data: {
                    pageTitle: 'SOFTV | CATÁLOGO CAJAS',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/cajas',
                templateUrl: 'views/catalogos/NuevaCajaForm.html',
                controller: 'CajaNuevaCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.detalle',
                data: {
                    pageTitle: 'SOFTV | CATÁLOGO CAJAS',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/detalle/:id',
                templateUrl: 'views/catalogos/NuevaCajaForm.html',
                controller: 'CajaDetalleCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.editarcaja',
                data: {
                    pageTitle: 'SOFTV | CATÁLOGO CAJAS',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/editar/:id',
                templateUrl: 'views/catalogos/NuevaCajaForm.html',
                controller: 'CajaEditarCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.sucursales',
                data: {
                    pageTitle: 'SOFTV | CATÁLOGO SUCURSALES',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/sucursales',
                templateUrl: 'views/catalogos/Sucursales.html',
                controller: 'SucursalesCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.sucursal_nueva',
                data: {
                    pageTitle: 'SOFTV | NUEVA SUCURSAL',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/sucursales/sucursal_nueva',
                templateUrl: 'views/catalogos/SucursalForm.html',
                controller: 'SucursalAddCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.sucursal_editar',
                data: {
                    pageTitle: 'SOFTV | EDITAR SUCURSAL',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/sucursales/sucursal_editar/:id',   
                templateUrl: 'views/catalogos/SucursalForm.html',
                controller: 'SucursalUpdateCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.SucursalDetalle',
                data: {
                    pageTitle: 'SOFTV | CONSULTAR SUCURSAL',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/sucursales/detalle/:id',   
                templateUrl: 'views/catalogos/SucursalForm.html',
                controller: 'SucursalDetalleCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.equipos_digitales',
                data: {
                    pageTitle: 'SOFTV | CATÁLOGO EQUIPOS DIGITALES',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/equipos_digitales',
                templateUrl: 'views/catalogos/EquiposDigitales.html',
                controller: 'EquiposDigitalesCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.plazas',
                data: {
                    pageTitle: 'SOFTV | CATÁLOGO PLAZAS',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/plazas',
                templateUrl: 'views/catalogos/Plazas.html',
                controller: 'PlazasCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.plaza_nueva',
                data: {
                    pageTitle: 'SOFTV | NUEVA PLAZA',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/plazas/nueva',
                templateUrl: 'views/catalogos/PlazaForm.html',
                controller: 'PlazaAddCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.plaza_editar',
                data: {
                    pageTitle: 'SOFTV | EDITAR PLAZA'
                },
                url: '/catalogo/plazas/editar/:id',
                templateUrl: 'views/catalogos/PlazaForm.html',
                controller: 'PlazaUpdateCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.plaza_detalle',
                data: {
                    pageTitle: 'SOFTV | DETALLE PLAZA'
                },
                url: '/catalogo/plazas/detalle/:id',
                templateUrl: 'views/catalogos/PlazaForm.html',
                controller: 'PlazaDetalleCtrl',
                controllerAs: '$ctrl'
            },

            
            {
                name: 'home.catalogos.localidades',
                data: {
                    pageTitle: 'SOFTV | CATÁLOGO LOCALIDADES',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/localidades',
                templateUrl: 'views/catalogos/Localidades.html',
                controller: 'LocalidadesCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.distribuidores',
                data: {
                    pageTitle: 'SOFTV | CATÁLOGO DISTRIBUIDORES',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/distribuidores',
                templateUrl: 'views/catalogos/Distribuidores.html',
                controller: 'DistribuidoresCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.distribuidor_nuevo',
                data: {
                    pageTitle: 'SOFTV | NUEVO DISTRIBUIDOR',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/distribuidores/nuevo',
                templateUrl: 'views/catalogos/DistribuidorForm.html',
                controller: 'DistribuidorAddCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.distribuidor_editar',
                data: {
                    pageTitle: 'SOFTV | EDITAR DISTRIBUIDOR'
                },
                url: '/catalogo/distribuidores/editar/:id',
                templateUrl: 'views/catalogos/DistribuidorForm.html',
                controller: 'DistribuidorUpdateCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.detalle_distribuidor',
                data: {
                    pageTitle: 'SOFTV | DETALLE DISTRIBUIDOR'
                },
                url: '/catalogo/distribuidores/detalle/:id',
                templateUrl: 'views/catalogos/DistribuidorForm.html',
                controller: 'DistribuidorDetalleCtrl',
                controllerAs: '$ctrl'
            },
           
            {
                name: 'home.catalogos.colonias',
                data: {
                    pageTitle: 'SOFTV | CATÁLOGO COLONIAS',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/colonias',
                templateUrl: 'views/catalogos/Colonias.html',
                controller: 'ColoniasCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.colonia_nuevo',
                data: {
                    pageTitle: 'SOFTV | NUEVO COLONIA',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/colonias/nuevo',
                templateUrl: 'views/catalogos/coloniaForm.html',
                controller: 'ColoniaFormAddCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.colonia_editar',
                data: {
                    pageTitle: 'SOFTV | EDITAR COLONIA'
                },
                url: '/catalogo/colonias/editar/:id',
                templateUrl: 'views/catalogos/ColoniaForm.html',
                controller: 'ColoniaFormUpdateCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.tipos_colonias',
                data: {
                    pageTitle: 'SOFTV | CATÁLOGO TIPOS DE COLONIAS',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/tipos_colonias',
                templateUrl: 'views/catalogos/TiposColonias.html',
                controller: 'TiposColoniasCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.calles',
                data: {
                    pageTitle: 'SOFTV | CATÁLOGO CALLES',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/calles',
                templateUrl: 'views/catalogos/Calles.html',
                controller: 'CallesCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.clientes',
                data: {
                    pageTitle: 'SOFTV | CATÁLOGO CLIENTES',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/clientes',
                templateUrl: 'views/catalogos/Clientes.html',
                controller: 'ClientesCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.cliente_nuevo',
                data: {
                    pageTitle: 'SOFTV | NUEVO CLIENTE',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/clientes/nuevo',
                templateUrl: 'views/catalogos/ClienteNuevo.html',
                controller: 'ClienteNuevoCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.cliente_editar',
                data: {
                    pageTitle: 'SOFTV | EDITAR CLIENTE'
                },
                url: '/catalogo/clientes/editar/:id',
                templateUrl: 'views/catalogos/ClienteNuevo.html',
                controller: 'ClienteEditarCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.servicios',
                data: {
                    pageTitle: 'SOFTV | CATÁLOGO SERVICIOS',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/servicios',
                templateUrl: 'views/catalogos/Servicios.html',
                controller: 'ServiciosCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.servicio_nuevo',
                data: { pageTitle: 'SOFTV | NUEVO SERVICIO' },
                url: '/catalogo/servicios/nuevo/:id',
                templateUrl: 'views/catalogos/ServicioForm.html',
                controller: 'ServicioAddCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.servicio_editar',
                data: { pageTitle: 'SOFTV | EDITAR SERVICIO' },
                url: '/catalogo/servicios/editar/:id',
                templateUrl: 'views/catalogos/ServicioForm.html',
                controller: 'ServicioUpdateCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.tipos_servicios',
                data: {
                    pageTitle: 'SOFTV | CATÁLOGO TIPO DE SERVICIOS',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/tipos_servicios',
                templateUrl: 'views/catalogos/TipoServicios.html',
                controller: 'TiposServicosCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.catalogos.bancos',
                data: {
                    pageTitle: 'SOFTV | CATÁLOGO BANCOS',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/catalogo/bancos',
                templateUrl: 'views/catalogos/Bancos.html',
                controller: 'BancosCtrl',
                controllerAs: '$ctrl'
            }
        ];
        states.forEach(function (state) {
            $stateProvider.state(state);
        });
    });