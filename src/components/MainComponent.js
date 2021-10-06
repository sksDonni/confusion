import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import Header from "./HeaderCompnent";
import Footer from "./FooterComponent";
import Home from "./Home";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import { addComment, fetchDishes } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions,
  };
};

  const mapDispatchToProps = dispatch => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () =>  dispatch(fetchDishes())
  });

class Main extends Component {


  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
  }

  onDishSelect(dishId) {
    console.log(dishId);
    this.setState({ selectedDish: dishId });
  }

  render() {
    const HomePage = () => {
      return (
        <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    };

    const DishWithId = ({match}) => {
      return(
          <Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            addComment={this.props.addComment}
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
            {() => <Menu dishes={this.props.dishes} />}
          </Route>
          <Route exact path="/aboutus">
            {() => <About leaders={this.props.leaders} />}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
