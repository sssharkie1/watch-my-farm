
// Main 
// =============================================================

$( document ).ready(function() {

	//Variables
	//----------------------------------------------------
	var animalID;
	var updating = false;
	var farmInfo;

	//Get the initial list of animals from the database
    //-----------------------------------------------------
    getAnimals();

     //Get Farm Information 
  	getFarmInfo();

    //Check if Modal was triggered by Add/Edit click
    $('#addAnimal').on('show.bs.modal', function (event) {

    	//Check if button has a data sttribute that stores animalid, if it does it means that it was triggered by the edit button
 		var button = $(event.relatedTarget) // Button that triggered the modal
  		var animalId = button.data('animalid'); // Extract info from data-* attributes

  		if(animalId){
  			//assign to global variable "animalID" and set updating to true
  			animalID = animalId;
  			updating = true;

  			var modal = $(this);
  			modal.find('.modal-title').text('Edit Animal');

  			//Get animal data for the animalID and prepopulate the modal fields
  			$.get('/api/animals/' + animalId, function(data){
				console.log("Animal data send back from server for ID---" + animalId);
				
			}).done(function(animalData){
				console.log(animalData);

  				modal.find('#animal-type').val(animalData[0].animalType).attr("disabled", true);
  				modal.find('#animal-name').val(animalData[0].animalName);
  				modal.find('#animal-breed').val(animalData[0].animalBreed_Desc);
  				modal.find('#location').val(animalData[0].location);
  				modal.find('#am-food').val(animalData[0].AMFood);
  				modal.find('#pm-food').val(animalData[0].PMFood);
  				modal.find('#am-meds').val(animalData[0].AMMeds);
  				modal.find('#pm-meds').val(animalData[0].PMMeds);
  				modal.find('#am-notes').val(animalData[0].AMNotes);
  				modal.find('#pm-notes').val(animalData[0].PMNotes);
  				
			});
  			

  		}
	});
    
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

    	console.log("Are we updating? " + updating)

    	if(updating){
    		newAnimal.id = animalID;
    		updateAnimal(newAnimal);
    	}else{
    		createAnimal(newAnimal);
    	}
    	
    });

    //Edit farm Info AJAX PUT 
    //--------------------------------------------------------------
    $('#editFarmInfo').on('click', function(event){

    	console.log("edit farm info button clicked");
    	//Show modal with populated farm Information
    	


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

	function createAnimal(newAnimal){

		$.post("/api/animals", newAnimal, function(data) {

    		console.log(data);
    		if(data.valid){
    			window.location.href = "/barnyard";
    		}
      		else{
      			displayErrors(data.errors);
      		}
    	});
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
		newTr.append("<td><a style='cursor:pointer;color:red' class='btn btn-default edit-animal' data-toggle='modal' data-target='#addAnimal' data-animalid =" + animalData.id + ">Edit</a></td>");

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

	// Function for retrieving farm Information to be rendered to the page
  	function getFarmInfo() {
	    $.get("/api/farm", function(data) {
	    	console.log("Farm info from server---");
	    	console.log(data);
	    	farmInfo = data[0];
	    	
	      $('#farmTitle span').text(farmInfo.farmName);
	      $('#address-fld').text(farmInfo.address);
	      $('#email-fld').text(farmInfo.user_email);
	      $('#homePhone-fld').text(farmInfo.homePhone);
	      $('#cellPhone-fld').text(farmInfo.cellPhone);
	      $('#emergencyName-fld').text(farmInfo.emergencyName);
	      $('#emergencyNumber-fld').text(farmInfo.emergencyNumber);
	      $('#vetName-fld').text(farmInfo.vetName);
	      $('#vetNumber-fld').text(farmInfo.vetNumber);
	      $('#farmNotes-fld').text(farmInfo.Notes);

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

	function updateAnimal(animal){
		$.ajax({
      		method: "PUT",
      		url: "/api/animals",
      		data: animal
    	})
    	.done(function() {
      		window.location.href = "/barnyard";
    	});
	}

});