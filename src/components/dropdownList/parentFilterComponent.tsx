import * as React from "react";
import { FilterData } from "../../models/GetDataResponseModel";
import { FilterComponent } from "./filterComponent";
interface Props {
    onFilterChange: Function;
}

class State {
    popupVisible: boolean = false;
    currentFilter: FilterData;
    currentFilterValue: string;
}
export class ParentFilterComponent extends React.Component<Props, State> {
    private node: React.RefObject<HTMLDivElement>;
    private searchInput: React.RefObject<HTMLInputElement>;

    constructor(props: any) {
        super(props);
        this.state = new State();
        this.node = React.createRef();
        this.searchInput = React.createRef();
        this.registerClick = this.registerClick.bind(this);
    }
    registerClick = () => {
        this.setState(prevState => ({
            popupVisible: !prevState.popupVisible
        }));
    };

    render() {
        return (
            <div className="dropdown part " ref={this.node}>
                <div className="labelHeader">SØG PÅ BRUGER ATTRIBUTER</div>
                <div className="displayBox" onClick={() => this.registerClick()}>
                    {this.state.currentFilter ? (
                        <p>
                            {" "}
                            {this.state.currentFilter.display}:{" "}
                            {this.state.currentFilterValue}
                        </p>
                    ) : (
                            <p>Vælg...</p>
                        )}
                    {this.state.popupVisible ? (
                        <i className="fa fa-chevron-up fa-lg" />
                    ) : (
                            <i className="fa fa-chevron-down fa-lg" />
                        )}
                </div>
                {this.state.popupVisible && (
                    <div
                        className="popover"
                        style={{ display: "flex", flexDirection: "column" }}
                    >
                        <FilterComponent
                            onSelectedFilter={(selectedModel: FilterData) =>
                                this.handleSelectedFilter(selectedModel)
                            }
                        />
                        <div
                            className="labelHeader"
                            style={{ marginLeft: 30, marginRight: 30 }}
                        >
                            SØG PÅ BRUGER ATTRIBUTER
            </div>
                        <input
                            placeholder="Skriv værdig"
                            type="text"
                            className="searchInput childPadding"
                            aria-describedby="basic-addon2"
                            ref={this.searchInput}
                        />
                        <div className="bottomButton childPadding">
                            <div
                                className="btn btn-default btnCommon btnHeader floatLeft"
                                onClick={() => this.clearFilter()}
                            >
                                <span>Ryd filter</span>
                            </div>
                            <div
                                className="btn btn-default btnCommon btnHeader floatRight"
                                onClick={() => this.applyFilter()}
                            >
                                <span>Tilføj</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    handleSelectedFilter = (selectedModel: FilterData) => {
        this.setState(prev => {
            return {
                ...prev,
                currentFilter: selectedModel
            };
        });
    };

    clearFilter = () => {
        this.setState(prev => {
            return {
                ...prev,
                currentFilter: null,
                currentFilterValue: "",
                popupVisible: false
            };
        });
    };
    applyFilter = () => {
        let text = this.searchInput.current.value;
        this.setState(prev => {
            return {
                ...prev,
                currentFilterValue: text,
                popupVisible: false
            };
        });
        this.props.onFilterChange(this.state.currentFilter, text);
    };
}
