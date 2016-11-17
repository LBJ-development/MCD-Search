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

// SHA LOADING ///////////////////////////////////////////////////////
.directive('shaLoading', function() {
	'use strict';
	return {
		restrict: 'A',
		replace: true,
		transclude: true,
		scope: {
		loading: '=shaLoading',
		top: '@'
		},
		templateUrl: 'components/loading.html',
		link: function(scope, element, attrs) {
		var opts = {
			top: attrs.top // Top position relative to parent
			//top: '300%' // Top position relative to parent
			,left: '60%' // Left position relative to parent
			,radius: 40 // The radius of the inner circle
			,color: '#33679a'
			//, position: 'relative' // Element positioning
		};
		var spinner = new Spinner(opts).spin();
		var loadingContainer = element.find('.sha-loading-spinner-container')[0];
		loadingContainer.appendChild(spinner.el);
	  }
	};
  })
