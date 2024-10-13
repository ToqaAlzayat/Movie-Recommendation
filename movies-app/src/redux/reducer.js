import { ADD_TO_FAVORITES, ADD_TO_WATCH_LATER } from './actions';

const initialState = {
  favorites: [],
  watchLater: [],
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      if (state.favorites.find((fav) => fav.imdbID === action.payload.imdbID)) {
        console.log("Movie is already in favorites:", action.payload);
        return state; // Don't add it again
      }
      console.log("Current favorites:", state.favorites);
      console.log("Adding to favorites:", action.payload);
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

      case ADD_TO_WATCH_LATER:
        // Log the incoming action to check the payload
        console.log("Action payload for ADD_TO_WATCH_LATER:", action.payload);
      
        // Check if the movie is already in the watch later list
        if (state.watchLater.find((watchLaterMovie) => watchLaterMovie.imdbID === action.payload.imdbID)) {
          console.log("Movie is already in watch later:", action.payload); // Log if movie is a duplicate
          return state; // Don't add it again
        }
        console.log("Current watch later list before adding:", state.watchLater);
        return {
          ...state,
          watchLater: [...state.watchLater, action.payload],
        };
      
    default:
      return state;
  }
};

export default movieReducer;
