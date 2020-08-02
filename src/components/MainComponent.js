import React, { Component } from 'react';
import Header from './HeaderComponent'
import Menu from './MenuComponent';
import Home from './HomeComponent';
import AboutUs from './AboutUsComponent';
import ContactUs from './ContactUsComponent';
import DishDetails from './DishDetailsComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';
class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
    }

    render () {

    const HomePage = () => {
        return (
            <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} // dish.features === true => [0] return only the first match in the array
            dishesLoading={this.props.dishes.isLoading}
            dishesErrMess={this.props.dishes.errMess}
            promotion={this.props.promotions.filter((promotion) => promotion.featured)[0]}
            leader={this.props.leaders.filter((leader) => leader.featured)[0]}/> 
        )
    }

    const DishWithId = ({match}) => {
        return (
            <DishDetails dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
            addComment={this.props.addComment}
            />
        )
    }

    return (
        <div>
            <Header />
            <div className='container'>
            <Switch>
                <Route path='/home' component={HomePage} />
                <Route path='/aboutus' component={() => <AboutUs leaders={this.props.leaders} /> } />
                <Route exact path='/menu' 
                    component={() => <Menu dishes={this.props.dishes} />} />
                <Route path='/menu/:dishId' component={DishWithId} />
                <Route exact path='/contactus' component={ContactUs} />
                <Redirect to='/home'/>
            </Switch>
            </div>
            <Footer />
        </div>
    );
    }
    
}

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({

    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())}
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));