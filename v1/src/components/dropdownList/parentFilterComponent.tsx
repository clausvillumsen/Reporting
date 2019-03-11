import * as React from "react";
import { FilterData } from "../../models/GetDataResponseModel";
import { FilterComponent } from "./filterComponent";
import { Subscription } from "rxjs";
import { ReportingStore } from "../../stores/ReportingStore";
import { ComponentBase } from "../ComponentBase";
interface Props {
    onFilterChange: Function;
}

class State {
    popupVisible: boolean = false;
    currentFilter: FilterData;
    currentFilterValue: string;
    filterType: FilterData[] = [];
}
export class ParentFilterComponent extends ComponentBase<Props, State> {
    private node: React.RefObject<HTMLDivElement>;
    private searchInput: React.RefObject<HTMLInputElement>;
    constructor(props: any) {
        super(props);
        this.state = new State();
        this.node = React.createRef();
        this.searchInput = React.createRef();
        this.registerClick = this.registerClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.subscription.add(
            ReportingStore.filterDataSourceObservable.pipe().subscribe(objs => {
                this.setState(prev => {
                    return { ...prev, filterType: objs };
                });
            })
        );
    }

    registerClick = () => {
        if (!this.state.popupVisible) {
            document.addEventListener("click", this.handleOutsideClick, false);
        } else {
            document.removeEventListener("click", this.handleOutsideClick, false);
        }

        this.setState(prevState => ({
            popupVisible: !prevState.popupVisible
        }));
    };
    handleOutsideClick = (e: any) => {
        if (this.node.current.contains(e.target)) {
            return;
        }
        document.removeEventListener("click", this.handleOutsideClick, false);
        this.setState(prev => {
            return { ...prev, popupVisible: false };
        });
    };
    render() {
        return (
            <div className="dropdown" ref={this.node}>
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
                        style={{ display: "block" }}
                    >
                        <FilterComponent
                            filterType={this.state.filterType}
                            onSelectedFilter={(selectedModel: FilterData) =>
                                this.handleSelectedFilter(selectedModel)
                            }
                        />
                        <div className="childPadding">
                            <div
                                className="labelHeader"
                            >
                                SØG PÅ BRUGER ATTRIBUTER
                            </div>
                            <input
                                placeholder="Skriv værdi"
                                type="text"
                                className="searchInput"
                                aria-describedby="basic-addon2"
                                ref={this.searchInput}
                            />
                        </div>
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
                currentFilterValue: null,
                popupVisible: false
            };
        });
        this.props.onFilterChange(null, null);
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
