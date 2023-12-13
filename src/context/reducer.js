export const actionType = {
  // Usage example
  // SET_DATA_GOOGLE_EARTH_ENGINE: 'SET_DATA_GOOGLE_EARTH_ENGINE',
};

const reducer = (state, action) => {
  switch (action.type) {
    // Usage example:
    // case actionType.SET_DATA_GOOGLE_EARTH_ENGINE:
    //   return {
    //     ...state,
    //     dataGoogleEarthEngine: action.dataGoogleEarthEngine,
    //   };
    default:
      return state;
  }
};

export default reducer;
