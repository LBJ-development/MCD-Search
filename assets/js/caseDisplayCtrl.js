'use strict';

angular.module('MCDSearch.caseDisplay', [])

// CASE DISPLAY CONTROLLER /////////////////////////////////////////////////////////
.controller('CaseDisplayCtrl', ["$scope", "$state","MapArrayFtry", "HightlightFtry", "MapDataFtry", "$timeout", function($scope, $state, MapArrayFtry, HightlightFtry, MapDataFtry, $timeout ){

	$scope.fieldList = [];
	$scope.tabsLabels = [];
	$scope.header = "";
	$scope.reportHistory = [];
	var tabsLinks = [];
	var dataScheme = {};
	var searchTerms = [];
	var dataForDetached = {};
	var genData  = {}

	// GET THE DATA SCHEME WHEN APP INIT
	MapArrayFtry.getScheme().then(function(data){
		dataScheme = data;
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

	$scope.$on('DISPLAY-CASE', function(event, data, searchString) {

		genData = data;
		searchTerms = searchString; // COLLECT THE SEARCH TERMS
		// DISPLAY THE TAB LABELS THAT ARE RETURN WITH DATA
		$scope.tabsLabels = [];
		for(var i=1; i< dataScheme.tabsLinks.length; i++){
			for(var section in data) {
				if(section == dataScheme.tabsLinks[i] && data[section].length > 0){
					$scope.tabsLabels.push( dataScheme.tabsLabels[i]);
					tabsLinks.push( dataScheme.tabsLinks[i]);
				} 
			}
		}
	// DISPLAYS THE FIRST TAB TO BE SELECTED ONLY IF NO OTHER IS SELECTED
		$timeout(function() {
			if($(".caseMenuItem").hasClass( "caseMenu-sel" )){} 
			else { 
				$(".caseMenuItem").first().addClass('caseMenu-sel');
				//$scope.primarycaseinfo = true;
			}		
		}, 300);

		$scope.showCase = true;
	
		// COLLECTING DATA FOR THE DETACHED PAGE/////////////
		dataForDetached.searchString = searchString;
		dataForDetached.dataScheme = dataScheme;
		dataForDetached.caseData = data;
		dataForDetached.caseNumber = data.Header[0].id;
		dataForDetached.tabLabels = $scope.tabsLabels;

		if(data.Header != undefined && data.Header.length >0)$scope.header = data.Header[0];

		// KEEP TRACK OF THE VISITED REPORTS
		if($scope.reportHistory[$scope.reportHistory.length - 1] != data.Header[0].id){
			 $scope.reportHistory.push(data.Header[0].id)
		};
	});

	function mapData(data, section){
			return MapDataFtry.mapData(data, section ,dataScheme, searchTerms) ;
	}

	$scope.cases = true;

	$scope.selectSection = function(evt){
		$(".caseMenuItem").removeClass("caseMenu-sel");
		$(evt.currentTarget).addClass('caseMenu-sel');

		var index = evt.currentTarget.parentElement.parentElement.id;
		$scope.sectionTitle = evt.currentTarget.text;
		$scope.fieldList =  mapData(genData[tabsLinks[index]] , tabsLinks[index])
		$scope.genericInfo = true;
	};

	$scope.detachCase = function(){
		var newWindow = window.open('newWindow.html');
		var jsonString = JSON.stringify({data: dataForDetached});
		localStorage.setItem("dataForDetached", jsonString);
	}
	
	$scope.goToPreviousRep = function(evt){
		//if( $scope.reportHistoryIndex > 0 ) 
		//$scope.reportHistory.splice($scope.reportHistory.length - 1, 1);
		$scope.reportHistory.pop();

		$scope.getCase($scope.reportHistory[($scope.reportHistory.length - 1)]);
		console.log($scope.reportHistory + " / " + $scope.reportHistory.length);
	}
}]);

