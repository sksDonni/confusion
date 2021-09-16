import { Navbar, NavbarBrand } from "reactstrap";
import { Component } from "react";
import { DISHES } from "./dishes";
import Main from "./components/MainComponent";
import Menu from "./components/MenuComponent";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
    };
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
