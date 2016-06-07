'use strict';

angular.module('RFIapp.config', [])

	.constant('MCDSearchPath', {
		contextPath:'http://hqdev1.ncmecad.net:8080/ws-gsa/gsa/search/',
	})

	.constant('loginPath', {
		contextPath:'http://hqdev1.ncmecad.net:8080/ws-gsa/gsa/'
	})

	.constant('logoutPath', {
		contextPath:'http://pnguyen-l.ncmecad.net:8080/ws-gsa/'
	})

	.constant('searchResult', {
		contextPath:'http://hqdev1.ncmecad.net:8080/ws-gsa/report/json/'
	})

	.constant('searchResult', {
		contextPath:'http://hqdev1.ncmecad.net:8080/ws-gsa/report/json/'
	})

	.constant('searchCollection', {
		contextPath:'http://ngsstaging.ncmecad.net/ws-gsa/gsa/'
	})

	.constant('schemeCollection', {
		contextPath:'http://pnguyen-l.ncmecad.net:8080/ws-gsa/gsa/'
	})


	.constant('serverPath', {
		contextPath:'http://hqdev1.ncmecad.net:8080/ws-gsa/'
	});


