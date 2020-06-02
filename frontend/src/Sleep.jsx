import React, { useState } from 'react';

import CustomTimePicker from './CustomTimePicker'

export default ({st, en, sid, update, delt}) => {
    let [start, updateStart] = useState(st);
    let [end, updateEnd] = useState(en);        
        
    return (
        <div>
            <br />
            {/* From &nbsp; */}
            <CustomTimePicker time={new Date(start)} update={updateStart} />
            {/* <input id="start" type="text" value={start} placeholder={start} onChange={e => updateStart(e.target.value)}/> */}
            &nbsp; to &nbsp;
            <CustomTimePicker time={new Date(end)} update={updateEnd} />
            {/* <input id="end" type="text" value={end} placeholder={end} onChange={e => updateEnd(e.target.value)}/> */}
            &nbsp;
            ({((new Date(end) - new Date(start)) / (1000*3600)).toFixed(1)} hours)
            &nbsp;
            <button onClick={e => update(sid, start, end)}>Update</button>
            &nbsp;
            <button onClick={e => delt(sid)}>Delete</button>
            <br />
            <br />
        </div>
    );
};


