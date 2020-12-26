import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';

import CustomDateTimePicker from './CustomDateTimePicker'

const Opt = ({a, b, bool}) => { return(
    bool ?
    <div>
        From: {a}
        To: {b}
    </div>
    :
    <Container fluid>
        <Row>
            <Col sm={{ size: 'auto', offset: 1 }}>From: {a}</Col>
            <Col sm={{ size: 'auto', offset: 1 }}>To: {b}</Col>
            <Col sm={{ size: 'auto'}}></Col>
        </Row>
    </Container>
)}

export default ({st, en, sid, update, delt}) => {
    let [edit, setEdit] = useState(false);
    let [start, updateStart] = useState(st);
    let [end, updateEnd] = useState(en);        
    const formatDate = s => moment(s).format("ddd MM/DD h:mm a");
    const formatJustDate = s => moment(s).format("ddd MM/DD");
    const formatJustTime = s => moment(s).format("h:mm a");
    const isMobile = () => window.innerWidth < 480 || window.outerWidth < 480;
    const sameDate = () => (
        (new Date(start)).getDate()===(new Date(end)).getDate() &&
        (new Date(start)).getMonth()===(new Date(end)).getMonth() &&
        (new Date(start)).getFullYear()===(new Date(end)).getFullYear()
    )
    return (
        <div>
            <br />
            { edit ?
                <Opt
                    a={<CustomDateTimePicker time={new Date(start)} update={updateStart} />}
                    b={<CustomDateTimePicker time={new Date(end)} update={updateEnd} />}
                    bool={isMobile()}
                    />
                :
                <div>
                    {
                        sameDate()
                        ?
                        <span><strong>{formatJustDate(start)}</strong> from <strong>{formatJustTime(start)}</strong> to <strong>{formatJustTime(end)}</strong></span>
                        :
                        <span>From <strong>{formatDate(start)}</strong> to <strong>{formatDate(end)}</strong></span>
                    }
                </div>
            }
            &nbsp;
            ({((new Date(end) - new Date(start)) / (1000*3600)).toFixed(1)} hours)
            &nbsp;
            {edit && 
                <span>
                    <button onClick={e => {update(sid, start, end); setEdit(false);}}>Update</button>
                    &nbsp;
                    <button onClick={e => {updateStart(st); updateEnd(en); setEdit(false);}}>Cancel</button>
                </span>
            }
            {!edit && <button onClick={e => setEdit(true)}>Edit</button>}
            &nbsp;
            <button onClick={e => delt(sid)}>Delete</button>
            <br />
            <br />
        </div>
    );
};


