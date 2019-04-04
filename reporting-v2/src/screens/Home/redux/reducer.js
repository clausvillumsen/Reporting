import get from 'lodash.get';
import buildColumns from '../buildColumns';
import buildRows from '../buildRows';

export const GET_REPORT_REQUEST = 'GET_REPORT_REQUEST';
export const GET_REPORT_SUCCESS = 'GET_REPORT_SUCCESS';
export const LOADMORE_REPORT_SUCCESS = 'LOADMORE_REPORT_SUCCESS';
export const GET_REPORT_FAIL = 'GET_REPORT_FAIL';

export const GET_REPORTS_REQUEST = 'GET_REPORTS_REQUEST';
export const GET_REPORTS_SUCCESS = 'GET_REPORTS_SUCCESS';
export const GET_REPORTS_FAIL = 'GET_REPORTS_FAIL';

export const EXPORT_REQUEST = 'EXPORT_REQUEST';
export const EXPORT_SUCCESS = 'EXPORT_SUCCESS';
export const EXPORT_FAIL = 'EXPORT_FAIL';

export const RESET_DATE_POINTER = 'RESET_DATE_POINTER';

const initState = {
  FilterTypes: [],
  Reports: [],
  Columns: [],
  ExportLinks: [],
  // to show Load more
  NextPageDatePointer: '',
  PageCount: 0,
  Rows: [],
  TotalCount: 0,
  RequestCharge: 0,
  RequestExecutionTime: 0,
  SubViews: [],
};

const report = (state = initState, action = {}) => {
  switch (action.type) {
    case GET_REPORT_SUCCESS: {
      const data = get(action, 'payload.data');
      let newNextPageDatePointer = data.NextPageDatePointer;
      if (data.Rows.length === 0) {
        newNextPageDatePointer = '';
      }
      return {
        ...state,
        ...data,
        NextPageDatePointer: newNextPageDatePointer,
        Rows: buildRows(data.Rows, data.Columns),
        Columns: buildColumns(data.Columns),
        FilterTypes: data.Columns.map(item => (item.Name))
      }
    }
    case LOADMORE_REPORT_SUCCESS: {
      const data = get(action, 'payload.data');
      let newNextPageDatePointer = data.NextPageDatePointer;
      if (data.Rows.length === 0) {
        newNextPageDatePointer = '';
      }
      return {
        ...state,
        ...data,
        NextPageDatePointer: newNextPageDatePointer,
        Rows: [
          ...state.Rows,
          ...buildRows(data.Rows, data.Columns)
        ],
        Columns: buildColumns(data.Columns),
        FilterTypes: data.Columns.map(item => (item.Name))
      }
    }
    case GET_REPORTS_SUCCESS: {
      return {
        ...state,
        Reports: get(action, 'payload.data')
      }
    }
    case GET_REPORT_FAIL: {
      return {
        ...initState,
        Reports: state.Reports
      }
    }
    case RESET_DATE_POINTER: {
      return {
        ...state,
        NextPageDatePointer: ''
      }
    }
    default:
      return state;
  }
}

export default report;
