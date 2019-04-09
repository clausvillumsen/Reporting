import moment from 'moment';
import { GET_REPORT, GET_REPORTS, EXPORT_REPORT } from '../../../api/endpoints';
import {
  GET_REPORT_REQUEST,
  GET_REPORT_SUCCESS,
  GET_REPORT_FAIL,
  GET_REPORTS_REQUEST,
  GET_REPORTS_SUCCESS,
  GET_REPORTS_FAIL,
  LOADMORE_REPORT_SUCCESS,
  EXPORT_REQUEST,
  EXPORT_SUCCESS,
  EXPORT_FAIL,
  RESET_DATE_POINTER,
  UPDATE_FILTER_COLUMN
} from './reducer';


const getReport = (payload) => {
  const newPayload = { ...payload };
  Object.keys(newPayload).map(key => {
    if (!newPayload[key]) {
      delete newPayload[key];
    }
  })
  const newParams = {
    ReportId: 0,
    MaxRows: 100,
    SortColumnIndex: 0,
    SortColumnAscending: true,
    ...newPayload
  };
  let successType = GET_REPORT_SUCCESS;
  if (payload.PageDateTime) {
    successType = LOADMORE_REPORT_SUCCESS;
  }
  return {
    types: [GET_REPORT_REQUEST, successType, GET_REPORT_FAIL],
    payload: {
      request: {
        url: GET_REPORT,
        params: newParams
      }
    }
  }
}

const getReports = () => {
  return {
    types: [GET_REPORTS_REQUEST, GET_REPORTS_SUCCESS, GET_REPORTS_FAIL],
    payload: {
      request: {
        url: GET_REPORTS,
      }
    }
  }
}

export { getReports }

export const exportReport = ({ type, filter }) => {
  // Remove empty
  const newPayload = { ...filter };
  Object.keys(newPayload).map(key => {
    if (!newPayload[key]) {
      delete newPayload[key];
    }
  })
  const newParams = {
    ReportId: 0,
    MaxRows: 100,
    SortColumnIndex: 0,
    SortColumnAscending: true,
    ...newPayload,
    FromDateTime: moment(newPayload.FromDateTime).toISOString(),
    ToDateTime: moment(newPayload.ToDateTime).toISOString()
  };
  return {
    types: [EXPORT_REQUEST, EXPORT_SUCCESS, EXPORT_FAIL],
    payload: {
      request: {
        url: `${EXPORT_REPORT}${type}`,
        params: newParams
      }
    }
  }
}

const resetDatePointer = () => ({ type: RESET_DATE_POINTER });

export { resetDatePointer }

export const updateFilterColumn = (payload) => ({ type: UPDATE_FILTER_COLUMN, payload });

export default getReport;
