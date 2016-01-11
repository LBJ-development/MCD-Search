'use strict';

app.controller('MCDCtrl',[ "$rootScope",  "$scope", "$window", "$state", "$http",  "$log", "ServicesFtry", "DataFtry", "MCDSearchPath", "searchResult", "searchParams",  function(  $rootScope, $scope, $window, $state, $http, $log, ServicesFtry, DataFtry, MCDSearchPath, searchResult, searchParams){

	var win = angular.element($window);

	$scope.totalItems;
	$scope.currentPage = 1;
	$scope.maxSize = 9;
	$scope.bigCurrentPage = 1;
	$scope.showPagination = false;
	$scope.totReports = 0;

	$scope.caseTitle;
	$scope.caseLink;

	var searchString, collection, url;

	$scope.stateName;
	$scope.search = { searchString: "", collection: "" };
	$scope.results = [];

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

	$scope.getCase = function(link, caseID, title){

		$scope.caseTitle 	= title;
		$scope.caseLink 	= link;
		$rootScope.$broadcast('RESET-CASE');

		if(caseID == undefined){
			// CREATE AN ERROR WINDOW WITH A LINK THAT ALLOWS TO DISPLAY THE CASE IN A NEW TAB
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
		//url = MCDSearchPath.contextPath + searchString + "/0/10/" + collection;
		url = MCDSearchPath.contextPath + searchString + "/0/10/" + "MCDTest";

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
		//url = MCDSearchPath.contextPath + searchString + "/" + setPage  + "/10/" + collection;
		url = MCDSearchPath.contextPath + searchString + setPage + "/10/" + "MCDTest";

		DataFtry.searchNCMEC(url).then(function(data){
			$scope.results = data.results;
			$scope.totReports = data.numHits;
			$scope.totalItems = data.numHits;
		});
	});

	$scope.$on('INIT-SEARCH', function(event) {
		console.log("FROM INIT-SEARCH")
		console.log(searchParams.getSearchString());
		
	})

// LOGOUT & CLEANING /////////////////////////////////////////////////////////////////
	$rootScope.logout = function(data) {

		$scope.log = '';
		$state.go('login');
		sessionStorage.clear();
		$rootScope.loggedIn = false;
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
