import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./Search.css"

class Search extends Component {
  render() {
    return (
      <div className='adsearch'>
        <input type="search" id="search" name="search" placeholder='Search...'></input>
        <button className='btnSearch'>Search</button>
      </div>
    );
  }
}


export default Search;