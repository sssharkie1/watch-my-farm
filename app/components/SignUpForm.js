import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import {FormGroup, FormControl, ControlLabel, Button, HelpBlock} from 'react-bootstrap';

const SignUpForm = React.createClass({
	getInitialState() {
		return {
			useremail: '',
			password: '',
			emailError: '',
			pwdError: ''
		};
	},

	getEmailValidationState() {
		let length = this.state.useremail.length;
		if (length > 10) return 'success';
		else if (length > 5) return 'warning';
		else if (length > 0) return 'error';

	},

	getPwdValidationState() {
		let message = '';
		let length = this.state.password.length;
		if (length > 10) {
			this.setState({pwdError: message});
			return 'success';
		}
		else if (length > 4){
			this.setState({pwdError: message});
			 return 'warning';
			}
		else if (length > 0){
			message = "Short passwords are easy to guess. Try one with atleast 6 characters."
			this.setState({pwdError: message});

			 return 'error';
			}

	},

	handleEmailChange(e) {
		this.setState({ useremail: e.target.value });
	},

	handlePwdChange(e) {
		this.setState({ password: e.target.value });
	},

	render() {
		return (
			<form className = 'signup-form'>

			<FormGroup
			controlId="Email"
			validationState={this.getEmailValidationState()}
			>
			<ControlLabel>Email</ControlLabel>
			<FormControl
			type="email"
			componentClass = "input"
			id = 'useremail'
			className = 'form-control'
			value={this.state.useremail}
			placeholder="johndoe@example.com"
			onChange={this.handleEmailChange}
			required = {true}
			/>
			<FormControl.Feedback />
			<HelpBlock>{this.state.emailError}</HelpBlock>
			</FormGroup>

			<FormGroup
			controlId="Password"
			validationState={this.getPwdValidationState()}
			>
			<ControlLabel>Password</ControlLabel>
			<FormControl
			type="password"
			componentClass = 'input'
			className = 'form-control'
			id = 'password'
			value={this.state.password}
			placeholder="Password"
			onChange={this.handlePwdChange}
			required = {true}
			/>
			<FormControl.Feedback />
			<HelpBlock>{this.state.pwdError}</HelpBlock>
			</FormGroup>


			</form>
			);
	}
});

module.exports = SignUpForm;


