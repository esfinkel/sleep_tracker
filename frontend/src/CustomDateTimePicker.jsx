import React from 'react';
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import moment from 'moment';

export default ({time, update}) => {
    return (
        <NearbyDateDTPicker // Custom date picker that optimizes visually for nearby dates
            time={time}
            update={update}
        />
    )
}


class NearbyDateDTPicker extends React.Component {
    moveYesterday() {
        // TODO: sleep string is currently in this format: 2021-08-21T06:04:42.000Z
        // but `moment` wants me to explicitly inform it of the format, since right
        // now it's sort of guessing at format.
        // YYYY-MM-DD ...??? see https://momentjs.com/docs/#/parsing/string-format/
        // What I could do is standardize string representation (did I do that yet?)
        let yesterday = moment(this.props.time).subtract(1, 'd').toString();
        console.log(yesterday);
        this.props.update(yesterday);
    }
    moveTomorrow() {
        let tomorrow = moment(this.props.time).add(1, 'd').toString();
        console.log(tomorrow);
        this.props.update(tomorrow);
    }

    render() {
        return (
            <Datetime
                renderView={(mode, renderDefault) =>
                    this.renderView(mode, renderDefault)
                }
                onBeforeNavigate={() => false} // to disable calendar click

                value={new Date(this.props.time)} // mutable, unlike initialValue prop
                initialViewMode="time"
                input={false}
                dateFormat="ddd MM/DD/YY"
                onChange={t => this.props.update(t.toString())}
            />
        );
    }

    renderView(mode, renderDefault) {
        return (
            <div className="wrapper">
            {renderDefault()}
            <div className="controls">
                <button onClick={() => this.moveYesterday()}>◀</button>
                <button onClick={() => this.moveTomorrow()}>▶</button>
                </div>
            </div>
        );
    }
}
