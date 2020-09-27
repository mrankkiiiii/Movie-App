import React from 'react';
import '../App.css';
import Navbar from './Navbar';
import { data } from '../data';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourite } from '../actions';

class App extends React.Component {
  componentDidMount(){
    const {store} = this.props;
    store.subscribe(()=>{
      this.forceUpdate();
    })
    //make api call to get the movies
    //dispatch the action
    store.dispatch(addMovies(data));
  }

  isMovieFavourite = (movie) =>{
    const { favourites } = this.props.store.getState();
    const index = favourites.indexOf(movie);
    if(index !== -1){
      //found movie
      return true;
    }
    return false;
  }
  onChangeTab = (val) =>{
    this.props.store.dispatch(setShowFavourite(val))
  }
  render(){
    console.log("Final State",this.props.store.getState());
    const { list, favourites, showFavourite } = this.props.store.getState(); //[] now {lis:[],favourites:[]}
    const displayMovies = showFavourite ? favourites : list
    return (
      <div className="App">
        <Navbar

        />
          <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourite ? '': 'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourite ? 'active-tabs' : ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
          </div>

          <div className="list">
          {
            displayMovies.map( (movie, index) => (
              <MovieCard 
                movie = {movie}
                key={`movies-${index}`}
                dispatch={this.props.store.dispatch}
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

export default App;
