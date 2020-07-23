import React, { Component } from 'react';
import Header from './HeaderComponent'
import Menu from './MenuComponent'
import DishDetails from './DishDetailsComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component {
    state = {
    dishes: DISHES,
    selectedDish: null
    }

    onDishSelect(dishId) {
        this.setState({selectedDish: dishId});
    }

    render () {
    return (
        <div>
            <Header />
            <div className='container'>
            <Menu dishes={this.state.dishes}
                onClick={(dishId) => this.onDishSelect(dishId)} />
            <DishDetails 
                dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
            </div>
            <Footer />
        </div>
    );
    }
    
}

export default Main;