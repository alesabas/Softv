'use strict';
angular
  .module('softvApp')
  .config(function ($stateProvider) {
    var states = [{
        name: 'home.configuracion',
        abstract: true,
        template: '<div ui-view></div>'
      },
      {
        name: 'home.configuracion.permisos',
        data: {
          pageTitle: 'SAC | PERMISOS',
          permissions: {
            only: ['permisosSelect'],
            options: {
              reload: false
            }
          }
        },
        url: '/configuracion/permisos',
        templateUrl: 'views/configuracion/permisos.html',
        controller: 'PermisosCtrl',
        controllerAs: '$ctrl'
      },
      {
        name: 'home.configuracion.generalsistema',
        data: {
          pageTitle: 'SAC | GENERALES DEL SISTEMA',
          permissions: {
            only: ['generalesdelsistemaSelect'],
            options: {
              reload: false
            }
          }
        },
        url: '/configuracion/generalesdelsistema',
        templateUrl: 'views/configuracion/generalesdelsistema.html',
        controller: 'generalesSistemaCtrl',
        controllerAs: '$ctrl'
      },
      {
        name: 'home.configuracion.generalsistemadistribuidor',
        data: {
          pageTitle: 'SAC | GENERALES DEL SISTEMA',
          permissions: {
            only: ['generalesdeldistribuidorSelect'],
            options: {
              reload: false
            }
          }
        },
        url: '/configuracion/generalesdeldistribuidor',
        templateUrl: 'views/configuracion/generalesdeldistribuidor.html',
        controller: 'generalesDistribuidorCtrl',
        controllerAs: '$ctrl'
      },
      {
        name: 'home.configuracion.roles',
        data: {
          pageTitle: 'SAC | ROLES',
          permissions: {
            only: ['rolesSelect'],
            options: {
              reload: false
            }
          }
        },
        url: '/configuracion/roles',
        templateUrl: 'views/configuracion/roles.html',
        controller: 'RolCtrl',
        controllerAs: '$ctrl'
      },
      {
        name: 'home.configuracion.usuarios',
        data: {
          pageTitle: 'SAC | ROLES',
          permissions: {
            only: ['usuariosSelect'],
            options: {
              reload: false
            }
          }
        },
        url: '/configuracion/usuarios',
        templateUrl: 'views/configuracion/usuarios.html',
        controller: 'usuariosCtrl',
        controllerAs: '$ctrl'
      },
      {
        name: 'home.configuracion.nuevousuario',
        data: {
          pageTitle: 'SAC | USUARIOS',
          permissions: {
            only: ['usuariosSelect'],
            options: {
              reload: false
            }
          }
        },
        url: '/configuracion/nuevousuario',
        templateUrl: 'views/configuracion/nuevoUsuario.html',
        controller: 'nuevoUsuarioCtrl',
        controllerAs: '$ctrl'
      },
      {
        name: 'home.configuracion.detalleusuario',
        data: {
          pageTitle: 'SAC | DETALLE USUARIOS',
          permissions: {
            only: ['usuariosSelect'],
            options: {
              reload: false
            }
          }
        },
        url: '/configuracion/detalleusuario/:id',
        templateUrl: 'views/configuracion/nuevoUsuario.html',
        controller: 'detalleUsuarioCtrl',
        controllerAs: '$ctrl'
      },
      {
        name: 'home.configuracion.editausuario',
        data: {
          pageTitle: 'SAC | EDITA USUARIOS',
          permissions: {
            only: ['usuariosSelect'],
            options: {
              reload: false
            }
          }
        },
        url: '/configuracion/editausuario/:id',
        templateUrl: 'views/configuracion/nuevoUsuario.html',
        controller: 'editaUsuarioCtrl',
        controllerAs: '$ctrl'
      },
      {
        name: 'home.configuracion.rolesweb',
        data: {
          pageTitle: 'SAC | ROLES WEB',
          permissions: {
            //only: ['permisosSelect'],
            options: {
              reload: false
            }
          }
        },
        url: '/configuracion/roles_lista',
        templateUrl: 'views/configuracion/RolesWeb.html',
        controller: 'RolesWebCtrl',
        controllerAs: '$ctrl'
      },

      {
        name: 'home.configuracion.changepassword',
        data: {
          pageTitle: 'SAC | CONFIGURACION',
          permissions: {
           
            options: {
              reload: false
            }
          }
        },
        url: '/configuracion/changepassword',
        templateUrl: 'views/configuracion/changepassword.html',
        controller: 'changePasswordCtrl',
        controllerAs: '$ctrl'
      }






    ];
    states.forEach(function (state) {
      $stateProvider.state(state);
    });
  });
