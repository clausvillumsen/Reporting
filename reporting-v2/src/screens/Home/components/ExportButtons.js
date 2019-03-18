import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const rootLink = process.env.REACT_APP_HOST || 'http://reporting.kundedemo.dk';

const ExportButtons = ({ ExportLinks }) => (
  <div className="c-export-buttons p-2">
    {ExportLinks.map(item => (
      <a className="btn btn-outline-primary mr-3 btn-sm" key={item.Name} href={`${rootLink}${item.Url}`}>
        <span className="pr-1">Download</span>
        {item.Name}
      </a>
    ))}
  </div>
)

ExportButtons.propTypes = {
  ExportLinks: PropTypes.array.isRequired,
}

export default connect(state => ({
  ExportLinks: state.report.ExportLinks
}))(ExportButtons);
