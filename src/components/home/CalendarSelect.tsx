import * as React from "react";
import "react-dates/initialize";
import "./css/react_dates_overrides.css";
import "react-dates/lib/css/_datepicker.css";
import "./HomeStyles.css";
import 'flatpickr/dist/themes/material_green.css'
import Flatpickr from 'react-flatpickr'
import { Danish } from "flatpickr/dist/l10n/da.js"
import { Instance } from "flatpickr/dist/types/instance";
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin'
interface CalendarProps {
    startDate: Date,
    endDate: Date,
    onDateChange: Function;
}

class CalendarState {
    startDate: Date
    endDate: Date
    constructor(startDate: Date, endDate: Date) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
export class CalendarSelect extends React.Component<CalendarProps, CalendarState> {
    constructor(props: any) {
        super(props);
        this.state = new CalendarState(props.startDate, props.endDate);
    }
    render() {
        return (
            <div className="dropdown">
                <div className="labelHeader">VÆLG TIDSPERIODE</div>
                <div className="dateRangeContainer">
                    <Flatpickr
                        data-allow-input={false}
                        options={{
                            allowInput: false,
                            enableTime: true,
                            locale: Danish,
                            time_24hr: true,
                            dateFormat: "d/m/Y H.i",
                            enable: [
                                function (date) {
                                    return date <= new Date()
                                }
                            ],
                            defaultDate: [this.state.startDate, this.state.endDate],
                            disable: [function (date) {
                                return date > new Date()
                            }],
                            plugins: [new (rangePlugin as any)({ input: "#secondRangeInput" })]
                        }} 
                        className={" dateRangeSelect"}
                        onChange={(a, b, c, d) => this.handleTimeChanges(a, b, c, d)} >
                    </Flatpickr>
                    <p className="dateRangeSeparator">til</p>
                    <input id="secondRangeInput" className="dateRangeSelect" />
                </div>
            </div>
        );
    }

    handleTimeChanges = (dates: Date[], currentDateString: string, self: Instance, data?: any) => {
        let newStartDate: Date = dates[0]
        let newEndDate: Date = dates[1]
        this.setState(prev => {
            return {
                startDate: newStartDate,
                endDate: newEndDate
            }
        });
        this.props.onDateChange(newStartDate, newEndDate)
    };

}
