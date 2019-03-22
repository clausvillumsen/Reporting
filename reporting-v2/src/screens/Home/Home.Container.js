import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Button } from 'reactstrap';
import isEmpty from 'lodash.isempty';
import moment from 'moment';
import find from 'lodash.find';
import getReport, { getReports, exportReport } from './redux/action';
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
    exportType: 'Select',
    filter: {
      ReportId: 0,
      MaxRows: 100,
      FromDateTime: moment().subtract(5, 'months').toISOString(),
      ToDateTime: moment().toISOString(),
      SortColumnIndex: '0',
      SortColumnAscending: 'true',
      FilterName: '',
      FilterValue: '',
      PageDateTime: ''
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.ReportName === 'Select' && !isEmpty(nextProps.Reports)) {
      const firstReport = nextProps.Reports[0];
      const newFilter = { ...prevState.filter };
      return { ReportName: firstReport.Name, exportType: 'CSV', filter: { ...newFilter, ReportId: firstReport.ID } }
    }
    return null;
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(getReports());
    this.loadData();
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

  handleExport = (e) => {
    const { exportType, filter } = this.state;
    const { ExportLinks, dispatch } = this.props;
    const found = find(ExportLinks, item => item.Name === exportType);
    // axios.post(`${process.env.REACT_APP_HOST || 'https://log-in.kundedemo.dk'}${found.Url}`)
    dispatch(exportReport({ type: exportType.toLowerCase(), filter: filter }));
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

  changeExportType = (e) => {
    const { name } = e.currentTarget.dataset;
    this.setState({ exportType: name })
  }

  render() {
    const { ReportName, exportType } = this.state;
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
              <div className="ml-auto pl-4">
                <ExportButtons select={exportType} onChange={this.changeExportType} onExport={this.handleExport} />
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
  ExportLinks: PropTypes.array.isRequired,
  Reports: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  NextPageDatePointer: PropTypes.string.isRequired,
}

export default connect(state => ({
  ExportLinks: state.report.ExportLinks,
  Reports: state.report.Reports,
  NextPageDatePointer: state.report.NextPageDatePointer
}))(Container);
