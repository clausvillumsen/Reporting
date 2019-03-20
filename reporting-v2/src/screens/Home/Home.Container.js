import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Button } from 'reactstrap';
import getReport, { getReports } from './redux/action';
import Table from './components/Table';
import BottomView from './components/BottomView';
import SubView from './components/SubView';
import ReportsSelect from './components/ReportsSelect';
import CalendarSelect from './components/CalendarSelect';
import ParentFilter from './components/ParentFilter';
import ExportButtons from './components/ExportButtons';

const StyledHeader = styled.div`
  display: flex;
  background: #f8f9fb;
  padding: 15px 0;
`;

class Container extends Component {
  state = {
    ReportName: 'Select',
    filter: {
      ReportId: 0,
      MaxRows: 100,
      FromDateTime: '',
      ToDateTime: '',
      SortColumnIndex: '0',
      SortColumnAscending: 'true',
      FilterName: '',
      FilterValue: '',
      PageDateTime: ''
    }
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.loadData();
    dispatch(getReports())
  }

  loadData = () => {
    const { dispatch } = this.props;
    const { filter } = this.state;
    dispatch(getReport(filter))
  }

  loadMore = () => {
    const { filter } = this.state;
    const { NextPageDatePointer } = this.props;
    this.setState({
      filter: {
        ...filter,
        FromDateTime: NextPageDatePointer,
        PageDateTime: NextPageDatePointer
      }
    }, () => {
      this.loadData();
    })
  }

  filterColumn = (column, value) => {
    const { filter } = this.state;
    this.setState({
      filter: {
        ...filter,
        FilterName: column,
        FilterValue: value
      }
    }, () => {
      this.loadData();
    })
  }

  _changeType = (e) => {
    const { key, name } = e.target.dataset;
    const { filter } = this.state;
    this.setState({
      ReportName: name,
      filter: {
        ...filter,
        ReportId: key
      }
    }, () => {
      this.loadData();
    })
  }

  _changeDate = ({ start, end }) => {
    if (start && end) {
      this.setState({
        filter: {
          FromDateTime: start.toISOString(),
          ToDateTime: end.toISOString()
        }
      }, () => {
        this.loadData();
      })
    }
  }

  render() {
    const { ReportName } = this.state;
    const { NextPageDatePointer } = this.props;
    return (
      <div id="s-home">
        <StyledHeader>
          <div className="container-fluid">
            <div className="d-flex">
              <div className="pr-4">
                <ReportsSelect selected={ReportName} onClick={this._changeType} />
              </div>
              <div className="pr-4">
                <CalendarSelect onChange={this._changeDate} />
              </div>
              <div className="pr-4">
                <ParentFilter updateFilter={this.filterColumn} />
              </div>
              <div title="Search">
                <Button color="primary" size="lg">
                  Søg
                </Button>
              </div>
              <div className="ml-auto">
                <ExportButtons />
              </div>
            </div>
          </div>
        </StyledHeader>
        <SubView />
        <Table />
        {NextPageDatePointer && (
          <div className="pt-4 pb-4 text-center">
            <Button color="primary" onClick={this.loadMore}>Load More</Button>
          </div>
        )}
        <BottomView />
      </div>
    )
  }
}

Container.propTypes = {
  dispatch: PropTypes.func.isRequired,
  NextPageDatePointer: PropTypes.string.isRequired,
}

export default connect(state => ({
  NextPageDatePointer: state.report.NextPageDatePointer
}))(Container);
