import { Navbar, NavbarBrand } from "reactstrap";
import { Component } from "react";
import { DISHES } from "./dishes";
import { Provider } from 'react-redux'
import { ConfigureStore } from './redux/configureStore'
import Main from "./components/MainComponent";
import Menu from "./components/MenuComponent";
import { BrowserRouter } from "react-router-dom";

const store = ConfigureStore();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
    };
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
