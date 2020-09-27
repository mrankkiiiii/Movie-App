import React from 'react';
import '../App.css';
import Navbar from './Navbar';
import { data } from '../data';
import MovieCard from './MovieCard';
import { addMovies } from '../actions';

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
  render(){
    console.log("Final State",this.props.store.getState());
    const { list } = this.props.store.getState(); //[] now {lis:[],favourites:[]}
    return (
      <div className="App">
        <Navbar

        />
          <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">Favourites</div>
          </div>

          <div className="list">
          {
            list.map( (movie, index) => (
              <MovieCard 
                movie = {movie}
                key={`movies-${index}`}
                dispatch={this.props.store.dispatch}
                isMovieFavourite = {this.isMovieFavourite(movie)}
              />
            ))
          }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
