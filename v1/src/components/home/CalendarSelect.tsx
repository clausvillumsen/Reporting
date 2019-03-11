import * as React from "react";
import "react-dates/initialize";
import "./css/react_dates_overrides.css";
import "react-dates/lib/css/_datepicker.css";
import "./HomeStyles.css";
import 'flatpickr/dist/themes/material_green.css'
import Flatpickr from 'react-flatpickr'
import { Danish } from "flatpickr/dist/l10n/da.js"
import { Instance } from "flatpickr/dist/types/instance";
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
        let startDate = this.state.startDate
        let endDate = this.state.endDate
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
                                    return endDate != null && endDate != undefined ? date <= new Date() && date < endDate : date <= new Date()
                                }
                            ],
                            defaultDate: this.state.startDate,
                            disable: [function (date) {
                                return !(endDate != null && endDate != undefined ? date <= new Date() && date < endDate : date <= new Date())
                            }],
                        }}
                        className={" dateRangeSelect"}
                        onChange={(a, b, c, d) => this.handleStartChange(a, b, c, d)} >
                    </Flatpickr>
                    <p className="dateRangeSeparator">til</p>
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
                                    return startDate != null && startDate != undefined ? date <= new Date() && date > startDate : date <= new Date()
                                }
                            ],
                            defaultDate: this.state.endDate,
                            disable: [function (date) {
                                return !(startDate != null && startDate != undefined ? date <= new Date() && date > startDate : date <= new Date())
                            }],
                        }}
                        className={" dateRangeSelect"}
                        onChange={(a, b, c, d) => this.handleEndDateChanges(a, b, c, d)} >
                    </Flatpickr>
                </div>
            </div>
        );
    }

    handleStartChange = (dates: Date[], currentDateString: string, self: Instance, data?: any) => {
        let newStartDate: Date = dates[0]
        this.setState(prev => {
            return {
                ...prev,
                startDate: newStartDate,
            }
        });
        this.props.onDateChange(newStartDate, this.state.endDate)
    };

    handleEndDateChanges = (dates: Date[], currentDateString: string, self: Instance, data?: any) => {
        let newEndDate: Date = dates[0]
        this.setState(prev => {
            return {
                ...prev,
                endDate: newEndDate
            }
        });
        this.props.onDateChange(this.state.startDate, newEndDate)
    };

}
