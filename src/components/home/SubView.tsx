import * as React from "react";
import './SubView.css';

class SubView extends React.Component<any, any> {
  render() {
    return (
      <div className="sub-view-container">
        <div className="sub-view-item">
          <div><strong>Max, Min & Average</strong></div>
          <div>
            <div>Max:1745 Ms.</div>
            <div>Min:0</div>
            <div>Ms.Average:66.6451612903226 Ms.</div>
          </div>
          <div className="muted">
            (Ru=4.49)
          </div>
        </div>
        <div className="sub-view-item">
          <div><strong>Last downtime</strong></div>
          <div>
            2019-02-26 02:02:57
          </div>
          <div className="muted">
            (Ru=8.620000000000001)
          </div>
        </div>
      </div>
    );
  }
}

export default SubView;