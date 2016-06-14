'use strict';

//  SETTER AND GETTER FOR THE REQUESTOR ///////////////////////////////////////////////////////////
angular.module('RFIapp.services', [])


.factory('MapArrayFtry', [ 'DataFtry' , '$q' , 'serverPath' ,  function(DataFtry, $q, serverPath) {

	var getScheme = function(collection){

		var scheme = new Object({
			tabsLabels 	: [],
			tabsLinks 	: [],
			fieldsLabels: [],
			dbLabels 	: []
		})

		//var url = "http://hqdev1.ncmecad.net:8080/ws-gsa/report/mcd/gson/columnMap";
		var url = serverPath.contextPath + "report/columnMap/" +  collection;

		var $promise =  DataFtry.getData(url).then(function(data){

			//console.log(data)
			for(var i = 0; i < (data.length -1); i++){		

				if(data[i].Tab_Label != undefined) scheme.tabsLabels.push(data[i].Tab_Label);
				if(data[i].rs_linker != undefined)scheme.tabsLinks.push(data[i].rs_linker);
				if(data[i].display_columns != undefined)scheme.fieldsLabels.push(data[i].display_columns
					.toString()
					.replace(/\t/g, '')
					.replace(/\n/g, '')
					.split(","));
				if(data[i].dbcolumns != undefined)scheme.dbLabels.push(data[i].dbcolumns
					.toString()
					.replace(/\t/g, '')
					.replace(/\n/g, '')
					.split(","));
				}
			})
		var deferred = $q.defer();

		// console.log("SCHEME:"); 
		// console.log(scheme)

		$promise.then(function(){
			deferred.resolve(scheme);
			});
		return deferred.promise;
		}
	return {
		getScheme: getScheme,
	}	
}])

.factory('CountOccurencesFtry', function() {

	var countOccurences = function(data, searchTerms){

		var occurences = 0;
		var valueArray 	= [];

		// MAP THE VALUE DATA INTO AN ARRAY FOR EACH SECTION /////////////////////////////////
		for (var key in data){
			valueArray = $.map(data[key], function(value, label){
				return [value]
			});
			for (var i=0; i<valueArray.length; i++) {	
				occurences  += (valueArray[i].match(searchTerms, "gi") || []).length
			}
		}
		return occurences
		}
	return {
		countOccurences: countOccurences,
	}	
})

.factory('HightlightFtry',[  function() {

	var hightlight = function(data, searchTerms){

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
		return   dataString;
		}
	return {
		hightlight: hightlight,
	}
}])
	
.factory('MapDataFtry',[  "HightlightFtry" , function( HightlightFtry){

	var mapData = function(data, section, dataScheme, searchTerms){

		// TO DEFINE THE INDEX OF THE SECTION ////////////////////
		var index;
		for(var i=0 ; i<dataScheme.tabsLinks.length; i++){
			if(dataScheme.tabsLinks[i] == section ) index = i;
		}

		// MAP THE DB LABEL DATA INTO AN ARRAY/////////////////////////////////
		var dbLabelArray =  $.map(data[0], function(value, label){
			return [label]
		});
		//console.log(dbLabelArray)
		var dataSet	= []; // TO STORE THE ORIGINAL DATA VALUE SET BEFORE MAPPING
		var valueArray 	= [];

		// MAP THE VALUE DATA INTO AN ARRAY FOR EACH SECTION /////////////////////////////////
		for (var key in data){
			valueArray = $.map(data[key], function(value, label){
				return [value]
			});
			dataSet.push(valueArray);
		}
		var sectionSet 	= [];

		for (var key in dataSet){
				
			var sectionData = [];

			for(var i=0;  i< dataScheme.dbLabels[index].length; i++){

				for(var n=0; n < dbLabelArray.length; n++){

					// DON'T DISPLAY IS THERE IS NO VALUE
					if(dataSet[key][n].length > 0 && dataSet[key][n] !== "0"){

						if(dataScheme.dbLabels[index][i] == dbLabelArray[n]){
							// IF IT'S A NARRATIVE FIELD TAKE THE WHOLE WIDTH
							var fieldsize = dataSet[key][n].length > 100 ? "col-sm-12" : "col-sm-4";
							var hiValue = HightlightFtry.hightlight(dataSet[key][n], searchTerms );
							
							sectionData.push({"label" : dataScheme.fieldsLabels[index][i], "value" : hiValue, "fieldsize" : fieldsize })
						}
					}	
				}
			}
			sectionSet.push(sectionData);
		}
		return sectionSet
	}
	return {mapData : mapData}
}])

//  DATA FACTORY ///////////////////////////////////////////////////////////
.factory('DataFtry', [ '$http' , '$q' ,   function($http, $q) {

	var sendData = function(url, data){

		var $promise =  $http({
			method: 'POST',
			url:  url,
			headers: {'Content-Type': 'application/json'},
			data: data
		});
		var deferred = $q.defer();
		$promise.then(function(result){

			if(result.statusText == 'OK'){
				deferred.resolve(result);
				} else {
					alert('Woops something wen wrong with the AJAX call');
				}
			});
			return deferred.promise;
		};

	var getData = function(url){
		var $promise =  $http({
			method: 'GET',
			url:  url,
			headers: {'Content-Type': 'application/json'}
		});

		var deferred = $q.defer();

		$promise.then(function(result){
			deferred.resolve(result.data);
			});
		return deferred.promise;
		};
	return {
		getData	: getData,
		sendData : sendData
	};
}]);

