import './App.css';
import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from "react-router-dom";

import DetailPage from './pages/DetailPage/DetailPage'
import SearchPage from './pages/SearchPage/SearchPage'

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route path='/index' component={SearchPage} />
            <Route path="/book" component={DetailPage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
