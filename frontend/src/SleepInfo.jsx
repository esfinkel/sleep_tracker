import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SleepTable from './SleepTable';
import SleepButton from './SleepButton';
import Stats from './Stats';
import SleepChart from './SleepChart';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Opt = ({a, b, bool}) => { return(
    bool ?
    <div>
        {a}<br /><br />{b}
        <br />
    </div>
    :
    <Container fluid>
        <Row>
            <Col sm={{ size: 'auto'}}>{b}</Col>
            <Col sm={{ size: 'auto'}}></Col>
            <Col sm={{ size: 'auto'}}>{a}</Col>
        </Row>
    </Container>
)}


export default ({uid}) => {

    const url = "https://morning-waters-80542.herokuapp.com";

    const[sleeps, setSleeps] = useState([]);
    const[hasData, setHasData] = useState(false);

    const fetchSleeps = () => {
        if (uid==="") return;
        // console.log(`fetchSleeps: uid is ${uid}`);
        // axios.get(`${url}/sleeps?uid=${uid}&num_results=7`)
        axios.get(`${url}/sleeps/week?uid=${uid}`)
            .then(res => {if (res.data.filter)
                    setSleeps(
                res.data.filter(
                    s => !s.in_progress
                )
                .sort((a, b) => new Date(a.end) - new Date(b.end))
                )})
            .then(r => setHasData(true))
            // .then(r => console.log('fetched sleeps'))
            .catch(err => {console.error(err)});
    }
    useEffect(() => fetchSleeps(), [uid]);

    const sleepDurations = sleeps.map(s => ((new Date(s.end) - new Date(s.start)) / (1000*3600)));

    const [sleeping, setSleeping] = useState(null);
    const fetchSleepingStatus = () => {
        if (sleeping!==null) return;
        if (uid==="") return; 
        // console.log('fetching status');
        axios.get(`${url}/sleeps/inprogress?uid=${uid}`)
                .then(res => setSleeping(res.data))
                .catch(e => console.log(`error: ${e}`))
    }
    useEffect(() => fetchSleepingStatus(), [uid]);

    const isMobile = () => window.innerWidth < 480 || window.outerWidth < 480;
    // console.log(`inner ${window.innerWidth}, outer ${window.outerWidth}, mobile ${isMobile()}`);

    return (
        <div>
            {!hasData ?
            <div>
                <h1>Currently fetching data</h1>
                <h2>There may be a wait of ~20 seconds if this website has not been recently accessed.</h2>
                {/* https://devcenter.heroku.com/articles/free-dyno-hours#dyno-sleeping */}
            </div>
            :
            <div>
            <SleepButton uid={uid} setSleeping={setSleeping} sleeping={sleeping} fetch={fetchSleeps} />
            <br />
            {!sleeping &&
                <div>
                    <Opt
                        bool={isMobile()}
                        a={sleepDurations.length >= 1 && !sleeping && <Stats sleepDurations={sleepDurations}/>}
                        b={<SleepChart sleeps = {sleeps}/>}
                        />
                    <SleepTable uid={uid} sleeps={sleeps} updateData={setSleeps} fetch={fetchSleeps}/>
                </div>
            }
            </div>
            }

        </div>
    );
};
