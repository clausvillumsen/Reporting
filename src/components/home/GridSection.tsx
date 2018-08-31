import * as React from "react";
import { ComponentBase } from "../ComponentBase";
import ReactTable from "react-table";
import { ReportingStore } from "../../stores/ReportingStore";
import { ReportGridModel } from "../../models/ReportGridModel";
import { GetDataAction } from "../../actions/GetDataAction";
import 'react-table/react-table.css'
import './HomeStyles.css';
class GridState {
    datasource: ReportGridModel = null
    constructor(data: ReportGridModel) {
        this.datasource = data
    }
}
export class GridSection extends ComponentBase<any, GridState> {
    constructor(props: any) {
        super(props)
        this.state = new GridState(new ReportGridModel(0, 0, new Date().toUTCString(), []))
        new GetDataAction(1,
        new Date('2018-07-01'),
        new Date('2018-08-01'),
        1000
    ).start();
        this.subscription.add(ReportingStore.dataSourceGridObservable.pipe().subscribe(obs => {
            this.setState(prev => { return { ...prev, datasource: obs } })
        }))
    }
    render() {

        return (
            <div className="container-fluid">
                <ReactTable
                    data={this.state.datasource.Data}
                    loading={false}
                    showPagination={true}
                    showPaginationTop={false}
                    showPaginationBottom={true}
                    showPageSizeOptions={true}
                    pageSizeOptions={[5, 10, 25, 50, 100, 1000]}
                    showPageJump={true}
                    collapseOnSortingChange={true}
                    collapseOnPageChange={true}
                    collapseOnDataChange={true}
                    freezeWhenExpanded={false}
                    sortable={true}
                    multiSort={true}
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