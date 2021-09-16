import { Navbar, NavbarBrand } from "reactstrap";
import { Component } from "react";
import { DISHES } from "../dishes";
import { COMMENTS } from "../comments";
import { LEADERS } from "../leaders";
import { PROMOTIONS } from "../promotions";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import Header from "./HeaderCompnent";
import Footer from "./FooterComponent";
import Home from "./Home";
import { Switch, Route, Redirect } from "react-router-dom";
import Contact from "./ContactComponent";
import About from "./AboutComponent";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
      selectedDish: null,
    };
  }

  onDishSelect(dishId) {
    console.log(dishId);
    this.setState({ selectedDish: dishId });
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((lead) => lead.featured)[0]}
        />
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <Dishdetail
          dish={
            this.state.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          comments={this.state.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage}>
            <Home />
          </Route>
          <Route exact path="/menu">
            {() => <Menu dishes={DISHES} />}
          </Route>
          <Route exact path="/aboutus">
            {() => <About leaders={this.state.leaders} />}
          </Route>
          <Route exact path="/contactus">
            <Contact />
          </Route>
          <Route path="/menu/:dishId" component={DishWithId} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
