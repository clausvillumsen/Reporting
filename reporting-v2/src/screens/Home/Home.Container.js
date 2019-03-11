import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import getReport, { getReports } from './redux/action';
import Table from './components/Table';
import BottomView from './components/BottomView';
import SubView from './components/SubView';
import ReportsSelect from './components/ReportsSelect';
import CalendarSelect from './components/CalendarSelect';
import ParentFilter from './components/ParentFilter';

const StyledHeader = styled.div`
  display: flex;
  background: #f8f9fb;
  padding: 15px 0;
`;

class Container extends Component {
  state = {
    ReportName: 'Select'
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.loadData();
    dispatch(getReports())
  }

  loadData = (ReportId = 1) => {
    const { dispatch } = this.props;
    dispatch(getReport(ReportId))
  }

  _changeType = (e) => {
    const { key, name } = e.target.dataset;
    this.loadData(key);
    this.setState({ ReportName: name })
  }

  _changeDate = (value) => {
    console.log(value.start.toISOString());
    console.log(value.end.toISOString());
  }

  render() {
    const { ReportName } = this.state;
    return (
      <div id="s-home">
        <StyledHeader>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-sm-4 col-md-4">
                <ReportsSelect selected={ReportName} onClick={this._changeType} />
              </div>
              <div className="col-12 col-sm-4 col-md-4">
                <CalendarSelect onChange={this._changeDate} />
              </div>
              <div className="col-12 col-sm-4 col-md-4">
                <ParentFilter />
              </div>
            </div>
          </div>
        </StyledHeader>
        <SubView />
        <Table />
        <BottomView />
      </div>
    )
  }
}

Container.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(Container);
