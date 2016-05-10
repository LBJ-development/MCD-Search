'use strict';

var app = angular.module('detachedCaseApp', [
	'ngAnimate',
	'ngRoute',
	'ui.router',
	'ui.bootstrap',
	'kendo.directives',
	'RFIapp.filters',
	/*'RFIapp.services',
	'MCDSearch.utilities',
	'RFIapp.formatting',
	'RFIapp.config',
	
	'MCDSearch.caseDisplay',*/
	])
	.config(function ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/newWindow');
		// Now set up the states
		$stateProvider
			.state('newWindow', {
				url: "/newWindow",
				templateUrl: 'components/detachedCase-tmp.html',
				
				}
			)
		})

	.controller('DetachedCaseCtrl',[ "$rootScope",  "$scope",   function(  $rootScope, $scope){

		$scope.caseNumber = localStorage.getItem("caseNumber");

		console.log("FROM DETACHED CASE")
		console.log(localStorage.getItem("caseNumber"))

	
}]) 


 
