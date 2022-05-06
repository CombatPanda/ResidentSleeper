import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';

class AddUser extends Component {

    onSubmit(e) {
        const newUser = {
            Username: (this.Username.value == ""), //? null : this.Username.value,
            Password: (this.Password.value == ""), //? null : this.Password.value,     
            Email: (this.Email.value == "") //? null : this.Email.value,
        }
        this.addUser(newUser);
        e.preventDefault();
    }

    addUser(newUser) {
        fetch('https://localhost:5001/api/User', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Username: newUser.Username,
                Password: newUser.Password,
                Email: newUser.Email
            })
        }).then(response => {
            this.props.history.push('/log-in')
        })
    }

}
export default AddUser;