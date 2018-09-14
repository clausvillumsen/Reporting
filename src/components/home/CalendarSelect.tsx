import * as React from "react";
import * as moment from "moment";
import "react-dates/initialize";
import "./css/react_dates_overrides.css";
import { DateRangePicker, isInclusivelyBeforeDay } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "./HomeStyles.css";

interface CalendarProps {
  startDate: any;
  endDate: any;
  onDateChange: Function;
}

class CalendarState {
  startDate: any;
  endDate: any;
  focusedInput: any;
  constructor(startDate: any, endDate: any, focusedInput: any) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.focusedInput = focusedInput;
  }
}
export class CalendarSelect extends React.Component<
  CalendarProps,
  CalendarState
> {
  constructor(props: any) {
    super(props);
    this.state = new CalendarState(
      this.props.startDate,
      this.props.endDate,
      null
    );
  }
  render() {
    moment.locale("da");
    return (
      <div className="part">
        <div className="labelHeader">VÆLG TIDSPERIODE</div>
        <DateRangePicker
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="startDate" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="endDate" // PropTypes.string.isRequired,
          onDatesChange={this.handleDateChange} // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          displayFormat={"DD-MM-YYYY"}
          calendarInfoPosition="top"
          renderCalendarInfo={this.renderCalendarInfo}
          isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
          firstDayOfWeek={1}
          small
          noBorder
          startDatePlaceholderText="Fra dato"
          endDatePlaceholderText="Til dato"
        />
      </div>
    );
  }

  renderCalendarInfo = () => {
    return (
      <div className="dateRangeHeaderContainer">
        <div className="dateRangeHeader">
          <div>VÆLG TID FRA I DAG OG TILBAGE</div>
        </div>
        <div />
      </div>
    );
  };

  handleDateChange = (date: any): any => {
    this.setState(prev => {
      return { ...prev, startDate: date.startDate, endDate: date.endDate };
    });
    this.props.onDateChange(date);
  };
}
