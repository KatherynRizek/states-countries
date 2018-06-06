import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Countries} from './Countries.js';
import {States} from './States.js';
import {PostCountries} from './PostCountries';
import {PostStates} from './PostStates';
import {ViewCountries} from './ViewLists';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          countryCode: '',
          inputFullCountry: '',
          inputCountryCode: ''
      };
    }

  handleChange(event) {
    this.setState({
      countryCode: event.target.value,
      inputFullCountry: event.target.value,
      inputCountryCode: event.target.value
    });
    var countryCode = event.target.value;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Countries and States!</h1>
        </header>
        <p className="App-intro">
        </p>
        <Countries handleChange={this.handleChange.bind(this)}/>
        <States countryCode={this.state.countryCode}/>
        <PostCountries />
        <PostStates />
      </div>
    );
  }
}

export default App;
