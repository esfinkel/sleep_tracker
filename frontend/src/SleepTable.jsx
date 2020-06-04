import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import Sleep from './Sleep';



export default ({uid, sleeps, updateData, fetch}) => {
    const url = "https://morning-waters-80542.herokuapp.com";
    const [msg, setMsg] = useState("");

    const updateSleep = (sid, st, en) => {
        // make put request
        // console.log(`PUT update for ${sid}`);
        axios.put(`${url}/sleeps/${sid}`, {start:st, end:en, uid})
        // update local state
        .then(r => {
            // console.log(r.data);
            updateData(sleeps.map(s => s.sid === sid ? {...s, start: st, end: en} : s));
        })
        .catch(e => console.error(e));
    };

    const addSleepRetroactive = () => {
        const currTime = new Date();
        setMsg("adding");
        axios.post(`${url}/sleeps/start`, {uid, currTime})
        .then(setTimeout(() => 
           (axios.post(`${url}/sleeps/end`, {uid, currTime})
               .then(setTimeout(() => {fetch(); setMsg("")}, 300)) // takes several milliseconds for Firebase data to update
           ), 300))
        .catch (e => console.error(`error: ${e}`));
    }

    const deleteSleep = (sid) => {
        const conf = window.confirm("Are you sure you want to delete this sleep from the database?");
        if (!conf) return;
        // make request
        axios.delete(`${url}/sleeps/${uid}/${sid}`)
        // update local state
        .then(r => {
            updateData(sleeps.filter(s => s.sid !== sid));
        });
    };


    return (
        <div className="past-sleeps">
          <h2>Past sleeps <Button color="secondary" onClick={addSleepRetroactive}>+</Button></h2> {msg}
            
            {sleeps.slice(0).reverse().map((s, i) => (
                <div key={s.sid} style={{backgroundColor: (i%2===0 ? "#65ffa550" : "#6565ff50")}}> <Sleep st={s.start} en={s.end} sid={s.sid} update={updateSleep} delt={deleteSleep} /> </div>
            ))}
        </div>
    );
};

