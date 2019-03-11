export const GET_REPORT_REQUEST = 'GET_REPORT_REQUEST';
export const GET_REPORT_SUCCESS = 'GET_REPORT_SUCCESS';
export const GET_REPORT_FAIL = 'GET_REPORT_FAIL';


const initState = {
  Columns: [],
  ExportLinks: [],
  NextPageDatePointer: '',
  PageCount: 0,
  Rows: [],
  TotalCount: 0
};

const report = (state = initState, action = {}) => {
  switch (action.type) {
    case GET_REPORT_SUCCESS: {
      return {
        ...action.payload.data
      }
    }
    default:
      return state;
  }
}

export default report;
