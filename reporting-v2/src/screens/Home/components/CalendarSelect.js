import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import moment from 'moment';
import './CalendarSelect.scss';
import { DATE_FORMAT, TIME_FORMAT } from '../../../config';
import LabelHeader from '../../../components/LabelHeader';

class CalendarSelect extends React.Component {
  changeStartDate = (startDate) => {
    const { onChange, endDate } = this.props;
    onChange({ start: startDate, end: endDate });
  }

  changeEndDate = (endDate) => {
    const { onChange, startDate } = this.props;
    onChange({ start: startDate, end: endDate });
  }

  checkValidDate = (currentDate, selectedDate) => {
    const { startDate } = this.props;
    return (currentDate.isAfter(moment(startDate, 'day')));
  }

  render() {
    const {
      startDate,
      endDate
    } = this.props;
    return (
      <div className="c-reports-select">
        <LabelHeader>VÆLG TIDSPERIODE</LabelHeader>
        <div className="d-flex align-items-center">
          <div className="input-group" style={{ minWidth: 200 }}>
            <Datetime value={startDate} dateFormat={DATE_FORMAT} timeFormat={TIME_FORMAT} onChange={this.changeStartDate} />
          </div>
          <div className="pl-2 pr-2">til</div>
          <div className="input-group" style={{ minWidth: 200 }}>
            <Datetime isValidDate={this.checkValidDate} dateFormat={DATE_FORMAT} timeFormat={TIME_FORMAT} value={endDate} onChange={this.changeEndDate} />
          </div>
        </div>
      </div>
    )
  }
}

CalendarSelect.propTypes = {
  Reports: PropTypes.array.isRequired,
  startDate: PropTypes.any.isRequired,
  endDate: PropTypes.any.isRequired,
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
