import React, { Component } from 'react';
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBe7l6gSLWEOhjzfM1Sxuu0YNa9tHafVDE",
    authDomain: "login-react-3a06a.firebaseapp.com",
    databaseURL: "https://login-react-3a06a.firebaseio.com",
    projectId: "login-react-3a06a",
    storageBucket: "login-react-3a06a.appspot.com",
    messagingSenderId: "131047625343"
  };
  firebase.initializeApp(config);





export default class Authen extends Component {

	// login function
	login(event){
		// capture email from "email input"
		// capture pw from "pw input"
		const email = this.refs.email.value
		const pw = this.refs.pw.value

		// firebase function
		const auth = firebase.auth()
		const promise = auth.signInWithEmailAndPassword(email, pw)

		// todo: handle login promise
		promise.then(user => {
			// hide "logout" button
			var lout = document.getElementById('logout')
			lout.classList.remove('hide')

			var error = 'Welcome back ' + email
			this.setState({error:error})
		})



		promise.catch(e=> {
			var error = e.message
			console.log(error)
			this.setState({error:error})
		})
	}
	
	// sign up function
	signup(event){
		// capture email from "email input"
		// capture pw from "pw input"
		const email = this.refs.email.value
		const pw = this.refs.pw.value
		const auth =firebase.auth()

		const promise = auth.createUserWithEmailAndPassword(email, pw)
		
		promise
		.then(user => {
			var error = "Welcome " + user.email
			firebase.database().ref('users/' + user.uid).set({
				email:user.email
			})
			console.log(user)
			this.setState({error:error})
		})
		promise
		.catch(e => {
			var error = e.message
			console.log(error)
			this.setState({error:error})
		})
	}


	logout(){
		firebase.auth().signOut();
		var lout = document.getElementById('logout')
		lout.classList.add('hide')
	}

	constructor(props){
		super(props);

		this.state = {
			error:''
		};
		// bind the function and onClick
		this.login = this.login.bind(this);
		this.signup = this.signup.bind(this);
		this.logout = this.logout.bind(this);
	}


	render() {
		return (
			<div>
				<input id="email" type="email" placeholder="enter you email" ref="email"/>
				<br/>
				<input id="pw" type="password" placeholder="enter you password" ref="pw"/>
				<br/>
				<p>{this.state.error}</p>
				<button onClick={this.login}>Log In</button>
				<button onClick={this.signup}>Sign Up</button>
				<button onClick={this.logout} id="logout" className="hide">Log Out</button>

			</div>
		);
	}
}
