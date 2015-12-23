'use strict';

angular.module('MCDSearch.caseDisplay', [])


// CASE DISPLAY CONTROLLER /////////////////////////////////////////////////////////
.controller('CaseDisplayCtrl', function($scope, $state){

	$scope.childrenList = [];
	$scope.companionsList = [];
	$scope.guardiansList = [];
	$scope.casesList = [];
	$scope.leasList = [];
	$scope.vehiclesList = [];
	$scope.linksList = [];

	$scope.$on('DISPLAYCASE', function(event, data) {

		$scope.childrenList 	= data.Children;
		$scope.companionsList	= data.Companions;
		$scope.guardiansList	= data.Guardians;
		$scope.casesList 	= data.Cases;
		$scope.leasList 	= data.Leas;
		$scope.vehiclesList 	= data.Vehicles;
		$scope.linksList 	= data.Links;

		//$state.go('searchResult.case.children');

		//console.log("FROM DISLAYCASE");

	});

	$scope.selectSection = function(evt){

		$(".caseMenuItem").removeClass("caseMenu-sel");
		$(evt.currentTarget).addClass('caseMenu-sel');

		//console.log(evt.currentTarget.text)
		//$state.go('searchResult.case.children');

	}
})


// CASE DISPLAY DIRECTIVE ///////////////////////////////////////////////////////
.directive ('caseDisplay',function ( $rootScope) {
	return {
	restrict: 'E',
	transclude: true,
	//scope: { },
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
	//transclude: true,
	//scope: { },
	controller: 'CaseDisplayCtrl',
	templateUrl: 'components/children-tmp.html',
	link: function (scope, element, attrs){

		}
	};
});
