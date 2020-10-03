import React, {Component} from 'react';
import {addMovieToList, handleMovieSearch} from '../actions';
// import { data} from '../data'
import {StoreContext} from '..';
class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchText: ''
    };
  }
  
  handleAddToMovies = (movie) => {
    this.props.dispatch(addMovieToList(movie));
  }

  handleSearchClick = () => {
    const { searchText } = this.state;
    this.props.dispatch(handleMovieSearch(searchText));
  }
  handleSearchChange = (event) => {
    this.setState({
      searchText: event.target.value
    });
  }
  render () {
    
    const { showSearchResults, results: movies } = this.props.search;
    console.log("fg",movies)
    return (
      <div className="nav">
        <div className="search-container">
          <input placeholder="Search" onChange={this.handleSearchChange}/>
          <button id="search-btn" onClick={this.handleSearchClick}>Search</button>
          { showSearchResults && (
            <div className="search-results">
             {
               movies.Search.map((movie)=>(
                <div className="search-result">
                <img src={movie.Poster} alt="search-pic" />
                <div className="movie-info">
                  <span>{movie.Title}</span>
                  <span style={{fontSize: 15, textAlign: "left"}}>{movie.Plot}</span>
                  <button onClick={() => this.handleAddToMovies(movie)}>
                    Add to Movies
                  </button>
                </div>
              </div>
               ))
             }
            </div>
          )}
        </div>
       </div>
    );
  }
}

class NavbarWrapper extends React.Component{
  render(){
    return (
      <StoreContext.Consumer>
        {
          (store) => (
            <Navbar dispatch={store.dispatch} search ={this.props.search}/>
          )
        }
      </StoreContext.Consumer>
    );
  }
}

export default NavbarWrapper;