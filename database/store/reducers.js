import * as ACTIONS from "./actions"

const initialState = {
  currentUser: {},
  currentDestination:{}
};

const someReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
      case ACTIONS.SET_CURRENT_DESTINATION:
        return{
          ...state,
          currentDestination:action.payload
        }
    default:
      return state;
  }
};

export default someReducer;
