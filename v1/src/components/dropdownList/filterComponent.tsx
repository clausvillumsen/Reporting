import * as React from "react";
import { FilterData } from "../../models/GetDataResponseModel";
import { ReportingStore } from "../../stores/ReportingStore";
import { Subscription } from "rxjs";
interface Props {
    onSelectedFilter: Function;
    filterType: FilterData[];
}
class State {
    popupVisible: boolean = false;
    filterType: FilterData[] = [];
    currentFilter: FilterData;
    constructor(filterType: FilterData[]) {
        this.filterType = filterType;
    }
}
export class FilterComponent extends React.Component<Props, State> {
    private node: React.RefObject<HTMLDivElement>;
    constructor(props: any) {
        super(props);
        this.state = new State(props.filterType);
        this.node = React.createRef();
    }

    render() {
        return (
            <div className="dropdown childPadding " ref={this.node}>
                <div className="labelHeader" style={{ marginTop: 10, marginBottom: 10 }}>VÆLG BRUGER ATTRIBUTER</div>
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
                    {this.state.popupVisible ?
                        <i className="fa fa-chevron-up fa-lg" />
                        :
                        <i className="fa fa-chevron-down fa-lg" />
                    }
                </div>
                <div className="popover" style={{ display: this.state.popupVisible ? 'block' : 'none' }}>
                    {this.renderFilters(this.state.filterType)}
                </div>
            </div>
        );
    }

    renderFilters = (model: FilterData[]) => {
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
        this.props.onSelectedFilter(model);
        this.setState(prev => {
            return {
                ...prev,
                currentFilter: model,
                popupVisible: !prev.popupVisible
            };
        });
    };

}
