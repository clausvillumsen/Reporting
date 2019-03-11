import React from 'react'
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import 'react-table/react-table.css';

const Table = ({ report }) => {
  console.log(report);
  return (
    <div id="s-home">
      <ReactTable
        data={[]}
        loading={false}
        showPagination={false}
        showPaginationTop={false}
        showPaginationBottom={false}
        showPageSizeOptions={false}
        showPageJump={true}
        collapseOnSortingChange={true}
        collapseOnPageChange={true}
        collapseOnDataChange={true}
        freezeWhenExpanded={false}
        sortable={false}
        multiSort={false}
        resizable={true}
        filterable={false}
        defaultSortDesc={false}
        columns={[]}
        rowsText="rows"
        pageSize={100}
      />
    </div>
  )
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  report: PropTypes.object
}

Table.defaultProps = {
  report: {}
}

export default connect(state => ({
  report: state.report
}))(Table);
