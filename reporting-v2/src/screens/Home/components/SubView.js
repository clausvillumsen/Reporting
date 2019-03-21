import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import styled from 'styled-components';
import createMarkup from '../createMarkup';

const ListContainer = styled.div`
  background: #fff;
`;

const SubItem = styled.div`
  padding-right: 30px;
`;

const SmallInfo = styled.div`
  font-size: .9em;
`;

const SubView = ({ SubViews }) => {
  if (isEmpty(SubViews)) {
    return null;
  }
  const listView = SubViews.map((item, index) => (
    <div key={index}>
      <SubItem>
        <div><strong>{item.Name}</strong></div>
        <SmallInfo>
          <div dangerouslySetInnerHTML={createMarkup(item.SubViews[0])} />
          <div className="text-muted">
            Ru=
            <span>{item.RequestCharge}</span>
          </div>
        </SmallInfo>
      </SubItem>
    </div>
  ))
  return (
    <ListContainer>
      <div className="container-fluid">
        <div className="d-flex pt-3 pb-3">
          {listView}
        </div>
      </div>
    </ListContainer>
  )
};

SubView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  SubViews: PropTypes.array,
}

SubView.defaultProps = {
  SubViews: [],
}

export default connect(state => ({
  SubViews: state.report.SubViews,
}))(SubView);
