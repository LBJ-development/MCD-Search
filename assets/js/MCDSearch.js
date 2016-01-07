'use strict';

app.controller('MCDCtrl',[ "$rootScope",  "$scope", "$window", "$state", "$http",  "$log", "ServicesFtry", "DataFtry", "MCDSearch", "searchResult",  function(  $rootScope, $scope, $window, $state, $http, $log, ServicesFtry, DataFtry, MCDSearch, searchResult){

	var win = angular.element($window);


	$scope.totalItems;
	$scope.currentPage = 1;
	$scope.maxSize = 9;
	$scope.bigCurrentPage = 1;
	$scope.showPagination = false;
	$scope.totReports = 0;

	var searchString;
	var collection;
	var url;

	$scope.stateName;
	$scope.search = { searchString: "", collection: "" };
	$scope.results = [];

	$scope.init = function (){
		$rootScope.loggedIn = false; // If the "logout" link needs to be displayed

	}

	$rootScope.$on('$stateChangeStart',  function(event, toState, toParams, fromState, fromParams){ 
		$scope.stateName = toState.name;
	})


	$scope.$watch (
		function () {
			//SET THE MAX HEIGHT OF THE CASE DISPLAY
			//$(".sectionWrapper").css("max-height", ($("#resultList").height() - 100));
		}
	);
	win.bind('resize', function () {
		$scope.$apply();
	});

	$scope.getCase = function(link, caseID){

		$rootScope.$broadcast('RESET-CASE');

		if(caseID == undefined){

			$("#dialog").dialog({
				modal: true,
				show: { effect: "fadeIn", duration: 500 },
				hide: { effect: "fadeOut", duration: 500 },
				position: { my: "top+120", at: "top+120", of: window }
			});

			$scope.link = link;

		} else {

			var caseN = searchResult.contextPath + caseID;

			DataFtry.searchNCMEC(caseN).then(function(data){
			
				$rootScope.$broadcast('DISPLAYCASE',data);
				//$state.go('searchResult.case');
			});
		}
	}

	$scope.searchNCMEC = function() {

		searchString = $scope.search.searchString;
		collection = $scope.search.collection != "" ? collection =  $scope.search.collection : collection = "default_collection" ;
		//url = MCDSearch.contextPath + searchString + "/0/10/" + collection;
		url = MCDSearch.contextPath + searchString + "/0/10/" + "MCDTest";

		$rootScope.$broadcast('RESET-PAGINATION');

		DataFtry.searchNCMEC(url).then(function(data){
			
			$scope.currentPage = 1;
			$scope.results = [];
			$scope.results = data.results;
			if(data.numHits >= 9) $scope.showPagination = true;
			$scope.totReports = data.numHits;
			$scope.totalItems = data.numHits;
			$state.go('searchResult');
		});
	};

	$scope.$on('PAGECHANGED', function(event, page) {

		var setPage =  ((page * 10) - 10);
		//url = MCDSearch.contextPath + searchString + "/" + setPage  + "/10/" + collection;
		url = MCDSearch.contextPath + searchString + setPage + "/10/" + "MCDTest";

		DataFtry.searchNCMEC(url).then(function(data){
			$scope.results = data.results;
			$scope.totReports = data.numHits;
			$scope.totalItems = data.numHits;
		});
	});

// LOGOUT & CLEANING /////////////////////////////////////////////////////////////////
	$rootScope.logout = function(data) {

		$scope.log = '';
		$state.go('login');
		sessionStorage.clear();
		//$scope.cleanCase();
	};

	$scope.emptyObject = function (){

	};

	//do this when the page loads and the DOM is ready
	angular.element(document).ready(function () {

	});
}])

.controller('PaginationCtrl', function ($rootScope, $scope, $log) {

	//RESET THE PAGINATION TO THE FIRST PAGE WHEN USER MAKE A NEW SEARCH
	$scope.$on('RESET-PAGINATION', function(event) {
		$scope.currentPage = 1;
	})

	$scope.pageChanged = function() {
		$log.log('Page changed to: ' + $scope.currentPage);
		$rootScope.$broadcast('PAGECHANGED', $scope.currentPage);
	};
});
