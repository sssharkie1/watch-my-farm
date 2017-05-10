$( document ).ready(function() {

	//Look for a query param in the URL
	var url = window.location.search;
	var duties;
	var tokenId;
	var farmId;

	/*var token = 'H1N68LAJb';
	getDuties(token);*/

	if(url.indexOf("?token=") !== -1){
		token = url.split("=")[1];
		getDuties(token);
		
	}

	function createTaskRow(tasks){
		console.log(tasks);
		var newTr = $("<tr>");
	    newTr.data("farm", tasks.farmId);
	    newTr.append("<td class='text-center'>" + tasks.animal.animalType + "</td>");
	    newTr.append("<td class='text-center'>" + tasks.animal.animalName + "</td>");
	    newTr.append("<td class='text-center'>" + tasks.food + "</td>");
	    newTr.append("<td class='text-center'>" + tasks.meds + "</td>");
	    newTr.append("<td class='text-center'>" + tasks.notes + "</td>");

	    //Update check box
	    if(tasks.complete){
	    	console.log("inside tasks complete " + tasks.complete);
	    	newTr.append("<td class='text-center'><form><input type='checkbox' class='completeTask' data-taskid = " + tasks.id + " value=" + tasks.id + " id = check-" + tasks.id + " checked></form></td>");

	    }else{
	    	console.log("inside tasks complete " + tasks.complete);
	    	newTr.append("<td class='text-center'><form><input type='checkbox' class='completeTask' data-taskid = " + tasks.id + " value=" + tasks.id + " id = check-" + tasks.id + "></form></td>");
	   
	    }


	    return newTr;

	}

	function getFarmInfo(farmId){

		var queryURL = "/api/farminfo/" + farmId;

		$.get(queryURL, function(data){
			console.log("Response from ajax /api/farmInfo: ", data);

			if(data){	
				var farmInfoDiv = 	$('<div>');
				farmInfoDiv.addClass('text-center');
				farmInfoDiv.append("<p>" + data[0].first_name + " " + data[0].last_name + "</p>");
				farmInfoDiv.append("<p> Cell Phone: " + data[0].cellPhone + "</p>");
				farmInfoDiv.append("<p> Email: " + data[0].user_email + "</p>");
				farmInfoDiv.append("<p> Emergency Contact Name: " + data[0].emergencyName + "</p>");
				farmInfoDiv.append("<p> Emergency Contact Number: " + data[0].emergencyNumber + "</p>");
				farmInfoDiv.append("<p> Veterinarian Name: " + data[0].vetName + "</p>");
				farmInfoDiv.append("<p> Veterinarian Number: " + data[0].vetNumber + "</p>");
				$('#emergency-info').prepend(farmInfoDiv);

			}
			
		});
		
	}

	function getDuties(token){
		tokenId = token || '';
		if(tokenId){
			/*tokenId = "/?token_id=" + tokenId;*/
			tokenId = "/" + tokenId;
		}
		$.get("/api/duties" + tokenId, function(data){
			console.log("Response from ajax /api/duties: ", data);

			//If valid, get tasks for the day
			//Else, render empty

			if(data.isValid){	
				getTasksForToday(data.farmId);
				getFarmInfo(data.farmId); //get farm Info only if the token is valid
			}else{
				renderEmpty(data.message);
			}
			
		});
	}

	function getTasksForToday(farmid){
		farmId = farmid || '';
		if(farmId){
			farmId = "/" + farmId;
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
		$('#AM-duties-list').children('alert').remove();
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
    	$('#AM-duties-list').prepend(alertDiv);
	}

	function updateTask(task_Id, complete){
		$.ajax({
      		method: "PUT",
      		url: "/api/tasks",
      		data: {id: task_Id, complete: complete}
    	})
    	.done(function(affectedRows) {
    		console.log("Inside updated task " + affectedRows);
    		//promise returns an array with number of rows affected as first element

    		if(affectedRows[0] !== 1){
    			window.location.href = "/duties"; //have to load page with the token url or the magic link
    		}

      		
    	});

	}

	$(document).on('change', ':checkbox', function(){
		var task_Id = $(this).val();
		var complete = false;
		if($(this).is(':checked')){
			console.log($(this).val() + ' is now checked');
			complete = true;
			updateTask(task_Id, complete);
    	} else {
        	console.log($(this).val() + ' is now unchecked');
        	updateTask(task_Id, complete);
    	}
	});

});