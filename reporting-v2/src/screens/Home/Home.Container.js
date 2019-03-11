import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import getReport, { getReports } from './redux/action';
import Table from './components/Table';
import BottomView from './components/BottomView';
import SubView from './components/SubView';
import ReportsSelect from './components/ReportsSelect';

class Container extends Component {
  state = {
    ReportName: 'RAPPORTTYPE'
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

  render() {
    const { ReportName } = this.state;
    return (
      <div id="s-home">
        <div className="d-flex">
          <ReportsSelect selected={ReportName} onClick={this._changeType} />
        </div>
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
