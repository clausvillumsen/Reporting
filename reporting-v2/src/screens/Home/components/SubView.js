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

const NestedSubview = ({ SubViews }) => {
  return (
    <div dangerouslySetInnerHTML={createMarkup(SubViews[0])} />
  )
}

NestedSubview.propTypes = {
  SubViews: PropTypes.array.isRequired,
}

const SubView = ({ SubViews }) => {
  if (isEmpty(SubViews)) {
    return null;
  }
  const listView = SubViews.map((item, index) => {
    // have nestest subview
    let childView = null;
    if (SubViews && SubViews[index] && SubViews[index].SubViews) {
      childView = <NestedSubview SubViews={SubViews[index].SubViews} />
    }
    return (
      <div className="card border-light" key={index}>
        <div className="card-body">
          <SubItem>
            <div className="card-title"><strong>{item.Name}</strong></div>
            <SmallInfo>
              {childView && (
                <div className="card-text">
                  <SubItem>
                    {childView}
                  </SubItem>
                </div>
              )}
              <div className="text-muted">
                Ru=
                <span>{item.RequestCharge}</span>
              </div>
            </SmallInfo>
          </SubItem>
        </div>
      </div>
    )
  })
  return (
    <ListContainer>
      <div className="card-group">
        {listView}
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
