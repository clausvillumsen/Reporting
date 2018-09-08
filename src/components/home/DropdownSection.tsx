import * as React from "react"
import * as moment from "moment"
import { ComponentBase } from "../ComponentBase";
import './HomeStyles.css';
import { CalendarSelect } from "./CalendarSelect";
import { ReportTypeComponent } from "../dropdownList/reportTypeComponent";
import { ParentFilterComponent } from "../dropdownList/parentFilterComponent";
import { ExportComponent } from "../dropdownList/exportComponent";
import { ReportTypeModel } from "../../models/ReportTypeModel";
import { FilterData } from "../../models/GetDataResponseModel";
import { DropdownModel } from "../../models/DropdownModel";
import { ToastContainer, toast, ToastType } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetDataAction } from "../../actions/GetDataAction";
import { UpdateGridSchemaAction } from "../../actions/UpdateGridSchemaAction";
interface Props {

}

class UiState {
    focusedInput: any
    startDate: any
    endDate: any
    reportType: ReportTypeModel
    filterType: FilterData
    filterValue: string
    exportType: DropdownModel
}

export class DropdownSection extends ComponentBase<Props, UiState> {
    constructor(props: any) {
        super(props)
        this.state = new UiState()
    }

    render(): React.ReactNode {
        return (<div className="DropdownSection container">
            <ReportTypeComponent onReportTypeChange={(data: ReportTypeModel) => this.handleReportTypeChanges(data)} />
            <CalendarSelect startDate={this.state.startDate} endDate={this.state.endDate} onDateChange={(date: any) => this.handleDateChange(date)} />
            <ParentFilterComponent onFilterChange={(filter: FilterData, filterValue: string) => this.handleFilterTypeChanges(filter, filterValue)} />
            <div className="part"><div className="btn btn-default btnCommon btnHeader" onClick={() => this.handleSearchClick()}><span>Søg</span></div></div>
            <ExportComponent onExportTypeChanges={(data: DropdownModel) => this.handleExportTypeChanges(data)} />
            <div className="part"><div className="btn btn-default btnCommon btnHeader" onClick={() => this.handleExportClick()}><span>Export</span></div></div>
            <ToastContainer autoClose={5000} />
        </div>)
    }

    handleDateChange = (data: any): any => { this.setState(prev => { return { ...prev, startDate: moment(data.startDate).toDate(), endDate: moment(data.endDate).toDate() } }) }
    handleReportTypeChanges = (data: ReportTypeModel) => { this.setState(prev => { return { ...prev, reportType: data } }) }
    handleFilterTypeChanges = (filter: FilterData, filterValue: string) => { this.setState(prev => { return { ...prev, filterType: filter, filterValue: filterValue } }) }
    handleExportTypeChanges = (data: DropdownModel) => { this.setState(prev => { return { ...prev, exportType: data } }) }
    handleSearchClick = () => {
        console.log(this.state.startDate)
        console.log(this.state.endDate)
        if (this.state.startDate == null || this.state.startDate == undefined) {
            this.notify("Start Date must be not null")
            return
        }
        if (this.state.endDate == null || this.state.endDate == undefined) {
            this.notify("End Date must be not null")
            return
        }
        if (this.state.reportType == null || this.state.reportType == undefined) {
            this.notify("Report Type must be not null")
            return
        }
        // if (!this.state.filterType) {
        //     this.notify("Filter Type must be not null")
        //     return
        // }
        // if (!this.state.filterValue) {
        //     this.notify("Filter Value must be not null")
        //     return
        // }

        new UpdateGridSchemaAction(this.state.reportType.ID,
            this.state.startDate,
            this.state.endDate,
            undefined,
            undefined,
            undefined,
            this.state.filterType && this.state.filterType.id,
            this.state.filterValue).start().then((result) => {
                if (result) {
                    new GetDataAction().start();
                }
            });
    }
    handleExportClick = () => {
        if (!this.state.exportType.value) {
            this.notify("Export must be not null")
            return
        }
    }

    notify = (message: string) => {
        console.log(message);
        toast(message, { type: ToastType.ERROR })
    }

}