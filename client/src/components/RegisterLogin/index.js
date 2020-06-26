import React, { Component } from 'react';
import {connect} from "react-redux";
import {loginUser} from "../../actions/user_actions";
import {Link} from "react-router-dom";

class RegisterLogin extends Component {
    state = {
        email: "",
        password: "",
        errors: []
    };

    displayErrors = errors => 
        errors.map((error, i) => <p key={i}>{error}</p>)
    

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    submitForm = event => {
        event.preventDefault();

        let dataToSubmit = {
            email: this.state.email,
            password: this.state.password
        };

        if(this.isFormValid(this.state)){
            this.setState({errors: []})
                this.props.dispatch(loginUser(dataToSubmit))
                    .then(response => {
                        if(response.payload.loginSuccess){
                            this.props.history.push("/");
                        }else{
                            this.setState({
                                errors: this.state.errors.concat(
                                    "Failed to log in, check your Email and Password"
                                )
                            })
                        }
                    });
        }else{
            this.setState({
                errors: this.state.errors.concat("Form is not valid")
            });
        }
    };

    isFormValid = ({email, password}) => email && password;

    

    render() {
        return (
            <div className="container">
                <h1>Log In</h1>
                <div className="row">
                    <form className="col s12">
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
                                    LOG IN
                                </button>
                                <Link to="/register">
                                    <button 
                                        className="btn waves-effect red lighten-2"
                                        type="submit"
                                        name="action"
                                    >
                                        SIGN UP
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>


            // <div className="container">
            //     <form>
            //         <div className="form-group">
            //             <label htmlFor="exampleInputEmail1">Email address</label>
            //             <input 
            //                 name="email"
            //                 // value={this.state.email}
            //                 // onChange={e => this.handleChange(e)}
            //                 id="email"
            //                 type="email"
            //                 className="validate"
            //                 placeholder="email"
            //             />
            //             <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            //         </div>
            //         <div className="form-group">
            //             <label htmlFor="exampleInputPassword1">Password</label>
            //             <input 
            //                 name="password"
            //                 // value={this.state.password}
            //                 // onChange={e => this.handleChange(e)}
            //                 id="password"
            //                 type="password"
            //                 className="validate"
            //                 placeholder="password"
            //             />
            //         </div>
            //         <button 
            //             className="btn btn-primary"
            //             type="submit"
            //             name="action"
            //             onClick={this.submitForm}
            //         >
            //             Submit
            //         </button>
            //     </form>
            // </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(RegisterLogin);