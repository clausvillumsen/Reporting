import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  UncontrolledDropdown, DropdownToggle, DropdownMenu,
  DropdownItem
} from 'reactstrap';
import isEmpty from 'lodash.isempty';
import { connect } from 'react-redux';
import LabelHeader from '../../../components/LabelHeader';
import './ExportButtons.scss';

const rootLink = process.env.REACT_APP_HOST || 'https://log-in.kundedemo.dk';

const ExportButtons = ({ ExportLinks, select, onChange }) => {
  if (isEmpty(ExportLinks)) {
    return null;
  }
  return (
    <div className="c-export-buttons d-flex">
      <div className="pr-4">
        <LabelHeader title="SEARCH FOR USER ATTRIBUTES">EXPORTTYPE</LabelHeader>
        <UncontrolledDropdown>
          <DropdownToggle nav caret color="outline">
            {select}
          </DropdownToggle>
          {(Boolean(ExportLinks.length)) && (
            <DropdownMenu>
              {ExportLinks.map(item => (
                <DropdownItem onClick={onChange} data-name={item.Name} key={item.Name} data-link={`${rootLink}${item.Url}`}>
                  {item.Name}
                </DropdownItem>
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
  select: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default connect(state => ({
  ExportLinks: state.report.ExportLinks
}))(ExportButtons);
