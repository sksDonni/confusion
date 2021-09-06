import { Navbar, NavbarBrand } from "reactstrap";
import { Component } from "react";
import { DISHES } from "./dishes";
import Main from "./components/MainComponent";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;
