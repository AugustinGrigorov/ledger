import {
  actions,
} from '../constants';

const user = (state = {
  details: {},
  isAuthenticated: false,
  isFetching: true,
}, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        details: action.userDetails,
        isAuthenticated: true,
        isFetching: false,
      };
    case actions.LOGOUT:
      return {
        details: {},
        isAuthenticated: false,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default user;
