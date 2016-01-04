'use strict';

var app = angular.module('RFIapp', [
	'ngFileUpload',
	'ngAnimate',
	'ngRoute',
	'ui.router',
	'ui.bootstrap',
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

	.run(function ($rootScope, $state) {
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
			var requireLogin = toState.data.requireLogin;

			if(requireLogin && typeof sessionStorage.userName === 'undefined') {

				event.preventDefault();
				$state.go('login');
		}
	});
});

 
