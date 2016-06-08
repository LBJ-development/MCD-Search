'use strict';

var app = angular.module('detachedCaseApp', [
	'ngAnimate',
	'ngRoute',
	'ui.router',
	'ui.bootstrap',
	'RFIapp.filters',
	'RFIapp.services',
	'MCDSearch.utilities',
	'RFIapp.formatting',
	'RFIapp.config',
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

/*	.run(function ($rootScope, $state, $window) {
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
				
			window.onbeforeunload = function () {
				localStorage.setItem("searchTerms", $rootScope.caseN);
				alert($rootScope.caseN)
				console.log($rootScope.caseN)
			};
		})
	})
*/
	.controller('DetachedCaseCtrl',[ "$rootScope",  "$scope",  "DataFtry", "searchResult", "MapArrayFtry", "HightlightFtry", "MapDataFtry","$window", "$timeout",  function(  $rootScope, $scope,  DataFtry, searchResult, MapArrayFtry, HightlightFtry, MapDataFtry, $window, $timeout){

		var detachedData = JSON.parse(localStorage.getItem("dataForDetached"));
		// DISTRIBUTING THE DATA FROM THE SAVED OBJECT 
		$scope.caseNumber 	= detachedData.data.caseNumber;
		var dataScheme 		= detachedData.data.dataScheme;
		$scope.tabsLabels 	= detachedData.data.tabLabels;
		var searchTerms 	= detachedData.data.searchString;
		var tabsLinks 		= detachedData.data.tabLinks;
		$scope.collection 	= detachedData.data.caseData.Header[0].collection_name;
		var genData  = {};
		var sectionIndex;
		var sectionTitle;

		$scope.fieldList = [];

		assignData(detachedData.data.caseData);

		// DISPLAY THE CASE WITHIN THE APP. 
		function assignData(data){

			genData = data;

			if(data.Header != undefined && data.Header.length >0)$scope.header = data.Header[0];

			$timeout(function() {
				$(".caseMenuItem").removeClass("caseMenu-sel");
				$(".caseMenuItem").first().addClass('caseMenu-sel');	
			}, 300);

			sectionIndex = 0;
			sectionTitle = $scope.tabsLabels[0];
			setSection();
		}

		$scope.selectSection = function(evt){
			$(".caseMenuItem").removeClass("caseMenu-sel");
			$(evt.currentTarget).addClass('caseMenu-sel');
			sectionIndex = evt.currentTarget.parentElement.parentElement.id;
			sectionTitle =  evt.currentTarget.text;
			setSection();
		};

		function setSection(){
			$scope.sectionTitle = sectionTitle;
			//	 MAP THE DATA ////////////////		
			$scope.fieldList =  MapDataFtry.mapData(genData[tabsLinks[sectionIndex]] , tabsLinks[sectionIndex] , dataScheme, searchTerms );
			// CHECK IF THERE ARE MULTIPLE ITEMS IN THE SECTIONS AND DISPLAYS THE INDEX 
			$scope.fieldList.length > 1 ? $scope.displayIndex = true :  $scope.displayIndex = false;
			$scope.showCase = true;
			$scope.genericInfo = true;
		}
}]) ;

