'use strict';

angular.module('MCDSearch.caseDisplay', [])

// CASE DISPLAY CONTROLLER /////////////////////////////////////////////////////////
.controller('CaseDisplayCtrl', ["$scope", "$state","MapArrayFtry", "HightlightFtry", "MapDataFtry", "$timeout", "DataFtry", "serverPath", "CountOccurencesFtry", function($scope, $state, MapArrayFtry, HightlightFtry, MapDataFtry, $timeout, DataFtry, serverPath, CountOccurencesFtry ){

	$scope.fieldList = [];
	$scope.tabsLabels = [];
	$scope.tabsCounter = [];
	$scope.header = "";
	$scope.reportHistory = [];
	var tabsLinks = [];
	var dataScheme = {};
	var dataSchemeArr  =[];
	var searchTerms = [];
	var dataForDetached = {};
	var genData  = {};
	var sectionIndex;
	var sectionTitle;
	var schemesName = [];
	var currentCollectionName = "";

	// GET ALL THE SCHEMES
	var schemeUrl = serverPath.contextPath + "gsa/procs"
	DataFtry.getData(schemeUrl).then(function(result){ 
		dataSchemeArr = [];
		schemesName = [];
		schemesName = result;
		//console.log(schemesName);
		var schemeIndex = 0;
		var totalSchemes = result.length;
		getScheme();
		function getScheme(){
			if(schemeIndex < totalSchemes){
				MapArrayFtry.getScheme(schemesName[schemeIndex]).then(function(data){
					dataSchemeArr.push(data);
					schemeIndex ++;
					getScheme();
				});
			} 
		}

		/*$timeout(function() {
			console.log(dataSchemeArr)
		}, 500);*/
	});

	$scope.showCase = false;

	$scope.$on('RESET-PAGINATION', function(event) {
		$scope.showCase = false;
	})

	$scope.$on('RESET-CASE', function(event) {
		$scope.showCase = false;
	})

	$scope.$on('DISPLAY-CASE', function(event, data, searchString) {
		genData = data;
		//console.log(data)

		searchTerms = searchString; // COLLECT THE SEARCH TERMS

		// DEFINE THE SCHEME COLLECTION TO BE USED ///////
		dataScheme = {};

		for(var i=0; i< schemesName.length; i++){
			if(schemesName[i] == data.Header[0].collection_name){
				dataScheme = dataSchemeArr[i];
				currentCollectionName = schemesName[i];
			} 
		}

		// DISPLAY THE TAB LABELS THAT ARE RETURNED WITH DATA
		$scope.tabsLabels = [];
		$scope.tabsCounter = [];
		tabsLinks = [];

		for(var i=1; i< dataScheme.tabsLinks.length; i++){

			//if(i==1)console.log(dataScheme.tabsLinks);
			for(var section in data) {	
				if(section == dataScheme.tabsLinks[i] && data[section].length > 0){

					$scope.tabsLabels.push( dataScheme.tabsLabels[i]);
					tabsLinks.push(dataScheme.tabsLinks[i]);
				
					// COUNT THE NUMBER OF OCCURRENCES IN EACH SECTION //////////////
					var count = 0;
					for(var n= 0; n< searchTerms.length; n++){
						var searchWord = searchTerms[n];
						count += CountOccurencesFtry.countOccurences( data[section], searchWord );
					}

					$scope.tabsCounter.push( count );
					//console.log($scope.tabsCounter)
				} 
			}
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
		dataForDetached.tabsCounter = $scope.tabsCounter;
		//dataForDetached.currentSchemeName = currentSchemeName;

		// EMPTY THE REPORT HISTORY ARRAY WHEN A NEW SEARCH IS PERFORMED
		$scope.$on('SEARCH-RESULT', function(event) {
			 $scope.reportHistory = [];
		})

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
		//$scope.fieldList =  MapDataFtry.mapData(genData[tabsLinks[sectionIndex]] , tabsLinks[sectionIndex] , dataScheme, searchTerms );
		$scope.fieldList =  MapDataFtry.mapData(genData[tabsLinks[sectionIndex]] , tabsLinks[sectionIndex] , dataScheme, searchTerms );
		//console.log($scope.fieldList)
		// SET THE IMAGE ////////////////////////////////////
		//$scope.basePath = serverPath.contextPath.replace("/ws-gsa", "/");
		$scope.basePath = serverPath.contextPath + "files/getImage?fileName=";
		$scope.currentCollectionName = "&collection=" + currentCollectionName;
		//if($scope.fieldList[0][0] != undefined)$scope.imagePath = $scope.fieldList[0][0].value + "&collection=SOCM";

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

