'use strict';

angular.module('MCDSearch.caseDisplay', [])

// CASE DISPLAY CONTROLLER /////////////////////////////////////////////////////////
.controller('CaseDisplayCtrl', ["$scope", "$state", "MapArrayFtry", function($scope, $state, MapArrayFtry){

	var dataScheme;

	// GET THE DATA SCHEME WHEN APP INIT
	MapArrayFtry.getScheme().then(function(data){
		dataScheme = data;
	});

	$scope.childrenList = [];
	$scope.csawList = [];
	$scope.guardiansList = [];
	$scope.casesList = [];
	$scope.leasList = [];
	$scope.vehiclesList = [];
	$scope.linksList = [];

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

		var sections = {
			"header" 	: 0 ,
			"summary" 	: 1 , 
			"children" 	: 2 ,  
			"links" 		: 3,
			"lea"		: 4,
			"vehicle"	: 5,
			"companion"	: 6,
			"parents"	: 7,
			"other"		: 8
			};

		$scope.childrenList 	= mapData(data.Children, sections.children);
		$scope.csawList 	= data.Companions;
		$scope.guardiansList	= mapData(data.Guardians, sections.parents);
		$scope.casesList	= data.Cases;
		$scope.leasList		= data.Leas;
		$scope.vehiclesList 	= data.Vehicles;
		$scope.linksList	= data.Links;

		//$state.go('searchResult.case.children');
	});

	function mapData(data, section){

		// MAP THE LABEL DATA INTO AN ARRAY/////////////////////////////////
		var dbLabelArray = dbLabelArray = $.map(data[0], function(value, label){
			return [label]
		});
		var dataSet	= []; // TO STORE THE ORIGINAL DATA VALUE SET BEFORE MAPPING
		var valueArray 	= [];

		// MAP THEVALUE DATA INTO AN ARRAY FOR EACH PERSONS /////////////////////////////////
		for (var key in data){
			valueArray = $.map(data[key], function(value, label){
				return [value]
			});
			dataSet.push(valueArray);
		}
		//console.log(dataSet);
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
			sectionSet.push(sectionData)
		}
		return sectionSet
	}

	$scope.children = true;
	$scope.guardians = $scope.csaws = $scope.leas = $scope.cases = $scope.vehicles = $scope.clinks = false;

	$scope.selectSection = function(evt){

		$(".caseMenuItem").removeClass("caseMenu-sel");
		$(evt.currentTarget).addClass('caseMenu-sel');

		$scope.children = $scope.guardians = $scope.csaws = $scope.leas = $scope.cases = $scope.vehicles = $scope.clinks = false;

		//$state.go('searchResult.case.children');

		var target = evt.currentTarget.text;

		switch(target) {
			case "Children":
				$scope.children = true;
				break;
			case "Guardians":
				$scope.guardians = true;
				break;
			case "CSAW":
				$scope.csaws = true;
				break;
			case "LEAs":
				$scope.leas = true;
				break;
			case "Case":
				$scope.cases = true;
				break;
			case "Vehicles":
				$scope.vehicles = true;
				break;
			case "Links":
				$scope.clinks = true;
				break;
			default:
				$scope.children = true;
		}
	};
}])

// CASE DISPLAY DIRECTIVE ///////////////////////////////////////////////////////
.directive ('caseDisplay',function ( $rootScope) {
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
.directive ('childrenDir',function ( $rootScope) {
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
.directive ('guardianDir',function ( $rootScope) {
	return {
		restrict: 'E',
		//controller: 'CaseDisplayCtrl',
		templateUrl: 'components/guardian-mapped.html',
		link: function (scope, element, attrs){
		}
	};
})
// CSAW DIRECTIVE ///////////////////////////////////////////////////////
.directive ('csawDir',function ( $rootScope) {
	return {
		restrict: 'E',
		//controller: 'CaseDisplayCtrl',
		templateUrl: 'components/csaw-tmp.html',
		link: function (scope, element, attrs){
		}
	};
})
// LEA DIRECTIVE ///////////////////////////////////////////////////////
.directive ('leaDir',function ( $rootScope) {
	return {
		restrict: 'E',
		//controller: 'CaseDisplayCtrl',
		templateUrl: 'components/lea-tmp.html',
		link: function (scope, element, attrs){
		}
	};
})
// CASE DIRECTIVE ///////////////////////////////////////////////////////
.directive ('caseDir',function ( $rootScope) {
	return {
		restrict: 'E',
		//controller: 'CaseDisplayCtrl',
		templateUrl: 'components/case-tmp.html',
		link: function (scope, element, attrs){
		}
	};
})
// VEHICLE DIRECTIVE ///////////////////////////////////////////////////////
.directive ('vehicleDir',function ( $rootScope) {
	return {
		restrict: 'E',
		//controller: 'CaseDisplayCtrl',
		templateUrl: 'components/vehicle-tmp.html',
		link: function (scope, element, attrs){
		}
	};
})



