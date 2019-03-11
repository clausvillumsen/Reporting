import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import getReport from './redux/action';
import Table from './components/Table';

class Container extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getReport())
  }

  render() {
    return (
      <div id="s-home">
        <Table />
      </div>
    )
  }
}

Container.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(Container);
