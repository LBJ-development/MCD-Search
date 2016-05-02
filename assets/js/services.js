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

