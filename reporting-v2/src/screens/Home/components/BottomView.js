import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import styled from 'styled-components';

const ListContainer = styled.div`
  display: flex;
  background: #fff;
  padding: 20px;
  justify-content: flex-end;
`;

const SmallInfo = styled.div`
  font-size: .9em;
  padding-right: 10px;
  color: #999;
`;

const BottomView = ({ RequestCharge, RequestExecutionTime }) => {
  return (
    <div className="c-sub-view">
      <ListContainer>
        <SmallInfo>
          <span>Request Time = </span>
          {new Date().toString()}
          ,
        </SmallInfo>
        <SmallInfo>
          <span className="pr-2">Request Units Spent:</span>
          <span className="badge badge-secondary">{RequestCharge}</span>
          ,
        </SmallInfo>
        <SmallInfo>
          <span className="pr-2">Query Execution Time (ms.):</span>
          <span className="badge badge-secondary">{RequestExecutionTime}</span>
        </SmallInfo>
      </ListContainer>
    </div>
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
