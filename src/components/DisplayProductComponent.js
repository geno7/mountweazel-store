import React, { Component } from 'react';
import { Card, CardImg, CardText, CardTitle, CardBody, 
    Breadcrumb, BreadcrumbItem,
    Form, Modal, ModalHeader, ModalBody, Button, Input, Label,
    Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Errors } from 'react-redux-form';

//variables used to check forms for errors
const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
const isNumber = val => !isNaN(+val);

//specific parameter selectors for the product and "ADD TO CART" button
class PurchaseForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sizeSelect: 'Small',
            quantitySelect: '1',
            touched: {
                sizeSelect: false,
                quantitySelect: false
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.resetFeedbackForm();
        this.props.postFeedback(values);
    }

    render() {
        return (
            <Form onSubmit={values => this.handleSubmit(values)}>
                <Row className="form-group">
                    <Label htmlFor="sizeSelect">Size</Label>
                        <Input type="select" name="sizeSelect" id="sizeSelect">
                            <option>Small</option>
                            <option>Medium</option>
                            <option>Large</option>
                            <option>XL</option>
                            <option>XXL</option>
                        </Input>
                </Row>
                <Row className="form-group">
                    <Label htmlFor="quantitySelect">Quantity</Label>
                        <Input name="quantitySelect" id="quantitySelect" type="text" pattern="[0-9]*" value="1"></Input>
                </Row>
                <Row className="form-group">
                    <Button>ADD TO CART</Button>
                </Row>
            </Form>
        )
    }
}


function RenderProduct({product}) {
    return (
            <div className="container">
                <div class="row">
                    <div className="col-md-12 col-lg-6">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="col-md-12 col-lg-6">
                            <h2>{product.name}</h2>
                            <PurchaseForm />
                            <div>{product.description}</div>
                    </div>
                </div>
            </div>
    );
}

function DisplayProduct(props) {
        if (props.product != null) {
            return (
                <div class="container">
                    <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to={"/" + props.product.category}>{props.product.category.charAt(0).toUpperCase() + props.product.category.slice(1)}</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.product.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <hr />
                    </div>
                </div>
                    <div className="row">
                        <RenderProduct product={props.product} />
                    </div>
                </div>
                
            );
        }
        return <div />;
    }

export default DisplayProduct;