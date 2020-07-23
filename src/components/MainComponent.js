import React, { Component } from 'react';
import Header from './HeaderComponent'
import Menu from './MenuComponent';
import Home from './HomeComponent';
import ContactUs from './ContactUsComponent';
import DishDetails from './DishDetailsComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
    state = {
    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
    }



    render () {

    const HomePage = () => {
        return (
            <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]} // dish.features === true => [0] return only the first match in the array
            promotion={this.state.promotions.filter((promotion) => promotion.featured)[0]}
            leader={this.state.leaders.filter((leader) => leader.featured)[0]}/> 
        )
    }
    return (
        <div>
            <Header />
            <div className='container'>
            <Switch>
                <Route path='/home' component={HomePage} />
                <Route exact path='/menu' 
                    component={() => <Menu dishes={this.state.dishes} />} />
                <Route exact path='/contactus' component={ContactUs} />
                <Redirect to='/home'/>
            </Switch>
            </div>
            <Footer />
        </div>
    );
    }
    
}

export default Main;