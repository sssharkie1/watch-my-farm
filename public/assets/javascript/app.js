
// Main 
// =============================================================

$( document ).ready(function() {

	//Get the initial list of animals from the database
    //-----------------------------------------------------
    getAnimals();
    
    //Add new Animal AJAX post
    //--------------------------------------------------------

    $('#addNewAnimal').on('click', function(event){

    	event.preventDefault();

    	var errors = [];
    	//clear the errors-div
    	$('#error-div').empty();

    	if($('#animal-type').val().trim() === ''){

    		errors.push('Animal Type field is required');

    	}
    	console.log(errors);

    	if(errors.length !== 0){
    		displayErrors(errors);
    		return;
    	}
    		
    	//Get the form elements
	    var newAnimal = {
    		animalType: $('#animal-type').val().trim(),
    		animalName: $('#animal-name').val().trim(),
    		animalBreed_Desc: $('#animal-breed').val().trim(),
    		location: $('#location').val().trim(),
    		AMFood: $('#am-food').val().trim(),
    		PMFood: $('#pm-food').val().trim(),
    		AMMeds: $('#am-meds').val().trim(),
    		PMMeds: $('#pm-meds').val().trim(),
    		AMNotes: $('#am-notes').val().trim(),
    		PMNotes: $('#pm-notes').val().trim()
    	};

    	console.log(newAnimal);

    	$.post("/api/animals", newAnimal, function(data) {

    		console.log(data);
    		if(data.valid){
    			window.location.href = "/barnyard";
    		}
      		else{
      			displayErrors(data.errors);
      		}
    	});
    	
    });


    // Functions
	// =============================================================
	
	function concatenateFields(field1, field2){
		if((field1) && (field2)){
			return (field1 +", " + field2);
		}
		else if((field1) && (!field2)){
			return field1;
		}
		else if((!field1) && (field2)){
			return field2;
		}
		else{
			return field1;
		}
	}

	function createAnimalRow(animalData){
		console.log(animalData);

		//Concatenate values of AMMeds and PMMeds if there are values for both
		meds = concatenateFields(animalData.AMMeds, animalData.PMMeds);
		notes = concatenateFields(animalData.AMNotes, animalData.PMNotes);

		var newTr = $('<tr>');
		newTr.append("<td>" + animalData.animalType + "</td>");
		newTr.append("<td>" + animalData.animalName + "</td>");
		newTr.append("<td>" + animalData.AMFood + "</td>");
		newTr.append("<td>" + animalData.PMFood + "</td>");
		newTr.append("<td>" + meds + "</td>");
		newTr.append("<td>" + notes + "</td>");
		newTr.append("<td><a style='cursor:pointer;color:red' class='btn btn-default edit-animal'>Edit</a></td>");

		return newTr;
	}

	function displayErrors(errors){
		console.log(errors);

		//Loop through errors and display them to user using bootstrap alerts
		var html = "";
		for(var i=0; i<errors.length; i++){
			html += "<div class = 'alert alert-danger'>" + errors[i].msg + "</div>"
		}
		console.log(html);
		$('#error-div').append(html);

	}

	function getAnimals(){
		$.get('/api/animals', function(data){
			console.log("Anumal data send back from server---");
			console.log(data);
			var arrAnimalsdata = [];
			for(var i=0; i<data.length; i++){
				arrAnimalsdata.push(createAnimalRow(data[i]));
			}
			renderAnimals(arrAnimalsdata);

		});
	}

	function renderAnimals(animalRows){
		$('tbody').children().remove();
		$('#animals-table').children('.alert').remove();
		if(animalRows.length){
			console.log(animalRows);
			$('tbody').append(animalRows);
		}
		else{
			renderEmpty();
		}

	}

	function renderEmpty(){
		var alertDiv = $("<div>");
    	alertDiv.addClass("alert alert-danger");
    	alertDiv.html("Welcome! Let's get started! Click the button below to add animals to your farm");
    	$('#animals-table').prepend(alertDiv);
	}

});