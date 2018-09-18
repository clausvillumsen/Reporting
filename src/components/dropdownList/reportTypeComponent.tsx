import * as React from "react";
import { ComponentBase } from "../ComponentBase";
import { ReportingStore } from "../../stores/ReportingStore";
import { ReportTypeModel } from "../../models/ReportTypeModel";
import { GetFilterAction } from "../../actions/GetFilterAction";
interface Props {
    onReportTypeChange: Function;
}
class State {
    popupVisible: boolean = false;
    ReportTypes: ReportTypeModel[];
    model: ReportTypeModel;
}
export class ReportTypeComponent extends ComponentBase<Props, State> {
    private node: React.RefObject<HTMLDivElement>;
    constructor(props: any) {
        super(props);
        this.state = new State();
        this.node = React.createRef();
        this.subscription.add(
            ReportingStore.reportTypeDataSourceObservable.pipe().subscribe(objs => {
                this.setState(prev => {
                    if (objs == null || prev.model) {
                        return { ...prev, ReportTypes: objs };
                    }
                    this.changeReportsAndSetCurrentModel(objs[0], objs)
                });
            })
        );
        this.registerClick = this.registerClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    registerClick = () => {
        if (!this.state.popupVisible) {
            // attach/remove event handler
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
            <div className="dropdown part" ref={this.node}>
                <div className="labelHeader">RAPPORTTYPE</div>
                <div className="displayBox" onClick={() => this.registerClick()}>
                    <p>{this.state.model ? this.state.model.Name : "Vælg..."}</p>
                    {this.state.popupVisible ? (
                        <i className="fa fa-chevron-up fa-lg" />
                    ) : (
                            <i className="fa fa-chevron-down fa-lg" />
                        )}
                </div>
                {this.state.popupVisible && (
                    <div className="popover">
                        {this.renderReports(this.state.ReportTypes)}
                    </div>
                )}
            </div>
        );
    }

    renderReports = (model: ReportTypeModel[]) => {
        if (!model) return undefined;
        return model.map(ele => {
            return (
                <div className="dropdownItem" onClick={() => this.setCurrentModel(ele)}>
                    {ele.Name}
                </div>
            );
        });
    };

    setCurrentModel = (model: ReportTypeModel) => {
        this.setState(prev => {
            return {
                ...prev,
                model: model,
                popupVisible: !prev.popupVisible
            };
        });
        this.props.onReportTypeChange(model);
        new GetFilterAction(model.ID.toString()).start()
    };

    changeReportsAndSetCurrentModel = (model: ReportTypeModel, newData: ReportTypeModel[]) => {
        this.setState(prev => {
            return {
                ...prev,
                model: model,
                popupVisible: false,
                ReportTypes: newData
            };
        });
        this.props.onReportTypeChange(model);
        new GetFilterAction(model.ID.toString()).start()
    }
}
