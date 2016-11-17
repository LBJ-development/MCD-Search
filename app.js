'use strict';

var app = angular.module('RFIapp', [
	'ngFileUpload',
	'ngAnimate',
	'ngRoute',
	/*'ngCookies',*/
	'ui.router',
	'ui.bootstrap',
	/*'kendo.directives',*/
	'RFIapp.login',
	'RFIapp.services',
	'MCDSearch.utilities',
	'RFIapp.formatting',
	'RFIapp.config',
	'RFIapp.filters',
	'MCDSearch.caseDisplay',
	])
	.config(function ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/login');
		// Now set up the states
		$stateProvider
			.state('login', {
				url: "/login",
				templateUrl: 'components/login.html',
				data: {
					requireLogin: false
					}
				}
			)
			.state('mainSearch', {
				url: '/mainSearch',
				templateUrl: 'components/mainSearch.html',
				data: {
					requireLogin: true
					}
				}
			)
			.state('searchResult', {
				url: '/searchResult',
				templateUrl: 'components/searchResult.html',
				data: {
					requireLogin: true
					}
				}
			)
			/*.state('searchResult.case', {

				url: "/case",
				//url: "",
				templateUrl: 'components/caseDisplay-tmp.html'
				}
			)
			.state('searchResult.case.children', {

				url: "/children",
				//url: "",
				templateUrl: 'components/children-tmp.html'
				}
			)
			.state('searchResult.case.test', {

				url: "/test",
				//url: "",
				templateUrl: 'components/test.html'
				}
			)*/

		})

	.run(function ($rootScope, $state, DataFtry, serverPath, $http) {

		//var csrftoken = $.cookie('csrftoken');
		//var csrftoken = $cookies.get('csrftoken');
		//console.log(csrftoken)

		// CHECK IF THE USER IS ALREADY LOGGED IN ///////////////
		/*	$(window).focus(function(){
	
			var url = serverPath.contextPath + "gsa/isLogin" ;
			DataFtry.getData(url).then(function(result){ 

				console.log(result.status)

				if(result.status == "FAILED") {
					
					$state.go('login');

				} else if($state.is('login') || $state.$current.name == "" ) {
					
					$state.go('mainSearch');
				}
				
			});

		
			// if(localStorage.userName == undefined) {
			// 		console.log('A username:' + localStorage.userName)
			// 		$state.go('login');
			// 	} else if($state.is('login') || $state.$current.name == "" ) {
			// 		console.log('B username:' + localStorage.userName)
			// 		$state.go('mainSearch');
			// 	}
		})
*/
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
			var requireLogin = toState.data.requireLogin;
			if(requireLogin && typeof localStorage.userName == undefined) {
				event.preventDefault();
				$state.go('login');
			} 
	});
});

 
