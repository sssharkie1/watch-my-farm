var React = require("react");

// Create the Header component
// Notice how the header uses React.createClass
// Notice how it uses a render function which specifies what will be displayed by the component
var Footer = React.createClass({
  render: function() {
    return (
    	<div>
     <a href="https://github.com/sssharkie1/watch-my-farm" className="hover-dark bord-right">GITHUB</a>
				<a href="about.html" className="hover-dark">ABOUT US </a>
				<p id="copyright" className="light-text larger-text"> © WATCH MY FARM 2017</p>
		</div>
    );
  }
});

// Export the component back for use in other files
module.exports = Footer;