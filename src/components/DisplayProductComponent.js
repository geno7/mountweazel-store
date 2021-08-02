import React, { Component } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    FormFeedback,
    Button,
    Input,
    Label,
    Col,
    Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, Form, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { connect } from "react-redux";
import { actions } from "react-redux-form";
import { withRouter } from "react-router-dom";
import { fetchProducts, postToCart } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
    return {
        products: state.products,
        cart: state.cart,
    };
};

const mapDispatchToProps = {
    fetchProducts: () => fetchProducts(),
    resetApparelForm: () => actions.reset("apparelForm"),
    postToCart: (itemData,quantitySelect,sizeSelect) => postToCart(itemData,quantitySelect,sizeSelect),
};

//specific parameter selectors for the product and "ADD TO CART" button
class PurchaseForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sizeSelect: "Small",
            quantitySelect: 1,
            touched: {
                sizeSelect: false,
                quantitySelect: false,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this); //handles changing input values
        this.handleSubmit = this.handleSubmit.bind(this); //handles submitting form
    }

    //handle adding the item to your cart

    handleSubmit(values) {
        console.log("Current state is: " + JSON.stringify(this.state));
        console.log("Current values is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(this.state));
        console.log("sizeSelect: " + this.state.sizeSelect)
        console.log("quantitySelect: " + this.state.quantitySelect);
        this.props.postToCart(
            this.props.itemData,
            this.state.quantitySelect,
            this.state.sizeSelect);
        this.props.resetApparelForm();
    }

    handleInputChange(event) {
        //change the state when values in the form are changed
        const target = event.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState(
            {
                [name]: value,
            },
            () => console.log(this.state)
        );
    }

    //validate form submissions, handle error messages
    validate(quantitySelect, sizeSelect) {
        const errors = {
            quantitySelect: "",
            sizeSelect: "",
        };

        if (this.state.touched.quantitySelect) {
            if (quantitySelect < 1) {
                errors.quantitySelect =
                    "Quantity must be greater than or equal to 1.";
            }
        }

        return errors;
    }

    //test whether a field is in focus or not
    handleBlur = (field) => () => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    };

    render() {
        const errors = this.validate(
            this.state.quantitySelect,
            this.state.sizeSelect
        );

        return (
            <Form
                model="apparelForm"
                onSubmit={(values) => this.handleSubmit(values)}
            >
                {/* only display size selector if product is apparel */}
                {this.props.showSize && (
                    <SizeSelect
                        value={this.state.sizeSelect}
                        onChange={this.handleInputChange}
                        errors={errors.sizeSelect}
                    />
                )}
                <Row className="form-group">
                    <Label htmlFor="quantitySelect">Quantity</Label>
                    <Input
                        name="quantitySelect"
                        id="quantitySelect"
                        type="number"
                        min="1"
                        value={this.state.quantitySelect}
                        invalid={errors.quantitySelect}
                        onBlur={this.handleBlur("quantitySelect")}
                        onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.quantitySelect}</FormFeedback>
                </Row>
                <Row className="form-group">
                    <Button onPress={() => this.addToCart()}>
                        ADD TO CART
                    </Button>
                </Row>
            </Form>
        );
    }
}

function SizeSelect({ value, onChange, errors }) {
    return (
        <Row className="form-group">
            <Label htmlFor="sizeSelect">Size</Label>
            <Input
                type="select"
                name="sizeSelect"
                id="sizeSelect"
                value={value}
                onChange={onChange}
            >
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
                <option>XL</option>
                <option>XXL</option>
            </Input>
            <FormFeedback>{errors}</FormFeedback>
        </Row>
    );
}

//connect purchase form
const PurchaseFormConnected = connect(
    mapStateToProps,
    mapDispatchToProps
)(PurchaseForm);

function RenderProduct({ product }) {
    return (
        <div className="container">
            <div class="row">
                <div className="col-md-12 col-lg-6">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="col-md-12 col-lg-6">
                    <h2>{product.name}</h2>
                    <h3>${product.price}</h3>
                    <PurchaseFormConnected
                        showSize={product.category === "apparel"}
                        itemData={product}
                    />
                    <div>{product.description}</div>
                </div>
            </div>
        </div>
    );
}

function DisplayProduct(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    if (props.product) {
        return (
            <div class="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link
                                    to={"/category/" + props.product.category}
                                >
                                    {props.product.category
                                        .charAt(0)
                                        .toUpperCase() +
                                        props.product.category.slice(1)}
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                {props.product.name}
                            </BreadcrumbItem>
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

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(DisplayProduct)
);
