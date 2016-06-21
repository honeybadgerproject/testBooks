angular.module('geospatial', ['ngRoute', 'ngResource', 'ngStorage'])
	.config(['$httpProvider', function($httpProvider) {
	}])
	.run(['$rootScope', '$location', '$http', 'Auth', function ($rootScope, $location, $http, Auth) {
		//Review if user has been authenticated before
		Auth.init();
		$rootScope.$on('$routeChangeError', function(event, next, current) {
			if(current !== undefined)
				$location.url(current.$$route.originalPath);
			else
				$location.url('/');
		});
	  }])
	.constant('policies',{

		'/query': {
			templateUrl: 'template/query.html',
			controller: 'DashboardController'
		} ,
		'/dashboard': {
			templateUrl: 'template/dashboard.html',
			controller: 'DashboardController'
		}

	})
	.config(['$routeProvider', 'policies', function($routeProvider, policies) {

		//Our NOT THAT complex logic for authentification and authorization validation
		var authResolver = function(path) {
		  return {
		    routingMessage : function(Auth, $q, $rootScope) {
				console.log(path)
				var deferred = $q.defer();

				Auth.userHasPermissionForView(path)
					.then(function(msg) {
						console.log(msg);
						deferred.resolve();
					});

				return deferred.promise;
			}
		  }
		};

		//Configuring Routes and Auth
		for(path in policies) {
			//Build Route
			var route = {
				templateUrl: policies[path].templateUrl,
				controller: policies[path].controller
			};

			//Sync with server about user status
			route.resolve =  authResolver(path);

			//Register route
			$routeProvider.when(path, route);
		}

		$routeProvider.otherwise({redirectTo: '/dashboard'});
	}]);
