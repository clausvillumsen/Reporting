import * as React from "react";
import "./HomeStyles.css";
import { ExportAction } from "../../actions/ExportAction";
import { ExportTypeEnum } from "../../common/constants/exportType";
import { ComponentBase } from "../ComponentBase";
import { ReportingStore } from "../../stores/ReportingStore";

interface Props {
    onLoading: Function;
}
class State {
    exporting: boolean = false;
    hasData: boolean = false;
}
export class Exportlinks extends ComponentBase<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = new State();
        this.subscription.add(ReportingStore.gridDataSourceObservable.pipe().subscribe(objs => {
            this.setState({  hasData: objs && objs.Rows && objs.Rows.length > 0 })
        }))
    }

    render() {
        if (!this.state.hasData) {
            return <div></div>
        }
        return (
            <div className="header">
                <div className="headerRight">
                    <p className="text-left">
                        Download hele rapporten her:{" "}
                        <a href="#" onClick={() => this.handleActionExecuting(ExportTypeEnum.csv)}>CSV</a>
                        &nbsp;{" "}
                        <a href="#" onClick={() => this.handleActionExecuting(ExportTypeEnum.pdf)}>PDF</a>
                        &nbsp;{" "}
                        <a href="#" onClick={() => this.handleActionExecuting(ExportTypeEnum.xml)}>XML</a>
                        &nbsp;{" "}
                        <a href="#" onClick={() => this.handleActionExecuting(ExportTypeEnum.json)}>JSON</a>
                        &nbsp;</p>
                </div>
            </div>
        );
    }

    handleActionExecuting = (exportType: ExportTypeEnum) => {
        if (this.state.exporting) {
            return;
        }

        this.setState(prev => {
            return { ...prev, exporting: true };
        });
        this.props.onLoading(true);
        new ExportAction(exportType)
            .start()
            .then(this.handleActionExecuted)
            .catch(this.handleActionExecuted);
    }
    handleActionExecuted = (res: any) => {
        this.props.onLoading(false)
    }

}
