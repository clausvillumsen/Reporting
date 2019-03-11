import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Popover, PopoverBody
} from 'reactstrap';
import DateRangePicker from 'react-daterange-picker';

import LabelHeader from 'components/LabelHeader';
import 'react-daterange-picker/dist/css/react-calendar.css';
import originalMoment from 'moment';
import { extendMoment } from 'moment-range';
/**
 * Set the default moment locale
 */

const moment = extendMoment(originalMoment);
const today = moment();

class CalendarSelect extends React.Component {
  state = {
    value: moment.range(today.clone().subtract(1, 'days'), today.clone()),
    popoverOpen: false
  }

  showPopup = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  handleSelect = (value) => {
    const { onChange } = this.props;
    this.setState({ value });
    onChange(value);
  }

  renderSelectionValue = () => {
    return (
      <span className="pr-2">
        {this.state.value.start.format('YYYY-MM-DD')}
        {' - '}
        {this.state.value.end.format('YYYY-MM-DD')}
      </span>
    );
  };

  render() {
    const { value } = this.state;
    return (
      <div className="c-reports-select">
        <LabelHeader>VÆLG TIDSPERIODE</LabelHeader>
        <div>
          {this.renderSelectionValue()}
          <Button size="sm" outline id="Popover1" onClick={this.showPopup}>Change</Button>
          <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
            <PopoverBody>
              <DateRangePicker
                locale='de'
                value={value}
                onSelect={this.handleSelect}
                numberOfCalendars={1}
                maximumDate={this.today}
                minimumDate={new Date()}
              />
            </PopoverBody>
          </Popover>
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
