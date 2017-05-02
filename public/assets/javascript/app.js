// Functions
// =============================================================
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

// Main 
// =============================================================

$( document ).ready(function() {
    
    //POST our form data to server

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


});