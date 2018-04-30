'use strict';
angular
	.module('softvApp')
	.factory('logFactory', function($http, $q, globalService, $localStorage) {
		var factory = {};
		var paths = {
			AddMovSist: '/MovSist/AddMovSist',
			GetFILTROS_LOGSISTEMA:'/Configuracion/GetFILTROS_LOGSISTEMA'
		};
		

		factory.GetFILTROS_LOGSISTEMA = function(obj) {
			var deferred = $q.defer();
			var Parametros = {
                'obj':{
                    'fecha': obj.fecha,
                    'hora':obj.hora,
                    'Clv_usuario':obj.Clv_usuario,
                    'Clv_afectada':obj.Clv_afectada,
                    'op':obj.op                  
                }               
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetFILTROS_LOGSISTEMA, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};


        factory.AddMovSist = function(obj) {
			var deferred = $q.defer();
			var Parametros = {
                objMovSist:{
                    'Clv_usuario': $localStorage.currentUser.idUsuario,
                    'Modulo':obj.Modulo,
                    'Submodulo':obj.Submodulo,
                    'Observaciones':obj.Observaciones,
                    'Usuario':$localStorage.currentUser.usuario,
                    'Comando':obj.Comando,
                    'Clv_afectada':obj.Clv_afectada
                }
               
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.AddMovSist, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};
        
        return factory;
    });