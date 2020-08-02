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
import { postComment, postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render () {

    const HomePage = () => {
        return (
            <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} // dish.features === true => [0] return only the first match in the array
            dishesLoading={this.props.dishes.isLoading}
            dishesErrMess={this.props.dishes.errMess}
            promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
            promosLoading={this.props.promotions.isLoading}
            promosErrMess={this.props.promotions.errMess}
            leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
            leaderLoading={this.props.leaders.isLoading}
            leaderErrMess={this.props.leaders.errMess}/> 
        )
    }

    const DishWithId = ({match}) => {
        return (
            <DishDetails dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            isLoading={this.props.dishes.isLoading}
            dishesErrMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
            commentsLoading={this.props.comments.isLoading}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
            />
        )
    }

    return (
        <div>
            <Header />
            <TransitionGroup>
                <CSSTransition key={this.props.location.key} classNames='page' timeout={300}>
                    <Switch>
                        <Route path='/home' component={HomePage} />
                        <Route path='/aboutus' component={() => <AboutUs leaders={this.props.leaders}  /> } />
                        <Route exact path='/menu' 
                            component={() => <Menu dishes={this.props.dishes} />} />
                        <Route path='/menu/:dishId' component={DishWithId} />
                        <Route exact path='/contactus' component={() => <ContactUs resetFeedbackForm={this.props.resetFeedbackForm} 
                                                                                    postFeedback={this.props.postFeedback}/> } />
                        <Redirect to='/home'/>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
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

    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchDishes: () => {dispatch(fetchDishes())},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
    fetchLeaders: () => {dispatch(fetchLeaders())},
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));