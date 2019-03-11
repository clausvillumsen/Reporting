import { GET_REPORT, GET_REPORTS } from 'api/endpoints';
import {
  GET_REPORT_REQUEST,
  GET_REPORT_SUCCESS,
  GET_REPORT_FAIL,
  GET_REPORTS_REQUEST,
  GET_REPORTS_SUCCESS,
  GET_REPORTS_FAIL,
} from './reducer';


const getReport = (ReportId = 2, MaxRows = 1) => {
  return {
    types: [GET_REPORT_REQUEST, GET_REPORT_SUCCESS, GET_REPORT_FAIL],
    payload: {
      request: {
        url: GET_REPORT(ReportId, MaxRows),
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
