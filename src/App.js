import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import CocktailsContainer from './components/CocktailsContainer'


class App extends Component {

  render() {
    // console.log(this.state);
    return (
      <div>
          <CocktailsContainer />
      </div>
    );
  }
}

export default App;
