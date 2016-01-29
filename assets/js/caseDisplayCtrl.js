'use strict';

angular.module('MCDSearch.caseDisplay', [])

// CASE DISPLAY CONTROLLER /////////////////////////////////////////////////////////
.controller('CaseDisplayCtrl', ["$scope", "$state", "MapArrayFtry", function($scope, $state, MapArrayFtry){

	var dataScheme;

	MapArrayFtry.mapArray().then(function(data){
		dataScheme = data;
		console.log("FROM MAIN");
		console.log(data);
	})

	$scope.childrenList = [];
	$scope.csawList = [];
	$scope.guardiansList = [];
	$scope.casesList = [];
	$scope.leasList = [];
	$scope.vehiclesList = [];
	$scope.linksList = [];

	$scope.showCase = false;

	$scope.$on('RESET-PAGINATION', function(event) {
		$scope.showCase = false;
	})

	$scope.$on('RESET-CASE', function(event) {
		$scope.showCase = false;
	})

	$scope.$on('DISPLAY-CASE', function(event, data) {

		$scope.showCase = true;

		$scope.childrenList     = data.Children;
		$scope.csawList  		= data.Companions;
		$scope.guardiansList    = data.Guardians;
		$scope.casesList        = data.Cases;
		$scope.leasList         = data.Leas;
		$scope.vehiclesList     = data.Vehicles;
		$scope.linksList        = data.Links;

		//$state.go('searchResult.case.children');

		// console.log("FROM DISLAYCASE");
		//console.log(data)

	});

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
		controller: 'CaseDisplayCtrl',
		templateUrl: 'components/children-tmp.html',
		link: function (scope, element, attrs){

			// console.log("FROM CHILDREN DIRECTIVE!")
		}
	};
})
// GUARDIAN DIRECTIVE ///////////////////////////////////////////////////////
.directive ('guardianDir',function ( $rootScope) {
	return {
		restrict: 'E',
		controller: 'CaseDisplayCtrl',
		templateUrl: 'components/guardian-tmp.html',
		link: function (scope, element, attrs){
		}
	};
})
// CSAW DIRECTIVE ///////////////////////////////////////////////////////
.directive ('csawDir',function ( $rootScope) {
	return {
		restrict: 'E',
		controller: 'CaseDisplayCtrl',
		templateUrl: 'components/csaw-tmp.html',
		link: function (scope, element, attrs){
		}
	};
})
// LEA DIRECTIVE ///////////////////////////////////////////////////////
.directive ('leaDir',function ( $rootScope) {
	return {
		restrict: 'E',
		controller: 'CaseDisplayCtrl',
		templateUrl: 'components/lea-tmp.html',
		link: function (scope, element, attrs){
		}
	};
})
// CASE DIRECTIVE ///////////////////////////////////////////////////////
.directive ('caseDir',function ( $rootScope) {
	return {
		restrict: 'E',
		controller: 'CaseDisplayCtrl',
		templateUrl: 'components/case-tmp.html',
		link: function (scope, element, attrs){
		}
	};
})
// VEHICLE DIRECTIVE ///////////////////////////////////////////////////////
.directive ('vehicleDir',function ( $rootScope) {
	return {
		restrict: 'E',
		controller: 'CaseDisplayCtrl',
		templateUrl: 'components/vehicle-tmp.html',
		link: function (scope, element, attrs){
		}
	};
})



