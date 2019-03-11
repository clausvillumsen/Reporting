import get from 'lodash.get';
import buildColumns from '../buildColumns';
import buildRows from '../buildRows';

export const GET_REPORT_REQUEST = 'GET_REPORT_REQUEST';
export const GET_REPORT_SUCCESS = 'GET_REPORT_SUCCESS';
export const GET_REPORT_FAIL = 'GET_REPORT_FAIL';

export const GET_REPORTS_REQUEST = 'GET_REPORTS_REQUEST';
export const GET_REPORTS_SUCCESS = 'GET_REPORTS_SUCCESS';
export const GET_REPORTS_FAIL = 'GET_REPORTS_FAIL';

const initRows = [
  [
    '2019-02-26 01:37:54',
    '11',
    '200',
    'OK',
    null
  ],
  [
    '2019-02-26 01:38:20',
    '18',
    '200',
    'OK',
    null
  ],
  [

    '2019-02-26 01:38:22',
    '10',
    '200',
    'OK',
    null
  ],
  [
    '2019-02-26 01:38:23',
    '14',
    '200',
    'OK',
    null
  ],
  [
    '2019-02-26 01:38:24',
    '12',
    '200',
    'OK',
    null
  ],
  [
    '2019-02-26 01:38:25',
    '24',
    '200',
    'OK',
    null
  ],
  [
    '2019-02-26 01:38:25',
    '10',
    '200',
    'OK',
    null
  ],
  [
    '2019-02-26 01:38:26',
    '10',
    '200',
    'OK',
    null
  ],
  [
    '2019-02-26 01:38:27',
    '6',
    '200',
    'OK',
    null
  ],
  [
    '2019-02-26 01:38:27',
    '21',
    '200',
    'OK',
    null
  ],
  [
    '2019-02-26 01:38:28',
    '8',
    '200',
    'OK',
    null
  ],
  [
    '2019-02-26 01:38:28',
    '23',
    '200',
    'OK',
    null
  ],
  [
    '2019-02-26 01:38:29',
    '16',
    '200',
    'OK',
    null
  ],
  [
    '2019-02-26 01:38:29',
    '9',
    '200',
    'OK',
    null
  ],
  [
    '2019-02-26 01:38:29',
    '8',
    '200',
    'OK',
    null
  ],
  [
    '2019-02-26 01:38:30',
    '12',
    '200',
    'OK',
    null
  ],
  [
    '2019-02-26 02:00:59',
    '44',
    '200',
    'OK',
    null
  ],
  [
    '2019-02-26 02:01:18',
    '1745',
    '404',
    'Not Available',
    'The remote name could not be resolved: \'testso.modst.dk\''
  ],
  [
    '2019-02-26 02:01:20',
    '0',
    '404',
    'Not Available',
    'The remote name could not be resolved: \'testso.modst.dk\''
  ],
  [
    '2019-02-26 02:01:24',
    '0',
    '404',
    'Not Available',
    'The remote name could not be resolved: \'testso.modst.dk\''
  ],
  [
    '2019-02-26 02:01:24',
    '0',
    '404',
    'Not Available',
    'The remote name could not be resolved: \'testso.modst.dk\''
  ],
  [
    '2019-02-26 02:02:38',
    '28',
    '404',
    'Not Available',
    'The remote name could not be resolved: \'testso.modst.dk\''
  ],
  [
    '2019-02-26 02:02:49',
    '20',
    '404',
    'Not Available',
    'The remote name could not be resolved: \'testso.modst.dk\''
  ],
  [
    '2019-02-26 02:02:51',
    '0',
    '404',
    'Not Available',
    'The remote name could not be resolved: \'testso.modst.dk\''
  ],
  [
    '2019-02-26 02:02:52',
    '0',
    '404',
    'Not Available',
    'The remote name could not be resolved: \'testso.modst.dk\''
  ],
  [
    '2019-02-26 02:02:54',
    '0',
    '404',
    'Not Available',
    'The remote name could not be resolved: \'testso.modst.dk\''
  ],
  [
    '2019-02-26 02:02:55',
    '0',
    '404',
    'Not Available',
    'The remote name could not be resolved: \'testso.modst.dk\''
  ],
  [
    '2019-02-26 02:02:57',
    '0',
    '404',
    'Not Available',
    'The remote name could not be resolved: \'testso.modst.dk\''
  ],
  [
    '2019-02-26 02:03:17',
    '7',
    '200',
    'OK',
    null
  ],
  [
    '2019-02-26 02:03:20',
    '5',
    '200',
    'OK',
    null
  ],
  [
    '2019-02-26 02:03:22',
    '5',
    '200',
    'OK',
    null
  ]
]


const initState = {
  Reports: [],
  Columns: [],
  ExportLinks: [],
  NextPageDatePointer: '',
  PageCount: 0,
  Rows: buildRows(initRows, []),
  TotalCount: 0,
  RequestCharge: 11.65,
  RequestExecutionTime: 81,
  SubViews: [
    {
      'Name': 'Max, Min & Average',
      'RequestCharge': 4.49,
      'SubViews': [
        'Max:1745 Ms.<br/>Min:0 Ms.<br/>Average:66.6451612903226 Ms.</br>'
      ]
    },
    {
      'Name': 'Last downtime',
      'RequestCharge': 8.620000000000001,
      'SubViews': [
        '2019-02-26 02:02:57'
      ]
    }
  ]
};

const report = (state = initState, action = {}) => {
  switch (action.type) {
    case GET_REPORT_SUCCESS: {
      const data = get(action, 'payload.data');
      return {
        ...state,
        ...data,
        Rows: buildRows(data.Rows, data.Columns),
        Columns: buildColumns(data.Columns)
      }
    }
    case GET_REPORTS_SUCCESS: {
      return {
        ...state,
        Reports: get(action, 'payload.data')
      }
    }
    default:
      return state;
  }
}

export default report;
