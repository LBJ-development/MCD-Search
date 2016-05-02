'use strict';

angular.module('MCDSearch.caseDisplay', [])

// CASE DISPLAY CONTROLLER /////////////////////////////////////////////////////////
.controller('CaseDisplayCtrl', ["$scope", "$state", "MapArrayFtry", function($scope, $state, MapArrayFtry){

	$scope.childrenList = [];
	$scope.csawList = [];
	$scope.guardiansList = [];
	$scope.summaryList = [];
	$scope.leasList = [];
	$scope.vehiclesList = [];
	$scope.linksList = [];
	$scope.narrativeList = [];

	$scope.tabsLabels = [];
	$scope.header = "";

	var dataScheme;

	$scope.reportHistory = [];

	// GET THE DATA SCHEME WHEN APP INIT
	MapArrayFtry.getScheme().then(function(data){
		dataScheme = data;
		$scope.tabsLabels = data.tabsLabels;
	});

	// MAPPED DATA
	$scope.childrenData = [];

	$scope.showCase = false;

	$scope.$on('RESET-PAGINATION', function(event) {
		$scope.showCase = false;
	})

	$scope.$on('RESET-CASE', function(event) {
		$scope.showCase = false;
	})

	$scope.$on('DISPLAY-CASE', function(event, data) {

		$scope.showCase = true;

		console.log("FROM DISPLAY CASE");
		console.log(data)

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

		// FIRST EMPTY THE EXISTING DATA
		$scope.childrenList = $scope.csawList = $scope.guardiansList = $scope.summaryList = $scope.leasList = $scope.vehiclesList =   $scope.narrativeList =[];

		if(data.Child.length >0)$scope.childrenList 			= mapData(data.Child, sections.children);
		if(data.CSAW.length >0)$scope.csawList 					= mapData(data.CSAW, sections.companion);
		if(data.Parent_Guardian.length >0)$scope.guardiansList	= mapData(data.Parent_Guardian, sections.parents);
		if(data.Primary_Case_Info.length >0)$scope.summaryList	= mapData(data.Primary_Case_Info, sections.summary);
		if(data.Law_Enforcement_Agent.length >0)$scope.leasList	= mapData(data.Law_Enforcement_Agent, sections.leas);
		if(data.Vehicle.length >0) $scope.vehiclesList 			= mapData(data.Vehicle, sections.vehicles);
		//if(data.links.length >0)$scope.linksList				= mapData(data.links, sections.links);
		if(data.Narrative.length >0)$scope.narrativeList		= mapData(data.Narrative, sections.narrative);
		$scope.linksList										= data.Links;
		$scope.header				 							= data.Header[0].headerTxt;

		console.log(data.Narrative)

		$scope.caseLink = "http://hqdev1.ncmecad.net:8080/ws-gsa/report/mcd/view/" + data.Header[0].id;

		// KEEP TRACK OF THE VISITED REPORTS
		if($scope.reportHistory[$scope.reportHistory.length - 1] != data.Header[0].id){
			 $scope.reportHistory.push(data.Header[0].id)
		};
		//$scope.reportHistoryIndex = reportHistory.length;

		// DISPLAYS THE FIRST TAB TO BE SELECTED ONLY IF NO OTHER IS SELECTED
		if($(".caseMenuItem").hasClass( "caseMenu-sel" )){} 
			else { $(".caseMenuItem").first().addClass('caseMenu-sel');}
	});

	function mapData(data, section){

		// MAP THE LABEL DATA INTO AN ARRAY/////////////////////////////////
		var dbLabelArray = dbLabelArray = $.map(data[0], function(value, label){
			return [label]
		});
		var dataSet	= []; // TO STORE THE ORIGINAL DATA VALUE SET BEFORE MAPPING
		var valueArray 	= [];

		// MAP THE VALUE DATA INTO AN ARRAY FOR EACH PERSONS /////////////////////////////////
		for (var key in data){
			valueArray = $.map(data[key], function(value, label){
				return [value]
			});
			dataSet.push(valueArray);
		}

		var sectionSet 	= [];
		
		for (var key in dataSet){

			var sectionData = [];
			for(var i=0;  i< dataScheme.dbLabels[section].length; i++){

				for(var n=0; n < dbLabelArray.length; n++){
					// DON'T DISPLAY IS THERE IS NO VALUE
					if(dataSet[key][n].length > 0 && dataSet[key][n] !== "0"){

						if(dataScheme.dbLabels[section][i] == dbLabelArray[n]){
							// IF IT'S A NARRATIVE FIELD TAKE THE WHOLE WIDTH
							var fieldsize = dataSet[key][n].length > 100 ? "col-sm-12" : "col-sm-4"

							sectionData.push({"label" : dataScheme.fieldsLabels[section][i], "value" : dataSet[key][n], "fieldsize" : fieldsize })
						}
					}	
				}
			}
			sectionSet.push(sectionData);
			/*console.log("SECTION DATA:");
			console.log(sectionData);*/
		}
		return sectionSet
	}

	$scope.cases = true;
	$scope.children = $scope.guardians = $scope.csaws = $scope.leas = $scope.vehicles = $scope.clinks = false;
	
	$scope.selectSection = function(evt){

		$(".caseMenuItem").removeClass("caseMenu-sel");
		$(evt.currentTarget).addClass('caseMenu-sel');

		$scope.children = $scope.guardians = $scope.csaws = $scope.leas = $scope.cases = $scope.vehicles = $scope.narratives =false;

		//$state.go('searchResult.case.children');

		var target = evt.currentTarget.parentElement.parentElement.id;

		console.log(target)

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
				$scope.narrative = true;
				break;
			default:
				$scope.cases = true;
		}
	};

	$scope.goToPreviousRep = function(evt){
		//if( $scope.reportHistoryIndex > 0 ) 
		//$scope.reportHistory.splice($scope.reportHistory.length - 1, 1);
		$scope.reportHistory.pop();

		$scope.getCase($scope.reportHistory[($scope.reportHistory.length - 1)]);
		console.log($scope.reportHistory + " / " + $scope.reportHistory.length);
	}
/*
	$scope.goToNextRep = function(evt){
		$scope.reportHistoryIndex ++;
		$scope.getCase(reportHistory[$scope.reportHistoryIndex]);
		console.log(reportHistory);
	}*/
}])

