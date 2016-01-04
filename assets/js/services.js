'use strict';

//  SETTER AND GETTER FOR THE REQUESTOR ///////////////////////////////////////////////////////////
angular.module('RFIapp.services', [])

.factory('ServicesFtry', function() {

		var requestorInfo = {};

		var setRequestor = function(requestor) {
				requestorInfo = requestor;
		};

		var getRequestor = function() {
				return requestorInfo;
		};
		return {
					setRequestor: setRequestor,
				getRequestor: getRequestor
		};
})

//  DATA FACTORY ///////////////////////////////////////////////////////////
.factory('DataFtry', [ '$http' , '$q' , 'RFIConfig',   function($http, $q, RFIConfig) {

	var getData = function(url){
		var $promise =  $http({
				method: 'GET',
				url:  url,
				headers: {'Content-Type': 'application/json'}
			});
			var deferred = $q.defer();
			$promise.then(function(result){
/*        console.log("FROM GETDATA");
				console.log(result);*/
				if(result.data.status.status == 'SUCCESS'){
					deferred.resolve(result);
				} else  if(result.data.status.status == 'FAILED') {
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

	var searchNCMEC = function(url, data){

		var $promise =  $http({
			method: 'GET',
			url:  url,
			headers: {'Content-Type': 'application/json'},
			data: data
		});
		var deferred = $q.defer();
		$promise.then(function(result){

			deferred.resolve(result.data);
			//console.log("FROM SEARCH NCMEC!")

			/*if(result.data.status == 'SUCCESS'){
				deferred.resolve(result.data.message);
				} else {
					alert('Woops something wen wrong with the AJAX call');
				}*/
			});
			return deferred.promise;
		};

		return {
			getData		: getData,
			sendDat		: sendData,
			searchNCMEC	: searchNCMEC
	};
}]);

