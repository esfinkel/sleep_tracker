import React, {useState, useEffect} from 'react';
import 'firebase/auth';
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
const firebaseConfig = require('./firebase-config.json');

firebase.initializeApp(firebaseConfig);

export default ({children, callback}) => {
    const [user, setUser] = useState(null);

    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
    };

    const onAuthStateChange = () => {
        return firebase.auth().onAuthStateChanged(user => {
            setUser(user);
            callback(user&&user.uid ? user.uid : "");
        })
    };
    useEffect(() => onAuthStateChange(), []);
    return (
        <div>
            {/* un-authenticated things can go here */}
            {user && children}
            {!user && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />}
            <br />
            {user && <button onClick={() => firebase.auth().signOut()}>Sign out</button>} {<button onClick={() => window.location.reload(false)} >Refresh</button>}
            <br />
            <br />
        </div>
    )
}

