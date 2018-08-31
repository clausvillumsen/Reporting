import * as React from "react"
import 'react-dates/initialize';
import { DropdownComponent } from "../dropdownList/dropdownComponent";
import { ReportTypeModel } from "../../models/ReportTypeModel";
import { DropdownModel } from "../../models/DropdownModel";
import { GetReportAction } from "../../actions/GetReportAction";
import { ComponentBase } from "../ComponentBase";
import { ReportingStore } from "../../stores/ReportingStore";
import { DateRangePicker, toMomentObject } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './HomeStyles.css';

interface Props {

}

class UiState {
    ReportTypes: ReportTypeModel[]
    focusedInput: any
    startDate: any
    endDate: any
}

export class DropdownSection extends ComponentBase<Props, UiState> {

    constructor(props: any) {
        super(props)
        this.state = new UiState()
        new GetReportAction().start();
        this.subscription.add(ReportingStore.SourceObservable.pipe().subscribe(objs => {
            this.setState(prev => { return { ...prev, ReportTypes: objs } })
        }))

    }
    handleSelect = (value: any) => {
        console.log(value)
    }
    render(): React.ReactNode {
        return (<div className="DropdownSection">
            <DropdownComponent header={"RAPPORTTYPE"} data={this.getDropdownModel(this.state.ReportTypes)} currentValue={null} className="dropdown part" />
            <div className="part">
                <div className="labelHeader">VÆLG TIDSPERIODE</div>
                <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="startDate" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="endDate" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />
            </div>
            <DropdownComponent header={"BRUGER ATTRIBUTER"} data={this.getDropdownModel(this.state.ReportTypes)} currentValue={null} className="dropdown part" />
            <div className="part"><div className="btn btn-default btnCommon btnHeader"><span>Søg</span></div></div>
            <DropdownComponent header={"EXPORTTYPE"} data={this.getDropdownModel(this.state.ReportTypes)} currentValue={null} className="dropdown part" />
            <div className="part"><div className="btn btn-default btnCommon btnHeader"><span>Export</span></div></div>
        </div>)
    }

    getDropdownModel = (reportList: ReportTypeModel[]): DropdownModel[] => {
        if (reportList && reportList.length > 0)
            return reportList.map((e) => {
                return new DropdownModel(e.ID, e.Name)
            })
        return []
    }
}