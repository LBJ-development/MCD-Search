'use strict';

angular.module('MCDSearch.utilities', [])

.factory('searchParams', function(){

	var searchString, collection, url;

	return{
		setSearchString: function(searchString){

			searchString = searchString;
			console.log("SET SEARCH...")
			console.log(searchString);
		},
		getSearchString: function(){
			console.log("GET SEARCH...")
			console.log(searchString);
		
			return searchString;
		},
		setCollection: function(collection){
			collection = collection;
		},
		getCollection: function(){
			return collection;
		}
	}
})

// SUMMARY CONTROLLER /////////////////////////////////////////////////////////
.controller('SearchCtrl', function($rootScope, $scope, searchParams){


	$scope.testNCMEC = function() {

		var collection = $scope.search.collection != "" ? collection =  $scope.search.collection : collection = "default_collection" ;
		//url = MCDSearchPath.contextPath + searchString + "/0/10/" + collection;
		//var url = MCDSearchPath.contextPath + searchString + "/0/10/" + "MCDTest";

		searchParams.setSearchString($scope.search.searchString);
		searchParams.setCollection(collection);

		$rootScope.$broadcast('INIT-SEARCH');

		/*DataFtry.searchNCMEC(url).then(function(data){
			console.log(data);
		});*/
	};
})
// GOOGLE SEARCH DIRECTIVE ///////////////////////////////////////////////////////
.directive ('searchNcmec', function ( $rootScope, DataFtry, MCDSearchPath) {
	return {
		restrict: 'E',
		transclude: true,
		controller: 'SearchCtrl',
		//scope: true,
		templateUrl: 'components/searchNCMEC-tmp.html',
		link: function (scope, element, attrs){

		}
	};
})

/*
// SUMMARY CONTROLLER /////////////////////////////////////////////////////////
.controller('SummaryCtrl', function($scope){
	
	$scope.isSearchable = false;
	$scope.buttonClass = "btn-disabled";
})



// SELECT A STATE DIRECTIVE /////////////////////////////////////////////////////////
.directive ('selectState',function ( $rootScope) {
	return {
	restrict: 'E',
	transclude: true,
	scope: { 
		classdir:'@',
		mod:'=ngModel'
		 },
	templateUrl: 'components/states.html',
	link: function (scope, element, attrs){

		}
	};
})

// SELECT A GENDER /////////////////////////////////////////////////////////
.directive ('selectGender',function ( $rootScope) {
	return {
	restrict: 'E',
	transclude: true,
	scope: { 
		classdir:'@',
		mod:'=ngModel'
		 },
	template: '<select class={{classdir}} ng-model="mod"> <option value=""></option><option value="Male">Male</option> <option value="Female">Female</option> <option value="T">Transgender</option></select>',
	link: function (scope, element, attrs){

		}
	};
})

// SUMMARY DIRECTIVE /////////////////////////////////////////////////////////
.directive ('summaryDir',function ( $rootScope) {
	return {
	restrict: 'E',
	// scope :{},
	controller: 'SummaryCtrl',
	templateUrl: 'components/summary.html',
	link: function (scope, element, attrs){
		// MAKE SURE THAT THERE IS AT LEAST ONE PERSON IN THE SEARCH REQUEST ////////////////////////////////
		scope.isPersonInSearch = function(){
			for(var i=0; i<scope.childrenList.length; i++){
				if(scope.childrenList[i].person.isSearchable && scope.childrenList[i].searches.length >0){
					scope.isSearchable = true;
					scope.buttonClass = "btn-primary";
					return;
				} else {
 					scope.isSearchable = false;
 					scope.buttonClass = "btn-disabled";
					}
				}
			for(var i=0; i<scope.csawList.length; i++){
				if(scope.csawList[i].person.isSearchable && scope.csawList[i].searches.length >0){
					scope.isSearchable = true;
					scope.buttonClass = "btn-primary";
					return;
				} else {
 					scope.isSearchable = false;
 					scope.buttonClass = "btn-disabled";
					}
				}
			for(var i=0; i<scope.guardianList.length; i++){
				if(scope.guardianList[i].person.isSearchable && scope.guardianList[i].searches.length >0){
					scope.isSearchable = true;
					scope.buttonClass = "btn-primary";
					return;
				} else {
 					scope.isSearchable = false;
 					scope.buttonClass = "btn-disabled";
					}
				}
			for(var i=0; i<scope.uhrList.length; i++){
				if(scope.uhrList[i].person.isSearchable && scope.uhrList[i].searches.length >0){
					scope.isSearchable = true;
					scope.buttonClass = "btn-primary";
					return;
				} else {
 					scope.isSearchable = false;
 					scope.buttonClass = "btn-disabled";
					}
				}
			}
		}
	};
})

// EXT REQUESTOR  DIRECTIVE /////////////////////////////////////////////////////////
.directive ('extRequestorDir',function () {
    return {
    restrict: 'E',
    // scope :{},
   // controller: 'SummaryCtrl',
    templateUrl: 'components/extRequestor.html',
    link: function (scope, element, attrs){

        scope.isNCMECCcase = function(evt) {
            
            scope.cleanCase();

             if($(NCMECcase).is(":checked")) {
                scope.addExtRequestor();
                } else {
                scope.extRequestorList = [];
            }
        };
        scope.addExtRequestor = function(evt) {
       
                scope.extRequestorList.push({
                    name:  {firstName: "",  lastName: ""},
                    department: "",
                    title: "",
                    contactNumber: "",
                    cellNumber: "",
                    email: "",
                     });
                };
            }
       };
})

// CALENDAR DIRECTIVE ////////////////////////////////////////////////////////
.directive("datepicker", function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, elem, attrs, ngModelCtrl) {
            var updateModel = function(dateText) {
                scope.$apply(function() {
                    ngModelCtrl.$setViewValue(dateText);
                });
            };
            var options = {
                dateFormat: "dd/mm/yy",
                changeMonth: true,
                changeYear: true,
                onSelect: function(dateText) {
                    updateModel(dateText);
                }
            };
           elem.datepicker(options);
        }
    }
})

// WATCH THE VIEWPORT SIZE //////////////////////////////////////////////
.factory('WindowSizeFtry', [ '$rootScope' , '$window' , "$interval", function($rootScope, win, $interval) {

	var wrapperWidth;

	var delay = $interval(function() {
		wrapperWidth = $("#wrapper").width();
		$rootScope.$broadcast('wrapperWidthChanges', wrapperWidth);
		   $interval.cancel(delay);
	}, 500);

	win.addEventListener('resize', function() {
		wrapperWidth = $("#wrapper").width();
		//BROADCAST THE WIDTH OF THE WRAPPER FOR THE WHOLE APPLICATION
		$rootScope.$broadcast('wrapperWidthChanges', wrapperWidth);

		}, false);
	return { };
}])

*/