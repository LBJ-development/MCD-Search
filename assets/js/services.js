'use strict';

//  SETTER AND GETTER FOR THE REQUESTOR ///////////////////////////////////////////////////////////
angular.module('RFIapp.services', [])


.factory('MapArrayFtry', [ 'DataFtry' , '$q' ,   function(DataFtry, $q) {

	var getScheme = function(){

		var scheme = new Object({
			tabsLabels : [],
			fieldsLabels : [],
			dbLabels : []
		})

		var url = "http://hqdev1.ncmecad.net:8080/ws-gsa/report/mcd/gson/columnMap";

		//var urlServer = "http://hqdev1.ncmecad.net:8080/ws-gsa/report/mcd/gson/";

		var $promise =  DataFtry.getData(url).then(function(data){

			for(var i = 0; i < (data.length -1); i++){
				
				scheme.tabsLabels.push(data[i].Tab_Label);
				scheme.fieldsLabels.push(data[i].display_columns
					.toString()
					.replace(/\t/g, '').replace(/\n/g, '')
					.split(","));
				scheme.dbLabels.push(data[i].dbcolumns
					.toString()
					.replace(/\t/g, '')
					.replace(/\n/g, '')
					.split(","));
				}
			})
		var deferred = $q.defer();

		$promise.then(function(){
			deferred.resolve(scheme);
			});
		return deferred.promise;
		}
	return {
		getScheme: getScheme,
	}	
}])
/*	
.factory('MapDataFtry',function(){
var mapData = function(data, section){
	
	//function mapData(data, section){

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
							sectionData.push({"label" : dataScheme.fieldsLabels[section][i], "value" : dataSet[key][n], "fieldsize" : fieldsize })
						}
					}	
				}
			}
			sectionSet.push(sectionData);
		}
		return sectionSet
	}

	return {mapData : mapData}


})
*/
//  DATA FACTORY ///////////////////////////////////////////////////////////
.factory('DataFtry', [ '$http' , '$q' ,   function($http, $q) {

/*	var getData = function(url){
		var $promise =  $http({
				method: 'GET',
				url:  url,
				headers: {'Content-Type': 'application/json'}
			});
			var deferred = $q.defer();
			$promise.then(function(result){

				if(result.data.status.status == 'SUCCESS'){
					deferred.resolve(result);
				} else  if( result.data.status.status == 'FAILED') {
					alert(result.data.status.message);
				}
			});
			return deferred.promise;
		};
*/
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

