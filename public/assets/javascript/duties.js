$( document ).ready(function() {

	//Look for a query param in the URL
	var url = window.location.search;
	var duties;
	var tokenId;
	var farmId;

	var token;

	if(url.indexOf("?token=") !== -1){
		token = url.split("=")[1];
		getDuties(token);
	}

	function createTaskRow(tasks){
		console.log(tasks);
		var newTr = $("<tr>");
	    newTr.data("farm", tasks.farmId);
	    newTr.append("<td>" + tasks.food + "</td>");
	    newTr.append("<td>" + tasks.meds + "</td>");
	    newTr.append("<td>" + tasks.notes + "</td>");
	    newTr.append("<td><form><input type='checkbox' class='completeTask' data-taskid = " + tasks.id + "></form></td>");

	    return newTr;

	}

	function getDuties(token){
		tokenId = token || '';
		if(tokenId){
			tokenId = "/?token_id=" + tokenId;
		}
		$.get("/api/duties" + tokenId, function(data){
			console.log("Response from ajax /api/duties: ", data);

			//If valid, get tasks for the day
			//Else, render empty

			if(data.isValid){	
				getTasksForToday(data.farmId);
			}else{
				renderEmpty(data.message);
			}
			
		})
	}

	function getTasksForToday(farmid){
		farmId = farmid || '';
		if(farmId){
			farmId = "/?farm_id=" + farmId;
		}
		$.get("/api/tasks" + farmId, function(data){
			console.log("Response from ajax /api/tasks: ", data);
			initializeRows(data);
		});
	}

	function initializeRows(duties){
		var amDutiesRows = [];
		var pmDutiesRows = [];
		for(var i=0; i<duties.length; i++){
			if(duties[i].timeOfDay === 'AM'){
				amDutiesRows.push(createTaskRow(duties[i]));
			}else{
				pmDutiesRows.push(createTaskRow(duties[i]));
			}
		}
		$('tbody').children().remove();
		renderDuties(amDutiesRows, "AM");
		renderDuties(pmDutiesRows, "PM");
	}

	function renderDuties(rows, timeOfDay){
		$('#amduties-table').children('alert').remove();
		if(rows.length && (timeOfDay === 'AM')){
			console.log(rows);
			$('#amduties-table').children('tbody').prepend(rows);
		}
		else if(rows.length && (timeOfDay === 'PM')){
			console.log(rows);
			$('#pmduties-table').children('tbody').prepend(rows);
		}
	}


	function renderEmpty(msg){
		var alertDiv = $("<div>");
    	alertDiv.addClass("alert alert-info");
    	alertDiv.html(msg);
    	$('#amduties-table').prepend(alertDiv);
	}

	$(document).on('change', ':checkbox', function(){
		if($(this).is(':checked')){
			console.log($(this).val() + ' is now checked');
    	} else {
        	console.log($(this).val() + ' is now unchecked');
    	}
	})

});