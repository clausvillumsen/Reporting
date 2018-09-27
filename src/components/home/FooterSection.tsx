import * as React from "react";
import { ComponentBase } from "../ComponentBase";
import "./HomeStyles.css";
import { ReportingStore } from "../../stores/ReportingStore";
import { ToastContainer, toast, ToastType } from "react-toastify";
import { GetMoreDataAction } from "../../actions/GetMoreDataAction";
interface Props {
  onLoading: Function;
}

class State {
  enable: boolean;
  hasData: boolean = false;
  constructor(enable: boolean) {
    this.enable = enable;
  }
}
export class FooterSection extends ComponentBase<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = new State(false);
    this.subscription.add(
      ReportingStore.gridDataSourceObservable.pipe().subscribe(objs => {
      console.log('dddd', objs)

        this.setState({
          enable: objs && !objs.IsLast,
          hasData: objs && objs.Rows && objs.Rows.length > 0
        });

      console.log('zzzz', this.state)

      })
    );
  }
  handleLoadMore = () => {
    if (!this.state.enable) {
      this.notify("Please Search Data First or waiting data loading");
      return;
    }
    // this.setState({ enable: false });
    this.props.onLoading(true);
    // setTimeout(() => {
    //   this.setState({ enable: true });
    // }, 5000);
    new GetMoreDataAction()
      .start()
      .then(this.handleActionExecuted)
      .catch(this.handleActionExecuted);
  };
  render() {
    if (!this.state.hasData) {
      return <div />;
    }
    return (
      <div>
        <div className="bottomCenterButton">
          <div
            className={
              this.state.enable
                ? "ableButton btnCommon btnHeader"
                : "disableButton btnCommon btnHeader"
            }
            style={this.state.enable ? {} : {pointerEvents: "none"}}
            onClick={() => this.handleLoadMore()}
          >
            <span>Load more</span>
          </div>
        </div>
        <ToastContainer autoClose={5000} />
      </div>
    );
  }

  notify = (message: string) => {
    toast(message, { type: ToastType.WARNING });
  };

  handleActionExecuted = (res: any) => {
    this.props.onLoading(false);
  };
}
