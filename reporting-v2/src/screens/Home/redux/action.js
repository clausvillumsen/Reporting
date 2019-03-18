import { GET_REPORT, GET_REPORTS } from '../../../api/endpoints';
import {
  GET_REPORT_REQUEST,
  GET_REPORT_SUCCESS,
  GET_REPORT_FAIL,
  GET_REPORTS_REQUEST,
  GET_REPORTS_SUCCESS,
  GET_REPORTS_FAIL,
} from './reducer';


const getReport = (payload) => {
  const newPayload = { ...payload };
  Object.keys(newPayload).map(key => {
    if (!newPayload[key]) {
      delete newPayload[key];
    }
  })
  const newParams = {
    ReportId: 2,
    MaxRows: 100,
    ...newPayload
  };
  return {
    types: [GET_REPORT_REQUEST, GET_REPORT_SUCCESS, GET_REPORT_FAIL],
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

export default getReport;
