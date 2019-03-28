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
      <React.Fragment key={index}>
        <div>
          <SubItem>
            <div><strong>{item.Name}</strong></div>
            <SmallInfo>
              <div dangerouslySetInnerHTML={createMarkup(item.SubViews[index])} />
              <div className="text-muted">
                Ru=
                <span>{item.RequestCharge}</span>
              </div>
            </SmallInfo>
          </SubItem>
        </div>
        {childView && (
          <div>
            <SubItem>
              {childView}
            </SubItem>
          </div>
        )}
      </React.Fragment>
    )
  })
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
