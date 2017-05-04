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


	//Schedule Trip - AJAX POST
    //--------------------------------------------------------

    $('#scheduleTrip').on('click', function(event){

    	event.preventDefault();

    	var inStartDate = $('#startDate').val().trim();
    	var inEndDate = $('#endDate').val().trim();

    	// Validate input date fields and checkif it's in given format
    	if(!(moment(inStartDate, 'MM-DD-YYYY', true).isValid()) && !(moment(inStartDate, 'MM-DD-YYYY', true).isValid())){
    		
    	}


    });

});