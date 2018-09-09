import * as React from "react";
import { ExportModel } from "../../models/ExportModel";

const filterDataStatic: ExportModel[] = [{
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
interface Props {
    onExportTypeChanges: Function
}
class State {
    popupVisible: boolean = false
    exportType: ExportModel[] = filterDataStatic
    currentExport: ExportModel;
}
export class ExportComponent extends React.Component<Props, State> {
    private node: React.RefObject<HTMLDivElement>
    constructor(props: any) {
        super(props);
        this.state = new State()
        this.node = React.createRef();
        this.registerClick = this.registerClick.bind(this)
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }
    registerClick = () => {
        if (!this.state.popupVisible) {
            // attach/remove event handler
            document.addEventListener('click', this.handleOutsideClick, false);
          } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
          }
      
          this.setState(prevState => ({
             popupVisible: !prevState.popupVisible,
          }));
    }
    handleOutsideClick = (e: any) => {
        if (this.node.current.contains(e.target)) {
            return;
        }
        document.removeEventListener('click', this.handleOutsideClick, false);
        this.setState(prev => { return { ...prev, popupVisible: false } })
    }
    render() {
        return (
            <div className="dropdown part " ref={this.node}>
                <div className="labelHeader">VÆLG EXPORTTYPE</div>
                <div className="displayBox" onClick={() => this.registerClick() }>
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


    renderOptions = (model: ExportModel[]) => {
        if(!model || model.length == 0) {
            return undefined
        }
        return model.map(ele => {
            return <div className="dropdownItem" onClick={() => this.setCurrentModel(ele)}>{ele.label}</div>
        })
    }

    setCurrentModel = (model: ExportModel) => {
        this.setState(prev => { return { ...prev, currentExport: model, popupVisible: !prev.popupVisible } })
        this.props.onExportTypeChanges(model)
    }

}

