import React, { Component } from 'react';
import { BrowserRouter} from 'react-router-dom';
import Main from './components/MainComponent'
import Header from './components/HeaderComponent'
import "./App.css";
import Footer from './components/FooterComponent';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
