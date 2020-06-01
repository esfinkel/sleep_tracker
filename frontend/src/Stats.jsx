import React, { useState } from 'react';
const stats = require('simple-statistics');

export default ({sleepDurations}) => {
    const mean = sleepDurations.length >= 1 ? stats.mean(sleepDurations) : 0;
    const median = stats.median(sleepDurations);
    const min = stats.min(sleepDurations);
    const max = stats.max(sleepDurations);
    const sd = stats.standardDeviation(sleepDurations);
    const [goal,setGoal] = useState(8);
    const debt = g => (7*g - stats.sum(sleepDurations)).toFixed(1);
    return (
        <div>
            Mean: {mean.toFixed(1)} <br />
            Median: {median.toFixed(1)} <br />
            Minimum: {min.toFixed(1)} <br />
            Maximum: {max.toFixed(1)} <br />
            Standard Deviation: {sd.toFixed(2)}
            {sleepDurations.length===7 && <div>
                <br />
                <div>Daily sleep goal:
                    <input id="end" type="text" value={goal} placeholder={goal} onChange={e => setGoal(e.target.value)}/>
                </div> 
                <div>
                    Sleep {(debt(goal)<=0) ? "surplus" : "debt"}: {(debt(goal)<=0) ? -debt(goal) : debt(goal)}
                </div>
            </div> }
        </div>
    );
};