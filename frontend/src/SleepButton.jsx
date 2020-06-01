import React from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';


export default ({uid, setSleeping, sleeping, fetch}) => {
    const url = "https://morning-waters-80542.herokuapp.com";
        
    const changeSleepStatus = () => {
        const currTime = new Date();
        if (sleeping===false) {
            axios.post(`${url}/sleeps/start`, {uid, currTime})
                .then(
                    // r => console.log('sleeping!')
                )
                .catch (e => console.log(`error: ${e}`));
            } else {
                axios.post(`${url}/sleeps/end`, {uid, currTime})
                .then(
                    // r => console.log('not sleeping!')
                )
                .then(setTimeout(() => fetch(), 1000)) // takes several milliseconds for Firebase data to update
                .catch (e => console.error(`error: ${e}`));
        }
        setSleeping(!sleeping);
    };

    return (
        <div>
            <Button color={sleeping ? "success" : "secondary"} onClick={changeSleepStatus}>
                {sleeping ? "wake up" : "start sleeping"} 
            </Button>
        </div>
    );
};

// https://reactstrap.github.io/components/buttons/