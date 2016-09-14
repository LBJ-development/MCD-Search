'use strict';

app.controller('MainCtrl',[ "$rootScope",  "$scope", "$timeout", "$window", "$state", "$http",  "$log", "DataFtry", "serverPath", "MapArrayFtry", function(  $rootScope, $scope, $timeout, $window, $state, $http, $log,  DataFtry, serverPath, MapArrayFtry){

	var win = angular.element($window);
	$scope.apVersion;
	$scope.displayOperand = false;
	$scope.currentPage = 1;
	$scope.maxSize = 9;
	$scope.bigCurrentPage = 1;
	$scope.showPagination = false;
	$scope.totReports = 0;
	$scope.caseTitle;
	$scope.caseLink;
	$scope.stateName;
	//$scope.search = { searchString: "", collections: "", operand:"" };
	$scope.searchQuery = { qrTerm: "", startIndex: "", nResults: 10 , collections: "", operand: ""};
	$scope.results = [];

	var searchTerms = [];
	var currentCollection;

	$scope.onInit = function(){

		console.log("FROM ON INIT");
	}

	// GET APP VERSION //////////////////////////////////////////////
	var versionUrl = serverPath.contextPath + "utils/version" ;
	DataFtry.getData(versionUrl).then(function(result){ 
		$scope.apVersion = result.version;
	});

	// GET COLLECTIONS FOR SEARCHES  //////////////////////////////////////////////
	var collectionUrl = serverPath.contextPath + "gsa/collections" ;
	DataFtry.getData(collectionUrl).then(function(result){ 

		$scope.searchQuery.collections = result;
		//$scope.apVersion = result.version;
	});

	$rootScope.$on('$stateChangeStart',  function(event, toState, toParams, fromState, fromParams){ 
		$scope.stateName = toState.name;

		if($scope.stateName == "login" || $scope.stateName == "mainSearch"){
			$('#utilsNav').css("top" , "-105px");
			$('.searchForm').css({"padding-top" : "50px", "top":"-0px"});

			$('#NGS-logo').switchClass("NGS-logo-small" , "NGS-logo-large", 1000, "easeInOutQuad");


		} else {
			$('#utilsNav').css("top" , "-60px");
			$('#NGS-logo').switchClass("NGS-logo-large" , "NGS-logo-small", 1000, "easeInOutQuad");
			$('.searchForm').css({"padding-top" : "0px", "top":"-20px"});
		}
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

	//  SPECIFICS FOR COLLECTIONS //////////////////////////////
	var collectionData = [
		{label : "MCD Test", value : "MCDTest"},
		{label : "SOCM", value: "SOCM"}
	];
	var operandData = [
		{label : "And", value : "AND"},
		{label : "Or", value: "OR"}
	];

	$scope.collectionOptions = {
		dataTextField: "label",
		dataValueField: "value",
		placeholder: "Select a collection(s)...",
		
		//dataSource: DataFtry.fakeTable().data,
		dataSource: collectionData,
		change: function(e){
			$timeout(function() {

				if($scope.searchQuery.collections) {
					$scope.searchQuery.collections.length > 1  ?  $scope.displayOperand = true : $scope.displayOperand = false;
				}
			}, 300);
		}
	}

	$scope.operandOptions = {
		dataTextField: "label",
		dataValueField: "value",
		
		//dataSource: DataFtry.fakeTable().data,
		dataSource: operandData,
		change: function(e){
			$timeout(function() {
			}, 300);
		}
	}
	// ////////////////////////////////////////////////////
	//console.log($scope.selectOptions.dataSource)

	// WHEN CLICKING THE SEARCH BUTTON //////////////////////////////////////
	$scope.initSearch = function() {
		$rootScope.$broadcast('RESET-PAGINATION');
		$scope.searchQuery.startIndex = 0; 
		//setPage =  0;
		searchNCMEC();
	};

	// WHEN CLICKING THE PAGINATION //////////////////////////////////////
	$scope.$on('PAGE-CHANGED', function(event, page) {
		//setPage =  ((page * 10) - 10);
		var nResults = $scope.searchQuery.nResults;
		$scope.searchQuery.startIndex = ((page * nResults) - nResults);;
		searchNCMEC();
	});

	// SEARCH DATABASE //////////////////////////////////////
	function searchNCMEC(){ 

		console.log("FROM SEARCH NCMEC");

		var qrTerm = $scope.searchQuery.qrTerm;
		var startIndex = $scope.searchQuery.startIndex;
		var nResults = $scope.searchQuery.nResults;
		var operand = $scope.searchQuery.operand;
		var url;

		/*if($scope.searchQuery.collections == "" || $scope.searchQuery.collections == null ){
			$scope.searchQuery.collections = ["mcdstaging"];
			//console.log($scope.searchQuery.collections)
		}*/

		url = serverPath.contextPath + "gsa/search/";

		DataFtry.sendData(url, $scope.searchQuery).then(function(result){ 
		//DataFtry.getData(url).then(function(data){

			if(startIndex === 0){
				startIndex = 1;
				result.data.numHits >= 9 ? $scope.showPagination = true : $scope.showPagination = false;
				$state.go('searchResult');
			}
			$scope.totalReports = result.data.numHits;
			$scope.results = [];
			$scope.results = result.data.results;
			searchTerms = result.data.searchObj.qrWords;

			// TO EMPTY THE REPORT HISTORY ARRAY
			$rootScope.$broadcast('SEARCH-RESULT');
		});
	}

	// GET THE SELECTED CASE //////////////////////////////////////
	$scope.getCase = function(caseID, collection){

		$rootScope.$broadcast('RESET-CASE');

		if(collection != undefined) currentCollection = collection;

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
			var caseN = serverPath.contextPath + "report/json/" + currentCollection + "/" + caseID;

			DataFtry.getData(caseN).then(function(data){
				if(jQuery.isEmptyObject(data)){
					alert("No data for this case...")
				} else {
					$rootScope.$broadcast('DISPLAY-CASE',data, searchTerms);
				}
			});
		}
	}

// LOGOUT & CLEANING /////////////////////////////////////////////////////////////////
	$rootScope.logout = function(data) {
		$scope.log = '';
		$state.go('login');
		localStorage.clear();
		$rootScope.loggedIn = false;
		$scope.searchQuery.qrTerm = "";
		//window.location.href = "http://hqdev1.ncmecad.net:8080/ws-gsa/";
		var url = serverPath.contextPath  + "gsa/logout" ;
		DataFtry.getData(url).then(function(data){
			console.log("FROM LOGOUT")
		});
	};
}])

