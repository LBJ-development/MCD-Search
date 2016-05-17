'use strict';

var app = angular.module('detachedCaseApp', [
	'ngAnimate',
	'ngRoute',
	'ui.router',
	'ui.bootstrap',
	'kendo.directives',
	'RFIapp.filters',
	'RFIapp.services',
	'MCDSearch.utilities',
	'RFIapp.formatting',
	'RFIapp.config',

	
	/*'MCDSearch.caseDisplay',*/
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
		$scope.tabsLabels 	= detachedData.data.dataScheme.tabsLabels;
		var searchTerms 	= detachedData.data.searchString;
		
		console.log("FROM NEW WINDOW")
		console.log(JSON.parse(localStorage.getItem("dataForDetached")));

		$scope.childrenList = [];
		$scope.csawList = [];
		$scope.guardiansList = [];
		$scope.summaryList = [];
		$scope.leasList = [];
		$scope.vehiclesList = [];
		$scope.linksList = [];
		$scope.narrativeList = [];

		//$scope.tabsLabels = [];
		$scope.header = "";

		var sections = {
			"header" 	: 0 ,
			"summary" 	: 1 , 
			"children" 	: 2 ,  
			"links" 	: 3,
			"leas"		: 4,
			"vehicles"	: 5,
			"companion"	: 6,
			"parents"	: 7,
			"narrative" : 8,
			"other"		: 9
			};

		assignData(detachedData.data.caseData);

		// DISPLAY THE CASE WITHIN THE APP. 
		function assignData(data){

			// FIRST EMPTY THE EXISTING DATA
			$scope.childrenList = $scope.csawList =  $scope.linksList = $scope.guardiansList = $scope.summaryList = $scope.leasList = $scope.vehiclesList =   $scope.narrativeList =[];

			if(data.Child != undefined && data.Child.length >0 ) $scope.childrenList 							= mapData(data.Child, sections.children);
			if(data.CSAW != undefined && data.CSAW.length >0)$scope.csawList 									= mapData(data.CSAW, sections.companion);
			if(data.Parent_Guardian != undefined && data.Parent_Guardian.length >0)$scope.guardiansList			= mapData(data.Parent_Guardian, sections.parents);
			if(data.Primary_Case_Info != undefined && data.Primary_Case_Info.length >0)$scope.summaryList		= mapData(data.Primary_Case_Info, sections.summary);
			if(data.Law_Enforcement_Agent != undefined && data.Law_Enforcement_Agent.length >0)$scope.leasList	= mapData(data.Law_Enforcement_Agent, sections.leas);
			if(data.Vehicle != undefined && data.Vehicle.length >0) $scope.vehiclesList 						= mapData(data.Vehicle, sections.vehicles);
			//if(data.Vehicle != undefined && data.links.length >0)$scope.linksList				= mapData(data.links, sections.links);
			if(data.Narrative != undefined && data.Narrative.length >0)$scope.narrativeList						= mapData(data.Narrative, sections.narrative);
			if(data.Vehicle != undefined && data.Vehicle.length >0) $scope.linksList							= data.Links;
			if(data.Header != undefined && data.Header.length >0)$scope.header				 					= data.Header[0];

			$timeout(function() {
				if($(".caseMenuItem").hasClass( "caseMenu-sel" )){} 
				else { $(".caseMenuItem").first().addClass('caseMenu-sel');}		
			}, 300);
		};

		function mapData(data, section){

			return MapDataFtry.mapData(data, section ,dataScheme, searchTerms) ;
		}

	$scope.cases = true;
	$scope.children = $scope.guardians = $scope.csaws = $scope.leas = $scope.vehicles = $scope.clinks = false;

	$scope.selectSection = function(evt){

		$(".caseMenuItem").removeClass("caseMenu-sel");
		$(evt.currentTarget).addClass('caseMenu-sel');

		$scope.children = $scope.guardians = $scope.csaws = $scope.leas = $scope.cases = $scope.vehicles = $scope.narratives = $scope.clinks = false;

		//$state.go('searchResult.case.children');

		var target = evt.currentTarget.parentElement.parentElement.id;

		switch(target) {
			case "2":
				$scope.children = true;
				break;
			case "7":
				$scope.guardians = true;
				break;
			case "6":
				$scope.csaws = true;
				break;
			case "4":
				$scope.leas = true;
				break;
			case "1":
				$scope.cases = true;
				break;
			case "5":
				$scope.vehicles = true;
				break;
			case "3":
				$scope.clinks = true;
				break;
			case "8":
				$scope.narratives = true;
				break;
			default:
				$scope.cases = true;
		}
	};
}]) ;

