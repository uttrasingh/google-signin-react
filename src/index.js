import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class GSignIn extends Component {
    constructor(props) {
        super(props)

        this.onLoad = this.onLoad.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    async componentDidMount() {
        await this.loadScript();
        window.addEventListener("load", this.onLoad);
    }

    loadScript() {
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://apis.google.com/js/platform.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'google-jssdk'));
    }

    onLoad() {
        window.gapi.load('auth2', () => {
            this.auth2 = window.gapi.auth2.init({
                client_id: this.props.clientID,
                cookiepolicy: 'single_host_origin',
                scope: 'profile email https://www.googleapis.com/auth/user.birthday.read'
            });
        });
    }

    onSignIn() {
        var auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signIn().then(
            response => {
                // let profile = auth2.currentUser.get();
                this.props.success(response);
            },
            error => this.props.failure(error)    
        );
    }


    signOut() {
        this.auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }

    render() {
        const {className} = this.props;

        let customClass = "wrapper";
        if(className) customClass += " " + className

        return (
            <div className ={customClass}>
                <div className = "custom-btn" onClick={this.onSignIn}>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48" className="abcRioButtonSvg"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
                    <span className="buttonText">Google</span>
                </div>
                <button onClick={this.signOut}>Sign out</button>
            </div>
        );
    }
}

GSignIn.propTypes = {
    clientID: PropTypes.string.isRequired,
    success: PropTypes.func.isRequired,
    failure: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default GSignIn;
