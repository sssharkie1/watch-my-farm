$( document ).ready(function() {

  var errors = [];
  var currDate = moment().format('MM/DD/YYYY');

	// Logic for from and to dates from jquery ui datepicker widget
    $( function() {
    var dateFormat = "mm/dd/yy",
      startDate = $( "#startDate" )
        .datepicker({
          defaultDate: "+1w"
          //changeMonth: true
        })
        .on( "change", function() {
          endDate.datepicker( "option", "minDate", getDate( this ) );
        }),
      endDate = $( "#endDate" ).datepicker({
        defaultDate: "+1w"
        //changeMonth: true
      })
      .on( "change", function() {
        startDate.datepicker( "option", "maxDate", getDate( this ) );
        
        console.log($('#endDate').val());
      });
 
    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
        
      } catch( error ) {
        date = null;
      }
 
      return date;
    }
  } );

    getMyTrips();

    function createTripRow(tripData){
      console.log(tripData);

      var tripDiv = $('<div class="bord-orange col-md-6 add-pad">');
      tripDiv.addClass("text-center");
      //tripDiv.append("<h1 class='back-orange no-top-marg'>MAGIC LINK</h1>");
      tripDiv.append("<p class='larger-text'>For dates:</p>");;
      tripDiv.append("<div class='dark-border'> <p>" + moment(tripData.startDate).format('MM/DD/YYYY') + " - " + moment(tripData.endDate).format('MM/DD/YYYY') + "</p></div>");
      tripDiv.append("<p class='larger-text'>Use Link:</p>");
      tripDiv.append("<div class='dark-border'> <a href =" + tripData.magicalLink + " target='_blank' class='dark-text-link'>" + tripData.magicalLink + "</a></div>");

      return tripDiv;
    }
    

    //AJAX get to get all trips corresponding to logged in user
    function getMyTrips(){

        $.get("/api/invite", function(data){
          console.log("Response from ajax /api/invite: ", data);

          var arrTrips = [];
          for(var i=0; i<data.length; i++){
            arrTrips.push(createTripRow(data[i]));
          }
          console.log('trip div before render: ' + arrTrips);
          renderTrips(arrTrips);
      });

    }

    function renderTrips(tripRows){
      $('#myTripsBody').children().remove();
      if(tripRows.length){
        console.log(tripRows);
        $('#myTripsBody').append(tripRows);
      }else{
        renderEmpty();
      }
    }

    function renderEmpty(){
      var alertDiv = $("<div>");
      alertDiv.addClass("alert alert-info");
      alertDiv.html("No trips scheduled yet");
      $('#myTripsBody').prepend(alertDiv);
    }


	//Schedule Trip - AJAX POST
    //--------------------------------------------------------

    $('#scheduleTrip').on('click', function(event){

      errors = [];
      $('#error-div').empty();

    	event.preventDefault();

    	var inStartDate = $('#startDate').val().trim();
    	var inEndDate = $('#endDate').val().trim();

    	var isValid = false;

    	console.log("Start date: " + inStartDate + "EndDate: " + inEndDate);

    	// Validate input date fields and checkif it's in given format
    	if(!(moment(inStartDate, 'MM/DD/YYYY', true).isValid()) && !(moment(inEndDate, 'MM/DD/YYYY', true).isValid())){
    		console.log("Both Start date and End date are invalid.");
        errors.push("Both Start date and End date are invalid.");
    	}
    	else if((moment(inStartDate, 'MM/DD/YYYY', true).isValid()) && !(moment(inEndDate, 'MM/DD/YYYY', true).isValid())){
    		console.log("Please enter end date in the correct format");
        errors.push("Please enter End date in the correct format");
    	}
    	else if(!(moment(inStartDate, 'MM/DD/YYYY', true).isValid()) && !(moment(inEndDate, 'MM/DD/YYYY', true).isValid())){
    		console.log("Please enter start date in the correct format");
        errors.push('Please enter start date in the correct format');
    	}
      else if(moment(inEndDate).isBefore(inStartDate)){
        errors.push('Start date should be before the End date');
      }
      else if((moment(inStartDate).isBefore(currDate)) || (moment(inEndDate).isBefore(currDate))){
        errors.push('Start date or End date cannot be before today.');
      }
    	else{
    		//If both dates are valid, check if EndDate is greater than start date
    		if(moment(inEndDate).isSameOrAfter(inStartDate)){
    			console.log("Startdate is before end date");
    			isValid = true;
    		}

    	}

      if(errors.length !== 0){
        displayErrors(errors);
        return;
      }else{

      }

    	console.log("isValid: " + isValid);

    	if(isValid = true){

    		//Make an AJAX POST request to write to DB
    		var newSchedule = {
    			startDate: inStartDate,
    			endDate: inEndDate
    		}

        $.post("/api/invite", newSchedule, function(data) {

          console.log(data);
          if(data.valid){
            //window.location.href = "/schedule";
            //send ajax request to api/invite to get all the recent trip details
            //clear the start date and enddate fields
            $("#startDate").val('');
            $("#endDate").val('');
            console.log("Inside the post req, after clearing fields");
            getMyTrips();
          }
          else{
            displayErrors(data.errors);
          }
        });

    	}


    });

    function displayErrors(errors){
      console.log(errors);

      //Loop through errors and display them to user using bootstrap alerts
      var html = "";
      for(var i=0; i<errors.length; i++){
        html += "<div class = 'alert alert-danger'>" + errors[i] + "</div>"
      }
      console.log(html);
      $('#error-div').append(html);

    }

});