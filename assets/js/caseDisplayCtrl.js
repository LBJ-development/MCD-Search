'use strict';

angular.module('MCDSearch.caseDisplay', [])

// CASE DISPLAY CONTROLLER /////////////////////////////////////////////////////////
.controller('CaseDisplayCtrl', ["$scope", "$state","MapArrayFtry", "HightlightFtry", "MapDataFtry", "$timeout", function($scope, $state, MapArrayFtry, HightlightFtry, MapDataFtry, $timeout ){

	$scope.primaryCaseInfoList = [];
	$scope.callerReporterList = [];
	$scope.childrenList = [];
	$scope.CSAWList = [];
	$scope.parentGuardiansList = [];
	$scope.LEAList = [];
	$scope.attemptedAbductionList = [];
	$scope.protectiveCustodyList = [];
	$scope.unaccompaniedMinorList = [];
	$scope.unidentifiedList = [];
	$scope.vehiclesList = [];
	$scope.narrativeList = [];
	$scope.relatedDataList = [];

	$scope.tabsLabels = [];
	$scope.header = "";
	$scope.reportHistory = [];

	var dataScheme = {};
	var searchTerms = [];
	var dataForDetached = {};
	//	TO DEFINE WHAT LABELS NEED TO BE DISPLAYED
	var tabLabelsMap = {
		"Primary_Case_Info"		: "Primary Case Info",
		"Caller_Reporter"		: "Caller/Reporter",
		"Child" 				: "Child",
		"CSAW" 					: "CSAW",
		"Parent_Guardian" 		: "Parent/Guardian",
		"Law_Enforcement_Agent" : "Law Enforcement Agent",
		"Attempted_Abduction" 	: "Attempted Abduction",
		"Protective_Custody" 	: "Protective Custody",
		"Unaccompanied_Minor" 	: "Unaccompanied Minor",
		"Unidentified" 			: "Unidentified",
		"Vehicle" 				: "Vehicle",
		"Narrative" 			: "Narrative",
		"Related_Data" 			: "Related Data",
	}
	
	// GET THE DATA SCHEME WHEN APP INIT
	MapArrayFtry.getScheme().then(function(data){
		dataScheme = data;
		//$scope.tabsLabels = data.tabsLabels;
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
		// DISPLAY THE TAB LABELS THAT ARE RETURN WITH DATA
		$scope.tabsLabels = [];
		for(var tabLabel in tabLabelsMap) {
			for(var section in data) {
				if(section == tabLabel){
					$scope.tabsLabels.push(tabLabelsMap[tabLabel]);
				} 
			}
		}
	// DISPLAYS THE FIRST TAB TO BE SELECTED ONLY IF NO OTHER IS SELECTED
		$timeout(function() {
			if($(".caseMenuItem").hasClass( "caseMenu-sel" )){} 
			else { 
				$(".caseMenuItem").first().addClass('caseMenu-sel');
				$scope.primarycaseinfo = true;
			}		
		}, 300);

		$scope.showCase = true;
		searchTerms = searchString; // COLLECT THE SEARCH TERMS

		// COLLECTING DATA FOR THE DETACHED PAGE/////////////
		dataForDetached.searchString = searchString;
		dataForDetached.dataScheme = dataScheme;
		dataForDetached.caseData = data;
		dataForDetached.caseNumber = data.Header[0].id;
		dataForDetached.tabLabels = $scope.tabsLabels;

		//console.log(dataForDetached.tabLabels)
		
		var sections = {
			"header" 				: 0,
			"Attempted_Abduction" 	: 1, 
			"Caller_Reporter" 		: 2,  
			"Child" 				: 3,
			"CSAW"					: 4,
			"Related_Data"			: 5,
			"Law_Enforcement_Agent"	: 6,
			"Narrative"				: 7,
			"Parent_Guardian" 		: 8,
			"Primary_Case_Info"		: 9,
			"Protective_Custody"	: 10,
			"Unaccompanied_Minor"	: 11,
			"Unidentified"			: 12,
			"Vehicle"				: 13,
			};

		// FIRST EMPTY THE EXISTING DATA
		$scope.primaryCaseInfoList = $scope.callerReporterList =  $scope.childrenList =  $scope.CSAWList =  $scope.parentGuardiansList =  $scope.LEAList =  $scope.attemptedAbductionList =  $scope.protectiveCustodyList =  $scope.unaccompaniedMinorList =  $scope.unidentifiedList =  $scope.vehiclesList =  $scope.narrativeList =  $scope.relatedDataList = [];

		//console.log(data.Primary_Case_Info);
		//console.log(sections.children)
		if(data.Attempted_Abduction != undefined && data.Attempted_Abduction.length >0 ) $scope.attemptedAbductionList = mapData(data.Attempted_Abduction, sections.Attempted_Abduction);
		if(data.Caller_Reporter != undefined && data.Caller_Reporter.length >0 ) $scope.callerReporterList = mapData(data.Caller_Reporter, sections.Caller_Reporter);
		if(data.Child != undefined && data.Child.length >0 ) $scope.childrenList = mapData(data.Child, sections.Child);
		if(data.CSAW != undefined && data.CSAW.length >0 ) $scope.CSAWList = mapData(data.CSAW, sections.CSAW);
		if(data.Related_Data != undefined && data.Related_Data.length >0 ) $scope.relatedDataList = mapData(data.Related_Data, sections.Related_Data);
		if(data.Law_Enforcement_Agent != undefined && data.Law_Enforcement_Agent.length >0 ) $scope.LEAList = mapData(data.Law_Enforcement_Agent, sections.Law_Enforcement_Agent);
		if(data.Narrative != undefined && data.Narrative.length >0 ) $scope.narrativeList = mapData(data.Narrative, sections.Narrative);
		if(data.Parent_Guardian != undefined && data.Parent_Guardian.length >0 ) $scope.parentGuardiansList = mapData(data.Parent_Guardian, sections.Parent_Guardian);
		if(data.Primary_Case_Info != undefined && data.Primary_Case_Info.length >0 ) $scope.primaryCaseInfoList = mapData(data.Primary_Case_Info, sections.Primary_Case_Info);	
		if(data.Protective_Custody != undefined && data.Protective_Custody.length >0 ) $scope.protectiveCustodyList = mapData(data.Protective_Custody, sections.Protective_Custody);
		if(data.Unaccompanied_Minor != undefined && data.Unaccompanied_Minor.length >0 ) $scope.unaccompaniedMinorList = mapData(data.Unaccompanied_Minor, sections.Unaccompanied_Minor);
		if(data.Unidentified != undefined && data.Unidentified.length >0 ) $scope.unidentifiedList = mapData(data.Unidentified, sections.Unidentified);
		//if(data.Vehicle != undefined && data.Vehicle.length >0 ) $scope.vehicleList = mapData(data.Vehicle, sections.Vehicle);
		if(data.Header != undefined && data.Header.length >0)$scope.header = data.Header[0];

		// KEEP TRACK OF THE VISITED REPORTS
		if($scope.reportHistory[$scope.reportHistory.length - 1] != data.Header[0].id){
			 $scope.reportHistory.push(data.Header[0].id)
		};
		//$scope.reportHistoryIndex = reportHistory.length;	
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

		var jsonString = JSON.stringify({data: dataForDetached});
		localStorage.setItem("dataForDetached", jsonString);
	}
	
	$scope.selectSection = function(evt){

		$(".caseMenuItem").removeClass("caseMenu-sel");
		$(evt.currentTarget).addClass('caseMenu-sel');

		$scope.primarycaseinfo = $scope.callerreporter = $scope.child =  $scope.csaw = $scope.parentguardian = $scope.lawenforcementagent = $scope.attemptedabduction = $scope.protectivecustody = $scope.unaccomapaniedminor = $scope.unidentified = $scope.vehicle = $scope.narrative = $scope.relateddata = false;

		//$state.go('searchResult.case.children');

/*		"Primary_Case_Info"		: "Primary Case Info",
		"Caller_Reporter"		: "Caller/Reporter",
		"Child" 				: "Child",
		"CSAW" 					: "CSAW",
		"Parent_Guardian" 		: "Parent/Guardian",
		"Law_Enforcement_Agent" : "Law Enforcement Agent",
		"Attempted_Abduction" 	: "Attempted Abduction",
		"Protective_Custody" 	: "Protective Custody",
		"Unaccompanied_Minor" 	: "Unaccompanied Minor",
		"Unidentified" 			: "Unidentified",
		"Vehicle" 				: "Vehicle",
		"Narrative" 			: "Narrative",
		"Related_Data" 			: "Related Data",*/
		var index = evt.currentTarget.parentElement.parentElement.id;
		var target = $scope.tabsLabels[index];
		//console.log($scope.tabsLabels[index]);

		switch(target) {
			case "Primary Case Info":
				$scope.primarycaseinfo = true;
				break;
			case "Caller/Reporter":
				$scope.callerreporter = true;
				break;
			case "Child":
				$scope.child = true;
				break;
			case "CSAW":
				$scope.csaw = true;
				break;
			case "Parent/Guardian":
				$scope.parentguardian = true;
				break;
			case "Law Enforcement Agent":
				$scope.lawenforcementagent = true;
				break;
			case "Attempted Abuction":
				$scope.attemptedabduction = true;
				break;
			case "Protective Custody":
				$scope.protectivecustody = true;
				break;
			case "Unaccompanied Minor":
				$scope.unaccomapaniedminor = true;
				break;
			case "Unidentified":
				$scope.unidentified = true;
				break;
			case "Vehicle":
				$scope.vehicle = true;
				break;
			case "Narrative":
				$scope.narrative = true;
				break;
			case "Related Data":
				$scope.relateddata = true;
				break;
			default:
				$scope.primarycaseinfo = true;
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

