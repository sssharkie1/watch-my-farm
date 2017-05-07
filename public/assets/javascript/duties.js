$( document ).ready(function() {

	//Look for a query param in the URL
	var url = window.location.search;
	var duties;

	var token;
	if(url.indexOf("?token=") !== -1){
		token = url.split("=")[1];
		getDuties(token);
	}

	function createAMRow(amData){
		console.log(amData);

		
	}

	function getDuties(token){
		tokenId = token || '';
		if(tokenId){
			tokenId = "/?token_id=" + tokenId;
		}
		$.get("/api/duties" + tokenId, function(data){
			console.log("Duties", data);
			duties = data;

			if(!duties || !duties.length){
				renderEmpty();
			}
			else{
				initializeRows(duties);
			}
		})
	}

	function initializeRows(duties){
		var amDutiesRows = [];
		var pmDutiesRows = [];
		for(var i=0; i<duties.length; i++){
				amDutiesRows.push(createAMRow(duties[i]));
				pmDutiesRows.push(createPMRow(duties[i]));
		}
		renderDuties(amDutiesRows, pmDutiesRows);
	}

	function renderDuties(amRows, pmRows){
		$('tbody').children().remove();
		$('#amduties-table').children('alert').remove();
		if(rows.length){
			console.log(rows);
		}
	}


	function renderEmpty(){
		var alertDiv = $("<div>");
    	alertDiv.addClass("alert alert-info");
    	alertDiv.html("Welcome! No duties for " + moment().format('MM/DD/YYYY') + ". Please come back and check in later.");
    	$('#amduties-table').prepend(alertDiv);
	}

});