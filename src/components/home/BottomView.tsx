import * as React from "react";
import './bottomview.css'

class BottomView extends React.Component<any, any> {
  render() {
    const date = new Date();
    return (
      <div className="bottom-view-container">
        <span className="sub-view-item">
          Request time = 
          {date.toString()}
        </span>
        <span className="sub-view-item">
          Request Units Spent = 11.65
        </span>
        <span className="sub-view-item">
          Query Execution Time (ms.): 1076
        </span>
      </div>
    );
  }
}

export default BottomView;