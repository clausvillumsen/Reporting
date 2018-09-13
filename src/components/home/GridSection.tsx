import * as React from "react";
import * as moment from "moment";
import { ComponentBase } from "../ComponentBase";
import ReactTable, { SortingRule } from "react-table";
import { ReportingStore } from "../../stores/ReportingStore";
import { ReportGridModel } from "../../models/ReportGridModel";
import "react-table/react-table.css";
import "./HomeStyles.css";
import { UpdateGridSchemaAction } from "../../actions/UpdateGridSchemaAction";

enum GridProps {
    sorted = 1,
    page = 2,
    pageSize = 3
}

class GridState {
    datasource: ReportGridModel = null;
    sorted: SortingRule[] = [];
    page: number = 0;
    pageSize: number = 100;
    constructor(data: ReportGridModel) {
        this.datasource = data;
        this.pageSize = data && data.Data.length || 25
    }
}
export class GridSection extends ComponentBase<any, GridState> {
    constructor(props: any) {
        super(props);
        this.state = new GridState(
            new ReportGridModel(0, 0, new Date().toUTCString(), [])
        );
        this.subscription.add(
            ReportingStore.dataSourceGridObservable.pipe().subscribe(obs => {
                this.updateState(obs);
            })
        );
    }

    updateState = (data: ReportGridModel) => {
        this.setState(prev => {
            return { ...prev, datasource: data, pageSize: data && data.Data.length || 25 };
        });
    };

    gridChanges = (props: GridProps, value: any) => {
        if (props === GridProps.page) {
            this.setState(prev => {
                return { ...prev, page: value };
            });
            new UpdateGridSchemaAction(
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                value,
                undefined
            ).start();
        }
        if (props === GridProps.sorted) {
            this.setState(prev => {
                return { ...prev, sorted: value };
            });
            new UpdateGridSchemaAction(
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                value,
                undefined,
                undefined
            ).start();
        }
    };

    gridPageSizeChanges = (pageSizeValue: any, pageValue: any) => {
        this.setState(prev => {
            return { ...prev, pageSize: pageSizeValue, page: pageValue };
        });
        new UpdateGridSchemaAction(
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            pageValue,
            pageSizeValue
        ).start();
    };

    render() {
        return (
            <div className="container-fluid">
                <ReactTable
                    data={this.state.datasource.Data}
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
                    sortable={false}
                    multiSort={false}
                    resizable={true}
                    filterable={false}
                    defaultSortDesc={false}
                    columns={columns}
                    rowsText={"rows"}
                    pageSize={this.state.pageSize}
                />
            </div>
        );
    }

}

const columns = [
    {
        Header: (props: any) => <div className="gridColumnHeader">Tidspunkt<i className="fa fa-sort " style={{ float: 'right' }}></i></div>,
        accessor: "Tidspunkt",
        Cell: (props: any) => <span className="gridCell">{props.value}</span>
    },
    {
        Header: (props: any) => <div className="gridColumnHeader">CVR-Nummer<i className="fa fa-sort " style={{ float: 'right' }}></i></div>,
        accessor: "CVRNummer",
        Cell: (props: any) => <span className="gridCell">{props.value}</span>
    },
    {
        Header: (props: any) => <div className="gridColumnHeader">Bruger ID<i className="fa fa-sort " style={{ float: 'right' }}></i></div>,
        accessor: "BrugerID",
        Cell: (props: any) => <span className="gridCell">{props.value}</span>
    },
    {
        Header: (props: any) => <div className="gridColumnHeader">Efternavn<i className="fa fa-sort " style={{ float: 'right' }}></i></div>,
        accessor: "Efternavn",
        Cell: (props: any) => <span className="gridCell">{props.value}</span>
    },
    {
        Header: (props: any) => <div className="gridColumnHeader">Fornavn<i className="fa fa-sort " style={{ float: 'right' }}></i></div>,
        accessor: "Fornavn",
        Cell: (props: any) => <span className="gridCell">{props.value}</span>
    },
    {
        Header: (props: any) => <div className="gridColumnHeader">Unikt ID<i className="fa fa-sort " style={{ float: 'right' }}></i></div>,
        accessor: "UniktID",
        Cell: (props: any) => <span className="gridCell">{props.value}</span>
    },
    {
        Header: (props: any) => <div className="gridColumnHeader">Email Adresse<i className="fa fa-sort " style={{ float: 'right' }}></i></div>,
        accessor: "Emailadresse",
        Cell: (props: any) => <span className="gridCell">{props.value}</span>
    }
];
