import * as React from "react";
import "react-dates/initialize";
import "./css/react_dates_overrides.css";
import "react-dates/lib/css/_datepicker.css";
import "./HomeStyles.css";
import 'flatpickr/dist/themes/material_green.css'
import Flatpickr from 'react-flatpickr'
import { Danish } from "flatpickr/dist/l10n/da.js"
interface CalendarProps {
    startDate: Date,
    endDate: Date,
    onDateChange: Function;
}

class CalendarState {
    startDate: Date
    endDate: Date
    time: Date[] = [];
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
            <div className="part">
                <div className="labelHeader">VÆLG TIDSPERIODE</div>
                <Flatpickr data-enable-time
                    options={{
                        mode: "range",
                        enableTime: true,
                        locale: Danish,
                        time_24hr: true,
                        dateFormat: "d-m-Y H:i",
                        enable: [
                            function (date) {
                                return date <= new Date()
                            }
                        ],
                        disable: [function (date) {
                            return date > new Date()
                        }],
                    }}
                    value={`${this.state.startDate ? this.state.startDate.toLocaleString("da") : ''} til ${this.state.endDate ? this.state.endDate.toLocaleString("da") : ''}`}
                    className={"dateRangeSelect"}
                    onChange={(date: any) => this.handleTimeChanges(date)} />
            </div>
        );
    }

    handleTimeChanges = (moments: any): any => {
        let newStartDate: Date = moments[0]
        let newEndDate: Date = moments[1]
        if (newEndDate)
            newEndDate.setHours(newStartDate.getHours(), newStartDate.getMinutes())
        this.setState(prev => {
            return {
                ...prev,
                startDate: newStartDate,
                endDate: newEndDate
            }
        });
        this.props.onDateChange(newStartDate, newEndDate)
    };
}
