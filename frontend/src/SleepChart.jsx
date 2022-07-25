import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  } from 'recharts';

const getDateString = (date) => {  // a Date object
  return (date.getMonth()+1).toString() + "/" + date.getDate().toString() + "/" + date.getFullYear().toString()
}

const addTimeDelta = (date, deltaInMinutes) => {
  return new Date(date.getTime() + deltaInMinutes*60000);
};

const breakUpSleep = (sleep) => {
    let res = {};
    let counter = new Date(sleep.start);
    let cutoff = 17 * 60;  // 5pm in minutes
    while (counter < new Date(sleep.end)) {
      // Has sleep for the morning of DATE
      let dateOwnedBy = counter.getHours() < 17 ? counter : addTimeDelta(counter, cutoff); 
      let dateString = getDateString(dateOwnedBy);
      if (res[dateString] === undefined) {
        res[dateString] = 0;
      }
      res[dateString] += 1;
      counter = addTimeDelta(counter, 1); // add 1 minute (i.e. 60 * 1000 ms)
    }
    console.log(res);
    return res;
};

export default ({sleeps}) => {
    let timeCounter = {};
    for (let sleep of sleeps) {
      let res = breakUpSleep(sleep);
      for (let [dateString, duration] of Object.entries(res)) {
        if (timeCounter[dateString] === undefined) {
          timeCounter[dateString] = 0;
        };
        timeCounter[dateString] += duration;
      }
    };
    // console.log(timeCounter);

    let data = [];
    for (let [dateString, duration] of Object.entries(timeCounter)) {
      data.push(
        {
          "date": dateString,
          "blank":"",
          "amt":(duration/60).toFixed(1),
        }
      );
    };

    let sleepTimes = [];
    for (let [_, duration] of Object.entries(timeCounter)) {
      sleepTimes.push(duration / 60);
    }

    const CustomTooltip = ({ payload, label, active }) => {
        if (active) {
            return (
                <div className="custom-tooltip">
              <p className="label">{`${label} : ${payload ? payload[0].value : ""}`}</p>
            </div>
          );
        }
        //  check texts
        return null;
      }
    
    let tickArray = [];
    for (let i = 0; i < Math.max(...sleepTimes); i += 2) {
      tickArray.push(i);
    }

    return (
        <div style={{
            position: 'relative', left: '50%',
            transform: 'translate(-50%)'
        }}>
          <AreaChart
              width={Math.min(window.innerWidth-20, 500)}
              height={Math.min(400, window.innerHeight/3)}
          data={data} >
            
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis type="number" domain={[0,Math.max(...sleepTimes)]} allowDataOverflow={true} ticks={tickArray}/> 
            <Tooltip content = {<CustomTooltip />}/>
            <Area type="monotone" dataKey="amt" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </div>
        
    )
}