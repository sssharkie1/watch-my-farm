$( document ).ready(function() {

	// Logic for from and to dates from jquery ui datepicker widget
    $( function() {
    var dateFormat = "mm/dd/yy",
      startDate = $( "#startDate" )
        .datepicker({
          defaultDate: "+1w",
          changeMonth: true
        })
        .on( "change", function() {
          endDate.datepicker( "option", "minDate", getDate( this ) );
        }),
      endDate = $( "#endDate" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true
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

    getAllInvites();

    //AJAX get to get all invites corresponding to logged in user
    function getAllInvites(){

    }


	//Schedule Trip - AJAX POST
    //--------------------------------------------------------

    $('#scheduleTrip').on('click', function(event){

    	event.preventDefault();

    	var inStartDate = $('#startDate').val().trim();
    	var inEndDate = $('#endDate').val().trim();

    	var isValid = false;

    	console.log("Start date: " + inStartDate + "EndDate: " + inEndDate);

    	// Validate input date fields and checkif it's in given format
    	if(!(moment(inStartDate, 'MM/DD/YYYY', true).isValid()) && !(moment(inEndDate, 'MM/DD/YYYY', true).isValid())){
    		console.log("Both start date and end date are invalid.");
    	}
    	else if((moment(inStartDate, 'MM/DD/YYYY', true).isValid()) && !(moment(inEndDate, 'MM/DD/YYYY', true).isValid())){
    		console.log("Please enter end date in the correct format");
    	}
    	else if(!(moment(inStartDate, 'MM/DD/YYYY', true).isValid()) && !(moment(inEndDate, 'MM/DD/YYYY', true).isValid())){
    		console.log("Please enter start date in the correct format");
    	}
    	else{
    		//If both dates are valid, check if EndDate is greater than start date
    		if(moment(inEndDate).isSameOrAfter(inStartDate)){
    			console.log("Startdate is before end date");
    			isValid = true;
    		}

    	}

    	console.log("isValid: " + isValid);

    	if(isValid = true){

    		//Make an AJAX request to write to DB
    		var newSchedule = {
    			startDate: inStartDate,
    			endDate: inEndDate
    		}

    	}


    });

});