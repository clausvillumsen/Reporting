import * as React from "react";
import { ComponentBase } from "../ComponentBase";
import ReactTable, { SortingRule } from "react-table";
import { ReportingStore } from "../../stores/ReportingStore";
import "react-table/react-table.css";
import "./HomeStyles.css";
import { UpdateGridSchemaAction } from "../../actions/UpdateGridSchemaAction";
import { GetDataAction } from "../../actions/GetDataAction";
import { GetDataResponseModel, ColumnModel, ColumnDataType } from "../../models/GetDataResponseModel";
import { DateHelper } from "../../common/DateHelper";

interface Props {
    onLoading: Function;
}
class GridState {
    datasource: GetDataResponseModel = null;
    sorted: SortingRule[] = [];
    page: number = 0;
    pageSize: number = 100;
    constructor(data: GetDataResponseModel) {
        this.datasource = data;
        this.pageSize = data && data.Rows.length || 25
    }
}
export class GridSection extends ComponentBase<Props, GridState> {
    constructor(props: any) {
        super(props);
        this.state = new GridState(null);
        this.subscription.add(
            ReportingStore.gridDataSourceObservable.pipe().subscribe(obs => {
                this.updateState(obs);
            })
        );
    }

    updateState = (data: GetDataResponseModel) => {
        this.setState(prev => {
            return { ...prev, datasource: data, pageSize: data && data.Rows.length || 25 };
        });
    };

    render() {
        if (!(this.state.datasource && this.state.datasource.Rows)) {
            return <div className="warning">Please Search First</div>
        }
        let columns = this.getColumns()
        let data = this.getData()
        return (
            <div className="container-fluid">
                <ReactTable
                    data={data}
                    loading={false}
                    showPagination={false}
                    showPaginationTop={false}
                    showPaginationBottom={false}
                    showPageSizeOptions={false}
                    showPageJump={true}
                    collapseOnSortingChange={true}
                    collapseOnPageChange={true}
                    collapseOnDataChange={true}
                    freezeWhenExpanded={false}
                    sortable={true}
                    multiSort={false}
                    resizable={true}
                    filterable={false}
                    defaultSortDesc={false}
                    columns={columns}
                    rowsText={"rows"}
                    pageSize={this.state.pageSize}
                    sorted={this.state.sorted}
                    onSortedChange={(data: SortingRule[]) => this.handleSortedChange(data)}
                />
            </div>
        );
    }

    handleSortedChange = (data: SortingRule[]) => {
        if (!data) { return; }
        let sortObject = data[0]
        this.setState(prev => { return { ...prev, sorted: data } })
        this.props.onLoading(true)
        new UpdateGridSchemaAction(undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            sortObject.desc,
            this.getColumnIndex(sortObject.id),
            undefined,
            this.state.sorted,
            undefined,
            undefined).start()
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

    getColumnIndex = (columnName: string): string => {
        for (let i = 0; i < this.state.datasource.Columns.length; i++) {
            if (this.state.datasource.Columns[i].Name === columnName) {
                return i.toString();
            }
        }
        return "0";
    }

    getColumns = () => {
        if (!(this.state.datasource && this.state.datasource.Columns)) {
            return;
        }
        let columns: Object[] = [];
        this.state.datasource.Columns.forEach(p => {
            let newColumn = {
                Header: (props: any) => {
                    console.log('props')
                    console.info(props)
                    return <div className="gridColumnHeader">{p.Name}<i className="fa fa-sort " style={{ float: 'right' }}></i></div>
                },
                accessor: p.Name,
                Cell: (props: any) => <span className="gridCell">{props.value}</span>
            }
            columns.push(newColumn)
        })
        return columns;
    }

    getData = (): any[] => {
        if (!(this.state.datasource && this.state.datasource.Rows)) {
            return [];
        }
        let data: any[] = []
        let Columns = this.state.datasource.Columns
        let Rows = this.state.datasource.Rows
        for (var i = 0; i < Rows.length; i++) {
            var newRow: any = {}
            for (var j = 0; j < Rows[i].length; j++) {
                newRow[Columns[j].Name] = Columns[j].DataType === ColumnDataType.date ? DateHelper.GetDateStringFromUTC(Rows[i][j]) : Rows[i][j]
            }
            data.push(newRow)
        }
        return data
    }
}

