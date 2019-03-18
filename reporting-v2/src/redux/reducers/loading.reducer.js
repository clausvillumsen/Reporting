import { GET_REPORT_REQUEST } from '../../screens/Home/redux/reducer';

export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';

const initState = {
  isLoading: false,
};

const loading = (state = initState, action = {}) => {
  switch (action.type) {
    case SHOW_LOADING:
    case GET_REPORT_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case HIDE_LOADING:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state;
  }
}

export default loading;
