import * as React from "react";
import * as moment from "moment";
import { ComponentBase } from "../ComponentBase";
import "./HomeStyles.css";
import { CalendarSelect } from "./CalendarSelect";
import { ReportTypeComponent } from "../dropdownList/reportTypeComponent";
import { ParentFilterComponent } from "../dropdownList/parentFilterComponent";
import { ReportTypeModel } from "../../models/ReportTypeModel";
import { FilterData } from "../../models/GetDataResponseModel";
import { ExportModel } from "../../models/ExportModel";
import { toast, ToastType, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetDataAction } from "../../actions/GetDataAction";
import { UpdateGridSchemaAction } from "../../actions/UpdateGridSchemaAction";
interface Props {
    onLoading: Function
}

class UiState {
    focusedInput: any;
    startDate: any = moment(new Date()).add(-1, 'days').toDate();
    endDate: any = moment(new Date()).toDate();
    reportType: ReportTypeModel;
    filterType: FilterData;
    filterValue: string;
    loading: boolean = false;
}

export class DropdownSection extends ComponentBase<Props, UiState> {
    private nodeParentFilter: React.RefObject<ParentFilterComponent>;
    constructor(props: any) {
        super(props);
        this.state = new UiState();
        this.nodeParentFilter = React.createRef();
        
    }

    render(): React.ReactNode {
        return (
            <div className="DropdownSection container">
                <ReportTypeComponent
                    onReportTypeChange={(data: ReportTypeModel) =>
                        this.handleReportTypeChanges(data)
                    }
                />
                <CalendarSelect
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onDateChange={(startDate: Date, endDate: Date) => this.handleDateChange(startDate, endDate)}
                />
                <ParentFilterComponent
                    ref={this.nodeParentFilter}
                    onFilterChange={(filter: FilterData, filterValue: string) =>
                        this.handleFilterTypeChanges(filter, filterValue)
                    }
                />
                <div className="part" style={{ display: "flex", alignItems: "center" }}>
                    <div className="btn btn-default btnCommon btnHeader" onClick={() => this.handleSearchClick()}>
                        <span>Søg</span>
                    </div>
                </div>
                <ToastContainer autoClose={5000} />
            </div>
        );
    }

    handleDateChange = (startDate: Date, endDate: Date): any => {
        this.setState(prev => {
            return {
                ...prev,
                startDate: startDate,
                endDate: endDate
            };
        });
        new UpdateGridSchemaAction(undefined,
            startDate,
            endDate,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined).start()
    };
    handleReportTypeChanges = (data: ReportTypeModel) => {
        this.setState(prev => {
            return { ...prev, reportType: data };
        });
        new UpdateGridSchemaAction(data.ID,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined).start();
        this.nodeParentFilter.current.clearFilter();
    };
    handleFilterTypeChanges = (filter: FilterData, filterValue: string) => {
        this.setState(prev => {
            return { ...prev, filterType: filter, filterValue: filterValue };
        });

        new UpdateGridSchemaAction(undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            filter && filter.id,
            filterValue).start()
    };
    handleExportTypeChanges = (data: ExportModel) => {
        this.setState(prev => {
            return { ...prev, exportType: data };
        });
    };
    handleSearchClick = () => {
        if (this.state.reportType == null || this.state.reportType == undefined) {
            this.notify("Report Type must be not null")
            return;
        }
        this.GetData();
    };
    handleExportClick = () => {
    };

    notify = (message: string) => {
        toast(message, { type: ToastType.ERROR });
    };

    GetData = () => {
        this.props.onLoading(true);
        new UpdateGridSchemaAction(this.state.reportType.ID,
            this.state.startDate,
            this.state.endDate,
            undefined,
            undefined,
            undefined,
            this.state.filterType && this.state.filterType.id,
            this.state.filterValue).start()
            .then(result => {
                if (result) {
                    new GetDataAction().start().then(this.handleActionExecuted).catch(this.handleActionExecuted)
                } else {
                    this.props.onLoading(true)
                }
            }).catch(this.handleActionExecuted)
    }

    handleActionExecuted = (res: any) => {
        this.props.onLoading(false)
    }
}
