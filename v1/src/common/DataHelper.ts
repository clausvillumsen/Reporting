import { GetDataResponseModel } from "../models/GetDataResponseModel";
import { ExportModel } from "../models/ExportModel";

export class DataHelper {
    public static ExportData(datasource: GetDataResponseModel, exportType: ExportModel) {
        let columns = datasource.Columns.map(c => {
            return c.Name
        })
        let rows = datasource.Rows
        let extension = exportType.value == 1 ? "pdf" : exportType.value == 2 ? "xml" : exportType.value == 3 ? "csv" : "txt"
        let fileName = 'export.' + extension
        var csvFile = '';
        csvFile += this.ProcessColumn(columns);
        for (var i = 0; i < rows.length; i++) {
            csvFile += this.ProcessRow(rows[i]);
        }

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, fileName);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", fileName);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    private static ProcessRow = (row: any) => {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    }

    private static ProcessColumn = (colum: string[]) => {
        var finalVal = '';
        colum.forEach(i => {
            finalVal += i + ","
        })
        return finalVal + '\n';
    }
}