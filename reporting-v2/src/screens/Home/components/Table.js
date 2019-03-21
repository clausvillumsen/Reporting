import React from 'react'
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import 'react-table/react-table.css';
import './Table.scss';

const Table = ({ Columns, Rows }) => {
  console.log(Rows.length);
  console.log(Rows);
  return (
    <div id="s-home">
      {(Rows && Rows.length > 0) ? (
        <ReactTable
          data={Rows}
          minRows={1}
          defaultPageSize={500}
          showPagination={false}
          showPaginationTop={false}
          showPageJump={false}
          collapseOnSortingChange={true}
          collapseOnPageChange={true}
          sortable={false}
          multiSort={false}
          resizable={true}
          filterable={false}
          columns={Columns}
        />
      ) : <div className="alert alert-warning text-center">No data</div>}
    </div>
  )
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  Columns: PropTypes.array,
  Rows: PropTypes.array,
}

Table.defaultProps = {
  Columns: [],
  Rows: [],
}

export default connect(state => ({
  Columns: state.report.Columns,
  Rows: state.report.Rows,
}))(Table);
