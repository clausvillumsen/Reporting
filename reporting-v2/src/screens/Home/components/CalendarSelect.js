import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import moment from 'moment';
import './CalendarSelect.scss';
import LabelHeader from '../../../components/LabelHeader';

class CalendarSelect extends React.Component {
  state = {
    // value: moment.range(today.clone().subtract(1, 'days'), today.clone()),
    startDate: '',
    endDate: ''
  }

  changeStartDate = (startDate) => {
    const { onChange } = this.props;
    const { endDate } = this.state;
    onChange({ start: startDate, end: endDate });
    this.setState({ startDate });
  }

  changeEndDate = (endDate) => {
    const { onChange } = this.props;
    const { startDate } = this.state;
    onChange({ start: startDate, end: endDate });
    this.setState({ endDate });
  }

  checkValidDate = (currentDate, selectedDate) => {
    const { startDate } = this.state;
    return (currentDate.isAfter(moment(startDate, 'day')));
  }

  render() {
    const {
      startDate,
      endDate
    } = this.state;
    return (
      <div className="c-reports-select">
        <LabelHeader>VÆLG TIDSPERIODE</LabelHeader>
        <div className="d-flex align-items-center">
          <div className="input-group" style={{ minWidth: 200 }}>
            <Datetime value={startDate} onChange={this.changeStartDate} />
          </div>
          <div className="pl-2 pr-2">
            til
          </div>
          <div className="input-group" style={{ minWidth: 200 }}>
            <Datetime isValidDate={this.checkValidDate} value={endDate} onChange={this.changeEndDate} />
          </div>
        </div>
      </div>
    )
  }
}

CalendarSelect.propTypes = {
  Reports: PropTypes.array.isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func.isRequired
}

CalendarSelect.defaultProps = {
  selected: 'Select'
}

export default connect(state => ({
  Reports: state.report.Reports
}))(CalendarSelect)
