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
	var genData  = {};
	var sectionIndex;
	var sectionTitle;

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
		tabsLinks = [];
		for(var i=1; i< dataScheme.tabsLinks.length; i++){
			for(var section in data) {
				if(section == dataScheme.tabsLinks[i] && data[section].length > 0){
					$scope.tabsLabels.push( dataScheme.tabsLabels[i]);
					tabsLinks.push( dataScheme.tabsLinks[i]);
				} 
			}
			console.log($scope.tabsLabels);
		}
	// DISPLAYS THE FIRST TAB TO BE SELECTED ONLY IF NO OTHER IS SELECTED
		$timeout(function() {

			$(".caseMenuItem").removeClass("caseMenu-sel");
			$(".caseMenuItem").first().addClass('caseMenu-sel');
				//$scope.primarycaseinfo = true;
		/*	if($(".caseMenuItem").hasClass( "caseMenu-sel" )){} 
			else { 
				$(".caseMenuItem").first().addClass('caseMenu-sel');
				//$scope.primarycaseinfo = true;
			}	*/	
		}, 300);

		if(data.Header != undefined && data.Header.length >0)$scope.header = data.Header[0];

		sectionIndex = 0;
		sectionTitle = $scope.tabsLabels[0];
		setSection();

		// COLLECTING DATA FOR THE DETACHED PAGE/////////////
		dataForDetached.searchString = searchString;
		dataForDetached.dataScheme = dataScheme;
		dataForDetached.caseData = data;
		dataForDetached.caseNumber = data.Header[0].id;
		dataForDetached.tabLabels = $scope.tabsLabels;
		dataForDetached.tabLinks = tabsLinks;

		// KEEP TRACK OF THE VISITED REPORTS
		if($scope.reportHistory[$scope.reportHistory.length - 1] != data.Header[0].id){
			 $scope.reportHistory.push(data.Header[0].id)
		};
	});

	$scope.selectSection = function(evt){
		$(".caseMenuItem").removeClass("caseMenu-sel");
		$(evt.currentTarget).addClass('caseMenu-sel');
		sectionIndex = evt.currentTarget.parentElement.parentElement.id;
		sectionTitle =  evt.currentTarget.text;
		setSection();
	};

	function setSection(){
		$scope.sectionTitle = sectionTitle;
		//	 MAP THE DATA ////////////////		
		$scope.fieldList =  MapDataFtry.mapData(genData[tabsLinks[sectionIndex]] , tabsLinks[sectionIndex] , dataScheme, searchTerms );
		// CHECK IF THERE ARE MULTIPLE ITEMS IN THE SECTIONS AND DISPLAYS THE INDEX 
		$scope.fieldList.length > 1 ? $scope.displayIndex = true :  $scope.displayIndex = false;
		$scope.showCase = true;
		$scope.genericInfo = true;
	}

	$scope.detachCase = function(){
		var newWindow = window.open('newWindow.html');
		var jsonString = JSON.stringify({data: dataForDetached});
		localStorage.setItem("dataForDetached", jsonString);
	}
	
	$scope.goToPreviousRep = function(evt){

		$scope.reportHistory.pop();

		$scope.getCase($scope.reportHistory[($scope.reportHistory.length - 1)]);
		console.log($scope.reportHistory + " / " + $scope.reportHistory.length);
	}
}]);

