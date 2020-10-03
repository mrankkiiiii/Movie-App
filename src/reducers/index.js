import { combineReducers } from 'redux';
// Movies Reducer
import {
    ADD_MOVIES,
    ADD_TO_FAVOURITE,
    REMOVE_FROM_FAVOURITE,
    SET_SHOW_FAVOURITE,
    ADD_SEARCH_RESULT,
    ADD_MOVIE_TO_LIST
} from '../actions';

const initialMoviesState = {
    list: [],
    favourites: [],
    showFavourite: false
};

export function movies(state = initialMoviesState, action){
    // if(action.type === ADD_MOVIES){
    //     return {
    //         ...state,
    //         list: action.movies
    //     };
    // }
    // return state;
    switch (action.type) {
        case ADD_MOVIES:
            return {
                ...state,
                list: action.movies
            };
        case ADD_TO_FAVOURITE:
            return{
                ...state,
                favourites: [action.movie, ...state.favourites]
            }
        case REMOVE_FROM_FAVOURITE:
            const filteredArray = state.favourites.filter(
                movie => movie.Title !== action.movie.Title
            );
            return{
                ...state,
                favourites: filteredArray
            }
        case SET_SHOW_FAVOURITE:
            return{
                ...state,
                showFavourite: action.val
            }
        case ADD_MOVIE_TO_LIST:
            return{
                ...state,
                list: [action.movie, ...state.list],
            }
        default:
            return state;
    }
}

// Serarch reducer
const initialSearchState = {
    // [] for array of movies and { } for a single movie
    result: [],
    showSearchResults: false
};
export function search(state = initialSearchState, action) {
    switch (action.type) {
      case ADD_SEARCH_RESULT:
        return {
          ...state,
          results: action.movie,
          showSearchResults: true,
        };
      case ADD_MOVIE_TO_LIST:
        return {
          ...state,
          showSearchResults: false,
        };
      default:
        return state;
    }
  }

//root reducer
// const initialRootState = {
//     movies: initialMoviesState,
//     search: initialSearchState
// };
// export default function rootReducer(state = initialRootState, action){
//     return {
//         movies: movies(state.movies, action),
//         search: search(state.search, action)
//     }
// }

// instead of manually creating rootreducer use existing combineReducer as a root reducer of redux

export default combineReducers({
    movies,
    search
});