import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetailsComponent extends Component {

    renderDish(dish) {
        return (
            <div className='col-12 col-md-5 mt-1'>
                <Card>
                    <CardImg width='100%' src={this.props.dish.image} alt={this.props.dish.name} />
                    <CardBody>
                        <CardTitle>{this.props.dish.name}</CardTitle>
                        <CardText>{this.props.dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
    
    renderComments(comments) {
        return (
            <div className='col-12 col-md-5 mt-1'>
                <h4>Comments</h4>
                <ul className='list-unstyled'>
                    {comments.map((comment) => {
                    return (
                        <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>--{comment.author}, {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </li>
                    )
                })}
                </ul>
            </div>
        )
    }
    render() {

        if(this.props.dish != null){
            const dish = this.renderDish(this.props.dish)
            const comments = this.renderComments(this.props.dish.comments)
            return (
                <div className= 'row'>
                    {dish}
                    {comments}
                </div>
            )
        }
        else {
            return (
                <div>
                    <p>Click on a dish fr more details</p>
                </div>
            )
        }
    }
}

export default DishDetailsComponent;

    //------------------------------------- MY SOLUTION ----------------------------------------------
    // render () {
    //     if (this.props.dish != null) {
    //         const comments = this.props.dish.comments.map((comment) => {
    //             return (
    //                 <ul key={comment.id} className='list-unstyled'>
    //                     <li>{comment.comment}</li>
    //                     <li>--{comment.author}, {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
    //                 </ul>
    //             )
    //         })
    //         return (
    //             <div className='row'>
    //                 <div className='col-12 col-md-5 mt-1'>
    //                         <Card>
    //                             <CardImg width='100%' src={this.props.dish.image} alt={this.props.dish.name} />
    //                             <CardBody>
    //                                 <CardTitle>{this.props.dish.name}</CardTitle>
    //                                 <CardText>{this.props.dish.description}</CardText>
    //                             </CardBody>
    //                         </Card>
    //                     </div>
    //                     <div className='col-12 col-md-5 mt-1'>
    //                         <h4>Comments</h4>
    //                             {comments}
    //                     </div>
    //             </div>
    //         )
    //     }
    //     else {
    //         return (
    //             <div></div>
    //         )
    //     }
    // }