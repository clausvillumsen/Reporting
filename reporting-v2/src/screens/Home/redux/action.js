import { GET_REPORT } from 'api/endpoints';
import {
  GET_REPORT_REQUEST,
  GET_REPORT_SUCCESS,
  GET_REPORT_FAIL
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

export default getReport;
