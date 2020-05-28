import React from 'react';
const stats = require('simple-statistics');

export default ({sleepDurations}) => {
    const mean = sleepDurations.length >= 1 ? stats.mean(sleepDurations) : 0;
    const median = stats.median(sleepDurations);
    const min = stats.min(sleepDurations);
    const max = stats.max(sleepDurations);
    const sd = stats.standardDeviation(sleepDurations);
    return (
        <div>
            Mean: {mean.toFixed(1)} <br />
            Median: {median.toFixed(1)} <br />
            Minimum: {min.toFixed(1)} <br />
            Maximum: {max.toFixed(1)} <br />
            Standard Deviation: {sd.toFixed(2)}
        </div>
    );
};