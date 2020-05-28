import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SleepTable from './SleepTable';
import SleepButton from './SleepButton';
import Stats from './Stats';
import { isNull } from 'util';
import SleepChart from './SleepChart';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default ({uid}) => {

    const url = "https://morning-waters-80542.herokuapp.com";

    const[sleeps, setSleeps] = useState([]);

    const fetchSleeps = () => {
        if (uid==="") return;
        // console.log(`fetchSleeps: uid is ${uid}`);
        axios.get(`${url}/sleeps?uid=${uid}&num_results=7`)
            .then(res => {if (res.data.filter)
                    setSleeps(
                res.data.filter(
                    s => !s.in_progress
                )
                .sort((a, b) => new Date(a.end) - new Date(b.end))
                )})
            // .then(console.log('fetched sleeps'))
            .catch(err => {console.error(err)});
    }
    useEffect(() => fetchSleeps(), [uid]);

    const sleepDurations = sleeps.map(s => ((new Date(s.end) - new Date(s.start)) / (1000*3600)));

    const [sleeping, setSleeping] = useState(null);
    const fetchSleepingStatus = () => {
        if (!isNull(sleeping)) return;
        if (uid==="") return; 
        // console.log('fetching status');
        axios.get(`${url}/sleeps/inprogress?uid=${uid}`)
                .then(res => setSleeping(res.data))
                .catch(e => console.log(`error: ${e}`))
    }
    useEffect(() => fetchSleepingStatus(), [uid]);

    return (
        <div>
            <SleepButton uid={uid} setSleeping={setSleeping} sleeping={sleeping} fetch={fetchSleeps} />
            <br />
            {!sleeping && <Container fluid>
                <Row>
                    <Col>
                        <SleepChart sleeps = {sleeps}/>
                    </Col>
                    <Col>
                        <SleepTable uid={uid} sleeps={sleeps} updateData={setSleeps}/>
                    </Col>
                </Row>
            </Container>}
            {sleepDurations.length >= 1 && !sleeping && <Stats sleepDurations={sleepDurations}/> }

        </div>
    );
};