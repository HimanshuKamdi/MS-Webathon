import React from 'react';
import { useCookies } from 'react-cookie';

function Login(props) {

	const [cookies, setCookie, removeCookie] = useCookies(['user']);

	const sendUserData = async (event) => {
		event.preventDefault();

		const user = {
			"first_name": event.target.firstName.value,
			"last_name": event.target.lastName.value,
			"email": event.target.email.value,
			"password": event.target.passw.value,
		}

		const response = await fetch("http://localhost:8000/users/new/", {
			method: "POST",
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify(user)
		})
		const data = await response.json()
		console.log(data)

	}

	const loginUser = async (event) => {
		event.preventDefault();

		const user = {
			"email": event.target.email.value,
			"password": event.target.passw.value,
		}

		const response = await fetch("http://localhost:8000/users/login/", {
			method: "POST",
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify(user)
		})
		const data = await response.json()
		console.log(data)
		setCookie('user', data, { path: '/' });

	}

	const [authType, setauthType] = React.useState('user');

	const handleChange = (event) => {
	  setauthType(event.target.value);
	}

	return (props.trigger) ? (
		<div className="login">
			<form className="login-body" onSubmit={loginUser}>
				<div className="input-section">
					{/* <i className="fas fa-user"></i> */}
					<input type="email" name="email" id="email" placeholder="Email*" required="true" value={props.email} onChange={(e) => props.setEmail(e.target.value)} />
				</div>
				<div className="input-section">
					{/* <i className="fas fa-lock"></i> */}
					<input type="password" name="passw" id="passw" placeholder="Password*" required="true" value={props.passw} onChange={(e) => props.setPassw(e.target.value)} />
				</div>
				<p id="forgot-password">Forgot your password?</p>
				<button className="btn" id="btn-login">Login</button>
			</form>
		</div>


	) : (
		<div className="login">
			<form className="register-body" onSubmit={sendUserData}>
				<div className="input-section">
					<select value={authType} onChange={handleChange}>
						<option value="volvo">User</option>
						<option value="saab">Innovation Champion</option>
						<option value="mercedes">Admin</option>
					</select>
				</div>
				<div className="input-section">
					{/* <i className="fas fa-envelope"></i> */}
					<input type="text" name="firstName" id="firstName" placeholder="First Name*" required="true" value={props.firstName} onChange={(e) => props.setfirstName(e.target.value)} />
				</div>
				<div className="input-section">
					{/* <i className="fas fa-envelope"></i> */}
					<input type="text" name="lastName" id="lastName" placeholder="Last Name*" required="true" value={props.lastName} onChange={(e) => props.setlastName(e.target.value)} />
				</div>
				<div className="input-section">
					{/* <i className="fas fa-envelope"></i> */}
					<input type="email" name="email" id="email" placeholder="Email*" required="true" value={props.email} onChange={(e) => props.setEmail(e.target.value)} />
				</div>
				<div className="input-section">
					{/* <i className="fas fa-lock"></i> */}
					<input type="password" name="passw" id="passw" placeholder="Password*" required="true" value={props.passw} onChange={(e) => props.setPassw(e.target.value)} />
				</div>
				<p id="registered" onClick={() => props.setTrigger(true)}>Already registered?</p>
				<button className="btn btn-action" id="btn-register">Register</button>
			</form>
		</div>
	)

}
export default Login;