// CASE DISPLAY DIRECTIVE ///////////////////////////////////////////////////////
.directive ('caseDisplay',function ( ) {
	return {
		restrict: 'E',
		transclude: true,
		controller: 'CaseDisplayCtrl',
		templateUrl: 'components/caseDisplay-tmp.html',
		link: function (scope, element, attrs){

		}
	};
})
// CHILDREN DIRECTIVE ///////////////////////////////////////////////////////
.directive ('childrenDir',function ( ) {
	return {
		restrict: 'E',
		//controller: 'CaseDisplayCtrl',
		templateUrl: 'components/children-mapped.html',
		link: function (scope, element, attrs){

			// console.log("FROM CHILDREN DIRECTIVE!")
		}
	};
})
// GUARDIAN DIRECTIVE ///////////////////////////////////////////////////////
.directive ('guardianDir',function ( ) {
	return {
		restrict: 'E',
		//controller: 'CaseDisplayCtrl',
		templateUrl: 'components/guardian-mapped.html',
		link: function (scope, element, attrs){
		}
	};
})
// CSAW DIRECTIVE ///////////////////////////////////////////////////////
.directive ('csawDir',function ( ) {
	return {
		restrict: 'E',
		//controller: 'CaseDisplayCtrl',
		templateUrl: 'components/csaw-mapped.html',
		link: function (scope, element, attrs){
		}
	};
})
// LEA DIRECTIVE ///////////////////////////////////////////////////////
.directive ('leaDir',function () {
	return {
		restrict: 'E',
		//controller: 'CaseDisplayCtrl',
		templateUrl: 'components/lea-mapped.html',
		link: function (scope, element, attrs){
		}
	};
})
// CASE DIRECTIVE ///////////////////////////////////////////////////////
.directive ('caseDir',function () {
	return {
		restrict: 'E',
		//controller: 'CaseDisplayCtrl',
		templateUrl: 'components/summary-mapped.html',
		link: function (scope, element, attrs){
		}
	};
})
// VEHICLE DIRECTIVE ///////////////////////////////////////////////////////
.directive ('vehicleDir',function ( ) {
	return {
		restrict: 'E',
		//controller: 'CaseDisplayCtrl',
		templateUrl: 'components/vehicle-mapped.html',
		link: function (scope, element, attrs){
		}
	};
})
// VEHICLE DIRECTIVE ///////////////////////////////////////////////////////
.directive ('linksDir',function ($rootScope, DataFtry, searchResult) {
	return {
		restrict: 'E',
		//controller: 'CaseDisplayCtrl',
		templateUrl: 'components/links-mapped.html',
		link: function (scope, element, attrs){
		
		}
	};
})
// NARRATIVE DIRECTIVE ///////////////////////////////////////////////////////
.directive ('narrativeDir',function ($rootScope, DataFtry, searchResult) {
	return {
		restrict: 'E',
		//controller: 'CaseDisplayCtrl',
		templateUrl: 'components/narrative-mapped.html',
		link: function (scope, element, attrs){
		
		}
	};
})





