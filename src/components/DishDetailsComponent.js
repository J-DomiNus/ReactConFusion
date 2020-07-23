import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

const DishDetailsComponent = (props) => {
    if (props.dish != null) {
        const comments = props.dish.comments.map((comment) => {
            return (
                <ul key={comment.id} className='list-unstyled'>
                    <li>{comment.comment}</li>
                    <li>{comment.author}, {comment.date}</li>
                </ul>
            )
        })
        return (
            <div className='row'>
                <div className='col-12 col-md-5 mt-1'>
                        <Card>
                            <CardImg width='100%' src={props.dish.image} alt={props.dish.name} />
                            <CardBody>
                                <CardTitle>{props.dish.name}</CardTitle>
                                <CardText>{props.dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className='col-12 col-md-5 mt-1'>
                        <h4>Comments</h4>
                            {comments}
                    </div>
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}

export default DishDetailsComponent;