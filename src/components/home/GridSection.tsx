import * as React from "react";
import * as moment from "moment"
import { ComponentBase } from "../ComponentBase";
import ReactTable, { SortingRule } from "react-table";
import { ReportingStore } from "../../stores/ReportingStore";
import { ReportGridModel } from "../../models/ReportGridModel";
import 'react-table/react-table.css'
import './HomeStyles.css';
import { UpdateGridSchemaAction } from "../../actions/UpdateGridSchemaAction";

enum GridProps {
    sorted = 1,
    page = 2,
    pageSize = 3
}

class GridState {
    datasource: ReportGridModel = null
    sorted: SortingRule[] = []
    page: number = 0
    pageSize: number = 100
    constructor(data: ReportGridModel) {
        this.datasource = data
    }

}
export class GridSection extends ComponentBase<any, GridState> {
    constructor(props: any) {
        super(props)
        this.state = new GridState(new ReportGridModel(0, 0, new Date().toUTCString(), []))
        this.subscription.add(ReportingStore.dataSourceGridObservable.pipe().subscribe(obs => {
            this.updateState(obs)
        }))
    }


    updateState = (data: ReportGridModel) => {
        if (!data) {
            this.setState(prev => { return { ...prev, datasource: data } })
            return
        }
        this.setState(prev => { return { ...prev, datasource: data } })

    }


    gridChanges = (props: GridProps, value: any) => {
        if (props === GridProps.page) {
            this.setState(prev => { return { ...prev, page: value } })
            new UpdateGridSchemaAction(undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                value,
                undefined).start();
        }
        if (props === GridProps.sorted) {
            this.setState(prev => { return { ...prev, sorted: value } })
            new UpdateGridSchemaAction(undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                value,
                undefined,
                undefined).start();
        }
    }

    gridPageSizeChanges = (pageSizeValue: any, pageValue: any) => {
        this.setState(prev => { return { ...prev, pageSize: pageSizeValue, page: pageValue } })
        new UpdateGridSchemaAction(undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            pageValue,
            pageSizeValue).start();
    }

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
                    // pageSizeOptions={[5, 10, 25, 50, 100, 1000]}
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
                    previousText={'Previous'}
                    nextText={'Next'}
                    loadingText={'Loading...'}
                    noDataText={'No rows found'}
                    pageText={'Page'}
                    ofText={'of'}
                    rowsText={'rows'}
                    // sorted={this.state.sorted}
                    // page={this.state.page}
                    pageSize={this.state.datasource && this.state.datasource.Data ? this.state.datasource.Data.length > 10 ? this.state.datasource.Data.length : 25 : 25}
                // onSortedChange={sorted => this.gridChanges(GridProps.sorted, sorted)}
                // onPageChange={page => this.gridChanges(GridProps.page, page)}
                // onPageSizeChange={(pageSize, page) => this.gridPageSizeChanges(pageSize, page)}
                // LoadingComponent={() => <img style={{ width: 80, height: 80 }} src={require('../../../img/loading.gif')} />}
                />

            </div>
        )
    }
}

const columns = [{
    Header: 'Tidspunkt',
    accessor: 'Tidspunkt',
    Cell: (props: any) => <span className='number'>{props.value}</span>
}, {
    Header: 'CVR-Nummer',
    accessor: 'CVRNummer',
    Cell: (props: any) => <span className='number'>{props.value}</span>
},
{
    Header: 'Bruger ID',
    accessor: 'BrugerID',
    Cell: (props: any) => <span className='number'>{props.value}</span>
},
{
    Header: 'Efternavn',
    accessor: 'Efternavn',
    Cell: (props: any) => <span className='number'>{props.value}</span>
},
{
    Header: 'Fornavn',
    accessor: 'Fornavn',
    Cell: (props: any) => <span className='number'>{props.value}</span>
},
{
    Header: 'Unikt ID',
    accessor: 'UniktID',
    Cell: (props: any) => <span className='number'>{props.value}</span>
},
{
    Header: 'Email Adresse',
    accessor: 'Emailadresse',
    Cell: (props: any) => <span className='number'>{props.value}</span>
},]