import * as React from "react";
import { DropdownModel } from "../../models/DropdownModel";
interface Props {
    onExportTypeChanges: Function
}
class State {
    popupVisible: boolean = false
    exportType: DropdownModel[] = filterDataStatic
    currentExport: DropdownModel;
}
export class ExportComponent extends React.Component<Props, State> {
    private node: React.RefObject<HTMLDivElement>
    constructor(props: any) {
        super(props);
        this.state = new State()
        this.node = React.createRef();
    }

    render() {
        return (
            <div className="dropdown part " ref={this.node}>
                <div className="labelHeader">VÆLG EXPORTTYPE</div>
                <div className="displayBox" onClick={() => this.setState(prev => { return { ...prev, popupVisible: !prev.popupVisible } })}>
                    <p>{this.state.currentExport && this.state.currentExport.label}</p>
                </div>
                {this.state.popupVisible && (
                    <div className="popover">
                        {this.renderOptions(this.state.exportType)}
                    </div>
                )}
            </div>
        );
    }


    renderOptions = (model: DropdownModel[]) => {
        return model.map(ele => {
            return <div className="dropdownItem" onClick={() => this.setCurrentModel(ele)}>{ele.label}</div>
        })
    }

    setCurrentModel = (model: DropdownModel) => {
        this.setState(prev => { return { ...prev, currentExport: model, popupVisible: !prev.popupVisible } })
        this.props.onExportTypeChanges(model)
    }

}

const filterDataStatic: DropdownModel[] = [{
    value: 1,
    label: "PDF"
}, {
    value: 2,
    label: "XML"
},
{
    value: 3,
    label: "Excel (CSV)"
}]