import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  UncontrolledDropdown, DropdownToggle, DropdownMenu
} from 'reactstrap';
import { connect } from 'react-redux';
import LabelHeader from '../../../components/LabelHeader';

const rootLink = process.env.REACT_APP_HOST || 'http://reporting.kundedemo.dk';

const ExportButtons = ({ ExportLinks }) => {
  return (
    <div className="c-export-buttons d-flex">
      <div className="pr-2">
        <LabelHeader title="SEARCH FOR USER ATTRIBUTES">EXPORTTYPE</LabelHeader>
        <UncontrolledDropdown>
          <DropdownToggle nav caret color="outline">
            ---
          </DropdownToggle>
          {Boolean(ExportLinks.length) && (
            <DropdownMenu>
              {ExportLinks.map(item => (
                <a className="btn btn-outline-primary mr-3 btn-sm" key={item.Name} href={`${rootLink}${item.Url}`}>
                  <span className="pr-1">Download</span>
                  {item.Name}
                </a>
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
