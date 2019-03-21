import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  UncontrolledDropdown, DropdownToggle, DropdownMenu
} from 'reactstrap';
import { connect } from 'react-redux';
import LabelHeader from '../../../components/LabelHeader';
import './ExportButtons.scss';

const rootLink = process.env.REACT_APP_HOST || 'https://log-in.kundedemo.dk';

const ExportButtons = ({ ExportLinks }) => {
  return (
    <div className="c-export-buttons d-flex">
      <div className="pr-4">
        <LabelHeader title="SEARCH FOR USER ATTRIBUTES">EXPORTTYPE</LabelHeader>
        <UncontrolledDropdown>
          <DropdownToggle nav caret color="outline">
            ---
          </DropdownToggle>
          {(Boolean(ExportLinks.length)) && (
            <DropdownMenu>
              {ExportLinks.map(item => (
                <div className="dropdown-item" key={item.Name} data-link={`${rootLink}${item.Url}`}>
                  {item.Name}
                </div>
              ))}
            </DropdownMenu>
          )}
        </UncontrolledDropdown>
      </div>
      <div>
        <Button color="primary" size="lg">
          Export
        </Button>
      </div>
    </div>
  )
};

ExportButtons.propTypes = {
  ExportLinks: PropTypes.array.isRequired,
}

export default connect(state => ({
  ExportLinks: state.report.ExportLinks
}))(ExportButtons);
