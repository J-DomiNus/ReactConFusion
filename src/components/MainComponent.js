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
class Main extends Component {

    render () {

    const HomePage = () => {
        return (
            <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]} // dish.features === true => [0] return only the first match in the array
            promotion={this.props.promotions.filter((promotion) => promotion.featured)[0]}
            leader={this.props.leaders.filter((leader) => leader.featured)[0]}/> 
        )
    }

    const DishWithId = ({match}) => {
        return (
            <DishDetails dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
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

export default withRouter(connect(mapStateToProps)(Main));