'use strict';

angular.module('RFIapp.config', [])
	.constant('RFIConfig', {
		contextPath:'http://pnguyen-l.ncmecad.net:8080/rfi'
	})
	.constant('MCDSearchPath', {
		//contextPath:'http://pnguyen-l.ncmecad.net:8080/ws-gsa/gsa/'
		//contextPath:'http://172.25.6.137:8080/ws-gsa/gsa/'
		//contextPath:'http://hqdev1.ncmecad.net:8080/ws-gsa/gsa/search/',
		contextPath:'http://pnguyen-l.ncmecad.net:8080/ws-gsa/gsa/search/'
	})

	.constant('loginPath', {
		contextPath:'http://hqdev1.ncmecad.net:8080/ws-gsa/gsa/'	
	})

	.constant('searchResult', {
		//contextPath:'http://pnguyen-l.ncmecad.net:8080/ws-gsa/report/mcd/gson/287'
		//contextPath:'http://hqdev1.ncmecad.net:8080/ws-gsa/report/mcd/gson/616541'
		//contextPath:'http://hqdev1.ncmecad.net:8080/ws-gsa/report/mcd/gson/'
		contextPath:'http://pnguyen-l.ncmecad.net:8080/ws-gsa/report/json/MCDDB/'
	});

