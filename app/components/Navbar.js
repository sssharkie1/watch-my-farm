var React = require("react");

// Create the Header component
// Notice how the header uses React.createClass
// Notice how it uses a render function which specifies what will be displayed by the component
var Navbar = React.createClass({
  render: function() {
    return (
    	<div>
    	<div className="col-sm-2 col-sm-offset-1 back-orange">
				<ul className="text-center">
					<li> <h3> <a className="sid-nav-link" href="/barnyard"><i className="fa fa-paw fa-2x" aria-hidden="true"></i><br /> BARNYARD </a> </h3> </li>
					<li> <h3> <a className="sid-nav-link" href="/farminfo"><i className="fa fa-home fa-2x" aria-hidden="true"></i><br /> MY FARM </a> </h3> </li>
					<li> <h3> <a className="sid-nav-link" href="/schedule"><i className="fa fa-calendar fa-2x" aria-hidden="true"></i><br /> SCHEDULE </a> </h3> </li>
					<li> <h3> <a className="sid-nav-link" href="https://www.paypal.com/" target="_blank"><i className="fa fa-usd fa-2x" aria-hidden="true"></i><br /> PAYMENT </a> </h3> </li>
				</ul>
			</div>
		</div>
    );
  }
});

// Export the component back for use in other files
module.exports = Navbar;