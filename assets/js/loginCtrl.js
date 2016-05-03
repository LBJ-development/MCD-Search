

'use strict';

angular.module('RFIapp.login', [])

    .controller('LoginCtrl', [ '$rootScope', '$scope', '$state', '$http',  'loginPath', function($rootScope, $scope,  $state, $http, loginPath) {

        $scope.login = function() {
          /*  console.log("FROM LOGIN");
            console.log($scope.username);*/
            var req = {
                method: 'POST',
                url: loginPath.contextPath  + "getLogin" ,
                headers: {
                    'Content-Type': 'application/json'
                } ,
                data: {
                    'username': $scope.username,
                    'password': $scope.password
                }
            };

            $http(req).
                success(function(data, status, headers, config){
                   /* console.log("FROM HTTP");
                    console.log(data);*/

                    //$rootScope.currentUser =  $scope.username;
                    
                    // STORES THE USERNAME FOR THE SESSION
                    sessionStorage.setItem('userName', JSON.stringify($scope.username));
                  
                    $scope.username = "";
                    $scope.password = "";
                    if(data.status.status == 'SUCCESS') {
                        //ServicesFtry.setRequestor(data.user);

                        //location.path('/mainSearch');
                        $state.go('mainSearch');

                    }
                    else if (data.status.status == 'FAILED') {
                      alert(data.status.message);
                    }
                   
                }).
                error(function(jqXHR, textStatus, errorThrown){
                    //console.log("FROM ERROR");
                    alert('Woops something wen wrong with the AJAX call!');
                });
        };
    }])

    .directive ('loginDirective', function () {

    return {
        restrict: 'E',
        transclude: false,
        controller: 'LoginCtrl',
        link: function (scope, element, attrs, LoginCtrl){

            /*scope.buttonClass 		= "disabled-btn";
             scope.errormessageclass = "errorMessageOff";
             scope.errormessage = "";

             var username = document.getElementById("username");
             var password = document.getElementById("password");

             username.addEventListener('input', function() {
             LoginCtrl.hideErrorMessage();
             ( username.value != "" && password.value != "")? LoginCtrl.enableBtn() : LoginCtrl.disableBtn();
             });

             password.addEventListener('input', function() {
             LoginCtrl.hideErrorMessage();
             ( username.value != "" && password.value != "")? LoginCtrl.enableBtn() : LoginCtrl.disableBtn();
             });*/
        }
    }
})
