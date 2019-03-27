import React from 'react';
import PropTypes from 'prop-types';
import {
  Button
} from 'reactstrap';
import isEmpty from 'lodash.isempty';
import { connect } from 'react-redux';
import LabelHeader from '../../../components/LabelHeader';
import './ExportButtons.scss';

const rootLink = process.env.REACT_APP_HOST;

const ExportButtons = ({
  ExportLinks,
  onExport
}) => {
  if (isEmpty(ExportLinks)) {
    return null;
  }
  return (
    <div className="c-export-buttons d-flex">
      <div className="pr-4">
        <LabelHeader title="SEARCH FOR USER ATTRIBUTES">EXPORTTYPE</LabelHeader>
        {(Boolean(ExportLinks.length)) && (
          ExportLinks.map(item => (
            <Button
              onClick={onExport}
              color="primary"
              size="sm"
              data-name={item.Name}
              key={item.Name}
              data-link={`${rootLink}${item.Url}`}
            >
              <span>{item.Name}</span>
            </Button>
          ))
        )}
      </div>
    </div>
  )
};

ExportButtons.propTypes = {
  ExportLinks: PropTypes.array.isRequired,
  onExport: PropTypes.func.isRequired
}

export default connect(state => ({
  ExportLinks: state.report.ExportLinks
}))(ExportButtons);
