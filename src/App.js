import React, { Component } from 'react';
import { BrowserRouter} from 'react-router-dom';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import "./css/style.scss";

const store = ConfigureStore()

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <BrowserRouter basename="mountweazel-store">
                <div className="App">
                    <Main />
                </div>
            </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
