import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import styled from 'styled-components';

const BottomContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f8f9fb;
`;

const ListContainer = styled.div`
  display: flex;
  padding: 15px 20px;
  justify-content: flex-end;
`;

const SmallInfo = styled.div`
  font-size: 11px;
  padding-right: 10px;
`;

const BottomView = ({ RequestCharge, RequestExecutionTime }) => {
  return (
    <BottomContainer className="c-sub-view">
      <ListContainer>
        <SmallInfo>
          <span className="text-muted">Request Time = </span>
          {new Date().toString()}
          ,
        </SmallInfo>
        <SmallInfo>
          <span className="pr-2 text-muted">Request Units Spent:</span>
          <span className="font-weight-bold">{RequestCharge}</span>
          ,
        </SmallInfo>
        <SmallInfo>
          <span className="pr-2 text-muted">Query Execution Time (ms.):</span>
          <span className="font-weight-bold">{RequestExecutionTime}</span>
        </SmallInfo>
      </ListContainer>
    </BottomContainer>
  )
};

BottomView.propTypes = {
  RequestCharge: PropTypes.any,
  RequestExecutionTime: PropTypes.any,
}

BottomView.defaultProps = {
  RequestCharge: 0,
  RequestExecutionTime: 0,
}

export default connect(state => ({
  RequestExecutionTime: state.report.RequestExecutionTime,
  RequestCharge: state.report.RequestCharge,
}))(BottomView);
