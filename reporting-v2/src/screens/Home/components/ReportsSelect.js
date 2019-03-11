import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import LabelHeader from 'components/LabelHeader';

const ReportsSelect = ({ Reports, selected, onClick }) => {
  const listMenus = Reports.map(item => (
    <DropdownItem
      active={(item.ID.toString() === selected.toString())}
      onClick={onClick}
      key={item.ID}
      data-key={item.ID}
      data-name={item.Name}
    >
      {item.Name}
    </DropdownItem>
  ))
  return (
    <div className="c-reports-select">
      <LabelHeader>RAPPORTTYPE</LabelHeader>
      <UncontrolledDropdown>
        <DropdownToggle nav caret color="outline">
          {selected}
        </DropdownToggle>
        <DropdownMenu>
          {listMenus}
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  )
}

ReportsSelect.propTypes = {
  Reports: PropTypes.array.isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onClick: PropTypes.func.isRequired
}

ReportsSelect.defaultProps = {
  selected: 'Select'
}

export default connect(state => ({
  Reports: state.report.Reports
}))(ReportsSelect)
