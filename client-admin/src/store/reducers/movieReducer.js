import {
  MOVIE_LOADING,
  MOVIE_SUCCESS,
  MOVIES_SUCCESS,
  MOVIES_LOADING,
} from "../actions/actionType";

const initialState = {
  movie: {},
  movieLoading: false,
  movies: [],
  moviesLoading: false,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVIE_SUCCESS:
      return {
        ...state,
        movie: action.payload,
      };
    case MOVIE_LOADING:
      return {
        ...state,
        movieLoading: action.payload,
      };
    case MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.payload,
      };
    case MOVIES_LOADING:
      return {
        ...state,
        moviesLoading: action.payload,
      };
    default:
      return state;
  }
};

export default movieReducer;
