import React, { Component } from 'react';
import { Card, CardImg, CardText, CardTitle, CardBody, 
    Breadcrumb, BreadcrumbItem,
    Form, FormFeedback, Button, Input, Label,
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

        this.handleInputChange = this.handleInputChange.bind(this) //handles changing input values
        this.handleSubmit = this.handleSubmit.bind(this); //handles submitting form
    }

    handleSubmit(values) {
        this.props.resetFeedbackForm();
        this.props.postFeedback(values);
    }

    handleInputChange(event) {
        //change the state when values in the form are changed
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    //validate form submissions, handle error messages
    validate(quantitySelect, sizeSelect) {
        const errors = {
            quantitySelect: '',
            sizeSelect: '',
        }

        if (this.state.touched.quantitySelect) {
            if (quantitySelect < 1) {
                errors.quantitySelect = 'Quantity must be greater than or equal to 1.'
            }
        }

        return errors
    }

    //test whether a field is in focus or not
    handleBlur = (field) => () => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        })
    }

    render() {

        const errors = this.validate(this.state.quantitySelect,this.state.sizeSelect)

        return (
            <Form onSubmit={values => this.handleSubmit(values)}>
                <Row className="form-group">
                    <Label htmlFor="sizeSelect">Size</Label>
                        <Input type="select" name="sizeSelect" id="sizeSelect" 
                            value={this.state.sizeSelect} 
                            onChange={this.handleInputChange}>
                            <option>Small</option>
                            <option>Medium</option>
                            <option>Large</option>
                            <option>XL</option>
                            <option>XXL</option>
                        </Input>
                        <FormFeedback>{errors.sizeSelect}</FormFeedback>
                </Row>
                <Row className="form-group">
                    <Label htmlFor="quantitySelect">Quantity</Label>
                        <Input name="quantitySelect" id="quantitySelect" 
                            type="number" 
                            min="1" 
                            value={this.state.quantitySelect} 
                            invalid={errors.quantitySelect}
                            onBlur={this.handleBlur("quantitySelect")}
                            onChange={this.handleInputChange}/>
                        <FormFeedback>{errors.quantitySelect}</FormFeedback>
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
                            <h3>${product.price}</h3>
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