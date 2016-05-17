'use strict';

angular.module('MCDSearch.caseDisplay', [])

// CASE DISPLAY CONTROLLER /////////////////////////////////////////////////////////
.controller('CaseDisplayCtrl', ["$scope", "$state","MapArrayFtry", "HightlightFtry", "MapDataFtry",  function($scope, $state, MapArrayFtry, HightlightFtry, MapDataFtry ){

	$scope.childrenList = [];
	$scope.csawList = [];
	$scope.guardiansList = [];
	$scope.summaryList = [];
	$scope.leasList = [];
	$scope.vehiclesList = [];
	$scope.linksList = [];
	$scope.narrativeList = [];

	$scope.tabsLabels = [];
	$scope.header = "";

	var dataScheme;
	var searchTerms = [];
	var dataForDetached = {};

	$scope.reportHistory = [];

	// GET THE DATA SCHEME WHEN APP INIT
	MapArrayFtry.getScheme().then(function(data){
		dataScheme = data;
		$scope.tabsLabels = data.tabsLabels;
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

		$scope.showCase = true;
		searchTerms = searchString; // COLLECT THE SEARCH TERMS

		// COLLECTING DATA FOR THE DETACHED PAGE/////////////
		dataForDetached.searchString = searchString;
		dataForDetached.dataScheme = dataScheme;
		dataForDetached.caseData = data;
		
		var sections = {
			"header" 	: 0 ,
			"summary" 	: 1 , 
			"children" 	: 2 ,  
			"links" 	: 3,
			"leas"		: 4,
			"vehicles"	: 5,
			"companion"	: 6,
			"parents"	: 7,
			"narrative" : 8,
			"other"		: 9
			};

		// FIRST EMPTY THE EXISTING DATA
		$scope.childrenList = $scope.csawList =  $scope.linksList = $scope.guardiansList = $scope.summaryList = $scope.leasList = $scope.vehiclesList =   $scope.narrativeList =[];

		if(data.Child != undefined && data.Child.length >0 ) $scope.childrenList 							= mapData(data.Child, sections.children);
		if(data.CSAW != undefined && data.CSAW.length >0)$scope.csawList 									= mapData(data.CSAW, sections.companion);
		if(data.Parent_Guardian != undefined && data.Parent_Guardian.length >0)$scope.guardiansList			= mapData(data.Parent_Guardian, sections.parents);
		if(data.Primary_Case_Info != undefined && data.Primary_Case_Info.length >0)$scope.summaryList		= mapData(data.Primary_Case_Info, sections.summary);
		if(data.Law_Enforcement_Agent != undefined && data.Law_Enforcement_Agent.length >0)$scope.leasList	= mapData(data.Law_Enforcement_Agent, sections.leas);
		if(data.Vehicle != undefined && data.Vehicle.length >0) $scope.vehiclesList 						= mapData(data.Vehicle, sections.vehicles);
		//if(data.Vehicle != undefined && data.links.length >0)$scope.linksList				= mapData(data.links, sections.links);
		if(data.Narrative != undefined && data.Narrative.length >0)$scope.narrativeList						= mapData(data.Narrative, sections.narrative);
		if(data.Vehicle != undefined && data.Vehicle.length >0) $scope.linksList							= data.Links;
		if(data.Header != undefined && data.Header.length >0)$scope.header				 					= data.Header[0];


		//$scope.caseLink = "http://hqdev1.ncmecad.net:8080/ws-gsa/report/mcd/view/" + data.Header[0].id;

		// KEEP TRACK OF THE VISITED REPORTS
		if($scope.reportHistory[$scope.reportHistory.length - 1] != data.Header[0].id){
			 $scope.reportHistory.push(data.Header[0].id)
		};
		//$scope.reportHistoryIndex = reportHistory.length;

		// DISPLAYS THE FIRST TAB TO BE SELECTED ONLY IF NO OTHER IS SELECTED
		if($(".caseMenuItem").hasClass( "caseMenu-sel" )){} 
			else { $(".caseMenuItem").first().addClass('caseMenu-sel');}
	});

	/*function hightlightSearchString(data){

		var dataString = data;

		for(var i= 0; i< searchTerms.length; i++){

			var searchWord = searchTerms[i];

			if(searchWord.length >0){ // AVOID AN OUT OF MEMORY IF THE STRING IS EMPTY

				var searchString1 = new RegExp(searchWord, "g");
				var searchString2 = new RegExp(searchWord.charAt(0).toUpperCase() + searchWord.slice(1).toLowerCase(), "g");
				var searchString3 = new RegExp(searchWord.toUpperCase(), "g" );
				var searchString4 = new RegExp(searchWord.toLowerCase(), "g");

				var replaceString1 = searchWord;
				var replaceString2 = searchWord.charAt(0).toUpperCase() + searchWord.slice(1).toLowerCase();
				var replaceString3 = searchWord.toUpperCase();
				var replaceString4 = searchWord.toLowerCase();

				dataString = dataString.replace(searchString1, "<span class='searchHightlight'>" + replaceString1 + "</span>")
											.replace(searchString2, "<span class='searchHightlight'>" + replaceString2 + "</span>")
											.replace(searchString3, "<span class='searchHightlight'>" + replaceString3 + "</span>")
											.replace(searchString4, "<span class='searchHightlight'>" + replaceString4 + "</span>");
			}
		}
		var newData =  dataString;
		return newData
	}*/

	function mapData(data, section){

			return MapDataFtry.mapData(data, section ,dataScheme, searchTerms) ;
	
	}

	/*function mapData(data, section){

		// MAP THE LABEL DATA INTO AN ARRAY/////////////////////////////////
		var dbLabelArray = dbLabelArray = $.map(data[0], function(value, label){
			return [label]
		});
		var dataSet	= []; // TO STORE THE ORIGINAL DATA VALUE SET BEFORE MAPPING
		var valueArray 	= [];

		// MAP THE VALUE DATA INTO AN ARRAY FOR EACH PERSONS /////////////////////////////////
		for (var key in data){
			valueArray = $.map(data[key], function(value, label){
				return [value]
			});
			dataSet.push(valueArray);
		}

		var sectionSet 	= [];
		
		for (var key in dataSet){

			var sectionData = [];
			for(var i=0;  i< dataScheme.dbLabels[section].length; i++){

				for(var n=0; n < dbLabelArray.length; n++){
					// DON'T DISPLAY IS THERE IS NO VALUE
					if(dataSet[key][n].length > 0 && dataSet[key][n] !== "0"){

						if(dataScheme.dbLabels[section][i] == dbLabelArray[n]){
							// IF IT'S A NARRATIVE FIELD TAKE THE WHOLE WIDTH
							var fieldsize = dataSet[key][n].length > 100 ? "col-sm-12" : "col-sm-4";
							//console.log( dataSet[key][n])
							//var hiValue = hightlightSearchString(dataSet[key][n]);
							var hiValue = HightlightFtry.hightlight(dataSet[key][n], searchTerms );
							//console.log(hiValue)
							sectionData.push({"label" : dataScheme.fieldsLabels[section][i], "value" : hiValue, "fieldsize" : fieldsize })
						}
					}	
				}
			}
			sectionSet.push(sectionData);
		}
		return sectionSet
	}*/

	$scope.cases = true;
	$scope.children = $scope.guardians = $scope.csaws = $scope.leas = $scope.vehicles = $scope.clinks = false;

	$scope.detachCase = function(){

		var newWindow = window.open('newWindow.html');
		//localStorage.setItem("caseNumber", $scope.summaryList[0][0].value);

		dataForDetached.caseNumber = $scope.summaryList[0][0].value;

		var jsonString = JSON.stringify({data: dataForDetached});
		localStorage.setItem("dataForDetached", jsonString);
	}
	
	$scope.selectSection = function(evt){

		$(".caseMenuItem").removeClass("caseMenu-sel");
		$(evt.currentTarget).addClass('caseMenu-sel');

		$scope.children = $scope.guardians = $scope.csaws = $scope.leas = $scope.cases = $scope.vehicles = $scope.narratives = $scope.clinks = false;

		//$state.go('searchResult.case.children');

		var target = evt.currentTarget.parentElement.parentElement.id;

		switch(target) {
			case "2":
				$scope.children = true;
				break;
			case "7":
				$scope.guardians = true;
				break;
			case "6":
				$scope.csaws = true;
				break;
			case "4":
				$scope.leas = true;
				break;
			case "1":
				$scope.cases = true;
				break;
			case "5":
				$scope.vehicles = true;
				break;
			case "3":
				$scope.clinks = true;
				break;
			case "8":
				$scope.narratives = true;
				break;
			default:
				$scope.cases = true;
		}
	};

	$scope.goToPreviousRep = function(evt){
		//if( $scope.reportHistoryIndex > 0 ) 
		//$scope.reportHistory.splice($scope.reportHistory.length - 1, 1);
		$scope.reportHistory.pop();

		$scope.getCase($scope.reportHistory[($scope.reportHistory.length - 1)]);
		console.log($scope.reportHistory + " / " + $scope.reportHistory.length);
	}
/*
	$scope.goToNextRep = function(evt){
		$scope.reportHistoryIndex ++;
		$scope.getCase(reportHistory[$scope.reportHistoryIndex]);
		console.log(reportHistory);
	}*/
}]);

