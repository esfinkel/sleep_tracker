
import DatePicker from "react-datepicker";
import React from 'react';
import "react-datepicker/dist/react-datepicker.css";

// see https://www.npmjs.com/package/react-datepicker 
// and https://reactdatepicker.com
// https://popper.js.org/docs/v2/modifiers/
// (am leaving commented code in until I finalize design)

export default ({time, update}) => {
  const isMobile = () => window.innerWidth < 480 || window.outerWidth < 480;
  // console.log(isMobile());

  return (
    <DatePicker
        selected={time}
        onChange={t => update(t.toString())}

        className="time-border"

        timeIntervals={1}
        showTimeSelect

        // timeInputLabel="Time:"
        // showTimeInput
        todayButton="Today"
        openToDate={time}
        dateFormat="MM/dd/yyyy h:mm aa"
        
        withPortal={isMobile()}
        // withFullScreenPortal // solid background

        popperModifiers={{
            offset: {
              enabled: true,
              offset: "5px, 10px"
            },
            preventOverflow: {
              enabled: true,
              escapeWithReference: false,
              boundariesElement: "viewport"
            }
        }}
        shouldCloseOnSelect={false}
        // onCalendarClose={handleCalendarClose} update automatically?
    />
  );
}