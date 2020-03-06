# google-signin-react

Login with Google (React Component)

## Installation
npm install google-signin-react

## Usage
import React, { Component } from 'react';
import GSignIn from 'google-signin-react';

class GoogleSignIn extends Component {
    constructor(props) {
        super(props);
    }

    successCallback(response) {
        console.log(response, "success");

    }

    failureCallback(response) {
        console.log(response, "failure");
    }

    render() {
        return (
            <div className="container">
                <GSignIn
                    clientID="<your_app_id>"
                    success={this.successCallback}
                    failure={this.failureCallback}
                />
            </div>
        );
    }
}

export default GoogleSignIn;

*Note:** Don't forget to replace <your_app_id> with your google app id.

#Component Parameters:-
1. appId - google app id
2. successCallback - will return user data in json format when user successfully login.
3. failureCallback - will return error when user won't login.
4. pass a custom classname as props to style your button
