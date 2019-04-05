import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import isEmpty from 'lodash.isempty';
import { connect } from 'react-redux';
import LabelHeader from '../../../components/LabelHeader';
import './ExportButtons.scss';

const rootLink = process.env.REACT_APP_HOST;

const serialize = (obj) => {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  }
  return str.join('&');
}

const ExportButtons = ({
  ExportLinks,
  onExport,
  filter
}) => {
  if (isEmpty(ExportLinks)) {
    return null;
  }
  const newPayload = { ...filter };
  Object.keys(newPayload).map(key => {
    if (!newPayload[key]) {
      delete newPayload[key];
    }
  })
  const newParams = {
    ReportId: 0,
    MaxRows: 100,
    SortColumnIndex: 0,
    SortColumnAscending: true,
    ...newPayload,
    FromDateTime: moment(newPayload.FromDateTime).toISOString(),
    ToDateTime: moment(newPayload.ToDateTime).toISOString()
  };
  return (
    <div className="c-export-buttons d-flex">
      <div className="pr-4">
        <LabelHeader title="SEARCH FOR USER ATTRIBUTES">EXPORTTYPE</LabelHeader>
        {(Boolean(ExportLinks.length)) && (
          ExportLinks.map(item => (
            <a
              className="btn btn-sm btn-primary"
              data-name={item.Name}
              key={item.Name}
              href={`${rootLink}${item.Url}?${serialize(newParams)}`}
            >
              <span>{item.Name}</span>
            </a>
          ))
        )}
      </div>
    </div>
  )
};

ExportButtons.propTypes = {
  ExportLinks: PropTypes.array.isRequired,
  onExport: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
}

export default connect(state => ({
  ExportLinks: state.report.ExportLinks
}))(ExportButtons);
