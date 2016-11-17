'use strict';

angular.module('RFIapp.config', [])

	.constant('serverPath', {
		
		//contextPath:'http://ngsstaging.ncmecad.net/ws-gsa/'
		//contextPath:'http://hqdev1.ncmecad.net:8080/ws-gsa/'
		//contextPath:'http://pnguyen-l.ncmecad.net:8080/ws-gsa/'

		contextPath:'http://hqdev1.ncmecad.net:8080/ws-search/'

		//http://hqdev1.ncmecad.net:8080/ws-search/files/getImage?fileName=Sex Offenders/TA%201%20-%20500/TA%20139/03092005.jpg&collection=SOCM

		//http://hqdev1.ncmecad.net:8080/ws-search/files/getImage?fileName=SuspectPhotos/111.jpg&collection=SOCM
	});

	




