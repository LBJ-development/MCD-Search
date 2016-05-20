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
		$scope.tabsLabels 	= detachedData.data.tabLabels;
		var searchTerms 	= detachedData.data.searchString;

		$scope.primaryCaseInfoList = [];
		$scope.callerReporterList = [];
		$scope.childrenList = [];
		$scope.CSAWList = [];
		$scope.parentGuardiansList = [];
		$scope.LEAList = [];
		$scope.attemptedAbductionList = [];
		$scope.protectiveCustodyList = [];
		$scope.unaccompaniedMinorList = [];
		$scope.unidentifiedList = [];
		$scope.vehiclesList = [];
		$scope.narrativeList = [];
		$scope.relatedDataList = [];

		//$scope.tabsLabels = [];
		//$scope.header = "";

		//	TO DEFINE WHAT LABELS NEED TO BE DISPLAYED
		var tabLabelsMap = {
			"Primary_Case_Info"		: "Primary Case Info",
			"Caller_Reporter"		: "Caller/Reporter",
			"Child" 				: "Child",
			"CSAW" 					: "CSAW",
			"Parent_Guardian" 		: "Parent/Guardian",
			"Law_Enforcement_Agent" : "Law Enforcement Agent",
			"Attempted_Abduction" 	: "Attempted Abduction",
			"Protective_Custody" 	: "Protective Custody",
			"Unaccompanied_Minor" 	: "Unaccompanied Minor",
			"Unidentified" 			: "Unidentified",
			"Vehicle" 				: "Vehicle",
			"Narrative" 			: "Narrative",
			"Related_Data" 			: "Related Data",
		}
		var sections = {
			"header" 				: 0,
			"Attempted_Abduction" 	: 1, 
			"Caller_Reporter" 		: 2,  
			"Child" 				: 3,
			"CSAW"					: 4,
			"Related_Data"			: 5,
			"Law_Enforcement_Agent"	: 6,
			"Narrative"				: 7,
			"Parent_Guardian" 		: 8,
			"Primary_Case_Info"		: 9,
			"Protective_Custody"	: 10,
			"Unaccompanied_Minor"	: 11,
			"Unidentified"			: 12,
			"Vehicle"				: 13,
			};

		assignData(detachedData.data.caseData);

		// DISPLAY THE CASE WITHIN THE APP. 
		function assignData(data){

			// FIRST EMPTY THE EXISTING DATA
			if(data.Attempted_Abduction != undefined && data.Attempted_Abduction.length >0 ) $scope.attemptedAbductionList = mapData(data.Attempted_Abduction, sections.Attempted_Abduction);
			if(data.Caller_Reporter != undefined && data.Caller_Reporter.length >0 ) $scope.callerReporterList = mapData(data.Caller_Reporter, sections.Caller_Reporter);
			if(data.Child != undefined && data.Child.length >0 ) $scope.childrenList = mapData(data.Child, sections.Child);
			if(data.CSAW != undefined && data.CSAW.length >0 ) $scope.CSAWList = mapData(data.CSAW, sections.CSAW);
			if(data.Related_Data != undefined && data.Related_Data.length >0 ) $scope.relatedDataList = mapData(data.Related_Data, sections.Related_Data);
			if(data.Law_Enforcement_Agent != undefined && data.Law_Enforcement_Agent.length >0 ) $scope.LEAList = mapData(data.Law_Enforcement_Agent, sections.Law_Enforcement_Agent);
			if(data.Narrative != undefined && data.Narrative.length >0 ) $scope.narrativeList = mapData(data.Narrative, sections.Narrative);
			if(data.Parent_Guardian != undefined && data.Parent_Guardian.length >0 ) $scope.parentGuardiansList = mapData(data.Parent_Guardian, sections.Parent_Guardian);
			if(data.Primary_Case_Info != undefined && data.Primary_Case_Info.length >0 ) $scope.primaryCaseInfoList = mapData(data.Primary_Case_Info, sections.Primary_Case_Info);	
			if(data.Protective_Custody != undefined && data.Protective_Custody.length >0 ) $scope.protectiveCustodyList = mapData(data.Protective_Custody, sections.Protective_Custody);
			if(data.Unaccompanied_Minor != undefined && data.Unaccompanied_Minor.length >0 ) $scope.unaccompaniedMinorList = mapData(data.Unaccompanied_Minor, sections.Unaccompanied_Minor);
			if(data.Unidentified != undefined && data.Unidentified.length >0 ) $scope.unidentifiedList = mapData(data.Unidentified, sections.Unidentified);
			//if(data.Vehicle != undefined && data.Vehicle.length >0 ) $scope.vehicleList = mapData(data.Vehicle, sections.Vehicle);
			if(data.Header != undefined && data.Header.length >0)$scope.header = data.Header[0];

			$timeout(function() {
				if($(".caseMenuItem").hasClass( "caseMenu-sel" )){} 
				else { 	$(".caseMenuItem").first().addClass('caseMenu-sel');
						$scope.primarycaseinfo = true;
					}		
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

			$scope.primarycaseinfo = $scope.callerreporter = $scope.child =  $scope.csaw = $scope.parentguardian = $scope.lawenforcementagent = $scope.attemptedabduction = $scope.protectivecustody = $scope.unaccomapaniedminor = $scope.unidentified = $scope.vehicle = $scope.narrative = $scope.relateddata = false;

			//$state.go('searchResult.case.children');

			var index = evt.currentTarget.parentElement.parentElement.id;
			var target = $scope.tabsLabels[index];

			switch(target) {
			case "Primary Case Info":
				$scope.primarycaseinfo = true;
				break;
			case "Caller/Reporter":
				$scope.callerreporter = true;
				break;
			case "Child":
				$scope.child = true;
				break;
			case "CSAW":
				$scope.csaw = true;
				break;
			case "Parent/Guardian":
				$scope.parentguardian = true;
				break;
			case "Law Enforcement Agent":
				$scope.lawenforcementagent = true;
				break;
			case "Attempted Abuction":
				$scope.attemptedabduction = true;
				break;
			case "Protective Custody":
				$scope.protectivecustody = true;
				break;
			case "Unaccompanied Minor":
				$scope.unaccomapaniedminor = true;
				break;
			case "Unidentified":
				$scope.unidentified = true;
				break;
			case "Vehicle":
				$scope.vehicle = true;
				break;
			case "Narrative":
				$scope.narrative = true;
				break;
			case "Related Data":
				$scope.relateddata = true;
				break;
			default:
				$scope.primarycaseinfo = true;
		}
		};
}]) ;

