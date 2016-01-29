'use strict';

//  SETTER AND GETTER FOR THE REQUESTOR ///////////////////////////////////////////////////////////
angular.module('RFIapp.services', [])


.factory('MapArrayFtry', [ 'DataFtry' , '$q' ,   function(DataFtry, $q) {

	var mapArray = function(){

		var scheme = new Object({
			tabsLabels : [],
			fieldsLabels : [],
			dbLabels : []
		})

		var url = "http://pnguyen-l.ncmecad.net:8080/ws-gsa/report/mcd/gson/columnMap";

		var $promise =  DataFtry.getData(url).then(function(data){

			for(var i = 1; i<(data.length - 1); i++){
				
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
		mapArray: mapArray,
	}	
}])


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

	var sendData = function(url, data){

		console.log("FROM DATA SEND");
		console.log(url);

		var $promise =  $http({
			method: 'POST',
			url:  url,
			headers: {'Content-Type': 'application/json'},
			data: data
		});
		var deferred = $q.defer();
		$promise.then(function(result){

			if(result.data.status == 'SUCCESS'){
				deferred.resolve(result.data.message);
				} else {
					alert('Woops something wen wrong with the AJAX call');
				}
			});
			return deferred.promise;
		};
*/
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
		getData	: getData
	};
}]);

