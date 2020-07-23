import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import DishDetailsComponent from './DishDetailsComponent';
class Menu extends Component {
    constructor(props) {
        super(props);
            this.state = {
                selectedDish: null
            }
        console.log('MenuComponent constructor')
    }

    componentDidMount() {
        console.log('MenuComponent componentDidMount')
    }

    onDishSelect(dish) {
        this.setState({selectedDish: dish});
    }


    render() {

        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className='col-12 col-md-5 mt-1'>
                    <Card onClick={() => this.onDishSelect(dish)}>
                            <CardImg width='100%' src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            )
        });

        console.log('MenuComponent render')

        return (
            <div className='container'>
                <div className='row'>
                    {menu}
                </div>
                <DishDetailsComponent dish={this.state.selectedDish} />
            </div>
        );
    }
}

export default Menu;