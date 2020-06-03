import {
  actions,
} from '../constants';

const user = (state = [], action) => {
  switch (action.type) {
    case actions.ADD_ASSET:
      return [
        ...state,
        action.assetDetails,
      ];
    case actions.REMOVE_ASSET:
      return state.filter((asset) => asset.id !== action.assetDetails.id);
    default:
      return state;
  }
};

export default user;
