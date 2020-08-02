import React, { Component, Fragment } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Nav, NavItem, Button,
Modal, ModalHeader, ModalBody,Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import Loading from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    state = {
        isModalOpen: false
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        this.toggleModal()
        this.props.addComment(
            this.props.dishId, 
            values.rating,
            values.author,
            values.comment
        )
    }
    render () {
        return (
            <Fragment>
                <Nav className>
                    <NavItem>
                        <Button outline onClick={() => this.toggleModal()}>
                            <span className='fa fa-pencil fa-lg'> Comment</span>
                        </Button>
                    </NavItem>
                </Nav>
                <Modal isOpen={this.state.isModalOpen} 
                    toggle={() => this.toggleModal()}>
                    <ModalHeader toggle={() => this.toggleModal()}>Login</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Label htmlFor="rating" md={2}>Rating</Label>
                                </Col>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Label htmlFor="author">Name</Label>
                                </Col>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="name"
                                        placeholder="Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={12}>
                                <Label htmlFor="comment">Comment</Label>
                                </Col>
                                <Col md={12}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="6"
                                        className="form-control" 
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type='submit' value='submit' color='primary'>Comment</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </Fragment>
        )
    }
    
}

    const RenderDish = ({dish}) => {
        return (
            <div className='col-12 col-md-5 mt-1'>
                <Card>
                    <CardImg width='100%' src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
        
    const RenderComments = ({comments, addComment, dishId}) => {
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
                <CommentForm dishId={dishId}
                    addComment={addComment}/>
            </div>
        )
    }

    
    const DishDetails = (props) => {
        if (props.isLoading) {
            return (
                <div className='container'>
                    <div className='row'>
                        <Loading />
                    </div>
                </div>
            )
        }
        else if (props.errMess) {
            return (
                <div className='container'>
                    <div className='row'>
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        }
        else if (props.dish != null)
        return (
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className= 'row'>
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.comments} 
                    addComment={props.addComment}
                    dishId={props.dish.id}/>
                </div>
                
            </div>
        )
        else
            return (
                <div></div>
            )
    }
    export default DishDetails;

{/* <DishDetails dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} /> */}

//     export class CommentForm extends Component {
//         state = {
//             isModalOpen: false
//         }

//         toggleModal() {
//             this.setState({
//                 isModalOpen: !this.state.isModalOpen
//             })
//         }
    
//         handleComment(event) {
//             this.toggleModal();
//             alert('Username ' + this.username.value + 
//                 'Password ' + this.password.value +
//                 'Remember ' + this.remember.checked);
//                 event.preventDefault()
//         }

//     render () {
//         return (
//             <Fragment>
//                 <Modal isOpen={this.state.isModalOpen} 
//                         toggle={() => this.toggleModal()}>
//                     <ModalHeader toggle={() => this.toggleModal()}>Login</ModalHeader>
//                     <ModalBody>
//                         <Form onSubmit={(event) => this.handleLogin(event)}>
//                             <FormGroup>
//                                 <Label htmlFor='username'>Username</Label>
//                                 <Input type='text' id='name' name='username' innerRef={(input) => this.username = input}></Input>
//                             </FormGroup>
//                             <FormGroup>
//                                 <Label htmlFor='password'>Password</Label>
//                                 <Input type='password' id='password' name='password' innerRef={(input) => this.password = input}></Input>
//                             </FormGroup>
//                             <FormGroup check>
//                                 <Label check>
//                                     <Input type='checkbox' name='remember' innerRef={(input) => this.remember = input}/>
//                                     Remember me
//                                 </Label>
//                             </FormGroup>
//                             <Button type='submit' value='submit' color='primary'>Login</Button>
//                         </Form>
//                     </ModalBody>
//                 </Modal>
//             </Fragment>
//         )
//     }
// }





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