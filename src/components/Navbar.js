import React from "react";
import { addMovieToList, handleMovieSearch } from "../actions";
import { connect } from "react-redux";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
  }

  handleAddToMovies = (movie) => {
    this.props.dispatch(addMovieToList(movie));
  };

  handleSearchClick = () => {
    const { searchText } = this.state;
    this.props.dispatch(handleMovieSearch(searchText));
  };
  handleSearchChange = (event) => {
    this.setState({
      searchText: event.target.value,
    });
  };
  render() {
    const { showSearchResults, results: movies } = this.props.search;
    console.log(movies);
    return (
      <div className="nav">
        <div className="search-container">
          <input placeholder="Search" onChange={this.handleSearchChange} />
          <button id="search-btn" onClick={this.handleSearchClick}>
            Search
          </button>
          {showSearchResults && movies.Response !== "False" ? (
            <div className="search-results">
              {movies.Search.map((movie) => (
                <div className="search-result">
                  <div className="search-img">
                    <img src={movie.Poster} alt="search-pic" />
                  </div>
                  <div className="movie-info">
                    <span className="movie-title">{movie.Title}</span>
                    <span className="movie-year">{movie.Year}</span>
                    <button onClick={() => this.handleAddToMovies(movie)}>
                      Add to Movies
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            showSearchResults && (
              <div
                className="search-results"
                style={{ fontSize: 20, fontWeight: 700, padding: 20 }}
              >
                No Search Result
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}
//  instead of write wrapper here we can use connect function

// class NavbarWrapper extends React.Component{
//   render(){
//     return (
//       <StoreContext.Consumer>
//         {
//           (store) => (
//             <Navbar dispatch={store.dispatch} search ={this.props.search}/>
//           )
//         }
//       </StoreContext.Consumer>
//     );
//   }
// }

// export default NavbarWrapper;

// const connectedNavComponent = connect(mapStateToProps)(Navbar);
// export default connectedNavComponent;

// function mapStateToProps ({ search }){
//   return {
//     search
//   }
// }
// or  upper one is Es6 destructuting
function mapStateToProps(state) {
  return {
    search: state.search,
  };
}

export default connect(mapStateToProps)(Navbar);
