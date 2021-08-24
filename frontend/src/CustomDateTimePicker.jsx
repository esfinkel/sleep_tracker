import React from 'react';
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

export default ({time, update}) => {


    return (
        <Datetime 
            readonly={true}
            initialValue={time}
            viewMode="time"
            input={false}
            dateFormat="ddd MM/DD/YYYY"
            onChange={t => update(t.toString())}
            />
    )
}