import React, { Component } from 'react';
import {connect} from "react-redux";
import {registerUser} from "../../actions/user_actions";

 class Register extends Component {
    state = {
        name: "",
        lastname: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        errors: []
    };

    displayErrors = errors => 
        errors.map((error, i) => <p key={i}>{error}</p>)
    

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    isFormValid = () =>{
        let errors = [];
        let error;

        if(this.isFormEmpty(this.state)){
            error = {message: "Fill in all fields"};
            this.setState({errors: errors.concat(error)});
        }else if(!this.isPasswordValid(this.state)){
            error = {message: "Password is invalid"};
            this.setState({errors: errors.concat(error)});
        }else{
            return true;
        }
    }

    isPasswordValid = ({password, passwordConfirmation}) => {
        if(password.length < 8 || passwordConfirmation.length < 8){
            return false;
        }else if(password !== passwordConfirmation){
            return false;
        }else{
            return true;
        }
    }

    isFormEmpty = ({name, lastname, email, password, passwordConfirmation}) => {
        return (
            !name.length ||
            !lastname.length ||
            !email.length ||
            !password.length ||
            !passwordConfirmation.length
        );
    }

    submitForm = event => {
        event.preventDefault();
        
        let dataToSubmit = {
            email: this.state.email,
            name: this.state.name,
            lastname: this.state.lastname,
            password: this.state.password,
            passwordConfirmation: this.state.passwordConfirmation
        }

        if(this.isFormValid(this.state)){
            this.setState({errors: []})
                this.props.dispatch(registerUser(dataToSubmit))
                    .then(response => {
                        if(response.payload.success){
                            this.props.history.push("/login");
                        }else{
                            this.setState({
                                errors: this.state.errors.concat("Your attemp to send data to DB failed")
                            })
                        }
                    })
                    .catch(err => {
                        this.setState({
                            errors: this.state.errors.concat(err)
                        })
                    })
        }else{
            console.error("Form is not valid");
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Sign Up</h1>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input 
                                    name="name"
                                    value={this.state.name}
                                    onChange={e => this.handleChange(e)}
                                    id="name"
                                    type="text"
                                    className="validate"
                                    // placeholder="First Name"
                                />
                                <label className="active" htmlFor="password">First Name</label>
                                <span
                                    className="helper-text"
                                    data-error="Type a right type email"
                                    data-success="right"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <input 
                                    name="lastname"
                                    value={this.state.lastname}
                                    onChange={e => this.handleChange(e)}
                                    id="lastname"
                                    type="text"
                                    className="validate"
                                    // placeholder="Last Name"
                                />
                                <label className="active" htmlFor="email">Last Name</label>
                                <span
                                    className="helper-text"
                                    data-error="Type a right type email"
                                    data-success="right"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <input 
                                    name="email"
                                    value={this.state.email}
                                    onChange={e => this.handleChange(e)}
                                    id="email"
                                    type="email"
                                    className="validate"
                                    // placeholder="Email"
                                />
                                <label className="active" htmlFor="email">Email</label>
                                <span
                                    className="helper-text"
                                    data-error="Type a right type email"
                                    data-success="right"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <input 
                                    name="password"
                                    value={this.state.password}
                                    onChange={e => this.handleChange(e)}
                                    id="password"
                                    type="password"
                                    className="validate"
                                    // placeholder="Password"
                                />
                                <label className="active" htmlFor="password">Password</label>
                                <span
                                    className="helper-text"
                                    data-error="Type a right type email"
                                    data-success="right"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <input 
                                    name="passwordConfirmation"
                                    value={this.state.passwordConfirmation}
                                    onChange={e => this.handleChange(e)}
                                    id="passwordConfirmation"
                                    type="password"
                                    className="validate"
                                    // placeholder="Confirm Password"
                                />
                                <label className="active" htmlFor="password">Confirm Password</label>
                                <span
                                    className="helper-text"
                                    data-error="Type a right type email"
                                    data-success="right"
                                />
                            </div>
                        </div>


                        {this.state.errors.length > 0 && (
                            <div>
                                {this.displayErrors(this.state.errors)}
                            </div>
                        )}


                        <div className="row">
                            <div className="col s12">
                                <button 
                                    className="btn waves-effect red lighten-2"
                                    type="submit"
                                    name="action"
                                    onClick={this.submitForm}
                                >
                                    Create An Account
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


export default connect()(Register);