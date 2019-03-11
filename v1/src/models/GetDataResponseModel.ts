export enum ColumnDataType {
    guid = "Guid",
    string = "String",
    date = "DateTime",
}

export class GetDataResponseModel {
    TotalCount: number
    PageCount: number
    NextPageDatePointer: string
    Columns: ColumnModel[]
    ExportLinks: ExportLinkModel[]
    Rows: string[][]
    IsLast: boolean
}

export class ColumnModel {
    Name: string
    DataType: ColumnDataType
    Sortable: boolean
    Filter: string
    constructor(name: string, dataType: ColumnDataType, sortable: boolean, filter: string) {
        this.Name = name
        this.DataType = dataType
        this.Sortable = sortable
        this.Filter = filter
    }
}

export class ExportLinkModel {
    Name: string
    Url: string
}

export class FilterData {
    id: string
    display: string
    constructor(id: string, display: string) {
        this.display = display
        this.id = id
    }
}
