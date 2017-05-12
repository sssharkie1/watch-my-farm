
// Main 
// =============================================================



// REACT STUFF --------------------------------
var React = require("react");
var ReactDOM = require("react-dom");

var Header = require("./components/Header");

ReactDOM.render(<Header />, document.getElementById("logo"));

var Footer = require("./components/Footer");

ReactDOM.render(<Footer />, document.getElementById("footer-here"));

var Navbar = require("./components/Navbar");

ReactDOM.render(<Navbar />, document.getElementById("navbar-here"));