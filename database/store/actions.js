// src/store/reducers/someReducer.js
export const SET_USER = "SET_USER";
export const SET_CURRENT_DESTINATION="SET_CURRENT_DESTINATION"

export function setCurrentUser(data) {
    return {
      type: SET_USER,
      payload: data,
    };
  }
  export function setCurrentDestination(data) {
    return {
      type: SET_CURRENT_DESTINATION,
      payload: data,
    };
  }