'use strict';

angular.module('RFIapp.config', [])
	.constant('RFIConfig', {
		contextPath:'http://pnguyen-l.ncmecad.net:8080/rfi'
	})
	.constant('MCDSearch', {
		//contextPath:'http://pnguyen-l.ncmecad.net:8080/ws-gsa/gsa/'
		contextPath:'http://172.25.6.137:8080/ws-gsa/gsa/'
	})
	.constant('searchResult', {
		//contextPath:'http://pnguyen-l.ncmecad.net:8080/ws-gsa/report/mcd/gson/287'
		//contextPath:'http://172.25.6.137:8080/ws-gsa/report/mcd/gson/287'
		contextPath:'http://172.25.6.137:8080/ws-gsa/report/mcd/gson/1'
	});

