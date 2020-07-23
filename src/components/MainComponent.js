import React, { Component } from 'react';
import Header from './HeaderComponent'
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetails from './DishDetailsComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
    state = {
    dishes: DISHES,
    }



    render () {

    const HomePage = () => {
        return (
            <Home />
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
                <Redirect to='/home'/>
            </Switch>
            </div>
            <Footer />
        </div>
    );
    }
    
}

export default Main;