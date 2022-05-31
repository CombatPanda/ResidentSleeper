import { TextField } from "@mui/material";
import React, { Component } from "react";

var token = "";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
    onSubmit(e) {

        const newUser = {
            //email: this.refs.email.value,
          //password: this.refs.password.value
          email: this.state.email,
          password: this.state.password
        };
      console.log("Email: " + newUser.email + " pass: " + newUser.password);

        this.getUser(newUser);
        e.preventDefault();
  }

    getUser(newUser) {
        fetch("https://localhost:44326/api/Login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Password: newUser.password,
                Email: newUser.email
            })
        }).then(response => {
            console.log(response);

            if (response.ok) {
                document.cookie = response;
                this.props.history.push("/");
            } else {
                console.log(response.ok);
                alert("Failed to login, try signing up");
                this.props.history.push("/log-in");
            }
        });
    }


    render() {
        return (
            <form onSubmit={this.onSubmit} >
                <h3>Log In</h3>

                <TextField
                  sx={{ mt: 3 }}
                  value={this.state.email} onChange={(event, value) => this.setState({ email: event.target.value }) }
                  required
                  fullWidth
                  type="email"
                  name="email"
                  ref="email"
                  id="outlined-required"
                  label="Enter email"
                />

                <TextField
                  sx={{ mt: 3, mb: 3 }}
                  value={this.state.password} onChange={(event, value) => this.setState({ password: event.target.value })}
                  required
                  fullWidth
                  type="password"
                  name="password"
                  ref="password"
                  id="outlined-required"
                  label="Enter password"
                />

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                        />
                        <label className="custom-control-label" htmlFor="customCheck1">
                            Remember me
            </label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                    Submit
        </button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}