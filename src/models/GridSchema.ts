import { SortingRule } from "react-table";
export class GridSchema {
    reportId?: number
    fromDateTime?: Date
    toDateTime?: Date
    maxRows?: number
    sortColumnIndex?: number
    sortColumnAscending?: boolean
    filterName?: string
    filterValue?: string
    sorted: SortingRule[] = []
    page: number = 0
    pageSize: number = 100
    constructor(reportId?: number,
        fromDateTime?: Date,
        toDateTime?: Date,
        maxRows?: number,
        sortColumnIndex?: number,
        sortColumnAscending?: boolean,
        filterName?: string,
        filterValue?: string,
        sorted?: SortingRule[],
        page?: number,
        pageSize?: number) {
            this.reportId = reportId;
            this.fromDateTime = fromDateTime;
            this.toDateTime = toDateTime;
            this.maxRows = maxRows;
            this.sortColumnIndex = sortColumnIndex;
            this.sortColumnAscending = sortColumnAscending;
            this.filterName = filterName;
            this.filterValue = filterValue;
            this.sorted = sorted;
            this.page = page;
            this.pageSize = pageSize;
    }
}

export class SortModel {
    id: string
    desc: boolean
}