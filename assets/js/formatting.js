'use strict';

angular.module('RFIapp.formatting', [])



// PHONE FORMATTIG //////////////////////////////////////////////
.factory('FormattingFtry', function(){
	var prefix = false;
	var formattedPhone 	= "";
	var formattedSSN 	= "";
	var formattedHeight	= "";

	return {

		formatPhone: function(evt){
			var phone = $(evt.currentTarget);
			var curchr = evt.currentTarget.value.length;
			var curval = phone.val();

			if (curchr == 1 && curval == 1){
				prefix = true;
			} else if (curchr == 1 && curval != 1) {
	 			prefix = false;
			};

			if (!prefix && curchr == 3) {
				//phone.val("(" + curval + ")" + "-");
				formattedPhone = "(" + curval + ")" + "-";
				
			} else if (!prefix && curchr == 9) {
				//phone.val(curval + "-");
				formattedPhone = curval + "-";

			} else {
				formattedPhone = curval;

			}
			return formattedPhone;
		},

		formatSSN: function(evt){
			var SSN = $(evt.currentTarget);
			var curchr = evt.currentTarget.value.length;
			var curval = SSN.val();

			if (curchr == 3) {
				//phone.val("(" + curval + ")" + "-");
				formattedSSN =  curval + "-";
				
			}  else {
				formattedSSN = curval;
			}
			return formattedSSN;
		},
	};
})

