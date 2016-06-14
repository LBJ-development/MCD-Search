'use strict';

angular.module('MCDSearch.utilities', [])

// GOOGLE SEARCH DIRECTIVE ///////////////////////////////////////////////////////
.directive ('searchNcmec', function () {
	return {
		restrict: 'E',
		transclude: true,
		//scope: true,
		templateUrl: 'components/searchNCMEC-tmp.html',
		link: function (scope, element, attrs){
		}
	};
})
// PAGINATION CONTROLER ///////////////////////////////////////////////////////
.controller('PaginationCtrl', function ($rootScope, $scope, $log) {
	//RESET THE PAGINATION TO THE FIRST PAGE WHEN USER MAKE A NEW SEARCH
	$scope.$on('RESET-PAGINATION', function(event) {
		$scope.currentPage = 1;
	});

	$scope.pageChanged = function() {
		$log.log('Page changed to: ' + $scope.currentPage);
		$rootScope.$broadcast('PAGE-CHANGED', $scope.currentPage);
	};
})

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

// GENERIC ///////////////////////////////////////////////////////
.directive ('genericDir',function ($rootScope, DataFtry) {
	return {
		restrict: 'E',
		//controller: 'CaseDisplayCtrl',
		templateUrl: 'components/generic-tmp.html',
		link: function (scope, element, attrs){
		
		}
	};
})
