import React from 'react';
import '../App.css';
import Navbar from './Navbar';
import { data as moviesList } from '../data';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourite } from '../actions';
import {connect } from '../index';

class App extends React.Component {
  componentDidMount(){
    this.props.dispatch(addMovies(moviesList));
    // const {store} = this.props;
    // store.subscribe(()=>{
    //   this.forceUpdate();
    // })
    //make api call to get the movies
    //dispatch the action
    // store.dispatch(addMovies(data));
  }

  isMovieFavourite = (movie) =>{
    const { movies } = this.props;
    const index = movies.favourites.indexOf(movie);
    if(index !== -1){
      //found movie
      return true;
    }
    return false;
  }
  onChangeTab = (val) =>{
    this.props.dispatch(setShowFavourite(val))
  }
  render(){
    // console.log("Final State",this.props.store.getState());
    const{ movies, search } =  this.props;  //{movies: {}, search:{}}
    const { list, favourites = [], showFavourite = [] } = movies; 
    const displayMovies = showFavourite ? favourites : list
    return (
      <div className="App">
        <Navbar
          search={search}
        />
          <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourite ? '': 'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourite ? 'active-tabs' : ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
          </div>

          <div className="list">
          {
            displayMovies.map( (movie) => (
              <MovieCard 
                movie = {movie}
                key={movie.imdbID}
                dispatch={this.props.dispatch}
                isMovieFavourite = {this.isMovieFavourite(movie)}
              />
            ))
          }
          </div>
          {displayMovies.length === 0 ? <div className="no-movies">No movies to Display!</div>: null}
        </div>
      </div>
    );
  }
}

function callback(state) {
  return {
    movies: state.movies,
    search: state.search,
  };
}
const connectedComponent = connect(callback)(App);
export default connectedComponent;