import * as React from "react";
import { FilterType, FilterData } from "../../models/GetDataResponseModel";
interface Props {
  onSelectedFilter: Function;
}
class State {
  popupVisible: boolean = false;
  filterType: FilterData[] = filterDataStatic;
  currentFilter: FilterData;
}
export class FilterComponent extends React.Component<Props, State> {
  private node: React.RefObject<HTMLDivElement>;
  constructor(props: any) {
    super(props);
    this.state = new State();
    this.node = React.createRef();
  }

  render() {
    return (
      <div className="dropdown part " ref={this.node}>
        <div className="labelHeader">VÆLG BRUGER ATTRIBUTER</div>
        <div
          className="displayBox"
          onClick={() =>
            this.setState(prev => {
              return { ...prev, popupVisible: !prev.popupVisible };
            })
          }
        >
          {this.state.currentFilter
            ? this.state.currentFilter.display
            : "Vælg..."}
          {this.state.popupVisible ? (
            <i className="fa fa-sort-up" />
          ) : (
            <i className="fa fa-sort-down" />
          )}
        </div>
        {this.state.popupVisible && (
          <div className="popover">
            {this.renderFilters(this.state.filterType)}
          </div>
        )}
      </div>
    );
  }

  renderFilters = (model: FilterData[]) => {
    console.log(model);
    if (!model || model.length == 0) {
      return undefined;
    }
    return model.map(ele => {
      return (
        <div className="dropdownItem" onClick={() => this.setCurrentModel(ele)}>
          {ele.display}
        </div>
      );
    });
  };

  setCurrentModel = (model: any) => {
    this.setState(prev => {
      return {
        ...prev,
        currentFilter: model,
        popupVisible: !prev.popupVisible
      };
    });
    this.props.onSelectedFilter(model);
  };
}

const filterDataStatic: FilterData[] = [
  {
    id: FilterType.cvr,
    display: "CVR"
  },
  {
    id: FilterType.dateTimeUTC,
    display: "Date Time UTC"
  },
  {
    id: FilterType.email,
    display: "Email"
  },
  {
    id: FilterType.givenName,
    display: "Given Name"
  },
  {
    id: FilterType.surName,
    display: "Sur Name"
  },
  {
    id: FilterType.unieuqId,
    display: "Unique Id"
  },
  {
    id: FilterType.userId,
    display: "User Id"
  }
];
