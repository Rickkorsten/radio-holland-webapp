import auth0 from 'auth0-js';

class Auth {
    constructor() {
        this.auth0 = new auth0.WebAuth({
            // the following three lines MUST be updated
            audience: 'https://radio-holland.eu.auth0.com/userinfo',
            clientID: '3biSVSAdSmUDP1525wk3g564ONkSeAte', 
            domain: 'radio-holland.eu.auth0.com',
            redirectUri: 'http://localhost:3000/callback',
            responseType: 'token id_token',
            scope: 'openid profile'
        });

        this.getProfile = this.getProfile.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    getProfile() {
        return this.profile;
    }

    getIdToken() {
        return this.idToken;
    }

    handleAuthentication() {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (err) {return reject(err)};
                if (!authResult || !authResult.idToken) {
                    return reject(err);
                }
                this.idToken = authResult.idToken;
                this.profile = authResult.idTokenPayload;
                // set the time that the id token will expire at
                this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
                resolve();
            });
        })
    }

    isAuthenticated() {
        return new Date().getTime() < this.expiresAt;
    }

    signIn() {
        this.auth0.authorize();
    }

    signOut() {
        // clear id token, profile, and expiration
        this.idToken = null;
        this.profile = null;
        this.expiresAt = null;
    }
}

const auth0Client = new Auth();

export default auth0Client;
