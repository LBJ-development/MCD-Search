'use strict';

app.controller('MainCtrl',[ "$rootScope",  "$scope", "$window", "$state", "$http",  "$log", "ServicesFtry", "DataFtry", "MCDSearchPath", "searchResult",  function(  $rootScope, $scope, $window, $state, $http, $log, ServicesFtry, DataFtry, MCDSearchPath, searchResult){

	var win = angular.element($window);
	var searchString, collection, url, setPage;

	$scope.currentPage = 1;
	$scope.maxSize = 9;
	$scope.bigCurrentPage = 1;
	$scope.showPagination = false;
	$scope.totReports = 0;

	$scope.caseTitle;
	$scope.caseLink;

	$scope.stateName;
	$scope.search = { searchString: "", collection: "" };
	$scope.results = [];

	$rootScope.$on('$stateChangeStart',  function(event, toState, toParams, fromState, fromParams){ 
		$scope.stateName = toState.name;
	})

/*	$scope.$watch (
		function () {
			//SET THE MAX HEIGHT OF THE CASE DISPLAY
			//$(".sectionWrapper").css("max-height", ($("#resultList").height() - 100));
		}
	);*/

	win.bind('resize', function () {
		$scope.$apply();
	});

	// WHEN CLICKING THE SEARCH BUTTON //////////////////////////////////////
	$scope.initSearch = function() {
		$rootScope.$broadcast('RESET-PAGINATION');
		setPage =  0;
		searchNCMEC();
	};

	// WHEN CLICKING THE PAGINATION //////////////////////////////////////
	$scope.$on('PAGE-CHANGED', function(event, page) {
		setPage =  ((page * 10) - 10);
		searchNCMEC();
	});

	// SEARCH DATABASE //////////////////////////////////////
	function searchNCMEC(){
		searchString = $scope.search.searchString;
		collection = $scope.search.collection != "" ? collection =  $scope.search.collection : collection = "default_collection" ;
		//url = MCDSearchPath.contextPath + searchString + "/0/10/" + collection;
		url = MCDSearchPath.contextPath + searchString + "/" + setPage + "/10/" + "MCDTest";

		DataFtry.searchNCMEC(url).then(function(data){

			if(setPage === 0){
				$scope.setPage = 1;
				data.numHits >= 9 ? $scope.showPagination = true : $scope.showPagination = false;
				$state.go('searchResult');
			}
			$scope.totalReports = data.numHits;
			$scope.results = [];
			$scope.results = data.results;
		});
	}

	// GET THE SELECTED CASE //////////////////////////////////////
	$scope.getCase = function(link, caseID, title){
		$scope.caseTitle 	= title;
		$scope.caseLink 	= link;
		$rootScope.$broadcast('RESET-CASE');

		if(caseID == undefined){
			// CREATE AN ERROR WINDOW WITH A LINK THAT DISPLAYS THE CASE IN A NEW TAB
			$("#dialog").dialog({
				modal: true,
				show: { effect: "fadeIn", duration: 500 },
				hide: { effect: "fadeOut", duration: 500 },
				position: { my: "top+120", at: "top+120", of: window }
			});

			$scope.link = link;

		} else {
			// DISPLAY THE CASE WITHIN THE APP. 
			var caseN = searchResult.contextPath + caseID;

			DataFtry.searchNCMEC(caseN).then(function(data){

				console.log("FROM GETDATA!");

				$rootScope.$broadcast('DISPLAY-CASE',data);

				//$state.go('searchResult.case');
			});
		}
	}
// LOGOUT & CLEANING /////////////////////////////////////////////////////////////////
	$rootScope.logout = function(data) {
		$scope.log = '';
		$state.go('login');
		sessionStorage.clear();
		$rootScope.loggedIn = false;
		$scope.search.searchString = "";
	};
}])

