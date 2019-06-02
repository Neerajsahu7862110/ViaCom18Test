import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
  }

  onInputChange = (event) => {
    this.setState({term: event.target.value});
  }

  onInputSearch = () => {
    this.props.searchGif(this.state.term);
  }
  
  render () {

    return (
      <div className="search-bar">
        <input
          value={this.state.term}
          onChange={this.onInputChange}
          placeholder={"Search Images"}
        />
        <button className="searchButton" onClick={this.onInputSearch}>Search</button>
      </div>
    );
  }
}

export default SearchBar;
