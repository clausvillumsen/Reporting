import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import styled from 'styled-components';

const LoadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0,0,0,.2);
  z-index: 999;
`;

const Loading = ({ isLoading }) => (isLoading ? (
  <LoadContainer>
    <Spinner color="primary" />
  </LoadContainer>
) : null);

Loading.propTypes = {
  isLoading: PropTypes.bool
}

Loading.defaultProps = {
  isLoading: false,
}

export default connect(state => ({
  isLoading: state.loading.isLoading
}))(Loading);
